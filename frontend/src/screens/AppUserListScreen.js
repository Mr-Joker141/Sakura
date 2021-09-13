import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/appUserActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";

export default function AppUserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, appointmentusers } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
        type: USER_DETAILS_RESET,
      });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>NIC</th>
              <th>AGE</th>
              <th>ADDRESS</th>
              <th>NUMBER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {appointmentusers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.nic}</td>
                <td>{user.age}</td>
                <td>{user.address}</td>
                <td>{user.number}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>
                <button
                     type="button"
                     className="small"
                     onClick={() => props.history.push(`/user/${user._id}/edit`)}
                   >
                     Edit
                   </button>
                   <button
                     type="button"
                     className="small"
                     onClick={() => deleteHandler(user)}
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
