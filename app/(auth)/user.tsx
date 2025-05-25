import { SafeAreaView, View } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import SafeView from '@/components/SafeView';
import StackPageHeader from '@/components/StackPageHeader';
import React from 'react';

const Page = () => {
	return (
		<SafeView style={{ flex: 1 }}>
			<PageContainer>
				<StackPageHeader title='Usuário' />
			</PageContainer>
		</SafeView>
	);
};

export default Page;
