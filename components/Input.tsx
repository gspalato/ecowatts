import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

type Props = TextInputProps;

export const Input: React.FC<Props> = (props) => {
	const { ...rest } = props;

	return (
		<TextInput
			style={[styles.input]}
			placeholderTextColor='#bbb'
			{...rest}
		></TextInput>
	);
};

const styles = StyleSheet.create({
	input: {
		fontSize: 16,
		color: '#000000',
		borderWidth: 1,
		fontFamily: 'Outfit_400Regular',

		backgroundColor: '#F2F2F7',
		borderRadius: 8,
		padding: 12,
		borderColor: '#E5E5EA',
	},
});
