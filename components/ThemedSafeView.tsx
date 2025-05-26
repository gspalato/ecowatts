import React from 'react';
import { type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import SafeView from './SafeView';

export type ThemedSafeViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedSafeView({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedSafeViewProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background',
	);

	return <SafeView style={[{ backgroundColor }, style]} {...otherProps} />;
}
