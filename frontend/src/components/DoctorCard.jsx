import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';

// Fade-in animation for a smooth appearance
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Card container styling
const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 280px;
  margin: 10px;
  animation: ${fadeIn} 0.5s ease-out;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Background image styling with fallback
const BgImage = styled.div`
  height: 180px;
  background: url(${(props) => props.bg || 'https://via.placeholder.com/300x180'}) no-repeat center center/cover;
`;

// Info container for doctor details
const InfoContainer = styled.div`
  padding: 15px;
  text-align: center;
`;

// Doctor's name
const Name = styled.h3`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 5px;
`;

// Specialization
const Specialization = styled.p`
  font-size: 16px;
  color: #666;
  font-style: italic;
  margin-bottom: 10px;
`;

// Additional info styling
const Info = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
`;

// Appointment button
const Button = styled.button`
  background: #1d72b8;
  color: white;
  font-size: 16px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #155d8b;
    transform: scale(1.05);
  }
`;

// DoctorCard Component
const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  if (!doctor || doctor.role !== 'doctor') {
    return null; // Ensures only doctors are displayed
  }

  return (
    <Card>
      <BgImage bg={doctor.image} />
      <InfoContainer>
        <Name>{doctor.name || 'Dr. Unknown'}</Name>
        <Specialization>{doctor.specialist || 'General Medicine'}</Specialization>
        <Info>📅 Joined: {new Date(doctor.createdAt).toLocaleDateString()}</Info>
        <Button onClick={() => navigate('/book-appointment')}>
          <CalendarCheck size={18} style={{ marginRight: '5px' }} />
          Book Appointment
        </Button>
      </InfoContainer>
    </Card>
  );
};

export default DoctorCard;
