import React from "react";
import { TouchableOpacity, Text } from "react-native";
import COLORS from "../constant/Theme";
import * as Animatable from "react-native-animatable";
const Button = ({ title, onPress = () => {}, isPrimary, styles }) => {
  return (
    <Animatable.View
      duration={1000}
      animation="bounceInDown"
      // direction='alternate'
      easing="ease-in-sine"
      iterationCount={1}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          height: 55,
          width: "100%",
          backgroundColor: isPrimary ? COLORS.blue : COLORS.black,
          marginVertical: 20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          borderColor: isPrimary ? COLORS.black : COLORS.blue,
          borderWidth: 2,
          ...styles,
        }}
      >
        <Text
          style={{
            color: isPrimary ? COLORS.black : COLORS.blue,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default Button;
