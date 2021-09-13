import {
  BILLING_ADD_ITEM,
  BILLING_EMPTY,
  BILLING_REMOVE_ITEM,
  BILLING_SAVE_APPOINTMENT_DETAILS,
  BILLING_SAVE_PAYMENT_METHOD,
} from "../constants/billingConstants";

export const billingReducer = (state = { billingItems: [] }, action) => {
  switch (action.type) {
    case BILLING_ADD_ITEM:
      const item = action.payload;
      const existItem = state.billingItems.find(
        (x) => x.doctor === item.doctor
      );
      if (existItem) {
        return {
          ...state,
          billingItems: state.billingItems.map((x) =>
            x.doctor === existItem.doctor ? item : x
          ),
        };
      } else {
        return { ...state, billingItems: [...state.billingItems, item] };
      }

    case BILLING_REMOVE_ITEM:
      return {
        ...state,
        billingItems: state.billingItems.filter(
          (x) => x.doctor !== action.payload
        ),
      };
    case BILLING_SAVE_APPOINTMENT_DETAILS:
      return { ...state, appointmentDetails: action.payload };
    case BILLING_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case BILLING_EMPTY:
      return { ...state, billingItems: [] };
    default:
      return state;
  }
};
