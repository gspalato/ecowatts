import "react";
import { Perspective } from "./Perspective";
import { useEffect, useState } from "react";

import {
    Rect,
    Skia,
    vec,
    RadialGradient,
    useFont,
    Text as SkiaText,
    Fill,
    Mask,
    interpolate,
    Turbulence,
    DisplacementMap,
    useClock,
    Shader,
    Blend,
} from "@shopify/react-native-skia";
import React from "react";
import { formatWattHours } from "@/lib/inmetro";
import { Easing, Extrapolation, interpolateColor, useDerivedValue, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hexToRGB } from "@/lib/utils";

const shader = Skia.RuntimeEffect.Make(`
// turbulence_displace.sksl

uniform float2 resolution;
uniform float time;
uniform float turbulenceFactor;
uniform shader gradientShader; // The radial gradient shader passed in

const float PI = 3.14159265359;
const float TWO_PI = 6.28318530718;

// Simple random function
float random(in float2 st) {
    return fract(sin(dot(st.xy, float2(12.9898, 78.233))) * 43758.54531237);
}

// Smooth noise based on random
float noise(in float2 st) {
    float2 i = floor(st);
    float2 f = fract(st);

    float a = random(i);
    float b = random(i + float2(1.0, 0.0));
    float c = random(i + float2(0.0, 1.0));
    float d = random(i + float2(1.0, 1.0));

    float2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

const int NUM_OCTAVES = 5;

float fbm(in float2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float2 shift = float2(20.0, 20.0);
    float2x2 rot = float2x2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; i++) {
        value += amplitude * noise(st);
        st = rot * (st * 2.2) + shift;
        amplitude *= 0.5;
    }
    return value;
}

half4 main(float2 fragCoord) {
    // Normalize UV coords to [0,1]
    float2 uv = fragCoord / resolution;

    // Center UV around 0
    float2 centeredUV = uv - 0.5;

    // Scale up coordinates for turbulence detail
    float2 st = centeredUV * 3.5;

    // Compute turbulence displacement vector
    float2 displacement;
    displacement.x = fbm(st + float2(0.0, 0.0) + time * 0.2);
    displacement.y = fbm(st + float2(5.2, 1.3) + time * 0.3);

    // Apply turbulence factor to scale displacement amount
    displacement = (displacement - 0.5) * turbulenceFactor * 0.1;

    // Displace UV coords
    float2 displacedUV = uv + displacement;

    // Sample the radial gradient shader with displaced coords scaled back to resolution space
    half4 color = gradientShader.eval(displacedUV * resolution);

    return color;
}

`)!;

export const UsageDisplay = (props: { consumption: number }) => {
    const backgroundColor = useThemeColor({}, 'background');
    const font = useFont(require('../assets/fonts/Unbounded-Bold.ttf'), 35)!;

    const formattedConsumption = formatWattHours(props.consumption);

    const canvasSize = { height: 400, width: 500 };
    const rectSize = { height: 300, width: 300 };

    const scale = interpolate(
        props.consumption,
        [0, 875 * 1000, 1200 * 1000],
        [115, 125, rectSize.height / 2],
        Extrapolation.CLAMP,
    );

    const turbulenceFactor = interpolate(
        props.consumption,
        [0, 875 * 1000, 1200 * 1000],
        [0, .5, 1],
        Extrapolation.CLAMP,
    );

    const color = interpolateColor(
        turbulenceFactor,
        [0, .5, 1],
        ["#77ff88", "#00ff99", "#ff842b"],
    )

    // Animation values
    const radius = useSharedValue(scale);
    radius.value = withRepeat(
        withSequence(
            withTiming(scale, { duration: 2000 }),
            withTiming(scale * 0.9, { duration: 2000 }),
        ),
        -1,
        true
    );

    return (
        <Perspective canvasSize={canvasSize}>
            <Rect
                x={canvasSize.width / 2 - rectSize.width / 2}
                y={canvasSize.height / 2 - rectSize.height / 2}
                width={rectSize.width}
                height={rectSize.height}
                color="#ffffff">

                <RadialGradient
                    c={vec(canvasSize.width / 2, canvasSize.height / 2)}
                    r={radius}
                    colors={[color, color, backgroundColor]}
                />
            </Rect>
            <Mask mask={
                <SkiaText
                    text={formattedConsumption}
                    font={font}
                    x={canvasSize.width / 2 - font?.measureText(formattedConsumption).width / 2}
                    y={canvasSize.height / 2}
                />
            }>
                <Fill color="#000" />
            </Mask>
        </Perspective >
    )
}