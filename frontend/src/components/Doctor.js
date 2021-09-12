import React from "react";
import {Link} from 'react-router-dom'


export default function Doctor(props) {
  const { doctor } = props;
  return (
    <div>
      <div key={doctor._id} className="card">
        <Link to={`/doctor/${doctor._id}`}>
          <img className="medium" src={doctor.image} alt="doctor"></img>
        </Link>
        <div className="card-body">
        <h3>{doctor.specialty}</h3>

          <Link to={`/doctor/${doctor._id}`}>
            <h2>{doctor.name}</h2>
          </Link>
          
          <div className="price">Rs.{doctor.price}</div>
        </div>
      </div>
    </div>
  );
}
