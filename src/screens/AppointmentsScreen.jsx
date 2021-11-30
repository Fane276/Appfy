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
import { getCurrentUserActiveAppointments } from '../services/appointmentService'


const AppointmentsScreen = ({ navigation, route }) => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [isBusy, setBusy] = useState(true);
  

  useEffect(() => {
    const freeH = async () => {
      var appointments = await getCurrentUserActiveAppointments();
      setAppointmentsList(appointments);
    }
    freeH()
  }, []);

  const { t } = useTranslation();
  // keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.appointmentHour}</ListItem.Title>
          <ListItem.Subtitle>{item.appointmentDate}</ListItem.Subtitle>
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
            onPress={() => { navigation.goBack()}}
          >
            <FontAwesomeIcon icon={faAngleLeft} color={colors.lightBackground} />
          </TouchableOpacity>
        }
        centerComponent={{ text: t('lang:yourAppointments'), style: { color: '#fff' } }}
        backgroundColor={colors.darkBackground}
        containerStyle={{ borderWidth: 0 }}
      />
      <FlatList
        data={appointmentsList}
        renderItem={renderItem}
      />

    </View>
  )
}

export default AppointmentsScreen