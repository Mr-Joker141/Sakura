import React, { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import Chart from 'react-google-charts';
 import { summaryAppointments } from '../actions/appointmentActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';

 export default function DashboardScreen() {
   const appointmentSummary = useSelector((state) => state.appointmentSummary);
   const { loading, summary, error } = appointmentSummary;
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(summaryAppointments());
   }, [dispatch]);
   return (
     <div>
       <div className="row">
         <h1>Dashboard</h1>
       </div>
       {loading ? (
         <LoadingBox />
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <>
           <ul className="row summary">
             <li>
               <div className="summary-title color1">
                 <span>
                   <i className="fa fa-users" /> Users
                 </span>
               </div>
               <div className="summary-body">{summary.appointmentusers[0].numUsers}</div>
             </li>
             <li>
               <div className="summary-title color2">
                 <span>
                   <i className="fa fa-shopping-cart" /> Appointments
                 </span>
               </div>
               <div className="summary-body">
                 {summary.appointments[0] ? summary.appointments[0].numAppointments : 0}
               </div>
             </li>
             <li>
               <div className="summary-title color3">
                 <span>
                   <i className="fa fa-money" /> Total appointment cost
                 </span>
               </div>
               <div className="summary-body">
                 $
                 {summary.appointments[0]
                   ? summary.appointments[0].totalFee.toFixed(2)
                   : 0}
               </div>
             </li>
           </ul>
           <div>
             <div>
               <h2>Appointment cost</h2>
               {summary.dailyAppointments.length === 0 ? (
                 <MessageBox>No Appointments</MessageBox>
               ) : (
                 <Chart
                   width="100%"
                   height="400px"
                   chartType="AreaChart"
                   loader={<div>Loading Chart</div>}
                   data={[
                     ['Date', 'Cost'],
                     ...summary.dailyAppointments.map((x) => [x._id, x.sales]),
                   ]}
                 ></Chart>
               )}
             </div>
           </div>
           <div>
             <h2>Specialties</h2>
             {summary.doctorCategories.length === 0 ? (
               <MessageBox>No Category</MessageBox>
             ) : (
               <Chart
                 width="100%"
                 height="400px"
                 chartType="PieChart"
                 loader={<div>Loading Chart</div>}
                 data={[
                   ['Category', 'Doctors'],
                   ...summary.doctorCategories.map((x) => [x._id, x.count]),
                 ]}
               />
             )}
           </div>
         </>
       )}
     </div>
   );
 }