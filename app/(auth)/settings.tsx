import { SafeAreaView, View } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import SafeView from '@/components/SafeView';
import StackPageHeader from '@/components/StackPageHeader';

const Page = () => {
	return (
		<SafeView style={{ flex: 1, backgroundColor: '#F2F2F5' }}>
			<PageContainer>
				<StackPageHeader title='Settings' />
			</PageContainer>
		</SafeView>
	);
};

export default Page;
