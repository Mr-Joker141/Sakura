import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationSteps from "../components/AppConfirmationSteps";
import { Link } from "react-router-dom";
import { createAppointment } from "../actions/appointmentActions";
import { APPOINTMENT_CREATE_RESET } from "../constants/appointmentConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function MakeAppointmentScreen(props) {
  const billing = useSelector((state) => state.billing);
  if (!billing.paymentMethod) {
    props.history.push("/payment");
  }
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { loading, success, error, appointment } = appointmentCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  billing.itemsPrice = toPrice(
    billing.billingItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  billing.appointmentPrice =
    billing.itemsPrice > 1 ? toPrice(10) : toPrice(100);
  billing.taxPrice = toPrice(0.3 * billing.itemsPrice);
  billing.totalPrice =
    billing.itemsPrice + billing.appointmentPrice + billing.taxPrice;
  const dispatch = useDispatch();
  const makeAppointmentHandler = () => {
    dispatch(
      createAppointment({
        ...billing,
        appointmentDoctors: billing.billingItems,
      })
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/appointment/${appointment._id}`);
      dispatch({ type: APPOINTMENT_CREATE_RESET });
    }
  }, [dispatch, appointment, props.history, success]);
  return (
    <div>
      <ConfirmationSteps step1 step2 step3 step4></ConfirmationSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2> Appointment</h2>
                <p>
                  <strong>Patient Name :</strong> {billing.appointmentDetails.pfullName} <br />
                  <strong>Patient nic : </strong> {billing.appointmentDetails.pnic} <br />
                  <strong>Patient Address :</strong> {billing.appointmentDetails.paddress} <br />
                  <strong>Patient Mobile Number :</strong> {billing.appointmentDetails.pnumber} <br />
                  <strong>Appointment Date :</strong> {billing.appointmentDetails.pdate} <br />
                  <strong>Special Details :</strong> {billing.appointmentDetails.pcomments}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2> Payment</h2>
                <p>
                  <strong>Method :</strong> {billing.paymentMethod}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2> Doctor Details</h2>
                <ul>
                  {billing.billingItems.map((item) => (
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
                  <strong>{billing.totalPrice} LKR </strong>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={makeAppointmentHandler}
                  className="primary block"
                  disabled={billing.billingItems.length === 0}
                >
                  Make Appointment
                </button>
              </li>
              
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant = "danger">{error}</MessageBox>}
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
