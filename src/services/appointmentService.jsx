import moment from "moment";
import AppointmentConstants from "../assets/AppConstants/AppointmentConstants";
import { auth, firestore } from "../firebase/firebase";
import { getUser } from "../firebase/utils/logInWithEmailAndPassword";

const getAvailableHours = async (startingHour, interval, endHour, date) => {
  const notAvailableHours = await getReservedHoursOnDate(date.dateString)

  var availableHours = [];
  var endHourMoment = moment(endHour, "HH:mm");
  var startingHourMoment = moment(startingHour, "HH:mm");

  if (!notAvailableHours.includes(startingHourMoment.format('HH:mm'))) {
    availableHours.push(startingHourMoment.format('HH:mm'));
  }
  var currentVal = moment(startingHour, 'HH:mm');
  currentVal = currentVal.add(interval, 'minutes');

  while (currentVal.isBefore(endHourMoment)) {
    if (!notAvailableHours.includes(currentVal.format('HH:mm'))) {
      availableHours.push(currentVal.format('HH:mm'));
    }
    currentVal = currentVal.add(interval, 'minutes');
  }

  return availableHours;
}

const getReservedHoursOnDate = async (date) => {
  const hours = []
  const dateInFireStoreFormat = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')

  const hoursRef = await firestore
    .collection('appointments')
    .doc(dateInFireStoreFormat)
    .collection('hours')
    .get()

  hoursRef.docs.forEach((doc) => {
    const hour = doc.id
    hours.push(hour)
  })

  return hours
}

const getUnifyDateTime = (date, time) => {
  return moment(date + ' ' + time, "YYYY-MM-DD HH:mm");
}

const saveAppointment = async (appointmentDateTime) => {
  if (!appointmentDateTime.isValid())
    return { hasError: true };

  const uid = auth.currentUser.uid;
  const currentUser = await getUser(uid);
  const dateFormated = appointmentDateTime.format('DD-MM-YYYY HH:mm');
  const dateSelected = appointmentDateTime.format('DD-MM-YYYY');
  const timeSelected = appointmentDateTime.format('HH:mm');
  await firestore
    .collection('appointments')
    .doc(dateSelected)
    .set({ name: 'hours' });
  await firestore
    .collection('appointments')
    .doc(dateSelected)
    .collection('hours')
    .doc(timeSelected)
    .set({ uid, dateFormated, userName:currentUser.name})

  return { hasError: false };
}

const getDaysWithAtLeastOneAppointment = async (startingHour, interval, endHour) => {
  const days = []

  // Print each document 
  var colRef = await firestore
    .collection('appointments')
    .get()

  colRef.docs.forEach((doc) => {
    const date = doc.id
    const dateAsMoment =moment(date, 'DD-MM-YYYY');
    if(dateAsMoment.isAfter(moment().format())){
      const dateInAnotherFromat = dateAsMoment.format('YYYY-MM-DD');
      days.push(dateInAnotherFromat);
    }
  })

  return days
}

const getNumberAppointment= (startingHour, interval, endHour)=>{
  var availableHours = [];
  var endHourMoment = moment(endHour, "HH:mm");
  var startingHourMoment = moment(startingHour, "HH:mm");

  availableHours.push(startingHourMoment.format('HH:mm'));
  
  var currentVal = moment(startingHour, 'HH:mm');
  currentVal = currentVal.add(interval, 'minutes');

  while (currentVal.isBefore(endHourMoment)) {
    availableHours.push(currentVal.format('HH:mm'));
    currentVal = currentVal.add(interval, 'minutes');
  }

  return availableHours.length;
}

const getDaysWithNoAppointmentsAvailable= async (startingHour, interval, endHour) => {
  const days = []

  // Print each document 
  var colRef = await firestore
    .collection('appointments')
    .get()

  var numberOfAvailableHours = getNumberAppointment(startingHour, interval, endHour);

  for(const doc of colRef.docs ){
    const date = doc.id
    const dateAsMoment =moment(date, 'DD-MM-YYYY');
    if(dateAsMoment.isAfter(moment().format())){
      const dateInAnotherFromat = dateAsMoment.format('YYYY-MM-DD');
      var hours = await firestore
        .collection('appointments')
        .doc(date)
        .collection('hours')
        .get();
      if(numberOfAvailableHours == hours.docs.length){
        days.push(dateInAnotherFromat);
      }
    }
  }
  return days
}
const getAppointmentAvailableDays= ()=>{
  var dates = []
  for(var i = 0; i < AppointmentConstants.MaxNumberDays; i++){
    var date = moment().add(i, 'days').format("DD-MM-YYYY");
    dates.push(date);
  }
  return dates;
}

const getCurrentUserActiveAppointments = async () => {
  var availableDays = getAppointmentAvailableDays();
  var appointments = [];
  for(var i = 0; i<availableDays.length;i++){
    var hours = await firestore
    .collection('appointments')
    .doc(availableDays[i])
    .collection('hours')
    .where("uid",'==',auth.currentUser.uid)
    .get();
    for(const doc of hours.docs){
      var dateFormated = doc.get("dateFormated");
      var date = moment(dateFormated,"DD-MM-YY hh:mm").format("DD.MM.YYYY");
      var hour = moment(dateFormated,"DD-MM-YY hh:mm").format("hh:mm");
      appointments.push({appointmentDate:date, appointmentHour:hour})
      
    }
  }
  return appointments;
}


export { getAvailableHours, getUnifyDateTime,getAppointmentAvailableDays, saveAppointment, getCurrentUserActiveAppointments, getDaysWithAtLeastOneAppointment, getDaysWithNoAppointmentsAvailable };