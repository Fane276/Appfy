import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import colors from '../assets/colors/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements/dist/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { ListItem } from 'react-native-elements'
import { useState } from 'react'
import { getAvailableHours, getUnifyDateTime, saveAppointment } from '../services/appointmentService'
import AppointmentConstants from '../assets/AppConstants/AppointmentConstants'
import { getAppointmentsSettings } from '../services/appointmentAdminService'
import * as Notifications from 'expo-notifications'
import moment from 'moment'

const saveUserAppointment = async (userSelectedDate, userSelectedTime) => {
  scheduleNotif(userSelectedDate, userSelectedTime).catch(error => {
    console.warn(error);
  });
  var unifiedMoment = getUnifyDateTime(userSelectedDate, userSelectedTime)
  var result = await saveAppointment(unifiedMoment);
  return !result.hasError;
}

const scheduleNotif = async (date, time) => {
  var triggerDate = moment(date,'YYYY-MM-DD').startOf('day').hour(14).subtract(24, 'hours'); //triggerdate bun - o zi inainte de programare
  // var triggerDate = moment().add(5, 'seconds'); //test date
  var triggerTime = triggerDate.diff(moment()) / 1000;

  //set handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  //schedule notification  
  Notifications.scheduleNotificationAsync({
    content: {
      //title: t('lang:NotificationTitle'),
      //body: t('lang:NotificationBody'),
      title: "Your appointment is important!",
      body: "Don't miss your appointment tomorrow at " + time,
    },
    trigger: {
      seconds: triggerTime
    }
  });
}

const SelectHourScreen = ({ navigation, route }) => {
  const { dateSelected } = route.params;
  const [availableHours, setAvailableHours] = useState(null)

  useEffect(() => {
    const freeH = async () => {
      await getAppointmentsSettings();
      const freeHours = await getAvailableHours(AppointmentConstants.StartingHour, AppointmentConstants.TimeBetweenAppointments, AppointmentConstants.EndHour, dateSelected);
      setAvailableHours(freeHours)
    }
    freeH();
  }, [])

  const { t } = useTranslation();
  // keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={async () => {
      var isSaved = await saveUserAppointment(dateSelected.dateString, item)
      if (isSaved)
        alert(t('lang:AppointmentDone'));
        navigation.navigate("Home");
    }
    }>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item}</ListItem.Title>
          <ListItem.Subtitle>{dateSelected.dateString}</ListItem.Subtitle>
        </ListItem.Content>
        <FontAwesomeIcon icon={faAngleLeft} color={colors.darkBackground} />
      </ListItem>
    </TouchableOpacity>
  )
  return (
    <View>
      <Header
        placement="center"
        leftComponent={
          <TouchableOpacity
            onPress={() => { navigation.goBack() }}
          >
            <FontAwesomeIcon icon={faAngleLeft} color={colors.lightBackground} />
          </TouchableOpacity>
        }
        centerComponent={{ text: t('lang:SelectDateTitle'), style: { color: '#fff' } }}
        backgroundColor={colors.darkBackground}
        containerStyle={{ borderWidth: 0 }}
      />
      <FlatList
        data={availableHours}
        renderItem={renderItem}
      />
    </View>
  )
}

export default SelectHourScreen