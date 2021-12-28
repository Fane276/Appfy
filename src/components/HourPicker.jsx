import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Platform } from 'react-native'
import { useController } from 'react-hook-form';
import { Input } from 'react-native-elements';
import moment from 'moment';

const HourPicker = ({name, placeholder, icon, label,  rules,control, setValue, errorMessage }) => {

  const [date, setDate] = useState(new Date(1598051730000));
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
    var selectedDateFormated = moment(selectedDate).format("hh:mm");
    setValue(name, selectedDateFormated)
  };

  const display = () => {
    setShow(true);
  };
  return (
    <View>
      <Input
        // containerStyle={ isFocused ? styles.textInput:styles.textAction}
        name={name}
        placeholder={placeholder}
        value={field.value}
        onChangeText={field.onChange}
        label={label}
        leftIcon={icon}
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

export default HourPicker
