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


const saveUserAppointment = async (userSelectedDate, userSelectedTime) => {
  var unifiedMoment = getUnifyDateTime(userSelectedDate, userSelectedTime)
  var result = await saveAppointment(unifiedMoment);
  return !result.hasError;
}

const SelectHourScreen = ({ navigation, route }) => {
  const { dateSelected } = route.params;
  const [availableHours, setAvailableHours] = useState(null)

  useEffect(() => {
    const freeH = async () => {
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
        alert("Appointment done!");
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