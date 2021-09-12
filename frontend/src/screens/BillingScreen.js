import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBilling, removeFromBilling } from "../actions/billingAction";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

export default function BillingScreen(props) {
  const doctorId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const billing = useSelector((state) => state.billing);
  const { billingItems } = billing;
  const dispatch = useDispatch();
  useEffect(() => {
    if (doctorId) {
      dispatch(addToBilling(doctorId, qty));
    }
  }, [dispatch, doctorId, qty]);
  const removeFromBillingHandler = (id) => {
    dispatch(removeFromBilling(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=appointmentsdetails');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Appointment Confirmation section</h1>
        {billingItems.length === 0 ? (
          <MessageBox>
            There is no appointments selected.{" "}
            <Link to="/"> Make An Appointment</Link>
          </MessageBox>
        ) : (
          <ul>
            {billingItems.map((item) => (
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
                  <div>
                    <div>{item.specialty}</div>
                  </div>
                  <div>
                    <div>{item.price} LKR</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromBillingHandler(item.doctor)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({billingItems.reduce((a, c) => a + c.qty, 0)} items) :
                {billingItems.reduce((a, c) => a + c.price * c.qty, 0)} LKR
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={billingItems.length === 0}
              >
                Proceed to making appointments
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
