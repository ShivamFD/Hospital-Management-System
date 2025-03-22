const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Book Appointment (Patient)
router.post('/book', auth, async (req, res) => {
  if (req.user.role !== 'patient') return res.status(403).json({ msg: 'Access denied' });
  const { doctorId, date } = req.body;
  try {
    const appointment = new Appointment({
      patientId: req.user.id,
      doctorId,
      date,
    });
    await appointment.save();
    res.json({ msg: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/doctors', async (req, res) => {
    try {
      const doctors = await User.find({ role: 'doctor' }).select('name email specialist image');
      res.json(doctors);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });



  // Get Appointment Status (Patient)
router.get('/status/:appointmentId', auth, async (req, res) => {
  if (req.user.role !== 'patient') return res.status(403).json({ msg: 'Access denied' });
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment || appointment.patientId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    res.json({ status: appointment.status });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});







router.get('/my-appointments', auth, async (req, res) => {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ msg: 'Access denied' });
    }
  
    try {
      const appointments = await Appointment.find({ patientId: req.user.id })
        .populate('doctorId', 'name specialist image') // Populate doctor details
        .sort({ date: -1 }); // Sort by date, newest first
      if (!appointments.length) {
        return res.status(200).json([]); // Return empty array if no appointments
      }
      res.json(appointments);
    } catch (err) {
      console.error('Error fetching patient appointments:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  });





// View Appointments (Doctor)
router.get('/doctor', auth, async (req, res) => {
  if (req.user.role !== 'doctor') return res.status(403).json({ msg: 'Access denied' });
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id }).populate('patientId', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Accept Appointment (Doctor)
router.put('/accept/:id', auth, async (req, res) => {
  if (req.user.role !== 'doctor') return res.status(403).json({ msg: 'Access denied' });
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment || appointment.doctorId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    appointment.status = 'accepted';
    await appointment.save();
    res.json({ msg: 'Appointment accepted', appointment });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;