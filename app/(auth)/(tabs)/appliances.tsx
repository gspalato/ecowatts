import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, FlatList, ListRenderItemInfo, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
	SharedValue,
	useAnimatedStyle,
	SequencedTransition
} from 'react-native-reanimated';

import HeaderContainer from '@/components/HeaderContainer';
import { IconButton } from '@/components/IconButton';
import { PageContainer } from '@/components/PageContainer';
import { TabPageContainer } from '@/components/TabPageContainer';
import { ThemedText } from '@/components/ThemedText';
import { deleteEquipment, getAllEquipment } from '@/lib/supabase';
import { calculateApplicanceConsumption, formatWattHours } from '@/lib/inmetro';
import { Database } from '@/database.types';
import { useThemeColor } from '@/hooks/useThemeColor';

type ApplianceType = Database["public"]["Tables"]["equipment"]["Row"];
type HydratedApplianceType = Database["public"]["Tables"]["equipment"]["Row"] & {
	consumption: number;
};

const rowTranslateAnimatedValues: { [key: string]: any } = {};

const Page = () => {
	const router = useRouter();
	const colors = useTheme().colors;

	const backgroundColor = useThemeColor({}, 'background');

	const [refreshing, setRefreshing] = useState(false);

	const [appliances, setAppliances] = useState<ApplianceType[]>([]);
	const fetchData = async () => {
		setRefreshing(true);

		const appliances = await getAllEquipment();
		setAppliances(appliances);

		appliances.forEach((appliance) => {
			rowTranslateAnimatedValues[appliance.id] = new Animated.Value(1);
		});

		setRefreshing(false);
	};
	useEffect(() => {
		fetchData();
	}, []);

	const isAnimationRunning = useRef<{ [key: string]: boolean }>({});

	const deleteSelectedEquipement = async (id: ApplianceType["id"]) => {
		console.log('trying to delete equipment with id:', id);

		try {
			const success = await deleteEquipment(id);
			if (!success) {
				Alert.alert('Erro ao deletar o aparelho.');
				return false;
			}

			return true;
		} catch (error) {
			console.error('Error deleting appliance:', error);
			Alert.alert('Erro ao deletar o aparelho.');
			return false;
		}
	};

	return (
		<TabPageContainer style={{ flex: 1 }}>
			<HeaderContainer>
				<ThemedText type='title'>Aparelhos</ThemedText>
				<IconButton
					size={35}
					onPress={() => router.push('/(auth)/register')}
					style={{ position: 'absolute', right: 0 }}
				>
					<Entypo name='plus' size={20} color='black' />
				</IconButton>
			</HeaderContainer>
			<Reanimated.FlatList
				itemLayoutAnimation={SequencedTransition}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={fetchData} />
				}
				data={appliances.map(app => ({ ...app, consumption: calculateApplicanceConsumption(app, 'daily') })) as HydratedApplianceType[]}
				renderItem={(item: ListRenderItemInfo<HydratedApplianceType>) => (
					<Swipeable
						key={item.item.id}
						containerStyle={[
							{
								width: '100%',
								//height: 150,
								padding: 20,
								borderRadius: 0,
								marginBottom: 10,
								backgroundColor: backgroundColor,
								borderBottomWidth: 1,
								borderColor: colors.border,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
								gap: 5,
							},
						]}
						rightThreshold={40}
						enableTrackpadTwoFingerGesture
						renderRightActions={(prog: SharedValue<number>, drag: SharedValue<number>) => {
							const styleAnimation = useAnimatedStyle(() => {
								return {
									transform: [{ translateX: drag.value + 50 }],
								};
							});

							return (
								<Reanimated.View style={[styleAnimation, styles.rightAction]}>
									<Pressable
										style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
										onPress={async () => {
											const success = await deleteSelectedEquipement(item.item.id);
											if (success) {
												setAppliances((prev) => prev.filter((appliance) => appliance.id !== item.item.id));
											}
										}}>
										<ThemedText
											type='default'
											style={{
												color: 'white',
												fontSize: 14,
												textAlign: 'center',
												lineHeight: 50,
												padding: 2,
												verticalAlign: 'middle',
											}}>
											Excluir
										</ThemedText>
									</Pressable>
								</Reanimated.View>
							);
						}}>

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
									{formatWattHours(item.item.consumption)}
								</Text>
								.
							</ThemedText>
						</View>
					</Swipeable>
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ marginTop: 20 }}
			/>
		</TabPageContainer>
	);
};

export default Page;

const styles = StyleSheet.create({
	rightAction: {
		width: 50, height: '100%', backgroundColor: 'red'
	},
})
