import { SafeAreaView, TextInput, View, StyleSheet, FlatList } from 'react-native';
import SafeView from '@/components/SafeView';

import { PageContainer } from '@/components/PageContainer';
import HeaderContainer from '@/components/HeaderContainer'
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { IconButton } from '@/components/IconButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '@/components/Button';

const Page = () => {
	return (
		<SafeView style={{ flex: 1, backgroundColor: '#F2F2F5' }}>
			<PageContainer>
				<HeaderContainer style={{ marginBottom: 20 }}>
					<IconButton
						size={35}
						style={{ position: 'absolute', left: 0 }}
					>
						<AntDesign name="arrowleft" size={24} color="black" />
					</IconButton>
					<ThemedText type="title" style={{ height: '100%' }}>Settings</ThemedText>
				</HeaderContainer>
				<View style={styles.searchContainer}>
					<View style={styles.searchInputContainer}>
						<Ionicons
							name='search'
							size={20}
							color='#ccc'
						/>
						<TextInput
							style={styles.searchInput}
							placeholder={`Procure por um configuração`}
						>
						</TextInput>
					</View>
				</View>
				<FlatList 
					data={[
						{
							id: 1,
							text: 'Aparência',
							icon: 'eye-outline'
						},
						{
							id: 2,
							text: 'Sobre',
							icon: 'information-circle-outline'
						},
						{
							id: 3,
							text: 'Ajuda & Suporte',
							icon: 'headset',
						},
					]}

					renderItem={({item}) => (
						<View style={styles.settingContainer}>
							<View style={styles.buttonSetting}>
								<View style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									gap: 10,
								}}>
									<Ionicons name={item.icon as any} size={24} color="#FF6B00" />
									<ThemedText type='default' style={{ color: '#363841' }}>
										{item.text}
									</ThemedText>
								</View>
								<View style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}>
									<Ionicons name="arrow-forward-outline" size={18} color="#6A6C79" />
								</View>
							</View>
						</View>
					)}
				/>
				<View style={{
					width: '100%',
					position: 'absolute',
					bottom: 0,
				}}>
					<Button 
						text='Sair'
						textType='default'
						style={{
							width: '100%',
							height: 50,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#FF6B00',
							borderRadius: 10,
						}}
						textProps={{
							style: {
								fontSize: 18,
							}
						}}
					/>
				</View>
			</PageContainer>
		</SafeView>
	);
};

export default Page;

const styles = StyleSheet.create({
	searchContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 16,
		marginBottom: 50,
	},
	searchInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 6,
		borderWidth: 1,
		borderColor: '#E5E5EA',
		gap: 5,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: '#1C1C1E',
	},

	settingContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonSetting: {
		width: '100%',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderColor: 'rgba(105, 105, 105, 0.2)',
		marginBottom: 10,
	},
})	