import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Sizes } from '@/constants/Sizes';

type Props = ViewProps;

export const TabPageContainer: React.FC<Props> = (props) => {
	const { children, style, ...rest } = props;

	const tabBarHeight = useBottomTabBarHeight();
	const insets = useSafeAreaInsets();
	const statusBarHeight = insets.top;

	return (
		<View
			style={[
				{
					flex: 1,
					paddingTop: statusBarHeight,
					paddingBottom: tabBarHeight,
				},
				styles.container,
				style,
			]}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		margin: 10,
		marginHorizontal: Sizes.horizontalSpacingFromScreen,
		flex: 1,
	},
});
