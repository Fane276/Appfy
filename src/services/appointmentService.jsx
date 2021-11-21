import moment from "moment";
import { auth, firestore } from "../firebase/firebase";

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
    .set({ uid, dateFormated })
  alert(uid)

  return { hasError: false };
}

const getDaysWithAtLeastOneAppointment = async () => {
  const days = []

  // Print each document 
  var colRef = await firestore
    .collection('appointments')
    .get()

  colRef.docs.forEach((doc) => {
    const date = doc.id
    const dateInAnotherFromat = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    days.push(dateInAnotherFromat)
  })

  return days
}

const getDoneAppointments = async () => {
  await firestore
    .collection('appointments')
    .get()
    .then((querySnapshot) => {
      console.warn('Days with at least 1 appointment: ', JSON.stringify(querySnapshot.size));
      // console.warn('Docs within this collection: ', JSON.stringify(querySnapshot.docs.length));
      // querySnapshot.forEach(async (documentSnapshot) => {
      //   console.error('User ID: ', JSON.stringify(documentSnapshot.id));
      //   await firestore
      //     .collection('appointments')
      //     .doc(documentSnapshot.id)
      //     .collection('hours')
      //     .get()
      //     .then(querySnapshot2=>{
      //       querySnapshot2.forEach(documentSnapshot2=>{
      //         console.error('zi:',documentSnapshot.id ,'ora: ', JSON.stringify(documentSnapshot2.id));
      //       })
      //     })
      // });
      // querySnapshot.forEach(documentSnapshot => {
      // console.log('User ID: ', documentSnapshot);
    });
}


export { getAvailableHours, getUnifyDateTime, saveAppointment, getDoneAppointments, getDaysWithAtLeastOneAppointment };