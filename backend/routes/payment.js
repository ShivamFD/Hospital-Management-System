// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Razorpay = require('razorpay');
// require('dotenv').config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Payment Order
// router.post('/create-order', auth, async (req, res) => {
//   if (req.user.role !== 'patient') return res.status(403).json({ msg: 'Access denied' });
//   const { amount } = req.body; // Amount in INR (e.g., 500 for ₹500)
//   try {
//     const options = {
//       amount: amount * 100, // Razorpay expects amount in paise
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//     };
//     const order = await razorpay.orders.create(options);
//     res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
//   } catch (err) {
//     res.status(500).json({ msg: 'Payment error' });
//   }
// });

// module.exports = router;
// routes/payments.js
// routes/payments.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

// Initialize Razorpay instance using your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,       // e.g., rzp_test_ABC123XYZ
  key_secret: process.env.RAZORPAY_KEY_SECRET, // e.g., YourKeySecret
});

// Endpoint to create an order
router.post('/create-order', async (req, res) => {
  try {
    const { appointmentId, amount } = req.body; // amount in paise
    const options = {
      amount: amount,           // e.g., 50000 for INR 500
      currency: "INR",
      receipt: `receipt_order_${appointmentId}`,
    };

    const order = await razorpay.orders.create(options);
    return res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ msg: 'Error creating Razorpay order' });
  }
});

// Endpoint to verify payment signature
router.post('/verify', (req, res) => {
  try {
    const { appointmentId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    // Generate expected signature using your key secret
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      // Payment is verified
      return res.json({ status: 'success' });
    } else {
      return res.status(400).json({ status: 'failure', msg: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ msg: 'Error verifying payment' });
  }
});

module.exports = router;
