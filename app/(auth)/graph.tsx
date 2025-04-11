import { SafeAreaView, View } from 'react-native';

import { PageContainer } from '@/components/PageContainer';
import StackPageHeader from '@/components/StackPageHeader';

const Page = () => {
	return (
		<SafeAreaView>
			<PageContainer>
				<StackPageHeader title='Graph' />
			</PageContainer>
		</SafeAreaView>
	);
};

export default Page;
