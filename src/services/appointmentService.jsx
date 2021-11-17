import moment from "moment";
import React from "react";
import { auth, firestore } from "../firebase/firebase";
import AppointmentConstants from "../assets/AppConstants/AppointmentConstants";

const getFreeHours = (startingHour, interval, endHour) => {
  var endHourMoment = moment(endHour,"HH:mm");
  var startingHourMoment = moment(startingHour,"HH:mm");
  var result = [];
  result.push(startingHourMoment.format('HH:mm'));
  var currentVal = moment(startingHour,'HH:mm');
  currentVal = currentVal.add(interval, 'minutes');
  while(currentVal.isBefore(endHourMoment)){
    result.push(currentVal.format('HH:mm'));
    currentVal = currentVal.add(interval, 'minutes');
  }
  return result;
}

const getUnifyDateTime = (date, time)=>{
  return moment(date + ' ' + time, "YYYY-MM-DD HH:mm");
}

const saveAppointment = async ( appointmentDateTime ) => {
  if(!appointmentDateTime.isValid())
    return { hasError: true };
    
  const uid = auth.currentUser.uid;
  const dateFormated = appointmentDateTime.format('DD-MM-YYYY HH:mm');
  const dateSelected = appointmentDateTime.format('DD-MM-YYYY');
  const timeSelected = appointmentDateTime.format('HH:mm');
  await firestore
  .collection('appointments')
  .doc(dateSelected)
  .collection('hours')
  .doc(timeSelected)
  .set({ uid, dateFormated})
  alert(uid)
  
  return { hasError: false };
}

const getDoneAppointments = async () =>{
  await firestore
    .collection('appointments')
    .get()
    .then(querySnapshot => {
      console.warn('Total users: ', JSON.stringify(querySnapshot.size));
      querySnapshot.forEach(async documentSnapshot => {
        console.error('User ID: ', JSON.stringify(documentSnapshot.id));
        await firestore
          .collection('appointments')
          .doc(documentSnapshot.id)
          .collection('hours')
          .get()
          .then(querySnapshot2=>{
            querySnapshot2.forEach(documentSnapshot2=>{
              console.error('zi:',documentSnapshot.id ,'ora: ', JSON.stringify(documentSnapshot2.id));
            })
          })
      });
      // querySnapshot.forEach(documentSnapshot => {
        // console.log('User ID: ', documentSnapshot);
    });
}


export {getFreeHours, getUnifyDateTime, saveAppointment, getDoneAppointments};