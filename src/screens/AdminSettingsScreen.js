import { faAngleLeft, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native'
import { Header, Input, Tooltip } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppointmentConstants from '../assets/AppConstants/AppointmentConstants';
import colors from '../assets/colors/colors';
import GradientBackground from '../components/GradientBackground'
import { Controller, useForm, useFormState } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import HourPicker from '../components/HourPicker';
import NumericInput from '../components/NumericInput';
import { getAppointmentsSettings, saveAppointmentsSettings } from '../services/appointmentAdminService';
import moment from 'moment';

const AdminSettingsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [localSettings, setLocalSettings] = useState(AppointmentConstants);

  const { control, handleSubmit, formState: { errors }, setValue, getValues} = useForm({
    defaultValues: {
      nrDaysAppointment: 0,
      timeBetweenAppointments: 0,
      startingHour: null,
      endHour: null,
    },
    mode: "onBlur"
  });

  const { dirtyFields } = useFormState({
    control
  });
  useEffect(() => {
    const asyncCall = async ()=>{
      await getAppointmentsSettings();
      setLocalSettings(AppointmentConstants);
      if(localSettings){
        setValue("nrDaysAppointment",JSON.stringify(localSettings.MaxNumberDays))
        setValue("timeBetweenAppointments",JSON.stringify(localSettings.TimeBetweenAppointments))
        setValue("startingHour",localSettings.StartingHour)
        setValue("endHour",localSettings.EndHour)
      }
    }
    asyncCall();
  }, [])

  const onSubmit= async ({nrDaysAppointment, timeBetweenAppointments, startingHour, endHour})=>{
    
    try {
      if (dirtyFields) {
        var momentStart = moment(startingHour,'HH:mm');
        var momentEnd = moment(endHour,'HH:mm');
        if(momentStart.isAfter(momentEnd)){
          alert(t("TimeStartAfterEndError"));
          return;
        }
        var saveInput = {
          MaxNumberDays: parseInt(nrDaysAppointment, 10),
          TimeBetweenAppointments: parseInt(timeBetweenAppointments, 10),
          StartingHour: startingHour,
          EndHour: endHour,
        }
        await saveAppointmentsSettings(saveInput);
        navigation.navigate('MainScreen')
      }
      else {
        Alert.alert(t('lang:invalidLogin'))
      }
    }
    catch (error) {
      Alert.alert(error.message)
    }
  }


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
          containerStyle={{ borderWidth: 0, marginBottom:10}}
        />
        <NumericInput
          name="nrDaysAppointment"
          placeholder={t("lang:nrDaysAppointment")}
          label={t("lang:nrDaysAppointment")}
          iconRight={
            <Tooltip
              popover={<Text>{t("lang:infoNrDaysAppointment")}</Text>}
              withPointer={false}
              containerStyle={{ width: 200, height: 60 }}
            >
              <FontAwesomeIcon icon={faInfo} color={colors.lightBackground} />
            </Tooltip>
          }
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <NumericInput
          name="timeBetweenAppointments"
          placeholder={t("lang:timeBetweenAppointments")}
          label={t("lang:timeBetweenAppointments")}
          iconRight={
            <Tooltip
              popover={<Text>{t("lang:infoTimeBetweenAppointments")}</Text>}
              withPointer={false}
              containerStyle={{ width: 200, height: 60 }}
            >
              <FontAwesomeIcon icon={faInfo} color={colors.lightBackground} />
            </Tooltip>
          }
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <HourPicker
          placeholder={t('lang:startingHour')}
          label={t('lang:startingHour')}
          name="startingHour"
          control={control}
          setValue={setValue}
        />
        <HourPicker
          placeholder={t('lang:endHour')}
          label={t('lang:endHour')}
          name="endHour"
          control={control}
          setValue={setValue}
        />
        <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.saveButtonText}>{t('lang:save')}</Text>

      </TouchableOpacity>
      </View>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  saveButton:{
    height: 60,
    width: 260,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 40,
  },
  saveButtonText:{
    fontSize: 20,
    fontWeight:'bold',
    color: colors.darkBackground
  },
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
  }

});

export default AdminSettingsScreen
