import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDoctor, listDoctors, deleteDoctor } from "../actions/doctorActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DOCTOR_CREATE_RESET, DOCTOR_DELETE_RESET } from "../constants/doctorConstants";

export default function DoctorListScreen(props) {
  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;

  const doctorCreate = useSelector((state) => state.doctorCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    doctor: createdDoctor,
  } = doctorCreate;

  const doctorDelete = useSelector((state) => state.doctorDelete);
   const {
     loading: loadingDelete,
     error: errorDelete,
     success: successDelete,
   } = doctorDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: DOCTOR_CREATE_RESET });
      props.history.push(`/doctor/${createdDoctor._id}/edit`);
    }
    if (successDelete) {
      dispatch({type: DOCTOR_DELETE_RESET});
    }
    dispatch(listDoctors({}));
  }, [createdDoctor, dispatch, props.history, successCreate, successDelete]);
  const deleteHandler = (doctor) => {
    // TODO : dispatch delete action
    if(window.confirm('Are you sure to delete ?')){
      dispatch(deleteDoctor(doctor._id));
    }
  };
  const createHandler = () => {
    dispatch(createDoctor());
  };
  return (
    <div>
      <div className="row">
        <h1>Doctors</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Doctor
        </button>
      </div>
      
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Doctor Record Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Doctor Name</th>
              <th>Doctor Fee</th>
              <th>Doctor Specialty</th>
              <th>Doctor Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor._id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.price}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.description}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/doctor/${doctor._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(doctor)}
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
