import React, { useMemo } from "react";
import { Text, TouchableOpacity, TextProps, StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  Pressable,
  PressableProps,
  TapGesture,
  TouchableOpacityProps,
} from "react-native-gesture-handler";

type Props = {
  text: string;
  textProps?: TextProps;
} & PressableProps;

export const Button: React.FC<Props> = (props) => {
  const { text, textProps, ...containerProps } = props;
  const { style: containerStyle, ...restContainerProps } = containerProps;
  const { style: textStyle, ...restTextProps } = textProps || {};

  return (
      <Pressable
        style={({ pressed }) => [
          styles.container,
          containerStyle,
          pressed && styles.pressed,
        ] as any}
        {...restContainerProps}
      >
        <Text style={[styles.text, textStyle]} {...restTextProps}>
          {text}
        </Text>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#00000011",
    borderRadius: 10,
    minWidth: 100,
  },
  text: {
    color: "#000000",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
