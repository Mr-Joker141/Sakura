import express from "express";
import expressAsyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";
import User from '../models/appUserModel.js';
import Doctor from '../models/doctorModel.js';
import { isAdmin, isAuth, mailgun, payAppointmentEmailTemplate } from "../utilities.js";

const appointmentRouter = express.Router();

appointmentRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const appointments = await Appointment.find({}).populate("user", "name");
    res.send(appointments);
  })
);

appointmentRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const appointments = await Appointment.aggregate([
      {
        $group: {
          _id: null,
          numAppointments: { $sum: 1 },
          totalFee: { $sum: '$totalPrice' },
        },
      },
    ]);
    const appointmentusers = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyAppointments = await Appointment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          appointments: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const doctorCategories = await Doctor.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ appointmentusers, appointments, dailyAppointments, doctorCategories });
  })
);

appointmentRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ user: req.user._id });
    res.send(appointments);
  })
);

appointmentRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.appointmentDoctors.length === 0) {
      res.status(400).send({ message: "No doctors selected" });
    } else {
      const appointment = new Appointment({
        appointmentDoctors: req.body.appointmentDoctors,
        appointmentDetails: req.body.appointmentDetails,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        appointmentPrice: req.body.appointmentPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdAppointment = await appointment.save();
      res.status(201).send({
        message: "New Appointment Created",
        appointment: createdAppointment,
      });
    }
  })
);

appointmentRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      res.send(appointment);
    } else {
      res.status(404).send({ message: "Appointment Details not found" });
    }
  })
);

appointmentRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (appointment) {
      appointment.isPaid = true;
      appointment.paidAt = Date.now();
      appointment.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedAppointment = await appointment.save();
      mailgun()
         .messages()
         .send(
           {
             from: 'Sakura <mg.nadunsewmina@gmail.com>',
             to: `${appointment.user.name} <${appointment.user.email}>`,
             subject: `New Appointment ${appointment._id}`,
             html: payAppointmentEmailTemplate(appointment),
           },
           (error, body) => {
             if (error) {
               console.log(error);
             } else {
               console.log(body);
             }
           }
         );
      res.send({
        message: "Appointment Fee is paid",
        appointment: updatedAppointment,
      });
    } else {
      res.status(404).send({ message: "Appointment details not found" });
    }
  })
);

appointmentRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      const deleteAppointment = await appointment.remove();
      res.send({
        message: "Appointment Deleted",
        appointment: deleteAppointment,
      });
    } else {
      res.status(404).send({ message: "Appointment details not found" });
    }
  })
);

appointmentRouter.put(
  "/:id/appointmentfinish",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (appointment) {
      appointment.isAppointmentFinished = true;

      const updatedAppointment = await appointment.save();

      mailgun()
         .messages()
         .send(
           {
             from: 'Sakura <mg.nadunsewmina@gmail.com>',
             to: `${appointment.user.name} <${appointment.user.email}>`,
             subject: `New Appointment ${appointment._id}`,
             html: payAppointmentEmailTemplate(appointment),
           },

      res.send({
        message: "Appointment Completed",
        appointment: updatedAppointment,
      }))
    } else {
      res.status(404).send({ message: "Appointent Details Not Found" });
    }
  })
);
export default appointmentRouter;
