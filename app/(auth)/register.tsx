import { SafeAreaView, View } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import StackPageHeader from '@/components/StackPageHeader';
import { TabPageContainer } from '@/components/TabPageContainer';

const Page = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<PageContainer style={{ flex: 1 }}>
				<StackPageHeader title='Graph' />
			</PageContainer>
		</SafeAreaView>
	);
};

export default Page;
