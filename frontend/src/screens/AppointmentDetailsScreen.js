import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAppointmentDetails } from "../actions/billingAction";
import ConfirmationSteps from "../components/AppConfirmationSteps";

export default function AppointmentDetailsScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} =userSignin;
    const billing = useSelector(state => state.billing);
    const {appointmentDetails} = billing;
    if(!userInfo){
        props.history.push('/signin')
    }
  const [pfullName, setPfullName] = useState(appointmentDetails.pfullName);
  const [pnic, setPnic] = useState(appointmentDetails.pnic);
  const [paddress, setPaddress] = useState(appointmentDetails.paddress);
  const [pnumber, setPnumber] = useState(appointmentDetails.pnumber);
  const [pdate, setPdate] = useState('');
  const [pcomments, setPcomments] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveAppointmentDetails({pfullName, pnic, paddress, pnumber, pdate, pcomments}));
    props.history.push('/payment')
    // TODO
  };
  return (
    <div>
      <ConfirmationSteps step1 step2></ConfirmationSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Patient Details for the Appointment</h1>
        </div>
        <div>
          <label htmlFor="pfullName">Full Name</label>
          <input
            type="text"
            id="pfullName"
            placeholder="Enter patient full name"
            value={pfullName}
            onChange={(e) => setPfullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="pnic">National Identity Card Number </label>
          <input
            type="text"
            id="pnic"
            placeholder="Enter patient pnic Number"
            value={pnic}
            onChange={(e) => setPnic(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="pnumber">Mobile Phone Number </label>
          <input
            type="text"
            id="pnumber"
            placeholder="Enter Mobile Number"
            value={pnumber}
            onChange={(e) => setPnumber(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter patient address"
            value={paddress}
            onChange={(e) => setPaddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="pdate">Date</label>
          <input
            type="date"
            id="pdate"
            placeholder="Enter a date for appointment"
            value={pdate}
            onChange={(e) => setPdate(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="pcomments">Comments</label>
          <input
            type="text"
            id="pcomments"
            placeholder="Enter Special Comments If There"
            value={pcomments}
            onChange={(e) => setPcomments(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
