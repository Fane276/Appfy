import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import colors from '../assets/colors/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements/dist/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { getDoneAppointments } from '../services/appointmentService'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import AppointmentConstants from '../assets/AppConstants/AppGenerericConstants'
import Geolocation from 'react-native-geolocation-service';

const MapScreen = ({navigation}) =>{
  const { t } = useTranslation();
  const [location, setLocation] = useState(null);
  // getDoneAppointments();
  
  // useEffect(async () => {
  //     await getLocation();
  //     console.error(JSON.stringify(location));
  // }, []);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(()=>{alert("ceva")})
  };
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
            // centerComponent={{ text: t('lang:Location'), style: { color: '#fff' } }}
            centerComponent={{ text: t('lang:Location'), style: { color: '#fff' } }}
            backgroundColor = {colors.darkBackground}
            containerStyle= {{borderWidth: 0}}
            />
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: AppointmentConstants.Location.latitude,
              longitude: AppointmentConstants.Location.longitude,
              latitudeDelta: AppointmentConstants.LocationDelta.latitude,
              longitudeDelta: AppointmentConstants.LocationDelta.longitude,
            }}
          >
            <Marker
              coordinate={{ latitude : AppointmentConstants.Location.latitude , longitude :  AppointmentConstants.Location.longitude }}
              title="ReflexoVital Sibiu"             
              description="Welcome"
            />
          </MapView>
          
          {/* <TouchableOpacity onPress={async()=>await getLocation()} ><Text>Get Location</Text></TouchableOpacity> */}
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  map: {
    height: "94%"
  },
});

export default MapScreen;