import { Dimensions, StyleSheet, View } from 'react-native';
import {
    useAnimatedSensor,
    SensorType,
    interpolate,
    Extrapolation,
    useDerivedValue,
} from 'react-native-reanimated';
import {
    Blur,
    Canvas,
    Fill,
    Group,
    LinearGradient,
    RadialGradient,
    RoundedRect,
    Shadow,
    vec,
    Text as SkiaText,
    useFont,
} from '@shopify/react-native-skia';
import { PropsWithChildren, useCallback } from 'react';

import React from 'react';

const SquareSize = 170;

export const Perspective: React.FC<{ canvasSize: { width: number, height: number } } & PropsWithChildren> = (props) => {
    const { children, canvasSize } = props;

    const CanvasCenter = vec(canvasSize.width / 2, canvasSize.height / 2);

    const deviceRotation = useAnimatedSensor(SensorType.ROTATION, {
        interval: 1 / 120,
    });

    const rotateY = useDerivedValue(() => {
        const { roll } = deviceRotation.sensor.value;

        return interpolate(
            roll,
            [-1, 0, 1],
            [Math.PI / 8, 0, -Math.PI / 8],
            Extrapolation.CLAMP,
        );
    });

    const rotationGravity = useAnimatedSensor(SensorType.GRAVITY, {
        interval: 1 / 120,
    });

    const rotateX = useDerivedValue(() => {
        const { z } = rotationGravity.sensor.value;

        return interpolate(
            z,
            [-10, -6, -1],
            [-Math.PI / 8, 0, Math.PI / 8],
            Extrapolation.CLAMP,
        );
    });

    const rTransform = useDerivedValue(() => {
        return [
            { perspective: 300 },
            { rotateY: -rotateY.value },
            { rotateX: rotateX.value },
        ];
    });

    const shadowDx = useDerivedValue(() => {
        return interpolate(
            rotateY.value,
            [-Math.PI / 8, 0, Math.PI / 8],
            [10, 0, -10],
            Extrapolation.CLAMP,
        );
    });

    const shadowDy = useDerivedValue(() => {
        return interpolate(
            rotateX.value,
            [-Math.PI / 8, 0, Math.PI / 8],
            // Exception instead of (-10 use 7) that's because the "light source" is on the top
            [7, 0, 10],
            Extrapolation.CLAMP,
        );
    });

    const GoodOldSquare = useCallback(
        ({ children }: { children?: React.ReactNode }) => {
            return (
                <RoundedRect
                    x={canvasSize.width / 2 - SquareSize / 2}
                    y={canvasSize.height / 2 - SquareSize / 2}
                    width={SquareSize}
                    height={SquareSize}
                    color="#10101044"
                    r={35}>
                    {children}
                </RoundedRect>
            );
        },
        [],
    );

    return (
        <View style={styles.fill}>
            <View style={styles.container}>
                <Canvas
                    style={{
                        height: canvasSize.height,
                        width: canvasSize.width,
                    }}>
                    <Group origin={CanvasCenter} transform={rTransform}>
                        {children}
                        {/*
                        <Group>
                            <GoodOldSquare>
                                {children}
                            </GoodOldSquare>
                            
                            <Shadow color="#4c4c4c" inner blur={0} dx={0} dy={0.8} />
                            <Shadow color="#000000" blur={3.5} dx={shadowDx} dy={shadowDy} />
                        </Group>
                        */}
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