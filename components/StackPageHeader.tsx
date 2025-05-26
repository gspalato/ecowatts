import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React, { ComponentProps } from 'react';
import { StyleProp, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import HeaderContainer from './HeaderContainer';
import { IconButton } from './IconButton';
import { ThemedText } from './ThemedText';

type Props = {
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	textProps?: ComponentProps<typeof ThemedText>;
	title: string;
} & ViewProps;

const Component: React.FC<Props> = (props) => {
	const { children, style, textStyle, title, textProps, ...viewProps } =
		props;

	const router = useRouter();

	return (
		<HeaderContainer {...viewProps}>
			<IconButton
				size={35}
				onPress={() => router.back()}
				style={{ position: 'absolute', left: 0 }}
			>
				<Entypo name='chevron-left' size={24} color='black' />
			</IconButton>

			<ThemedText type='title'>{title}</ThemedText>
		</HeaderContainer>
	);
};
Component.displayName = 'StackPageHeader';

export default Component;
