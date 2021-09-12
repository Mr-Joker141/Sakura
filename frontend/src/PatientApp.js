import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { signout } from "./actions/appUserActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import AppointmentDetailsScreen from "./screens/AppointmentDetailsScreen";
import AppointmentHistory from "./screens/AppointmentHistory";
import AppointmentScreen from "./screens/AppointmentScreen";
import BillingScreen from "./screens/BillingScreen";
import DoctorScreen from "./screens/DoctorScreen";
import AppHomeScreen from "./screens/AppHomeScreen";
import MakeAppointmentScreen from "./screens/MakeAppointmentScreen";
import DoctorListScreen from "./screens/DoctorListScreen";
import AppPaymentMethodScreen from "./screens/AppPaymentMethodScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import DoctorEditScreen from "./screens/DoctorEditScreen";
import AppointmentListScreen from "./screens/AppointmentListScreen";
import AppUserListScreen from "./screens/AppUserListScreen";
import AppUserEditScreen from "./screens/AppUserEditScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import { listDoctorCategories } from "./actions/doctorActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";

function PatientApp() {
  const billing = useSelector((state) => state.billing);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { billingItems } = billing;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const doctorCategoryList = useSelector((state) => state.doctorCategoryList);
   const {
     loading: loadingCategories,
     error: errorCategories,
     categories,
   } = doctorCategoryList;
   useEffect(() => {
     dispatch(listDoctorCategories());
   }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
          <button
               type="button"
               className="open-sidebar"
               onClick={() => setSidebarIsOpen(true)}
             >
               <i className="fa fa-bars"></i>
             </button>
            <Link className="brand" to="/">
              Appointments
            </Link>
          </div>
          <div>
             <Route
               render={({ history }) => (
                 <SearchBox history={history}></SearchBox>
               )}
             ></Route>
           </div>
          <div>
            <Link to="/billing">
              Billing
              {billingItems.length > 0 && (
                <span className="badge">{billingItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/appointmenthistory">Appointment History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/doctorlist">Doctors</Link>
                  </li>
                  <li>
                    <Link to="/appointmentlist">Appointments</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                     <Link to="/support">Support</Link>
                   </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
           <ul className="categories">
             <li>
               <strong>Doctor Specialty</strong>
               <button
                 onClick={() => setSidebarIsOpen(false)}
                 className="close-sidebar"
                 type="button"
               >
                 <i className="fa fa-close"></i>
               </button>
             </li>
             {loadingCategories ? (
               <LoadingBox></LoadingBox>
             ) : errorCategories ? (
               <MessageBox variant="danger">{errorCategories}</MessageBox>
             ) : (
               categories.map((c) => (
                 <li key={c}>
                   <Link
                     to={`/search/category/${c}`}
                     onClick={() => setSidebarIsOpen(false)}
                   >
                     {c}
                   </Link>
                 </li>
               ))
             )}
           </ul>
         </aside>
        <main>
          <Route path="/billing/:id?" component={BillingScreen}></Route>
          <Route path="/doctor/:id" component={DoctorScreen} exact></Route>
          <Route
            path="/doctor/:id/edit"
            component={DoctorEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route
            path="/appointmentsdetails"
            component={AppointmentDetailsScreen}
          ></Route>
          <Route path="/payment" component={AppPaymentMethodScreen}></Route>
          <Route
            path="/makeappointment"
            component={MakeAppointmentScreen}
          ></Route>
          <Route path="/appointment/:id" component={AppointmentScreen}></Route>
          <Route
            path="/appointmenthistory"
            component={AppointmentHistory}
          ></Route>
          <Route
             path="/search/name/:name?"
             component={SearchScreen}
             exact
           ></Route>
            <Route
             path="/search/category/:category"
             component={SearchScreen}
             exact
           ></Route>
           <Route
             path="/search/category/:category/name/:name/"
             component={SearchScreen}
             exact
           ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/doctorlist"
            component={DoctorListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/appointmentlist"
            component={AppointmentListScreen}
          ></AdminRoute>
          <AdminRoute path="/userlist" component={AppUserListScreen}></AdminRoute>
          <AdminRoute
             path="/dashboard"
             component={DashboardScreen}
           ></AdminRoute>
           <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
          <AdminRoute
             path="/user/:id/edit"
             component={AppUserEditScreen}
           ></AdminRoute>
          <Route path="/" component={AppHomeScreen} exact></Route>
        </main>
        <footer className="row center">
           {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
           <div>All right reserved</div>{' '}
         </footer>
      </div>
    </BrowserRouter>
  );
}

export default PatientApp;
