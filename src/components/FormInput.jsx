import React from 'react';
import { useController } from 'react-hook-form';
import { Input } from 'react-native-elements';
import colors  from '../assets/colors/colors';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const FormInput = ({name, placeholder, icon,label,  rules,control, secure, errorMessage })=>{
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, isValid }
  } = useController({
    control,
    defaultValue: '',
    name,
    rules
  })

  const [isFocused, setIsFocused] = useState(false);

  const onFocusChange = (val) =>{
    setIsFocused(val);
  }

  return(
    <Input
    // containerStyle={ isFocused ? styles.textInput:styles.textAction}
    placeholder={placeholder}
    value={field.value}
    onChangeText={field.onChange}
    label={label}
    leftIcon={icon}
    color={colors.lightBackground}
    onFocus={()=>onFocusChange(true)}
    onBlur={()=>onFocusChange(false)}
    inputContainerStyle={isFocused? styles.inputOnFocus : styles.input}
    // inputContainerStyle={{borderBottomWidth: 0}}
    secureTextEntry={secure}
    errorStyle={{ color: 'red' }}
    errorMessage={!isDirty || invalid?errorMessage:""}
  />
  )
}

const styles = StyleSheet.create({
  input:{
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderBottomWidth: 0
  },
  inputOnFocus:{
    backgroundColor: colors.inputFocusBackground,
    borderRadius: 20,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
  }
})

export default FormInput;