// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'doctor', 'patient'], required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor', 'patient'], required: true },
  image: { type: String }, // Path to the uploaded image (for doctors)
  specialist: { type: String }, // Doctor's specialty (e.g., "Cardiologist", "Neurologist")
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);