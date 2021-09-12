import Axios from "axios";
import {
  BILLING_ADD_ITEM,
  BILLING_REMOVE_ITEM,
  BILLING_SAVE_APPOINTMENT_DETAILS,
  BILLING_SAVE_PAYMENT_METHOD,
} from "../constants/billingConstants";

export const addToBilling = (doctorId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/doctors/${doctorId}`);
  dispatch({
    type: BILLING_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      bookingAvailable: data.bookingAvailable,
      specialty: data.specialty,
      doctor: data._id,
      qty,
    },
  });
  localStorage.setItem(
    "billingItems",
    JSON.stringify(getState().billing.billingItems)
  );
};

export const removeFromBilling = (doctorId) => (dispatch, getState) => {
  dispatch({ type: BILLING_REMOVE_ITEM, payload: doctorId });
  localStorage.setItem(
    "billingItems",
    JSON.stringify(getState().billing.billingItems)
  );
};

export const saveAppointmentDetails = (data) => (dispatch) => {
  dispatch({type: BILLING_SAVE_APPOINTMENT_DETAILS, payload: data})
  localStorage.setItem('appointmentDetails', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) =>{
  dispatch({type: BILLING_SAVE_PAYMENT_METHOD, payload: data});
}
