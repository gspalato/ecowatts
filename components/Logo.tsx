import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

type Props = {
	className?: string;
	style?: StyleProp<TextStyle>;
} & React.PropsWithChildren;

const Component: React.FC<Props> = (props) => {
	const { children, className, style } = props;

	const highlightColor = useThemeColor({}, 'highlightColor');

	return (
		<ThemedText
			type='title'
			style={[
				{
					padding: 1,
					textAlignVertical: 'center',
					fontFamily: 'Outfit_700Bold',
					letterSpacing: -1,
				},
				style,
			]}
		>
			<Text style={{ color: highlightColor }}>Eco</Text>Watts.
		</ThemedText>
	);
};
Component.displayName = 'Logo';

export default Component;
