import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
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
import { searchInmetro } from '@/lib/inmetro';
import React from 'react';

const ApplianceFinishPage = () => {
    const searchParams = useGlobalSearchParams<{ data: string, manualInput: 'true' | 'false', type: string }>();
    console.log('searchparams', searchParams)
    const { data, manualInput } = searchParams;

    const passedData = JSON.parse(decodeURIComponent(data));
    console.log('passedData', passedData)

    // Check if the data for the appliance type has the required fields.
    // Otherwise, ask the user to fill in the missing fields.
    const applianceType = APPLIANCES.find(
        (appliance) => appliance.type === passedData.type,
    );
    const typeDisplayName = applianceType?.displayName;
    const manualInputInfo = applianceType?.manualInput;
    const inmetroCode = applianceType?.inmetroCode;


    return (
        <ThemedSafeView style={styles.container}>
            <PageContainer>
                <StackPageHeader
                    title={`Finalizar`}
                    style={{ marginBottom: 20 }}
                />
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
})