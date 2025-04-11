import React from "react";
import { View, ViewProps } from "react-native";

type Props = ViewProps;

const Component: React.FC<Props> = (props) => {
  const { children, style, ...rest } = props;

  return (
    <View
      style={[
        {
          display: "flex",
          width: "100%",
          height: 40,
          paddingVertical: 5,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
Component.displayName = "HeaderContainer";

export default Component;
