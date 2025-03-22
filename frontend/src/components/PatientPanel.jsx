import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-top: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const PatientPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/doctors`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setDoctors(res.data);
    };
    fetchDoctors();
  }, []);

  const bookAppointment = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/appointments/book`,
        { doctorId, date },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      alert('Appointment booked');
    } catch (err) {
      alert('Failed to book appointment');
    }
  };

  const handlePayment = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/payment/create-order`,
      { amount: 500 },
      { headers: { 'x-auth-token': localStorage.getItem('token') } }
    );
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: res.data.amount,
      currency: res.data.currency,
      order_id: res.data.orderId,
      handler: () => alert('Payment successful'),
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Container>
      <Title>Patient Dashboard</Title>
      <div>
        <SectionTitle>Book Appointment</SectionTitle>
        <Select onChange={(e) => setDoctorId(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>{doc.name}</option>
          ))}
        </Select>
        <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button onClick={bookAppointment}>Book</Button>
      </div>
      <div>
        <SectionTitle>Make Payment</SectionTitle>
        <Button onClick={handlePayment}>Pay ₹500</Button>
      </div>
    </Container>
  );
};

export default PatientPanel;