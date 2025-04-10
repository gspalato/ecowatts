import { SafeAreaView, View } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import { TabPageContainer } from '@/components/TabPageContainer';

const Page = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TabPageContainer style={{ flex: 1 }}></TabPageContainer>
		</SafeAreaView>
	);
};

export default Page;
