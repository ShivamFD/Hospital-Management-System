import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import bgImage from '../assets/bg.jpg'; // Ensure this image exists in your assets folder

// Animation for fade-in effect
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Background section with the static background image set to full viewport height
const BackgroundSection = styled.section`
  position: relative;
  background: url(${bgImage}) no-repeat center center/cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

// Overlay to darken the background image for better text contrast
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

// Content container for text in the background section
const BgContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  padding: 20px;
`;

// Interactive main title with hover effect
const Title = styled.h1`
  font-size: 42px;
  margin-bottom: 15px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

// Subtitle with inspiring content
const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 25px;
  line-height: 1.4;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.03);
  }
`;

// Styled button using Link for navigation
const AppointmentButton = styled(Link)`
  display: inline-block;
  background-color: #ff6347;
  color: #fff;
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #ff4500;
    transform: scale(1.05);
  }
`;

const Home = () => (
  <>
    <BackgroundSection>
      <Overlay />
      <BgContent>
        <Title>Embrace a Healthier Tomorrow</Title>
        <Subtitle>
          Step into a world where healthcare meets compassion and innovation. <br />
          Your well-being is our priority. Discover the future of personalized care today!
        </Subtitle>
        <AppointmentButton to="/Appointment">
          Book Appointment
        </AppointmentButton>
      </BgContent>
    </BackgroundSection>
  </>
);

export default Home;
