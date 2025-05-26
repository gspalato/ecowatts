import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Pressable, PressableProps } from 'react-native-gesture-handler';

type Props = PressableProps & { size?: number };

export const IconButton: React.FC<Props> = (props) => {
	const { children, size = 30, style: containerStyle, ...rest } = props;

	const colors = useTheme().colors;

	return (
		<Pressable
			style={({ pressed }) =>
				[
					styles.container,
					containerStyle,
					{ borderColor: colors.border, height: size, width: size },
					pressed && styles.pressed,
				] as any
			}
			{...rest}
		>
			{children}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 100,
		backgroundColor: '#fff',
	},
	pressed: {
		opacity: 0.5,
	},
});
