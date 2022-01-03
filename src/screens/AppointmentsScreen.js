import React, { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { FAB, ListItem } from 'react-native-elements'
import { Header } from 'react-native-elements/dist/header/Header'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {CircleSnail as CircleProgress} from 'react-native-progress';
import { faAngleLeft, faCalendarAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useFocusEffect } from '@react-navigation/native';
import colors from '../assets/colors/colors'
import { deleteAppointment, getCurrentUserActiveAppointments } from '../services/appointmentService'

const AppointmentsScreen = ({ navigation, route }) => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [isBusy, setBusy] = useState(true);
  

  useEffect(() => {
    const freeH = async () => {
      setBusy(true);
      var appointments = await getCurrentUserActiveAppointments();
      setAppointmentsList(appointments);
      setBusy(false)
    }
    freeH()
  }, []);

  const onDeleteAppointment= async(date,time)=>{
    setBusy(true);
    try{
      await deleteAppointment(date, time)
    }
    catch (error) {
      Alert.alert(error.message)
    }
    alert(t("lang:appointmentDeleted"));
    var appointments = await getCurrentUserActiveAppointments();
    setAppointmentsList(appointments);
    setBusy(false);
  }

  useFocusEffect(
    React.useCallback(()=>{
      const freeH = async () => {
        setBusy(true);
        var appointments = await getCurrentUserActiveAppointments();
        setAppointmentsList(appointments);
        setBusy(false)
      }
      freeH();
  },[]));


  const { t } = useTranslation();
  // keyExtractor = (item, index) => index.toString();

  const IsBusyHandler = (props)=>{
    var isBusy = props.isBusy;
    if(isBusy){
      return (
        <View style={styles.progressContainer}>
          <CircleProgress size={60} indeterminate={true} color={[colors.primary, colors.darkBackground]} />
        </View>
      );
    }
    else{
      if(appointmentsList.length > 0){
        return (
          <FlatList style={{marginBottom: 7}}
            data={appointmentsList}
            renderItem={renderItem}
          />
        )
      }
      else{
        return (
          <View style={styles.progressContainer}>
            <FontAwesomeIcon size={40} icon={faCalendarAlt} color={colors.textDisabled} ></FontAwesomeIcon>
            <Text style={styles.noAppointmentText}>{t("lang:youHaveNoAppointments")}</Text>
          </View>
        )
      }
    }
  }

  renderItem = ({ item }) => (
    // <TouchableOpacity>
      <ListItem bottomDivider>
        <Image style={styles.appointmentImage} source={require('../assets/img/appointments.png')} />
        <ListItem.Content>
          <ListItem.Title style={{width:"100%",textAlign:'center'}}>{item.appointmentHour}</ListItem.Title>
          <ListItem.Subtitle style={{width:"100%",textAlign:'center'}}>{item.appointmentDate}</ListItem.Subtitle>
        </ListItem.Content>
        <FontAwesomeIcon onPress={async ()=>{await onDeleteAppointment(item.appointmentDate, item.appointmentHour)}} icon={faTrash} color={colors.deleteColor} />
      </ListItem>
    // </TouchableOpacity>
  )
  return (
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
          centerComponent={{ text: t('lang:yourAppointments'), style: { color: '#fff' } }}
          rightComponent={
            <TouchableOpacity
              onPress={() => { navigation.navigate("SelectDate")}}
            >
              <FontAwesomeIcon icon={faPlus} color={colors.lightBackground} />
            </TouchableOpacity>
          }
          backgroundColor={colors.darkBackground}
          containerStyle={{ borderWidth: 0 }}
        />
      <IsBusyHandler isBusy ={isBusy} />
      {/* <TouchableOpacity 
        style={styles.addButton} 
        onPress={()=>{navigation.navigate('SelectDate')}}
        >
        <FontAwesomeIcon icon={faPlus} color={colors.lightBackground} />
      </TouchableOpacity> */}
    </View>
  )
}
const styles = StyleSheet.create({
  progressContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appointmentImage:{
    height: 20,
    width: 20
  },
  noAppointmentText:{
    fontSize: 20,
    color: colors.textDisabled,
    marginHorizontal: 20,
    marginTop:10
  },
  addButton:{
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 40,
  }

});


export default AppointmentsScreen