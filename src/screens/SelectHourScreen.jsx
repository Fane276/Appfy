import React, { useEffect } from 'react'
import { View, Text, SectionList, FlatList } from 'react-native'
import { MyCalendar } from '../components/Calendar'
import { Agenda, Calendar, CalendarList } from 'react-native-calendars'
import colors from '../assets/colors/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment'
import { Header } from 'react-native-elements/dist/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements'
import { useState } from 'react'
import AppointmentConstants from '../assets/AppConstants/AppointmentConstants'
import { getFreeHours, getUnifyDateTime,saveAppointment } from '../services/appointmentService'


const saveUserAppointment = async (userSelectedDate, userSelectedTime)=>{
  var unifiedMoment = getUnifyDateTime(userSelectedDate, userSelectedTime)
  var result = await saveAppointment(unifiedMoment);
  return !result.hasError;

}

const SelectDateScreen = ({ navigation, route }) => {
    const {dateSelected} = route.params;
    const freeHours = getFreeHours("10:40",30,"19:31");

    const { t } = useTranslation();
    keyExtractor = (item, index) => index.toString();
    
    renderItem = ({ item }) => (
      <TouchableOpacity onPress={async ()=>{
        var isSaved = await saveUserAppointment(dateSelected.dateString, item) 
        if(isSaved)
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
              onPress={()=>{navigation.goBack()}}
          >
              <FontAwesomeIcon icon={faAngleLeft} color={colors.lightBackground} />
          </TouchableOpacity>
          }
          centerComponent={{ text: t('lang:SelectDateTitle'), style: { color: '#fff' } }}
          backgroundColor = {colors.darkBackground}
          containerStyle= {{borderWidth: 0}}
          />
            <FlatList
              // keyExtractor={keyExtractor}
              data={freeHours}
              renderItem={renderItem}
            />
        </View>
    )
}

export default SelectDateScreen