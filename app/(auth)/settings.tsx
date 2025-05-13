import { SafeAreaView, TextInput, View, StyleSheet } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import SafeView from '@/components/SafeView';
import StackPageHeader from '@/components/StackPageHeader';
import HeaderContainer from '@/components/HeaderContainer'
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { IconButton } from '@/components/IconButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

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

})