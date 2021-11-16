import React from 'react'
import { View, Text } from 'react-native'
import { MyCalendar } from '../components/Calendar'
import { Agenda, Calendar, CalendarList } from 'react-native-calendars'
import colors from '../assets/colors/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment'
import { Header } from 'react-native-elements/dist/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';

const SelectDateScreen = ({ navigation, route }) => {
    
    const { t } = useTranslation();

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
            <CalendarList
                items={{
                    '2021-11-13': [{dateTime: moment('"2021-11-13T9:00:00"', 'YYYY-MM-DDTHH:mm:ss'), isFree: true},{dateTime: moment('"2021-11-13T9:30:00"', 'YYYY-MM-DDTHH:mm:ss'), isFree: true},{dateTime: moment('"2021-11-13T10:00:00"', 'YYYY-MM-DDTHH:mm:ss'), isFree: true},{dateTime: moment('"2021-11-13T10:30:00"', 'YYYY-MM-DDTHH:mm:ss'), isFree: true}]
                }}
                showClosingKnob={true}
                theme={{
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'blue'
                }}
                onDayPress={(dateSelected)=>navigation.navigate('SelectHour',{dateSelected})}
                markedDates={{
                '2021-11-11': {selected: true, marked: true},
                '2021-11-12': {marked: true},
                '2021-11-13': {disabled: true}
                }}
            >

            </CalendarList>
        </View>
    )
}

export default SelectDateScreen