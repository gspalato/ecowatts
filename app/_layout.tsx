import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { ProfileProvider } from '@/lib/profile';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView>
			<ProfileProvider>
				<ThemeProvider value={DefaultTheme}>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen
							name='(stack)'
							options={{ headerShown: false }}
						/>
						<Stack.Screen name='+not-found' />
					</Stack>
					<StatusBar style='dark' />
				</ThemeProvider>
			</ProfileProvider>
		</GestureHandlerRootView>
	);
}
