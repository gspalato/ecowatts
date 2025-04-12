import { SafeAreaView, View } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import StackPageHeader from '@/components/StackPageHeader';

const Page = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F5' }}>
			<PageContainer>
				<StackPageHeader title='Settings' />
			</PageContainer>
		</SafeAreaView>
	);
};

export default Page;
