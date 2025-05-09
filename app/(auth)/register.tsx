import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { PageContainer } from '@/components/PageContainer';
import StackPageHeader from '@/components/StackPageHeader';
import { ThemedSafeView } from '@/components/ThemedSafeView';
import { ThemedText } from '@/components/ThemedText';

import { APPLIANCES } from '@/constants/Appliance';

const Page = () => {
	const router = useRouter();

	return (
		<ThemedSafeView style={{ flex: 1, backgroundColor: '#F2F2F5' }}>
			<PageContainer>
				<StackPageHeader title='Registrar' />
				<View
					style={{
						flex: 1,
						display: 'flex',
						gap: 20,
						paddingTop: 20,
					}}
				>
					<ThemedText
						type='default'
						style={{ fontSize: 16, textAlign: 'center' }}
					>
						Selecione o tipo do eletrodoméstico.
					</ThemedText>
					<ScrollView style={{ flex: 1 }}>
						{APPLIANCES.map((appliance) => (
							<Button
								key={appliance.type}
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
								onPress={() =>
									router.push(
										`/(auth)/appliance/${appliance.type}`,
									)
								}
								icon={appliance.icon({
									style: {
										position: 'absolute',
										left: 20,
									},
								})}
								text={appliance.name}
								textType='subtitle'
								textProps={{
									style: {
										fontSize: 18,
										textAlign: 'center',
										width: 'auto',
									},
								}}
								type='secondary'
							/>
						))}
					</ScrollView>
				</View>
			</PageContainer>
		</ThemedSafeView>
	);
};

export default Page;
