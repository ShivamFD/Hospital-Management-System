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

const Paragraph = styled.p`
  margin: 10px 0;
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

const AdminPanel = () => {
  const [stats, setStats] = useState({ patients: 0, appointments: [], totalIncome: 0 });
  const [patientId, setPatientId] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/dashboard`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setStats(res.data);
    };
    fetchStats();
  }, []);

  const uploadReport = async () => {
    const formData = new FormData();
    formData.append('patientId', patientId);
    formData.append('report', file);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/upload-report`, formData, {
        headers: { 'x-auth-token': localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' },
      });
      alert('Report uploaded');
    } catch (err) {
      alert('Failed to upload report');
    }
  };

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <Paragraph>Total Patients: {stats.patients}</Paragraph>
      <Paragraph>Total Income: ₹{stats.totalIncome}</Paragraph>
      <SectionTitle>Appointments</SectionTitle>
      <List>
        {stats.appointments.map((appt) => (
          <ListItem key={appt._id}>
            {appt.patientId.name} - {appt.doctorId.name} - {new Date(appt.date).toLocaleString()} - {appt.status}
          </ListItem>
        ))}
      </List>
      <SectionTitle>Upload Report</SectionTitle>
      <Input type="text" placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
      <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button onClick={uploadReport}>Upload</Button>
    </Container>
  );
};

export default AdminPanel;