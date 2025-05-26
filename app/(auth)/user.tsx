import React from 'react';

import { PageContainer } from '@/components/PageContainer';
import SafeView from '@/components/SafeView';
import StackPageHeader from '@/components/StackPageHeader';

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
