import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native'
import { Header, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppointmentConstants from '../assets/AppConstants/AppointmentConstants';
import colors from '../assets/colors/colors';
import GradientBackground from '../components/GradientBackground'
import { Controller, useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import HourPicker from '../components/HourPicker';

const AdminSettingsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [localSettings, setLocalSettings] = useState(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      nrDaysAppointment: 0,
      timeBetweenAppointments: 0,
      startingHour: null,
      endHour: null,

    },
    mode: "onBlur"
  });

  useEffect(() => {
    setLocalSettings(AppointmentConstants);
  }, [])

  return (
    <GradientBackground>
      <View>
        <Header
          placement="center"
          leftComponent={
            <TouchableOpacity
              onPress={() => { navigation.navigate("MainScreen")}}
            >
              <FontAwesomeIcon icon={faAngleLeft} color={colors.lightBackground} />
            </TouchableOpacity>
          }
          centerComponent={{ text: t('lang:settings'), style: { color: '#fff' } }}
          backgroundColor={colors.darkBackground}
          containerStyle={{ borderWidth: 0 }}
        />
        <Input
          name="nrDaysAppointment"
          placeholder={t("lang:nrDaysAppointment")}
          keyboardType="number-pad"
        />
        <Input
          name="timeBetweenAppointments"
        />
        <HourPicker
          placeholder={t('lang:startingHour')}
          name="startingHour"
          control={control}
          setValue={setValue}
        />
        <HourPicker
          placeholder={t('lang:endHour')}
          name="endHour"
          control={control}
          setValue={setValue}
        />
        <TouchableOpacity
        onPress={handleSubmit()}>
        <Text >{t('lang:save')}</Text>

      </TouchableOpacity>
      </View>
    </GradientBackground>
  )
}

export default AdminSettingsScreen
