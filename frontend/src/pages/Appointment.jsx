import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components for UI
const AllAppointmentsContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff; /* clean white background */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const AppointmentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #f5f7fa;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
  color: #666;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  font-size: 14px;
  color: #333;
`;

const DoctorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const DoctorAvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  overflow: hidden;
  margin-right: 10px;
`;

const DoctorAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DoctorAvatarInitials = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const DoctorDetails = styled.div`
  flex: 1;
`;

const DoctorName = styled.div`
  font-weight: 500;
  color: #333;
`;

const DoctorSpecialist = styled.span`
  font-size: 12px;
  color: #1976d2;
  background-color: #e3f2fd;
  padding: 2px 8px;
  border-radius: 10px;
  margin-top: 4px;
  display: inline-block;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
  background-color: ${(props) =>
    props.status === 'accepted'
      ? '#4caf50'
      : props.status === 'pending'
      ? '#ff9800'
      : '#f44336'};
`;

const PayButton = styled.button`
  padding: 6px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #1565c0;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #666;
  margin: 20px 0;
`;

const NoAppointmentsMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #666;
  margin: 20px 0;
`;

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Endpoints (adjust URLs if needed)
  const GET_ALL_APPOINTMENTS_URL = 'http://localhost:5000/api/appointments/my-appointments';
  const CREATE_PAYMENT_URL = 'http://localhost:5000/api/payments/create-order';

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(GET_ALL_APPOINTMENTS_URL, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to fetch appointments');
      }
      const data = await response.json();
      console.log('Appointments data:', data);
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  // Load Razorpay Checkout script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (appointment) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }
    try {
      // Create order on backend
      const orderResponse = await fetch(CREATE_PAYMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          appointmentId: appointment._id,
          amount: 50000, // Amount in paise (e.g., 500 INR)
        }),
      });
      const order = await orderResponse.json();

      const options = {
        key: 'rzp_test_ABC123XYZ', // Replace with your actual Razorpay Key ID
        amount: order.amount,
        currency: 'INR',
        name: 'Healthcare Service',
        description: `Payment for appointment with ${appointment.doctorId?.name || 'Doctor'}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
              },
              body: JSON.stringify({
                appointmentId: appointment._id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (verifyResponse.ok) {
              alert('Payment successful!');
              fetchAppointments(); // Refresh appointments list
            } else {
              setError('Payment verification failed');
            }
          } catch (err) {
            setError('Payment verification error');
          }
        },
        prefill: {
          name: 'Patient Name',
          email: 'patient@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#1976d2',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError('Failed to initiate payment');
    }
  };

  // Helper functions
  const getInitials = (name) =>
    !name ? '?' : name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const renderAppointmentRow = (appointment) => {
    const doctor = appointment.doctorId || {};
    const doctorName = doctor.name || appointment.doctorName || 'Unknown';
    const specialist = doctor.specialist || appointment.specialist || 'General Physician';
    const image = doctor.image;

    return (
      <TableRow key={appointment._id}>
        <TableCell>
          <DoctorInfo>
            <DoctorAvatarContainer>
              {image ? (
                <DoctorAvatarImage src={`http://localhost:5000/${image}`} alt={doctorName} />
              ) : (
                <DoctorAvatarInitials>{getInitials(doctorName)}</DoctorAvatarInitials>
              )}
            </DoctorAvatarContainer>
            <DoctorDetails>
              <DoctorName>{doctorName}</DoctorName>
            </DoctorDetails>
          </DoctorInfo>
        </TableCell>
        <TableCell>
          <DoctorSpecialist>{specialist}</DoctorSpecialist>
        </TableCell>
        <TableCell>{formatDate(appointment.date)}</TableCell>
        <TableCell>
          <StatusBadge status={appointment.status}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </StatusBadge>
        </TableCell>
        <TableCell>
          {appointment.status === 'accepted' && !appointment.isPaid ? (
            <PayButton onClick={() => handlePayment(appointment)}>
              Pay Now
            </PayButton>
          ) : appointment.status === 'accepted' && appointment.isPaid ? (
            <StatusBadge status="accepted">Paid</StatusBadge>
          ) : null}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <AllAppointmentsContainer>
      <Title>My Appointments</Title>
      {isLoading && <LoadingMessage>Loading appointments...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {appointments.length > 0 ? (
        <AppointmentsTable>
          <TableHead>
            <TableRow>
              <TableHeader>Doctor</TableHeader>
              <TableHeader>Specialization</TableHeader>
              <TableHeader>Date & Time</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Payment</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>{appointments.map(renderAppointmentRow)}</tbody>
        </AppointmentsTable>
      ) : (
        !isLoading && <NoAppointmentsMessage>No appointments found.</NoAppointmentsMessage>
      )}
    </AllAppointmentsContainer>
  );
};

export default AllAppointments;
