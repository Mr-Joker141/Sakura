import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  detailsAppointment,
  payAppointment,
  finishedAppointment,
} from "../actions/appointmentActions";
import Axios from "axios";
import {
  APPOINTMENT_PAY_RESET,
  APPOINTMENT_FINISH_RESET,
} from "../constants/appointmentConstants";

export default function AppointmentScreen(props) {
  const appointmentId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const appointmentConfirmDetails = useSelector(
    (state) => state.appointmentConfirmDetails
  );
  const { appointment, loading, error } = appointmentConfirmDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const appointmentPay = useSelector((state) => state.appointmentPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = appointmentPay;
  const appointmentFinish = useSelector((state) => state.appointmentFinish);
  const {
    loading: loadingFinish,
    error: errorFinish,
    success: successFinish,
  } = appointmentFinish;
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !appointment ||
      successPay ||
      successFinish ||
      (appointment && appointment._id !== appointmentId)
    ) {
      dispatch({ type: APPOINTMENT_PAY_RESET });
      dispatch({type: APPOINTMENT_FINISH_RESET});
      dispatch(detailsAppointment(appointmentId));
    } else {
      if (!appointment.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, appointmentId, sdkReady, successPay, successFinish, appointment]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payAppointment(appointment, paymentResult));
  };

  const appointmentFinishHandler = () => {
    dispatch(finishedAppointment(appointment._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Appointment {appointment._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2> Appointment</h2>
                <p>
                {appointment.appointmentDetails.map((item) => (
                    <li key={item}>
                      
                      <strong>Patient Name :</strong>
                  {item.pfullName} <br />
                  <strong>Patient nic : </strong>
                  {item.pnic} <br />
                  <strong>Patient Address :</strong>
                  {item.paddress} <br />
                  <strong>Patient Mobile Number :</strong>
                  {item.pnumber} <br />
                  <strong>Appointment Date :</strong>
                  {item.pdate} <br />
                  <strong>Special Details :</strong>
                  {item.pcomments}
            
                    </li>
                  ))}
                  
                </p>
                {appointment.isAppointmentFinished ? (
                  <MessageBox variant="success">
                    Appointment has been completed
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">
                    Appointment has not been completed
                  </MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2> Payment</h2>
                <p>
                  <strong>Method :</strong> {appointment.paymentMethod}
                </p>
                {appointment.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {appointment.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not paid</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2> Doctor Details</h2>
                <ul>
                  {appointment.appointmentDoctors.map((item) => (
                    <li key={item.doctor}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/doctor/${item.doctor}`}>{item.name}</Link>
                        </div>
                        <div>{item.specialty}</div>
                        <div>{item.price} LKR</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>
                    <strong>Total Fee Including TAX & Hospital Fees</strong>
                  </div>
                  <strong>{appointment.totalPrice} LKR </strong>
                </div>
              </li>
              {!appointment.isPaid && (
                <li>
                  {!setSdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={appointment.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin &&  !appointment.isAppointmentFinished && (
                <li>
                  {loadingFinish && <LoadingBox></LoadingBox>}
                  {errorFinish && (
                    <MessageBox variant="danger">{errorFinish}</MessageBox>
                  )}
                  <button
                  type="button"
                  className="primary block"
                  onClick = {appointmentFinishHandler}>
                    Finish Appointment
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
