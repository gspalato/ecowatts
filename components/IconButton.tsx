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
import { useTheme } from "@react-navigation/native";

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 1 || StyleSheet.hairlineWidth,
    borderRadius: 100,
  },
  pressed: {
    opacity: 0.5,
  },
});
