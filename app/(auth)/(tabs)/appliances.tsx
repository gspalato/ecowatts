import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import HeaderContainer from '@/components/HeaderContainer';
import { IconButton } from '@/components/IconButton';
import { PageContainer } from '@/components/PageContainer';
import { TabPageContainer } from '@/components/TabPageContainer';
import { ThemedText } from '@/components/ThemedText';

const Page = () => {
	const router = useRouter();
	const colors = useTheme().colors;

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
				data={[
					{
						id: 1,
						name: 'Geladeira',
						location: 'Cozinha',
						brand: 'Eletrolux',
						model: 'IM7S',
						consumption: '',
					},
					{
						id: 2,
						name: 'Televisão',
						location: 'Sala de estar',
						brand: 'Samsung',
						model: 'QN65QN800BGXZD',
						consumption: '',
					},
				]}
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
									{item.item.location}
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
							<ThemedText type='small'>
								{item.item.brand} {item.item.model}
							</ThemedText>
							<ThemedText type='default'>
								Gasto diário estimado de {item.item.consumption}
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
