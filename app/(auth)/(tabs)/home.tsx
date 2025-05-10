import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-gifted-charts';

import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import Logo from '@/components/Logo';
import { TabPageContainer } from '@/components/TabPageContainer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useThemeColor } from '@/hooks/useThemeColor';

const Home = () => {
	const router = useRouter();

	const backgroundColor = useThemeColor({}, 'background');
	const highlightColor = useThemeColor({}, 'highlightColor');
	const borderColor = useThemeColor({}, 'borderColor');

	const [selectedConsumptionTimespan, setSelectedConsumptionTimespan] =
		useState('monthly');

	const exampleData = [
		{
			value: 47,

			color: highlightColor,
			gradientCenterColor: highlightColor,
		},

		{ value: 40, color: '#fff', gradientCenterColor: '#fff' },
	];

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
			<View
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
							marginBottom: 30,
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
								<ThemedText style={{ color: '#FF6B00' }}>
									consumo
								</ThemedText>{' '}
								de cada equipamento e veja como{' '}
								<ThemedText style={{ color: '#FF6B00' }}>
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

				<View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 20,
						}}
					>
						<ThemedText type='title' style={{ fontSize: 20 }}>
							Consumo Geral
						</ThemedText>
						<View
							style={{
								backgroundColor: '#fff',
								padding: 7,
								borderRadius: 10,
								minWidth: 90,
								alignItems: 'center',
								borderColor,
								borderWidth: StyleSheet.hairlineWidth,
							}}
						>
							<ThemedText>Mensal</ThemedText>
						</View>
					</View>

					<View style={{ alignItems: 'center', marginTop: 20 }}>
						<PieChart
							data={exampleData}
							donut
							showGradient
							radius={90}
							innerRadius={70}
							innerCircleColor={backgroundColor}
							strokeWidth={StyleSheet.hairlineWidth}
							strokeColor={borderColor}
							centerLabelComponent={() => {
								return (
									<View
										style={{
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<ThemedText
											type='title'
											style={{
												fontSize: 22,
											}}
										>
											15.000Wh
										</ThemedText>
									</View>
								);
							}}
						/>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%',
							marginTop: 30,
							paddingHorizontal: 20,
						}}
					>
						<View style={{ alignItems: 'center' }}>
							<ThemedText
								type='title'
								style={{
									color: '#FF6B00',
									marginBottom: 5,
									fontSize: 18,
								}}
							>
								Aparelhos cadastrados
							</ThemedText>
							<ThemedText
								type='defaultSemiBold'
								style={{ fontSize: 20 }}
							>
								02
							</ThemedText>
						</View>
						<View style={{ alignItems: 'center' }}>
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
								R$ 9,00
							</ThemedText>
						</View>
					</View>
				</View>
			</View>
		</TabPageContainer>
	);
};

export default Home;
