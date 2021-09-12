import React from 'react'

export default function ConfirmationSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active': ''}>Sign-In</div>
            <div className={props.step2 ? 'active': ''}>Patient Details</div>
            <div className={props.step3 ? 'active': ''}>Payment</div>
            <div className={props.step4 ? 'active': ''}>Make an appointment</div>
        </div>
    )
}
