import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

type Props = ViewProps;

export const PageContainer: React.FC<Props> = (props) => {
  const { children, style, ...rest } = props;

  return (
    <ThemedView style={[styles.container, style]} {...props}>
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 10,
    marginHorizontal: 20,
    flex: 1,
    height: "100%",
  },
});
