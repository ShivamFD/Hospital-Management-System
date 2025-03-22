import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Container for the page
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

// Styled table
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Table header styling
const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

// Accept Button styling
const AcceptButton = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
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

  // Get token from localStorage and set it as default header (backend expects x-auth-token)
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['x-auth-token'] = token;

  // Fetch appointments for the doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments/doctor');
        // Expecting an array of appointments with populated patientId (with name, email)
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [token]);

  // Handle appointment acceptance
  const acceptAppointment = async (appointmentId) => {
    try {
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
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableHeader>Patient Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableData>{appointment.patientId?.name || 'N/A'}</TableData>
                <TableData>{appointment.patientId?.email || 'N/A'}</TableData>
                <TableData>
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableData>
                <TableData>{appointment.status}</TableData>
                <TableData>
                  {appointment.status === 'pending' && (
                    <AcceptButton onClick={() => acceptAppointment(appointment._id)}>
                      Accept Appointment
                    </AcceptButton>
                  )}
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
    </Container>
  );
};

export default ApprovePatient;
