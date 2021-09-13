import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  appointmentCreateReducer,
  appointmentDeleteReducer,
  appointmentDetailsReducer,
  appointmentFinishReducer,
  appointmentListReducer,
  appointmentMineListReducer,
  appointmentPayReducer,
  appointmentSummaryReducer,
} from "./reducers/appointmentReducers";
import { billingReducer } from "./reducers/billingReducers";
import {
  doctorCategoryListReducer,
  doctorCreateReducer,
  doctorDeleteReducer,
  doctorDetailsReducer,
  doctorListReducer,
  doctorUpdateReducer,
} from "./reducers/doctorReducers";
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducers/userReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  billing: {
    billingItems: localStorage.getItem("billingItems")
      ? JSON.parse(localStorage.getItem("billingItems"))
      : [],
    appointmentDetails: localStorage.getItem("appointmentDetails")
      ? JSON.parse(localStorage.getItem("appointmentDetails"))
      : {},
    paymentMethod: "PayPal",
  },
};
const reducer = combineReducers({
  doctorList: doctorListReducer,
  doctorDetails: doctorDetailsReducer,
  billing: billingReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentConfirmDetails: appointmentDetailsReducer,
  appointmentPay: appointmentPayReducer,
  appointmentMineList: appointmentMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  doctorCreate: doctorCreateReducer,
  doctorUpdate:doctorUpdateReducer,
  doctorDelete: doctorDeleteReducer,
  appointmentList: appointmentListReducer,
  appointmentDelete: appointmentDeleteReducer,
  appointmentFinish: appointmentFinishReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  doctorCategoryList: doctorCategoryListReducer,
  appointmentSummary: appointmentSummaryReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
