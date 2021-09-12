import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAppointment,
  listAppointments,
} from "../actions/appointmentActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { APPOINTMENT_DELETE_RESET } from "../constants/appointmentConstants";

export default function AppointmentListScreen(props) {
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;
  const appointmentDelete = useSelector((state) => state.appointmentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = appointmentDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: APPOINTMENT_DELETE_RESET });
    dispatch(listAppointments());
  }, [dispatch, successDelete]);
  const deleteHandler = (appointment) => {
    if (window.confirm("Are you sure to delete this appointment record ?")) {
      dispatch(deleteAppointment(appointment._id));
    }
  };

  return (
    <div>
      <h1>Appointments</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>APPOINTMENT ID</th>
              <th>APPOINTMENT BOOKED BY</th>
              <th>PATIENT NAME</th>
              <th>DOCTOR NAME</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>CONFIRMED</th>
              <th>COMPLETED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment._id}</td>
                <td>{appointment.user ? appointment.user.name : 'Deleted User'}</td>
                <td>{appointment.appointmentDetails.map((item) => (
                    <li1 key={item}>
                        <div >
                          {item.pfullName}
                        </div>
                    </li1>
                  ))}</td>
                <td>{appointment.appointmentDoctors.map((item) => (
                    <li1 key={item.doctor}>
                        <div >
                          <Link to={`/doctor/${item.doctor}`}>{item.name}</Link>
                        </div>
                    </li1>
                  ))}</td>
                <td>{appointment.createdAt.substring(0, 10)}</td>
                <td>{appointment.totalPrice.toFixed(2)}</td>
                <td>
                  {appointment.isPaid
                    ? appointment.paidAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  {appointment.isPaid
                    ? appointment.paidAt.substring(0, 10)
                    : "No"}
                </td>
                
                <td>{appointment.isAppointmentFinished ? "Yes" : "No"}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/appointment/${appointment._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(appointment)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
