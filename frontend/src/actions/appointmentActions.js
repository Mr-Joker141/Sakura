import Axios from "axios";
import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_FINISH_FAIL,
  APPOINTMENT_FINISH_REQUEST,
  APPOINTMENT_FINISH_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_MINE_LIST_FAIL,
  APPOINTMENT_MINE_LIST_REQUEST,
  APPOINTMENT_MINE_LIST_SUCCESS,
  APPOINTMENT_PAY_FAIL,
  APPOINTMENT_PAY_REQUEST,
  APPOINTMENT_PAY_SUCCESS,
  APPOINTMENT_SUMMARY_REQUEST,
  APPOINTMENT_SUMMARY_SUCCESS,
} from "../constants/appointmentConstants";
import { BILLING_EMPTY } from "../constants/billingConstants";

export const createAppointment =
  (appointment) => async (dispatch, getState) => {
    dispatch({ type: APPOINTMENT_CREATE_REQUEST, payload: appointment });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post("/api/appointments", appointment, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: APPOINTMENT_CREATE_SUCCESS, payload: data.appointment });
      dispatch({ type: BILLING_EMPTY });
      localStorage.removeItem("billingItems");
    } catch (error) {
      dispatch({
        type: APPOINTMENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailsAppointment =
  (appointmentId) => async (dispatch, getState) => {
    dispatch({ type: APPOINTMENT_DETAILS_REQUEST, payload: appointmentId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: APPOINTMENT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APPOINTMENT_DETAILS_FAIL, payload: message });
    }
  };

export const payAppointment =
  (appointment, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: APPOINTMENT_PAY_REQUEST,
      payload: { appointment, paymentResult },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.put(
        `/api/appointments/${appointment._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: APPOINTMENT_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APPOINTMENT_PAY_FAIL, payload: message });
    }
  };

export const listAppointmentMine = () => async (dispatch, getState) => {
  dispatch({ type: APPOINTMENT_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/appointments/mine", {
      headers: {
        Authorization: ` Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: APPOINTMENT_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPOINTMENT_MINE_LIST_FAIL, payload: message });
  }
};

export const listAppointments = () => async (dispatch, getState) => {
  dispatch({ type: APPOINTMENT_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/appointments", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: APPOINTMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPOINTMENT_LIST_FAIL, payload: message });
  }
};

export const deleteAppointment =
  (appointmentId) => async (dispatch, getState) => {
    dispatch({ type: APPOINTMENT_DELETE_REQUEST, payload: appointmentId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: APPOINTMENT_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APPOINTMENT_DELETE_FAIL, payload: message });
    }
  };

export const finishedAppointment =
  (appointmentId) => async (dispatch, getState) => {
    dispatch({ type: APPOINTMENT_FINISH_REQUEST, payload: appointmentId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.put(
        `/api/appointments/${appointmentId}/appointmentfinish`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: APPOINTMENT_FINISH_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APPOINTMENT_FINISH_FAIL, payload: message });
    }
  };

  export const summaryAppointments = () => async (dispatch, getState) => {
    dispatch({ type: APPOINTMENT_SUMMARY_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get('/api/appointments/summary', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: APPOINTMENT_SUMMARY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };