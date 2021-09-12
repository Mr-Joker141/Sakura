import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { detailsDoctor, updateDoctor } from "../actions/doctorActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DOCTOR_UPDATE_RESET } from "../constants/doctorConstants";

export default function DoctorEditScreen(props) {
  const doctorId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [bookingAvailable, setbookingAvailable] = useState("");
  const [specialty, setspecialty] = useState("");
  const [description, setDescription] = useState("");

  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { loading, error, doctor } = doctorDetails;

  const doctorUpdate = useSelector((state) => state.doctorUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = doctorUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/doctorlist");
    }
    if (!doctor || doctor._id !== doctorId || successUpdate) {
      dispatch({ type: DOCTOR_UPDATE_RESET });
      dispatch(detailsDoctor(doctorId));
    } else {
      setName(doctor.name);
      setPrice(doctor.price);
      setImage(doctor.image);
      setCategory(doctor.category);
      setbookingAvailable(doctor.bookingAvailable);
      setspecialty(doctor.specialty);
      setDescription(doctor.description);
    }
  }, [doctor, dispatch, doctorId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update doctor
    dispatch(
      updateDoctor({
        _id: doctorId,
        name,
        price,
        image,
        category,
        specialty,
        bookingAvailable,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
   const [errorUpload, setErrorUpload] = useState('');

   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
   const uploadFileHandler = async (e) => {
     const file = e.target.files[0];
     const bodyFormData = new FormData();
     bodyFormData.append('image', file);
     setLoadingUpload(true);
     try {
       const { data } = await Axios.post('/api/uploads', bodyFormData, {
         headers: {
           'Content-Type': 'multipart/form-data',
           Authorization: `Bearer ${userInfo.token}`,
         },
       });
       setImage(data);
       setLoadingUpload(false);
     } catch (error) {
       setErrorUpload(error.message);
       setLoadingUpload(false);
     }
   };


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Doctor Details {doctorId}</h1>
        </div>

        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>

            <div>
               <label htmlFor="image">Image File</label>
               <input
                 type="file"
                 id="image"
                 label="Choose Image"
                 onChange={uploadFileHandler}
               ></input>
               {loadingUpload && <LoadingBox></LoadingBox>}
               {errorUpload && (
                 <MessageBox variant="danger">{errorUpload}</MessageBox>
               )}
             </div>

            <div>
              <label htmlFor="category">Specialty</label>
              <input
                id="category"
                type="text"
                placeholder="Enter Specialty"
                value={category}
                onChange={(e) => {setCategory(e.target.value); setspecialty(e.target.value)}}
              ></input>
            </div>
            {/* <div>
              <label htmlFor="specialty">Specialty</label>
              <input
                id="specialty"
                type="text"
                placeholder="Enter specialty"
                value={specialty}
                onChange={(e) => setspecialty(e.target.value)}
              ></input>
            </div> */}
            <div>
              <label htmlFor="bookingAvailable">Booking Available</label>
              <input
                id="bookingAvailable"
                type="text"
                placeholder="Enter booking count"
                value={bookingAvailable}
                onChange={(e) => setbookingAvailable(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
