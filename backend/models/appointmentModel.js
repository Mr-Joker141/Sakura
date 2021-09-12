import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentDoctors: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
          required: true,
        },
      },
    ],

    appointmentDetails: [
      {
        pfullName: { type: String, required: true },
        pnic: { type: String, required: true },
        paddress: { type: String, required: true },
        pnumber: { type: String, required: true },
        pdate: { type: Date, required: true },
        pcomments: { type: String, required: true },
      },
    ],

    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    appointmentPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isAppointmentFinished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
