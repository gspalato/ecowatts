import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDebounceValue } from 'usehooks-ts'

import { Button } from '@/components/Button';
import { PageContainer } from '@/components/PageContainer';
import StackPageHeader from '@/components/StackPageHeader';
import { ThemedSafeView } from '@/components/ThemedSafeView';

import { useThemeColor } from '@/hooks/useThemeColor';

import { APPLIANCES } from '@/constants/Appliance';
import { applianceTypeAttributeMap, convertToDatabaseSchema, searchInmetro } from '@/lib/inmetro';
import React from 'react';
import { pushEquipment, supabase } from '@/lib/supabase';
import { Picker } from '@react-native-picker/picker';
import { Database } from '@/database.types';

const ApplianceFinishPage = () => {
    const searchParams = useGlobalSearchParams<{ data: string, manualInput: 'true' | 'false', type: string }>();
    //console.log('searchparams', searchParams)
    const { data, manualInput } = searchParams;

    const borderColor = useThemeColor({}, 'borderColor');

    console.log('unparsed data', data)
    const passedData = JSON.parse(decodeURIComponent(data));
    //console.log('passedData', passedData)

    const [name, setName] = useState<Database['public']['Tables']['equipment']['Row']['name']>('');
    const [locationId, setLocationId] = useState<Database['public']['Tables']['location']['Row']['id']>();
    // Check if the data for the appliance type has the required fields.
    // Otherwise, ask the user to fill in the missing fields.
    const [manuallyFilledFields, setManuallyFilledFields] = useState<{ [key: string]: any }>({});

    const applianceType = APPLIANCES.find(
        (appliance) => appliance.inmetroCode === passedData.idPrograma,
    );

    const [usersLocations, setUsersLocations] = useState<Database["public"]["Tables"]["location"]["Row"][]>([])
    useEffect(() => {
        // Load the users locations from the database.
        const loadUsersLocations = async () => {
            // Users can only see their own locations.
            const { data, error } = await supabase
                .from('location')
                .select('*');

            if (error) {
                console.log('error', error);
                return;
            }

            console.log('data', data);

            setUsersLocations(data);
        }
        loadUsersLocations()
    }, [])

    const requiredFields = applianceTypeAttributeMap[applianceType?.type as keyof typeof applianceTypeAttributeMap] ?? {};
    console.log('requiredFields', requiredFields)
    const unfilledRequiredFields = Object.entries(requiredFields).filter(([key, value]) => {
        const attribute = passedData['atributos'][String(value.code) as keyof typeof passedData];
        if (attribute === undefined || attribute === null || attribute === '') {
            return true;
        }
        return false;
    });

    // If all fields are filled, just push to the database.
    //useEffect(() => {
    //    if (unfilledRequiredFields.length === 0) {
    //        pushEquipment(name, locationId, passedData, manuallyFilledFields, false)
    //            .then(() => {
    //                router.setParams({});
    //                router.push('/(auth)/(tabs)/appliances');
    //            })
    //    }
    //}, []);

    return (
        <ThemedSafeView style={styles.container}>
            <PageContainer>
                <StackPageHeader
                    title={`Finalizar`}
                    style={{ marginBottom: 20 }}
                />
                <ScrollView style={styles.content}>
                    {
                        unfilledRequiredFields.length > 0 && (
                            <View
                                style={[
                                    styles.fieldsContainer,
                                    {
                                        borderWidth: StyleSheet.hairlineWidth,
                                        borderColor,
                                    },
                                ]}
                            >
                                <Text style={styles.sectionTitle}>
                                    Algumas informações estão faltando...
                                </Text>
                                <View style={styles.inputGroup} key={'name'}>
                                    <Text style={styles.label}>Nome do eletrodoméstico</Text>
                                    <TextInput
                                        style={styles.input}
                                        //placeholder={field.placeholder}
                                        value={name}
                                        onChangeText={(text) => {
                                            setName(text);
                                        }}
                                    />
                                </View>
                                <View style={styles.inputGroup} key={'location'}>
                                    <Text style={styles.label}>Local da casa</Text>
                                    {
                                        usersLocations.length === 0 && (
                                            <Text style={[styles.label, { color: '#e66' }]}>
                                                Você não tem locais cadastrados.{'\n'}Cadastre um local para continuar.
                                            </Text>
                                        )
                                    }
                                    {
                                        usersLocations.length > 0 && (
                                            <Picker
                                                selectedValue={locationId}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setLocationId(itemValue);
                                                }}
                                            >
                                                {usersLocations.map((v) => (
                                                    <Picker.Item
                                                        key={v.id}
                                                        label={v.name}
                                                        value={v.id}
                                                    />
                                                ))}
                                            </Picker>
                                        )
                                    }
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, gap: 5 }}>
                                    {unfilledRequiredFields.map(([key, value]) => (
                                        <View style={styles.inputGroup} key={value.name}>
                                            <Text style={styles.label}>{value.name}</Text>
                                            <TextInput
                                                style={styles.input}
                                                //placeholder={field.placeholder}
                                                value={manuallyFilledFields[value.code] || ''}
                                                onChangeText={(text) => {
                                                    setManuallyFilledFields((prev) => ({
                                                        ...prev,
                                                        [value.code]: text,
                                                    }))
                                                }}
                                            />
                                        </View>
                                    ))}
                                </View>
                                <Button text='Adicionar' type='primary' onPress={() => {
                                    // Check if all fields are filled.
                                    const allFieldsFilled = unfilledRequiredFields.every(([key, { code }]) => {
                                        return manuallyFilledFields[code] !== undefined && manuallyFilledFields[code] !== null && manuallyFilledFields[code] !== '';
                                    }) && name.length > 0;

                                    if (!allFieldsFilled) {
                                        alert('Preencha todos os campos obrigatórios.');
                                        return;
                                    }

                                    pushEquipment(name, locationId, passedData, manuallyFilledFields, false)
                                        .then(() => {
                                            router.setParams({});
                                            router.push('/(auth)/(tabs)/appliances');
                                        })
                                }}></Button>
                            </View>
                        )
                    }
                </ScrollView>
            </PageContainer>
        </ThemedSafeView>
    )
}

export default ApplianceFinishPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    fieldsContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        gap: 5,
        flexDirection: 'column',
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 12,
        color: '#1C1C1E',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    input: {
        //backgroundColor: '#F2F2F7',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
})