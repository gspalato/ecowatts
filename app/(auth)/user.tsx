import { SafeAreaView, View } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import SafeView from '@/components/SafeView';
import StackPageHeader from '@/components/StackPageHeader';

const Page = () => {
	return (
		<SafeView style={{ flex: 1 }}>
			<PageContainer>
				<StackPageHeader title='User' />
			</PageContainer>
		</SafeView>
	);
};

export default Page;
