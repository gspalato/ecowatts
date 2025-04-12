import { SafeAreaView, View } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import StackPageHeader from '@/components/StackPageHeader';

const Page = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<PageContainer>
				<StackPageHeader title='User' />
			</PageContainer>
		</SafeAreaView>
	);
};

export default Page;
