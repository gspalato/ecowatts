import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { useColorScheme } from '@/hooks/useColorScheme';

import { Colors } from '@/constants/Colors';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='(tabs)' />
			<Stack.Screen
				name='graph'
				options={{
					title: 'Graph',
				}}
			/>
			<Stack.Screen
				name='user'
				options={{
					title: 'User',
				}}
			/>
			<Stack.Screen
				name='settings'
				options={{
					title: 'Settings',
				}}
			/>
		</Stack>
	);
}
