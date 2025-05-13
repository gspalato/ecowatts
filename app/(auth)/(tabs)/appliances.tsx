import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

import HeaderContainer from '@/components/HeaderContainer';
import { IconButton } from '@/components/IconButton';
import { PageContainer } from '@/components/PageContainer';
import { TabPageContainer } from '@/components/TabPageContainer';
import { ThemedText } from '@/components/ThemedText';
import { getAllEquipment } from '@/lib/supabase';
import { calculateApplicanceConsumption } from '@/lib/inmetro';

const Page = () => {
	const router = useRouter();
	const colors = useTheme().colors;

	const [appliances, setAppliances] = useState<any[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const appliances = await getAllEquipment();
			setAppliances(appliances);
		};

		fetchData();
	});

	return (
		<TabPageContainer style={{ flex: 1 }}>
			<HeaderContainer>
				<ThemedText type='title'>Appliances</ThemedText>
				<IconButton
					size={35}
					onPress={() => router.push('/(auth)/register')}
					style={{ position: 'absolute', right: 0 }}
				>
					<Entypo name='plus' size={20} color='black' />
				</IconButton>
			</HeaderContainer>
			<FlatList
				data={appliances.map(app => ({ ...app, consumption: calculateApplicanceConsumption(app, 'daily') }))}
				renderItem={(item) => (
					<View
						style={{
							width: '100%',
							//height: 150,
							padding: 20,
							borderRadius: 0,
							marginBottom: 10,
							borderBottomWidth: 1,
							borderColor: colors.border,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column',
							gap: 5,
						}}
					>
						<View
							style={{
								display: 'flex',
								gap: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<ThemedText
								type='subtitle'
								style={{ fontSize: 25, letterSpacing: -0.5 }}
							>
								{item.item.name}
							</ThemedText>
							<View style={{}}>
								<ThemedText
									type='defaultSemiBold'
									style={{ color: '#777' }}
								>
									{item.item.location || 'Local Indefinido'}
								</ThemedText>
							</View>
						</View>
						<View
							style={{
								display: 'flex',
								gap: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<ThemedText type='small' style={{ maxWidth: '35%' }}>
								{item.item.brand} {item.item.model}
							</ThemedText>
							<ThemedText type='small'>
								Gasto diário estimado de{' '}
								<Text
									style={{ fontFamily: 'Inter_600SemiBold' }}
								>
									{`${item.item.consumption.toFixed(2)}kWh` || '0kWh'}
								</Text>
								.
							</ThemedText>
						</View>
					</View>
				)}
				keyExtractor={(item, index) => index.toString()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ marginTop: 20 }}
			/>
		</TabPageContainer>
	);
};

export default Page;
