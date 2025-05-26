import { useTheme } from '@react-navigation/native';
import {
	Blur,
	Canvas,
	Circle,
	Fill,
	Group,
	LinearGradient,
	processTransform3d,
	RadialGradient,
	RoundedRect,
	Shadow,
	Skia,
	Text as SkiaText,
	toMatrix3,
	useFont,
	vec,
} from '@shopify/react-native-skia';
import { PropsWithChildren, useCallback } from 'react';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
	Extrapolation,
	interpolate,
	SensorType,
	useAnimatedSensor,
	useDerivedValue,
} from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/useThemeColor';

const SquareSize = 170;

export const Perspective: React.FC<{
	canvasSize: { width: number; height: number };
	render: (light: React.ReactNode) => React.ReactNode | undefined;
}> = (props) => {
	const { render, canvasSize } = props;

	const backgroundColor = useThemeColor({}, 'background');

	const CanvasCenter = vec(canvasSize.width / 2, canvasSize.height / 2);

	const deviceRotation = useAnimatedSensor(SensorType.ROTATION, {
		interval: 1 / 120,
	});

	const rotateY = useDerivedValue(() => {
		const { roll } = deviceRotation.sensor.value;

		return interpolate(
			roll,
			[-Math.PI, Math.PI],
			[(40 * Math.PI) / 180, (-40 * Math.PI) / 180],
			Extrapolation.CLAMP,
		);
	});

	const lightY = useDerivedValue(() => {
		const { pitch } = deviceRotation.sensor.value;

		return interpolate(pitch, [-Math.PI, Math.PI], [-500 * 2, 500 * 2]);
	});

	const rotateX = useDerivedValue(() => {
		const { pitch } = deviceRotation.sensor.value;

		return interpolate(
			pitch,
			[-Math.PI, Math.PI],
			[(40 * Math.PI) / 180, (-40 * Math.PI) / 180],
			Extrapolation.CLAMP,
		);
	});

	const lightX = useDerivedValue(() => {
		const { roll } = deviceRotation.sensor.value;

		return interpolate(roll, [-Math.PI, Math.PI], [-500 * 2, 500 * 2]);
	});

	const rTransform = useDerivedValue(() => {
		return [
			{ perspective: 300 },
			{ rotateY: rotateY.value },
			{ rotateX: rotateX.value },
		];
	});

	const lightTransform = useDerivedValue(
		() => [{ translateX: lightX.value }, { translateY: lightY.value }],
		[lightX, lightY],
	);

	const transformMatrix = useDerivedValue(() => {
		const mat3 = toMatrix3(
			processTransform3d([
				{ perspective: 300 },
				{ rotateY: rotateY.value },
				{ rotateX: rotateX.value },
			]),
		);

		return Skia.Matrix(mat3);
	}, [rotateX, rotateY]);

	const lightXOrigin = canvasSize.width / 2;
	const lightYOrigin = canvasSize.height / 2;

	const light = (
		<Group
			origin={vec(lightXOrigin, lightYOrigin)}
			transform={lightTransform}
			blendMode='plus'
		>
			<Circle cy={lightYOrigin} cx={lightXOrigin} r={20}>
				<RadialGradient
					c={vec(lightXOrigin, lightYOrigin)}
					r={20}
					mode='clamp'
					colors={[
						'rgba(255,255,255,0.1)',
						'rgba(255,255,255,0.005)',
					]}
				/>
			</Circle>
		</Group>
	);

	return (
		<View style={styles.fill}>
			<View style={styles.container}>
				<Canvas
					style={{
						height: canvasSize.height,
						width: canvasSize.width,
					}}
				>
					<Group origin={CanvasCenter} matrix={transformMatrix}>
						{render(light)}
					</Group>
				</Canvas>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	fill: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
