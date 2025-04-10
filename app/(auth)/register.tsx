import { SafeAreaView, View } from 'react-native';

import { TabPageContainer } from '@/components/TabPageContainer';

const Page = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TabPageContainer style={{ flex: 1 }}></TabPageContainer>
		</SafeAreaView>
	);
};

export default Page;
