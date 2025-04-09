import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type Props = TextProps;

export const Title: React.FC<Props> = (props) => {
  const { style } = props;

  return <Text style={[styles.title, style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: "#000000",
    fontSize: 40,
    fontWeight: 800
  },
});
