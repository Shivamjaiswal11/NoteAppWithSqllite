import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from '../constant/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";
const Input = ({
  label,
  iconName,
  error,
  password,
  desc,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
       <Animatable.View
      duration={1000}
      animation="lightSpeedIn"
      // direction='alternate'
      easing="ease-in-sine"
      iterationCount={1}
      style={{marginBottom: 20}}
    >
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.blue
              : COLORS.grey,
            alignItems: 'center',
          },
          {
           height: desc ? 100:55,
          //  flexDirection: desc?'row':'row',
          

          }
        ]}>
        <MaterialIcons
          name={iconName}
          style={{color: error
            ? COLORS.red
            : isFocused
            ? COLORS.blue
            : COLORS.grey, fontSize: 22, marginRight: 10}}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: COLORS.darkBlue, flex: 1}}
          {...props}
          multiline
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            style={{color: COLORS.darkBlue, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
   </Animatable.View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius:5
  },
});

export default Input;