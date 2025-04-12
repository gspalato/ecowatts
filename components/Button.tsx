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
  icon?: React.ReactNode;
  type?: "default" | "primary" | "secondary";
} & PressableProps;

export const Button: React.FC<Props> = (props) => {
  const {
    icon,
    text,
    textProps,
    textType,
    type = "primary",
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
          type === "primary" && [
            styles.primary,
            { backgroundColor: highlightColor },
          ],
          type === "secondary" && styles.secondary,
        ] as any
      }
      {...restContainerProps}
    >
      {icon ? icon : null}
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
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  primary: {
    borderWidth: 0,
  },
  secondary: {},
  text: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.5,
  },
});
