import React, { ComponentProps, useMemo } from "react";
import { Text, TouchableOpacity, TextProps, StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  Pressable,
  PressableProps,
  TapGesture,
  TouchableOpacityProps,
} from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  text: string;
  textType?: ComponentProps<typeof ThemedText>["type"];
  textProps?: ComponentProps<typeof ThemedText>;
  type?: "default" | "primary" | "secondary";
} & PressableProps;

export const Button: React.FC<Props> = (props) => {
  const {
    text,
    textProps,
    textType,
    type = "default",
    ...containerProps
  } = props;
  const { style: containerStyle, ...restContainerProps } = containerProps;
  const { style: textStyle, ...restTextProps } = textProps || {};

  const highlightColor = useThemeColor({}, "highlightColor");

  return (
    <Pressable
      style={({ pressed }) =>
        [
          styles.container,
          containerStyle,
          pressed && styles.pressed,
          type === "default" && styles.default,
          type === "primary" && [
            styles.primary,
            { backgroundColor: highlightColor },
          ],
          type === "secondary" && styles.secondary,
        ] as any
      }
      {...restContainerProps}
    >
      <ThemedText
        type={type === "primary" ? "defaultSemiBold" : textType}
        style={[
          styles.text,
          textStyle,
          type === "primary" && { color: "#fff" },
        ]}
        {...restTextProps}
      >
        {text}
      </ThemedText>
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
  default: {},
  primary: {
    borderWidth: 0,
  },
  secondary: {},
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
