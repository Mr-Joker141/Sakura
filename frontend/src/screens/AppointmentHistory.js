import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { listAppointmentMine } from '../actions/appointmentActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AppointmentHistory(props) {
    const appointmentMineList = useSelector(state => state.appointmentMineList);
    const {loading, error, appointments} = appointmentMineList;
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(listAppointmentMine());
    },[dispatch]);
    return (
        <div>
            <h1>Appointment History</h1>
            {loading? <LoadingBox></LoadingBox>:
            error? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>APPOINTMENT ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>IS APPOINTMENT COMPLETED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) =>(
                            <tr key={appointment._id}>
                                <td>{appointment._id}</td>
                                <td>{appointment.createdAt.substring(0, 10)}</td>
                                <td>{appointment.totalPrice}</td>
                                <td>{appointment.isPaid? appointment.paidAt.substring(0, 10): 'No'}</td>
                                <td>{appointment.isAppointmentFinished? 'Yes': 'No'}</td>
                                <td>
                                    <button type="button" className="small"
                                    onClick={() => {props.history.push(`/appointment/${appointment._id}`)}}>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        
            }
        </div>
    )
}
