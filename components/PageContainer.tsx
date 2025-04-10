import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps;

export const PageContainer: React.FC<Props> = (props) => {
  const { children, style, ...rest } = props;

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 10,
    marginHorizontal: 20,
    flex: 1,
  },
});
