import jwt from "jsonwebtoken";
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "x435sedfrg67thiuj9k8jutgf6ec6f5ogufy",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "x435sedfrg67thiuj9k8jutgf6ec6f5ogufy",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

export const mailgun = () =>
   mg({
     apiKey: process.env.MAILGUN_API_KEY,
     domain: process.env.MAILGUN_DOMIAN,
   });

 export const payAppointmentEmailTemplate = (appointment) => {
   return `<h1>We Always Care About You</h1>
   <p>
   Hi ${appointment.user.name},</p>
   <p>We have finished making your appointment with the doctor ${appointment.appointmentDoctors
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    </tr>
  `
    )
    .join('\n')} </p>
   <h2>[Appointment ID ${appointment._id}] is made at (${appointment.createdAt.toString().substring(0, 10)})</h2>
   <table>
   <thead>
   <tr>
   <td><strong>Doctor Name</strong></td>
   <td><strong align="right"> & Doctor Fee</strong></td>
   </thead>
   <tbody>
   ${appointment.appointmentDoctors
     .map(
       (item) => `
     <tr>
     <td>${item.name}</td>
     <td align="right"> $${item.price.toFixed(2)}</td>
     </tr>
   `
     )
     .join('\n')}
   </tbody>
   <tfoot>
   <tr>
   <td colspan="2">Doctor Fee:</td>
   <td align="right"> Rs. ${appointment.itemsPrice.toFixed(2)}</td>
   </tr>
   <tr>
   <td colspan="2">Tax Fee:</td>
   <td align="right"> Rs. ${appointment.taxPrice.toFixed(2)}</td>
   </tr>
   <tr>
   <td colspan="2">Hospital Fee:</td>
   <td align="right"> Rs. ${appointment.appointmentPrice.toFixed(2)}</td>
   </tr>
   <tr>
   <td colspan="2"><strong>Total Fee:</strong></td>
   <td align="right"><strong> Rs. ${appointment.totalPrice.toFixed(2)}</strong></td>
   </tr>
   <tr>
   <td colspan="2">Payment Method:</td>
   <td align="right">${appointment.paymentMethod}</td>
   </tr>
   </table>

   <h2>Patient Details</h2>
   
   <p>
   ${appointment.appointmentDetails
    .map(
      (item) => `
    <tr>
    <tr>
   <td colspan="2">Patient Name:</td>
   <td align="right"> ${item.pfullName}</td>
   </tr>
   <tr>
   <td colspan="2">Patient NIC Number:</td>
   <td align="right"> ${item.pnic}</td>
   </tr>
   <tr>
   <td colspan="2">Patient Address:</td>
   <td align="right"> ${item.paddress}</td>
   </tr>
   <tr>
   <td colspan="2">Patient Contact Number:</td>
   <td align="right"> ${item.pnumber}</td>
   </tr>
   <tr>
   <td colspan="2">Date Of the Appointment:</td>
   <td align="right">${item.pdate}</td>
   </tr>
   <tr>
   <td colspan="2">Special Details About the Patient:</td>
   <td align="right">${item.pcomments}</td>
   </tr>
    
    </tr>
  `
    )}

</p>
 
  <hr/>
   <p>
   Thanks for making appointments with sakura hospitals.
   </p>
   `;
 };
