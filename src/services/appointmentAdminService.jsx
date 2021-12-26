import moment from "moment";
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
      var date = moment(dateFormated,"DD-MM-YY hh:mm").format("DD.MM.YYYY");
      var hour = moment(dateFormated,"DD-MM-YY hh:mm").format("hh:mm");
      appointments.push({appointmentDate:date, appointmentHour:hour, userName:userName})
      
    }
  }
  return appointments;
}
export {getUsersActiveAppointments}