import React, { useMemo } from 'react';
import { Platform, StatusBar, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = ViewProps;

const Component: React.FC<Props> = (props) => {
	const { children, style, ...rest } = props;

	const isAndroid = Platform.OS === 'android';
	const insets = useSafeAreaInsets();
	const marginTop = useMemo(
		() => (isAndroid ? StatusBar.currentHeight : insets.top),
		[],
	);
	const marginBottom = insets.bottom;

	return (
		<View style={[{ marginTop, marginBottom }, style]} {...rest}>
			{children}
		</View>
	);
};
Component.displayName = 'SafeView';

export default Component;
