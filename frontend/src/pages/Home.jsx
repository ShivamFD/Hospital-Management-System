import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 16px;
`;

const Home = () => (
  <Container>
    <Title>Welcome to Hospitality Management System</Title>
    <Paragraph>Please login or register to continue.</Paragraph>
  </Container>
);

export default Home;