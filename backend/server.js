// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const appointmentRoutes = require('./routes/appointment');
// const paymentRoutes = require('./routes/payment');
// const adminRoutes = require('./routes/admin');
// const cors = require('cors');
// const path = require('path'); // Required for handling file paths
// require('dotenv').config();

// const app = express();

// // Connect to MongoDB
// connectDB();
// app.use(cors());

// // Middleware
// app.use(express.json());

// // Serve static files (images) from the uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/admin', adminRoutes);

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointment');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files (images) from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
