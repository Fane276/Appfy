import moment from "moment";
import React from "react";
import { auth, firestore } from "../firebase/firebase";

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


export {getFreeHours, getUnifyDateTime, saveAppointment};