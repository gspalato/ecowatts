import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

import { Colors } from '@/constants/Colors';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const colors = useTheme().colors;
	const highlightColor = useThemeColor({}, 'highlightColor');

	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: highlightColor,
				tabBarStyle: {
					position: 'absolute',
					height: 'auto',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					paddingVertical: 0,
					paddingBottom: 5,
					borderTopWidth: 0,
					borderWidth: 0,
					borderRadius: 20,
					marginHorizontal: insets.bottom,
					marginBottom: insets.bottom,
					borderCurve: 'continuous',
				},
				tabBarLabelStyle: {
					marginBottom: 0,
					fontFamily: 'Outfit_500Medium',
				},
				tabBarBackground: () => (
					<BlurView
						tint='light'
						intensity={100}
						style={[
							StyleSheet.absoluteFill,
							{
								borderWidth: StyleSheet.hairlineWidth,
								borderColor: colors.border,
								borderRadius: 20,
								overflow: 'hidden',
								borderCurve: 'continuous',
							},
						]}
					/>
				),
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='home' size={20} color={color} />
					),
				}}
			/>
			{/*
			<Tabs.Screen
				name='register'
				options={{
					title: 'Register',
					tabBarIcon: ({ color }) => (
						<FontAwesome
							name='plus-square'
							size={20}
							color={color}
						/>
					),
				}}
			/>
			*/}
			<Tabs.Screen
				name='appliances'
				options={{
					title: 'Appliances',
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name='plug' size={20} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='tips'
				options={{
					title: 'Tips',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name='lightbulb'
							size={20}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
