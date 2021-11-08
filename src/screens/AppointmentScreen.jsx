import React from 'react'
import { View } from 'react-native'
import { MyCalendar } from '../components/Calendar'


const AppointmentScreen = ({ navigation, route }) => {

    return (
        <View style={{ paddingTop: 50, flex: 1 }}>
            <MyCalendar>

            </MyCalendar>
        </View>
    )
}

export default AppointmentScreen