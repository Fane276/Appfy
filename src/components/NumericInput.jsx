import React from 'react';
import { useController } from 'react-hook-form';
import { Input } from 'react-native-elements';
import colors  from '../assets/colors/colors';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NumericInput = ({name, placeholder, iconLeft, iconRight,label,  rules,control,setValue, getValues, secure, errorMessage })=>{
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, isValid }
  } = useController({
    control,
    defaultValue: '',
    name,
    rules
  })


  //todo: vazut cum se pot face butoane sa fac increment
  const increment = ()=>{
    var currentValue = getValues(name);
    setValue(name, currentValue+1);
  }

  const decrement = ()=>{
    var currentValue = getValues(name);
    setValue(name, currentValue-1);
  }


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
    labelStyle={styles.label}
    leftIcon={iconLeft}
    rightIcon={iconRight}
    color={colors.lightBackground}
    onFocus={()=>onFocusChange(true)}
    onBlur={()=>onFocusChange(false)}
    inputContainerStyle={isFocused? styles.inputOnFocus : styles.input}
    // inputContainerStyle={{borderBottomWidth: 0}}
    secureTextEntry={secure}
    errorStyle={{ color: 'red' }}
    keyboardType={'number-pad'}
    errorMessage={invalid?errorMessage:""}
  />
  )
}

const styles = StyleSheet.create({
  input:{
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    color: colors.lightBackground
  },
  inputOnFocus:{
    backgroundColor: colors.inputFocusBackground,
    borderRadius: 5,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    color: colors.lightBackground
  },
  label:{
    marginHorizontal: 5,
    marginBottom: 10,
    color: colors.labelColor
  }
})

export default NumericInput;