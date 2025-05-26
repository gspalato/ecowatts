import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_900Black,
} from '@expo-google-fonts/inter';
import {
	Outfit_400Regular,
	Outfit_500Medium,
	Outfit_700Bold,
} from '@expo-google-fonts/outfit';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProfileProvider } from '@/lib/profile';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_900Black,

		Outfit_400Regular,
		Outfit_500Medium,
		Outfit_700Bold,
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView>
				<ProfileProvider>
					<ThemeProvider value={DefaultTheme}>
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen
								name='(auth)'
								options={{ headerShown: false }}
							/>
							<Stack.Screen name='+not-found' />
						</Stack>
						<StatusBar style='dark' />
					</ThemeProvider>
				</ProfileProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
