import { Text, type TextProps, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ComponentProps } from "react";

export type ThemedTextProps = ComponentProps<typeof Animated.Text> & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "small";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Animated.Text
      style={[
        { color },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "defaultSemiBold" && styles.defaultSemiBold,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        type === "small" && styles.small,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
    letterSpacing: -0,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_600SemiBold",
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: "Outfit_700Bold",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: "Inter_400Regular",
  },
  small: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Inter_400Regular",
  },
});
