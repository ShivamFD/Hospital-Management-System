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

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const DoctorPanel = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/appointments/doctor`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  const acceptAppointment = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/appointments/accept/${id}`,
        {},
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setAppointments(appointments.map((appt) => (appt._id === id ? { ...appt, status: 'accepted' } : appt)));
    } catch (err) {
      alert('Failed to accept appointment');
    }
  };

  return (
    <Container>
      <Title>Doctor Dashboard</Title>
      <SectionTitle>Appointment Requests</SectionTitle>
      <List>
        {appointments.map((appt) => (
          <ListItem key={appt._id}>
            {appt.patientId.name} - {new Date(appt.date).toLocaleString()} - {appt.status}
            {appt.status === 'pending' && <Button onClick={() => acceptAppointment(appt._id)}>Accept</Button>}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DoctorPanel;