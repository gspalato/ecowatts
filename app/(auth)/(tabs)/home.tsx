import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import Logo from '@/components/Logo';
import { TabPageContainer } from '@/components/TabPageContainer';
import { ThemedText } from '@/components/ThemedText';

const Home = () => {
	const router = useRouter();

	return (
		<TabPageContainer
			style={{
				flex: 1,
			}}
			contentContainerStyle={{
				display: 'flex',
				gap: 20,
			}}
		>
			<View
				style={{
					display: 'flex',
					width: '100%',
					height: 40,
					paddingVertical: 5,
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row',
				}}
			>
				<Logo />
				<View
					style={{
						display: 'flex',
						gap: 5,
						flexDirection: 'row',
						alignItems: 'center',
						width: 'auto',
					}}
				>
					<IconButton
						size={35}
						onPress={() => router.push('/(auth)/graph')}
					>
						<FontAwesome6
							name='chart-simple'
							size={15}
							color='black'
						/>
					</IconButton>
					<IconButton
						size={35}
						onPress={() => router.push('/(auth)/user')}
					>
						<FontAwesome5 name='user-alt' size={15} color='black' />
					</IconButton>
					<IconButton
						size={35}
						onPress={() => router.push('/(auth)/settings')}
					>
						<FontAwesome5 name='cog' size={15} color='black' />
					</IconButton>
				</View>
			</View>
			<View
				style={{
					borderRadius: 10,
					flex: 1,
					height: '100%',
					width: '100%',
				}}
			>
				<ThemedText>blablabla</ThemedText>
			</View>
		</TabPageContainer>
	);
};

export default Home;
