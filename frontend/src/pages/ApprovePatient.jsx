import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Fade-in animation for cards
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container for the whole page
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

// Page Title
const Title = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

// Card styling for each appointment
const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-3px);
  }
`;

// Row for details
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

// Label styling
const Label = styled.span`
  font-weight: bold;
  margin-right: 8px;
  color: #555;
`;

// Value styling
const Value = styled.span`
  color: #333;
`;

// Button for accepting appointment
const AcceptButton = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  margin-top: 15px;
  &:hover {
    background: #218838;
    transform: scale(1.03);
  }
`;

// Message styling for errors or empty states
const Message = styled.p`
  text-align: center;
  font-size: 18px;
  color: #333;
`;

const ApprovePatient = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Optionally, if your API requires an auth token, you could set it like so:
  // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  // Fetch appointments for the doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // const res = await axios.get('/api/appointments/doctor');
        const res = await axios.get('http://localhost:5000/api/appointments/doctor');
        // Expecting an array of appointments with populated patientId (with name, email)
        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Handle appointment acceptance
  const acceptAppointment = async (appointmentId) => {
    try {
    //   await axios.put(`/api/appointments/accept/${appointmentId}`);
    await axios.put(`http://localhost:5000/api/appointments/accept/${appointmentId}`);
      alert('Appointment accepted!');
      // Remove accepted appointment from the list
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (err) {
      console.error('Error accepting appointment:', err);
      alert('Failed to accept appointment.');
    }
  };

  return (
    <Container>
      <Title>Approve Patient Appointments</Title>
      {loading ? (
        <Message>Loading appointments...</Message>
      ) : appointments.length === 0 ? (
        <Message>No appointments to approve.</Message>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment._id}>
            <Row>
              <Label>Patient Name:</Label>
              <Value>{appointment.patientId?.name || 'N/A'}</Value>
            </Row>
            <Row>
              <Label>Email:</Label>
              <Value>{appointment.patientId?.email || 'N/A'}</Value>
            </Row>
            <Row>
              <Label>Date:</Label>
              <Value>
                {new Date(appointment.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Value>
            </Row>
            <Row>
              <Label>Status:</Label>
              <Value>{appointment.status}</Value>
            </Row>
            {appointment.status === 'pending' && (
              <AcceptButton onClick={() => acceptAppointment(appointment._id)}>
                Accept Appointment
              </AcceptButton>
            )}
          </Card>
        ))
      )}
    </Container>
  );
};

export default ApprovePatient;
