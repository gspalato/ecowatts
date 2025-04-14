import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import { Button } from '@/components/Button';
import { PageContainer } from '@/components/PageContainer';
import StackPageHeader from '@/components/StackPageHeader';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

import { useThemeColor } from '@/hooks/useThemeColor';

import { APPLIANCES } from '@/constants/Appliance';

type ManuelInputFields = {
	[key: string]: {
		label: string;
		[key: string]: string;
	};
};

const ApplianceDetailsPage = () => {
	const { type } = useLocalSearchParams();
	const router = useRouter();
	const borderColor = useThemeColor({}, 'borderColor');
	const [searchQuery, setSearchQuery] = useState('');
	const [manualInput, setManualInput] = useState({});

	const applianceType = APPLIANCES.find(
		(appliance) => appliance.type === type,
	);

	const typeDisplayName = applianceType?.displayName;
	const manualInputInfo = applianceType?.manualInput;

	return (
		<ThemedSafeAreaView style={styles.container}>
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
									Pesquise pelo modelo de{' '}
									{typeDisplayName?.toLowerCase()}.
								</Text>
								<View style={styles.searchInputContainer}>
									<Ionicons
										name='search'
										size={20}
										color='#ccc'
									/>
									<TextInput
										style={styles.searchInput}
										placeholder={`Pesquise pelo modelo.`}
										value={searchQuery}
										onChangeText={setSearchQuery}
									/>
								</View>
							</View>

							<View style={styles.divider}>
								<View style={styles.dividerLine} />
								<Text style={styles.dividerText}>or</Text>
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
											[field.label]: text,
										})
									}
								/>
							</View>
						))}

						{/*
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Marca</Text>
							<TextInput
								style={styles.input}
								placeholder='Insira o nome da marca.'
								value={manualInput.brand}
								onChangeText={(text) =>
									setManualInput({
										...manualInput,
										brand: text,
									})
								}
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.label}>Modelo</Text>
							<TextInput
								style={styles.input}
								placeholder='Insira o modelo.'
								value={manualInput.model}
								onChangeText={(text) =>
									setManualInput({
										...manualInput,
										model: text,
									})
								}
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.label}>
								Consumo de energia mensal (kWh)
							</Text>
							<TextInput
								style={styles.input}
								placeholder='Insira o consumo de energia mensal.'
								keyboardType='numeric'
								value={manualInput.powerConsumption}
								onChangeText={(text) =>
									setManualInput({
										...manualInput,
										powerConsumption: text,
									})
								}
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.label}>
								Tempo médio de uso diário (horas)
							</Text>
							<TextInput
								style={styles.input}
								placeholder='Insira o tempo médio de uso diário.'
								keyboardType='numeric'
								value={manualInput.dailyUse}
								onChangeText={(text) =>
									setManualInput({
										...manualInput,
										dailyUse: text,
									})
								}
							/>
						</View>
                        */}

						<Button text='Adicionar' type='primary'></Button>
						{/*
						<TouchableOpacity style={styles.submitButton}>
							<Text style={styles.submitButtonText}>
								Add Appliance
							</Text>
						</TouchableOpacity>
                        */}
					</View>
				</ScrollView>
			</PageContainer>
		</ThemedSafeAreaView>
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
		fontWeight: '600',
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
		fontWeight: '600',
	},
});

export default ApplianceDetailsPage;
