import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Platform, StyleSheet } from 'react-native'
import { useController } from 'react-hook-form';
import { Input } from 'react-native-elements';
import moment from 'moment';
import colors from '../assets/colors/colors';

const HourPicker = ({name, placeholder, icon, label,  rules,control, setValue, errorMessage }) => {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, isValid }
  } = useController({
    control,
    defaultValue: '',
    name,
    rules
  })
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    var selectedDateFormated = moment(selectedDate).format("HH:mm");
    setValue(name, selectedDateFormated)
  };

  const display = () => {
    setShow(true);
  };

  
  const [isFocused, setIsFocused] = useState(false);

  const onFocusChange = (val) =>{
    setIsFocused(val);
  }

  return (
    <View>
      <Input
        // containerStyle={ isFocused ? styles.textInput:styles.textAction}
        name={name}
        placeholder={placeholder}
        value={field.value}
        onChangeText={field.onChange}
        label={label}
        labelStyle={styles.label}
        leftIcon={icon}
        onFocus={()=>onFocusChange(true)}
        onBlur={()=>onFocusChange(false)}
        inputContainerStyle={isFocused? styles.inputOnFocus : styles.input}
        inputStyle= {{ color:colors.lightBackground}}
        errorStyle={{ color: 'red' }}
        onPressIn={display}
        errorMessage={invalid?errorMessage:""}
      />
      {show && 
        <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"time"}
        is24Hour={true}
        display="default"
        onChange={onChange}
        />
      }
    </View>
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
export default HourPicker
