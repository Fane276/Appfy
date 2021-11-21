
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import colors from '../assets/colors/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment'
import { Header } from 'react-native-elements/dist/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import AppointmentConstants from '../assets/AppConstants/AppointmentConstants'
import { getDaysWithAtLeastOneAppointment } from '../services/appointmentService'

const SelectDateScreen = ({ navigation, route }) => {
    const [markedDatesForCalendar, setMarkedDatesForCalendar] = useState(null)

    const minDate = moment().format('YYYY-MM-DD');
    const maxDate = moment().add(AppointmentConstants.MaxNumberDays, 'days').format('YYYY-MM-DD');
    const { t } = useTranslation();

    useEffect(async () => {
        const days = await getDaysWithAtLeastOneAppointment()
        var markedDatesObject = {}
        days.forEach(day => markedDatesObject[day] = { marked: true })
        setMarkedDatesForCalendar(markedDatesObject)
    }, [])

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
            <CalendarList
                items={{
                    '2021-11-13': [{ dateTime: moment('"2021-11-13T9:00:00"', 'YYYY-MM-DDTHH:mm:ss'), isFree: true }, { dateTime: moment('"2021-11-13T9:30:00"', 'YYYY-MM-DDTHH:mm:ss'), isFree: true }, { dateTime: moment('"2021-11-13T10:00:00"', 'YYYY-MM-DDTHH:mm:ss'), isFree: true }, { dateTime: moment('"2021-11-13T10:30:00"', 'YYYY-MM-DDTHH:mm:ss'), isFree: true }]
                }}
                theme={{
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'blue'
                }}
                minDate={minDate}
                maxDate={maxDate}
                onDayPress={(dateSelected) => navigation.navigate('SelectHour', { dateSelected })}
                markedDates={markedDatesForCalendar}
            >

            </CalendarList>
        </View>
    )
}

export default SelectDateScreen