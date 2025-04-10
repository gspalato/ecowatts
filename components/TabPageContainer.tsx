import { Sizes } from "@/constants/Sizes";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ViewProps,
  StatusBar,
  ScrollViewProps,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = ScrollViewProps;

export const TabPageContainer: React.FC<Props> = (props) => {
  const { children, style, contentContainerStyle, ...rest } = props;

  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={[{ display: "flex" }, contentContainerStyle]}
        contentInset={{ top: statusBarHeight, bottom: tabBarHeight }}
        {...rest}
      >
        {children}
      </ScrollView>
      <BlurView
        style={{ position: "absolute", height: statusBarHeight, width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 10,
    marginHorizontal: Sizes.horizontalSpacingFromScreen,
    flex: 1,
  },
});
