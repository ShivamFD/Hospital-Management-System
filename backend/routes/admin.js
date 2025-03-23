// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const multer = require('multer');
// const Appointment = require('../models/Appointment');
// const User = require('../models/User');
// const Report = require('../models/Report');

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// // Admin Dashboard Stats
// router.get('/dashboard', auth, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
//   try {
//     const patients = await User.countDocuments({ role: 'patient' });
//     const appointments = await Appointment.find().populate('patientId', 'name').populate('doctorId', 'name');
//     const totalIncome = appointments.reduce((sum, appt) => (appt.status === 'completed' ? sum + 500 : sum), 0); // Example: ₹500 per appointment
//     res.json({ patients, appointments, totalIncome });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Upload Patient Report
// router.post('/upload-report', auth, upload.single('report'), async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
//   const { patientId } = req.body;
//   try {
//     const report = new Report({
//       patientId,
//       filePath: req.file.path,
//       uploadedBy: req.user.id,
//     });
//     await report.save();
//     res.json({ msg: 'Report uploaded', report });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Change Password
// router.put('/change-password', auth, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
//   const { oldPassword, newPassword } = req.body;
//   try {
//     const user = await User.findById(req.user.id);
//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid old password' });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();
//     res.json({ msg: 'Password changed successfully' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Report = require('../models/Report');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Admin Dashboard Stats
router.get('/dashboard', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
  try {
    const patients = await User.countDocuments({ role: 'patient' });
    const appointments = await Appointment.find().populate('patientId', 'name').populate('doctorId', 'name');
    const totalIncome = appointments.reduce((sum, appt) => (appt.status === 'completed' ? sum + 500 : sum), 0);
    res.json({ patients, appointments, totalIncome });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Upload Patient Report
router.post('/upload-report', auth, upload.single('report'), async (req, res) => {
  // if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
  const { patientId } = req.body;
  try {
    const report = new Report({
      patientId,
      filePath: req.file.path,
      uploadedBy: req.user.id,
    });
    await report.save();
    res.json({ msg: 'Report uploaded', report });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Change Password
router.put('/change-password', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid old password' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add Doctor (Admin Only)
router.post('/add-doctor', auth, upload.single('image'), async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    const { name, email, password, specialist } = req.body; // Add specialist
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'Doctor already exists' });
  
      user = new User({
        name,
        email,
        password,
        role: 'doctor',
        image: req.file ? req.file.path : null,
        specialist, // Save specialist field
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
  
      res.json({
        msg: 'Doctor added successfully',
        doctor: { id: user.id, name, email, image: user.image, specialist },
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
module.exports = router;