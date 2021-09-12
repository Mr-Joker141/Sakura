import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_RESET,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_FINISH_FAIL,
  APPOINTMENT_FINISH_REQUEST,
  APPOINTMENT_FINISH_RESET,
  APPOINTMENT_FINISH_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_MINE_LIST_FAIL,
  APPOINTMENT_MINE_LIST_REQUEST,
  APPOINTMENT_MINE_LIST_SUCCESS,
  APPOINTMENT_PAY_FAIL,
  APPOINTMENT_PAY_REQUEST,
  APPOINTMENT_PAY_RESET,
  APPOINTMENT_PAY_SUCCESS,
  APPOINTMENT_SUMMARY_FAIL,
  APPOINTMENT_SUMMARY_REQUEST,
  APPOINTMENT_SUMMARY_SUCCESS,
} from "../constants/appointmentConstants";

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_CREATE_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case APPOINTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return { loading: true };
    case APPOINTMENT_DETAILS_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentPayReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_PAY_REQUEST:
      return { loading: true };
    case APPOINTMENT_PAY_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_PAY_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentMineListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_MINE_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_MINE_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_DELETE_REQUEST:
      return { loading: true };
    case APPOINTMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentFinishReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_FINISH_REQUEST:
      return { loading: true };
    case APPOINTMENT_FINISH_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_FINISH_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_FINISH_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentSummaryReducer = (
  state = { loading: true, summary: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_SUMMARY_REQUEST:
      return { loading: true };
    case APPOINTMENT_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case APPOINTMENT_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
