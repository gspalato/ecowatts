import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
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
import { pushEquipment } from '@/lib/supabase';

type ManuelInputFields = {
	[key: string]: {
		label: string;
		[key: string]: string;
	};
};

const ApplianceDetailsPage = () => {
	const searchParams = useLocalSearchParams();
	const { type } = searchParams;

	const borderColor = useThemeColor({}, 'borderColor');

	const [brandSearchQuery, setBrandSearchQuery] = useDebounceValue('', 500);
	const [modelSearchQuery, setModelSearchQuery] = useDebounceValue('', 500);
	const [searchResult, setSearchResult] = useState<{ [key: string]: any }>({ content: [] })

	const [manualInput, setManualInput] = useState<{ [key: string]: any }>({});

	const applianceType = APPLIANCES.find(
		(appliance) => appliance.type === type,
	);

	const typeDisplayName = applianceType?.displayName;
	const manualInputInfo = applianceType?.manualInput;
	const inmetroCode = applianceType?.inmetroCode;

	const hasSearch = (brandSearchQuery.length > 0 || modelSearchQuery.length > 0)

	useEffect(() => {
		const search = async () => {
			const res = await searchInmetro(brandSearchQuery, modelSearchQuery, applianceType?.inmetroCode!)
			setSearchResult(await res.json())
			//console.log(await res.json());
		}

		if (hasSearch)
			search();
	}, [brandSearchQuery, modelSearchQuery])

	return (
		<ThemedSafeView style={styles.container}>
			<PageContainer>
				<StackPageHeader
					title={`Registrar`}
					style={{ marginBottom: 20 }}
				/>
				<ScrollView style={styles.content}>
					{!manualInputInfo?.only && (
						<>
							<View
								style={[
									styles.searchContainer,
									{
										borderWidth: StyleSheet.hairlineWidth,
										borderColor,
									},
								]}
							>
								<Text style={styles.sectionTitle}>
									Pesquise pelo(a){' '}
									{typeDisplayName?.toLowerCase()}.
								</Text>
								<View style={{ flexDirection: 'row', flex: 1, gap: 5 }}>
									<View style={styles.searchInputContainer}>
										<Ionicons
											name='search'
											size={20}
											color='#ccc'
										/>
										<TextInput
											style={styles.searchInput}
											placeholder={`Marca`}
											//value={brandSearchDisplayQuery}
											onChangeText={(t) => setBrandSearchQuery(t)}
										/>
									</View>
									<View style={styles.searchInputContainer}>
										<Ionicons
											name='search'
											size={20}
											color='#ccc'
										/>
										<TextInput
											style={styles.searchInput}
											placeholder={`Modelo`}
											//value={modelSearchDisplayQuery}
											onChangeText={(t) => setModelSearchQuery(t)}
										/>
									</View>
								</View>
								<ScrollView style={{ display: hasSearch ? 'flex' : 'none', flex: 1 }}>
									{searchResult.content.slice(0, 10).map((e: any) => (
										<Button
											key={e.codigoBarras}
											style={{
												flexDirection: 'row',
												width: '100%',
												justifyContent: 'center',
												alignItems: 'center',
												paddingVertical: 20,
												borderWidth: 0,
												borderBottomWidth: 1,
												borderColor: '#E5E5EA',
											}}
											onPress={() => {
												router.push(
													`/(auth)/appliance/finish?data=${encodeURIComponent(JSON.stringify(e))}&manualInput=false&type=${type}`,
												)
											}}
											text={`${e.nomeMarca} ${e.nomeModelo}`}
											textType='subtitle'
											textProps={{
												style: {
													fontSize: 16,
													textAlign: 'center',
													width: 'auto',
												},
											}}
											type='secondary'
										/>
									))}
								</ScrollView>
							</View>

							<View style={styles.divider}>
								<View style={styles.dividerLine} />
								<Text style={styles.dividerText}>ou</Text>
								<View style={styles.dividerLine} />
							</View>
						</>
					)}

					<View
						style={[
							styles.manualInputContainer,
							{
								borderWidth: StyleSheet.hairlineWidth,
								borderColor,
							},
						]}
					>
						<Text style={styles.sectionTitle}>
							Insira manualmente
						</Text>
						{manualInputInfo?.fields?.map((field) => (
							<View style={styles.inputGroup} key={field.label}>
								<Text style={styles.label}>{field.label}</Text>
								<TextInput
									style={styles.input}
									placeholder={field.placeholder}
									value={manualInput[field.label]}
									onChangeText={(text) =>
										setManualInput({
											...manualInput,
											[field.attributeTo]: text,
										})
									}
								/>
							</View>
						))}
						<Button text='Adicionar' type='primary' onPress={() => {
							console.log('le manual input', encodeURIComponent(JSON.stringify(manualInput)));

							pushEquipment(manualInput['name'], manualInput['location'], manualInput, {}, true)
								.then(() => {
									router.setParams({});
									router.push('/(auth)/(tabs)/appliances');
								})
						}}></Button>
					</View>
				</ScrollView>
			</PageContainer>
		</ThemedSafeView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F2F2F5',
	},
	content: {
		flex: 1,
		padding: 16,
	},
	searchContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 16,
	},
	sectionTitle: {
		fontSize: 18,
		marginBottom: 12,
		color: '#1C1C1E',
	},
	searchInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 12,
		borderWidth: 1,
		borderColor: '#E5E5EA',
		gap: 5,
		flex: .5
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: '#1C1C1E',
	},
	divider: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 24,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#E5E5EA',
	},
	dividerText: {
		marginHorizontal: 16,
		color: '#8E8E93',
		fontSize: 14,
	},
	manualInputContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 16,
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
	submitButton: {
		backgroundColor: '#007AFF',
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		marginTop: 8,
	},
	submitButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
	},
});

export default ApplianceDetailsPage;
