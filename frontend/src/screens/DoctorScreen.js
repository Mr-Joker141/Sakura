import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { detailsDoctor } from "../actions/doctorActions";
import { useState } from "react";

export default function DoctorScreen(props) {
  const dispatch = useDispatch();
  const doctorId = props.match.params.id;
  const [ qty ] = useState(1);
  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { loading, error, doctor } = doctorDetails;

  useEffect(() => {
    dispatch(detailsDoctor(doctorId));
  }, [dispatch, doctorId]);

  const addToBillingHandler = () => {
    props.history.push(`/billing/${doctorId}?qty=${qty}`)
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/"> Back to Appointment Making</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={doctor.image} alt={doctor.name}></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{doctor.name}</h1>
                </li>
                <li>Specialty : {doctor.category}</li>
                <li>Price : Rs.{doctor.price}</li>
                <li>
                  <p>Description : {doctor.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">Rs.{doctor.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {doctor.bookingAvailable > 0 ? (
                          <span className="success">Booking available</span>
                        ) : (
                          <span className="danger">
                            No appointments available
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                  {doctor.bookingAvailable > 0 && (
                    <>
                      <li>
                        <button onClick={addToBillingHandler} className="primary block">
                          Make an Appointment
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
