import React from 'react'
import { View } from 'react-native'
import colors from '../assets/colors/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements/dist/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { getDoneAppointments } from '../services/appointmentService'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { StyleSheet } from 'react-native'

const MapScreen = ({navigation}) =>{
  const { t } = useTranslation();
  getDoneAppointments();
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
            centerComponent={{ text: t('lang:Location'), style: { color: '#fff' } }}
            backgroundColor = {colors.darkBackground}
            containerStyle= {{borderWidth: 0}}
            />
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400, 
  },
  map: {
    
    height: 400,
    width: 400, 
  },
});

export default MapScreen;