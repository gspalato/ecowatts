import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import {
	Canvas,
	Rect,
	LinearGradient,
	Skia,
	Shader,
	vec,
	RadialGradient,
	Group,
	useFont,
	Text as SkiaText,
	RoundedRect,
	Fill,
	matchFont,
	Mask
} from "@shopify/react-native-skia";

import { IconButton } from '@/components/IconButton';
import Logo from '@/components/Logo';
import { TabPageContainer } from '@/components/TabPageContainer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { calculateTotalConsumption, formatWattHours } from '@/lib/inmetro';
import { getAllEquipment } from '@/lib/supabase';
import { kWHPrice } from '@/lib/energySupplier';
import { Perspective } from '@/components/Perspective';
import { UsageDisplay } from '@/components/UsageDisplay';

const Home = () => {
	const router = useRouter();

	const backgroundColor = useThemeColor({}, 'background');
	const highlightColor = useThemeColor({}, 'highlightColor');
	const borderColor = useThemeColor({}, 'borderColor');

	const [selectedConsumptionTimespan, setSelectedConsumptionTimespan] =
		useState<'hourly' | 'daily' | 'monthly' | 'annualy'>('monthly');

	const [equipment, setEquipment] = useState<any[]>([]);
	const [consumption, setConsumption] = useState<number>(0)

	const [refreshing, setRefreshing] = useState(false);
	const refresh = async () => {
		const equipment = await getAllEquipment();
		setEquipment(equipment);

		recalculateConsumption(selectedConsumptionTimespan);
	}

	const recalculateConsumption = async (timespan: 'hourly' | 'daily' | 'monthly' | 'annualy' = 'monthly') => {
		const consumption = await calculateTotalConsumption(
			timespan
		);
		console.log(consumption)
		setConsumption(consumption ?? 0);
	}

	useEffect(() => {
		refresh();
	}, [selectedConsumptionTimespan])

	const formattedConsumption = formatWattHours(consumption);

	return (
		<TabPageContainer
			style={{
				flex: 1,
				display: 'flex',
				gap: 20,
			}}
		>
			<View
				style={{
					display: 'flex',
					width: '100%',
					height: 40,
					paddingVertical: 5,
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row',
				}}
			>
				<Logo />
				<View
					style={{
						display: 'flex',
						gap: 5,
						flexDirection: 'row',
						alignItems: 'center',
						width: 'auto',
					}}
				>
					<IconButton
						size={35}
						onPress={() => router.push('/(auth)/user')}
					>
						<FontAwesome5 name='user-alt' size={15} color='black' />
					</IconButton>
					<IconButton
						size={35}
						onPress={() => router.push('/(auth)/settings')}
					>
						<FontAwesome5 name='cog' size={15} color='black' />
					</IconButton>
				</View>
			</View>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={refresh} />
				}
				style={{
					borderRadius: 10,
					flex: 1,
					height: '100%',
					width: '100%',
				}}
			>
				<Pressable
					onPress={() => router.push('/(auth)/(tabs)/appliances')}
				>
					<ThemedView
						style={{
							backgroundColor: '#fff',
							padding: 20,
							borderRadius: 10,
							borderWidth: StyleSheet.hairlineWidth,
							display: 'flex',
							gap: 10,
						}}
					>
						<ThemedText
							type='title'
							style={{
								fontSize: 24,
							}}
						>
							<Text style={{ color: highlightColor }}>
								Cadastre
							</Text>{' '}
							seus aparelhos!
						</ThemedText>
						<View style={{ flexDirection: 'row' }}>
							<ThemedText style={{ color: '#666' }}>
								Descubra o{' '}
								<ThemedText style={{ color: '#FF6B00', fontFamily: 'Inter_500Medium' }}>
									consumo
								</ThemedText>{' '}
								de cada equipamento e veja como{' '}
								<ThemedText style={{ color: '#FF6B00', fontFamily: 'Inter_500Medium' }}>
									economizar energia
								</ThemedText>{' '}
								de forma inteligente!
							</ThemedText>
						</View>
						<Feather
							name='arrow-right'
							size={24}
							color={highlightColor}
						/>
					</ThemedView>
				</Pressable>

				<View style={styles.divider}>
					<View style={styles.dividerLine} />
				</View>

				<View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 20,
						}}
					>
						<ThemedText type='title' style={{ fontSize: 20, alignSelf: 'center' }}>
							Consumo Geral
						</ThemedText>
						<SelectList
							onSelect={() => recalculateConsumption(selectedConsumptionTimespan)}
							setSelected={setSelectedConsumptionTimespan}
							data={[
								{ key: 'hourly', value: 'Horário' },
								{ key: 'daily', value: 'Diário' },
								{ key: 'monthly', value: 'Mensal' },
								{ key: 'annualy', value: 'Anual' },
							]}
							defaultOption={{ key: 'monthly', value: 'Mensal' }}
							placeholder='Mensal'
							save="key"
							search={false}
							fontFamily='Outfit_500Medium'
							boxStyles={{
								borderWidth: StyleSheet.hairlineWidth,
								borderColor,
								backgroundColor: '#fff',
								borderRadius: 10,
								paddingVertical: 5,
								paddingHorizontal: 10,
								minWidth: 100,
							}}
							inputStyles={{
								fontSize: 14,
								lineHeight: 22,
							}}
							dropdownStyles={{
								borderWidth: StyleSheet.hairlineWidth,
								borderColor,
								backgroundColor: '#fff',
								position: 'absolute',
								top: 25,
								width: 100,
								zIndex: 10
							}}

						/>
					</View>

					<View style={{ alignItems: 'center', marginTop: 20, width: '100%', height: 230, marginHorizontal: 'auto' }}>
						<UsageDisplay consumption={consumption} />
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%',
							marginTop: 30,
							paddingHorizontal: 10,

						}}
					>
						<View style={{
							alignItems: 'center',
							backgroundColor: '#fff',
							borderColor,
							borderWidth: StyleSheet.hairlineWidth,
							borderRadius: 10,
							padding: 10,
							paddingVertical: 15,
							width: 175,
						}}>
							<ThemedText
								type='title'
								style={{
									color: '#FF6B00',
									marginBottom: 5,
									fontSize: 18,
								}}
							>
								Aparelhos
							</ThemedText>
							<ThemedText
								type='defaultSemiBold'
								style={{ fontSize: 20 }}
							>
								{equipment.length}
							</ThemedText>
						</View>
						<View style={{
							alignItems: 'center',
							backgroundColor: '#fff',
							borderColor,
							borderWidth: StyleSheet.hairlineWidth,
							borderRadius: 10,
							padding: 10,
							paddingVertical: 15,
							width: 175
						}}>
							<ThemedText
								type='title'
								style={{
									color: '#FF6B00',
									marginBottom: 5,
									fontSize: 18,
								}}
							>
								Custo aproximado
							</ThemedText>
							<ThemedText
								type='defaultSemiBold'
								style={{ fontSize: 20 }}
							>
								R${((consumption ?? 0) / 1000 * kWHPrice.elektro).toFixed(2)}
							</ThemedText>
						</View>
					</View>
				</View>
			</ScrollView>
		</TabPageContainer>
	);
};

export default Home;

const styles = StyleSheet.create({
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
});