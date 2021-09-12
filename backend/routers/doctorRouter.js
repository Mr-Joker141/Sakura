import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Doctor from '../models/doctorModel.js';
import { isAdmin, isAuth } from '../utilities.js';

const doctorRouter = express.Router();

doctorRouter.get('/', expressAsyncHandler(async(req, res)=>{

  const name = req.query.name || '';
  const category = req.query.category || '';

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const categoryFilter = category ? { category } : {};

    const doctors = await Doctor.find({
      ...nameFilter,
      ...categoryFilter,
    });
    res.send (doctors);
}));

doctorRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Doctor.find().distinct('category');
    res.send(categories);
  })
);


doctorRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    //await Doctor.remove({});
    const createdDoctors = await Doctor.insertMany(data.doctors);
    res.send({createdDoctors});
}));

doctorRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const doctor = await Doctor.findById(req.params.id);
    if(doctor){
        res.send(doctor);
    }else{
        res.status(404).send({message: 'Doctor details not available'})
    }
}))

doctorRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const doctor = new Doctor({
        name: 'doctor name ' + Date.now(),
        image: '/images/img.jpg',
        price: 0,
        category: 'sample category',
        specialty: 'sample specialty',
        bookingAvailable: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
      });
      const createdDoctor = await doctor.save();
      res.send({ message: 'Doctor Added', doctor: createdDoctor });
    })
  );

  doctorRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const doctorId = req.params.id;
      const doctor = await Doctor.findById(doctorId);
      if (doctor) {
        doctor.name = req.body.name;
        doctor.price = req.body.price;
        doctor.image = req.body.image;
        doctor.category = req.body.category;
        doctor.specialty = req.body.specialty;
        doctor.bookingAvailable = req.body.bookingAvailable;
        doctor.description = req.body.description;
        const updatedDoctor = await doctor.save();
        res.send({ message: 'Doctor Details Updated', doctor: updatedDoctor });
      } else {
        res.status(404).send({ message: 'Doctor Details Not Found' });
      }
    })
  );

  doctorRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {

      const doctor = await Doctor.findById(req.params.id);
      if (doctor) {
        const deleteDoctor = await doctor.remove();
        res.send({ message: 'Doctor Record Deleted', doctor: deleteDoctor });
      } else {
        res.status(404).send({ message: 'Doctor Record Not Found' });
      }
    })
  );

export default doctorRouter;