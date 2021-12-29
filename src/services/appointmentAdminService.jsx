import moment from "moment";
import AppointmentConstants from "../assets/AppConstants/AppointmentConstants";
import { firestore } from "../firebase/firebase";
import { getAppointmentAvailableDays } from "./appointmentService";

const getUsersActiveAppointments = async (dateFrom, dateTo) =>{
  var availableDays = getAppointmentAvailableDays();
  var appointments = [];
  for(var i = 0; i<availableDays.length;i++){
    var hours = await firestore
    .collection('appointments')
    .doc(availableDays[i])
    .collection('hours')
    // .where("uid",'==',auth.currentUser.uid)
    .get();
    for(const doc of hours.docs){
      var dateFormated = doc.get("dateFormated");
      var userName = doc.get("userName");
      var date = moment(dateFormated,"DD-MM-YYYY HH:mm").format("DD.MM.YYYY");
      var hour = moment(dateFormated,"DD-MM-YYYY HH:mm").format("HH:mm");
      appointments.push({appointmentDate:date, appointmentHour:hour, userName:userName})
      
    }
  }
  return appointments;
}

const getAppointmentsSettings = async()=>{
  const appointmentSettingsDoc = await firestore
        .collection('settings')
        .doc("appointments")
        .get()

  const appointmentSettings = appointmentSettingsDoc.data();

  AppointmentConstants.EndHour = appointmentSettings.EndHour;
  AppointmentConstants.StartingHour = appointmentSettings.StartingHour;
  AppointmentConstants.MaxNumberDays = appointmentSettings.MaxNumberDays;
  AppointmentConstants.TimeBetweenAppointments = appointmentSettings.TimeBetweenAppointments;
}

const saveAppointmentsSettings= async ({EndHour, StartingHour, MaxNumberDays, TimeBetweenAppointments})=>{
  await firestore
    .collection('settings')
    .doc('appointments')
    .set({EndHour, StartingHour, MaxNumberDays, TimeBetweenAppointments})
}
export {getUsersActiveAppointments,getAppointmentsSettings,saveAppointmentsSettings}