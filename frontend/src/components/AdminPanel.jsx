
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Dashboard Layout Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 25px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div`
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
`;

const SidebarTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const SidebarSubtitle = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 5px 0 0 0;
`;

const SidebarMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    border-left: 3px solid #3498db;
  }
`;

const MenuIcon = styled.span`
  margin-right: 10px;
  font-size: 16px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 25px;
  overflow-y: auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.h3`
  font-size: 14px;
  color: #7f8c8d;
  margin: 0 0 5px 0;
  font-weight: 500;
`;

const StatValue = styled.p`
  font-size: 28px;
  font-weight: 600;
  margin: 5px 0 0 0;
  color: #2c3e50;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eaeaea;
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: #7f8c8d;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  font-size: 14px;
  color: #2c3e50;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${props => {
    switch (props.status.toLowerCase()) {
      case 'completed':
        return '#2ecc71';
      case 'pending':
        return '#f39c12';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  }};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 10px;
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const DoctorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const DoctorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DoctorName = styled.span`
  font-weight: 500;
`;

const DoctorEmail = styled.span`
  font-size: 12px;
  color: #7f8c8d;
`;

const SpecialistBadge = styled.span`
  background-color: #e8f4fd;
  color: #3498db;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const Form = styled.form`
  display: grid;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ActionButton = styled(Button)`
  padding: 6px 12px;
  font-size: 12px;
  margin-right: 5px;
  
  &.edit {
    background-color: #f39c12;
    &:hover {
      background-color: #e67e22;
    }
  }
  
  &.delete {
    background-color: #e74c3c;
    &:hover {
      background-color: #c0392b;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SearchInput = styled(Input)`
  max-width: 300px;
  margin-right: 10px;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin: 10px 0;
`;

const LoadingOverlay = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DirectoryCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DirectoryCardHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e8ecef;
`;

const DirectoryCardTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const DirectorySearchBar = styled.div`
  padding: 15px 20px;
`;

const DirectorySearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e8ecef;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const DirectoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const DirectoryTableHead = styled.thead`
  background-color: #f5f7fa;
`;

const DirectoryTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const DirectoryTableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
  color: #666;
`;

const DirectoryTableCell = styled.td`
  padding: 12px 15px;
  font-size: 14px;
  color: #333;
`;

const DirectoryDoctorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const DirectoryAvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  overflow: hidden;
`;

const DirectoryAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DirectoryAvatarInitials = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const DirectoryDoctorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DirectoryDoctorName = styled.div`
  font-weight: 500;
  color: #333;
`;

const DirectoryDoctorEmail = styled.div`
  font-size: 12px;
  color: #666;
`;

const DirectorySpecialistBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  background-color: #e3f2fd;
  color: #1976d2;
`;

const DirectoryStatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
  background-color: ${props => 
    props.status === 'completed' ? '#4caf50' : 
    props.status === 'cancelled' ? '#f44336' : '#757575'};
`;

const DirectoryActionButton = styled.button`
  padding: 4px 8px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  
  &.edit {
    background-color: #2196f3;
    color: white;
  }
  
  &.delete {
    background-color: #f44336;
    color: white;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;


const AdminPanel = () => {
  const [stats, setStats] = useState({ patients: 0, appointments: [], totalIncome: 0 });
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [file, setFile] = useState(null);
  const [doctorName, setDoctorName] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');
  const [doctorImage, setDoctorImage] = useState(null);
  const [doctorSpecialist, setDoctorSpecialist] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Hardcoded URLs
  const DASHBOARD_URL = 'http://localhost:5000/api/admin/dashboard';
  const UPLOAD_REPORT_URL = 'http://localhost:5000/api/admin/upload-report';
  const ADD_DOCTOR_URL = 'http://localhost:5000/api/admin/add-doctor';
  const GET_DOCTORS_URL = 'http://localhost:5000/api/appointments/doctors'; // Corrected and updated to your working endpoint

  useEffect(() => {
    if (activeSection === 'dashboard') {
      fetchDashboardStats();
    } else if (activeSection === 'doctorsList') {
      fetchDoctors();
    }
  }, [activeSection]);

  const fetchDashboardStats = () => {
    setIsLoading(true);
    setError('');

    fetch(DASHBOARD_URL, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Dashboard data:', data);
        setStats(data);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch dashboard stats');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchDoctors = () => {
    setIsLoading(true);
    setError('');

    fetch(GET_DOCTORS_URL, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Doctors data:', data);
        setDoctors(data); // Assuming your endpoint returns an array of doctors
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch doctors');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const uploadReport = (e) => {
    e.preventDefault();
    if (!patientId || !file) {
      setError('Please provide patient ID and select a file');
      return;
    }
    
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('patientId', patientId);
    formData.append('report', file);

    fetch(UPLOAD_REPORT_URL, {
      method: 'POST',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload report');
        }
        return response.json();
      })
      .then(() => {
        alert('Report uploaded successfully');
        setPatientId('');
        setFile(null);
      })
      .catch((err) => {
        setError(err.message || 'Failed to upload report');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addDoctor = (e) => {
    e.preventDefault();
    if (!doctorName || !doctorEmail || !doctorPassword || !doctorSpecialist) {
      setError('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', doctorName);
    formData.append('email', doctorEmail);
    formData.append('password', doctorPassword);
    formData.append('specialist', doctorSpecialist);
    if (doctorImage) formData.append('image', doctorImage);

    fetch(ADD_DOCTOR_URL, {
      method: 'POST',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add doctor');
        }
        return response.json();
      })
      .then(() => {
        alert('Doctor added successfully');
        setDoctorName('');
        setDoctorEmail('');
        setDoctorPassword('');
        setDoctorImage(null);
        setDoctorSpecialist('');
        if (activeSection === 'doctorsList') {
          fetchDoctors();
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to add doctor');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doctor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialist?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For demonstration purposes
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper to get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DashboardContainer>
      <LoadingOverlay visible={isLoading}>
        <div>Loading...</div>
      </LoadingOverlay>
      
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>HealthCare Admin</SidebarTitle>
          <SidebarSubtitle>Management Dashboard</SidebarSubtitle>
        </SidebarHeader>
        
        <SidebarMenu>
          <SidebarMenuItem 
            className={activeSection === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveSection('dashboard')}
          >
            <MenuIcon>📊</MenuIcon> Dashboard
          </SidebarMenuItem>
          <SidebarMenuItem 
            className={activeSection === 'appointments' ? 'active' : ''} 
            onClick={() => setActiveSection('appointments')}
          >
            <MenuIcon>📅</MenuIcon> Appointments
          </SidebarMenuItem>
          <SidebarMenuItem 
            className={activeSection === 'reports' ? 'active' : ''} 
            onClick={() => setActiveSection('reports')}
          >
            <MenuIcon>📝</MenuIcon> Upload Reports
          </SidebarMenuItem>
          <SidebarMenuItem 
            className={activeSection === 'doctors' ? 'active' : ''} 
            onClick={() => setActiveSection('doctors')}
          >
            <MenuIcon>➕</MenuIcon> Add Doctor
          </SidebarMenuItem>
          <SidebarMenuItem>
            <MenuIcon>🚪</MenuIcon> Logout
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      
      <MainContent>
        <Header>
          <PageTitle>
            {activeSection === 'dashboard' && 'Dashboard Overview'}
            {activeSection === 'appointments' && 'Appointment Management'}
            {activeSection === 'doctorsList' && 'Doctors Directory'}
            {activeSection === 'reports' && 'Patient Reports'}
            {activeSection === 'doctors' && 'Add New Doctor'}
          </PageTitle>
          
          <div>
            {/* You can add admin profile/notifications here */}
          </div>
        </Header>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {activeSection === 'dashboard' && (
          <>
            <StatsContainer>
              <StatCard>
                <StatTitle>Total Patients</StatTitle>
                <StatValue>{stats.patients}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Total Income</StatTitle>
                <StatValue>₹{stats.totalIncome.toLocaleString()}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Total Appointments</StatTitle>
                <StatValue>{Array.isArray(stats.appointments) ? stats.appointments.length : 0}</StatValue>
              </StatCard>
            </StatsContainer>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
              </CardHeader>
              
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Patient</TableHeader>
                    <TableHeader>Doctor</TableHeader>
                    <TableHeader>Date & Time</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {Array.isArray(stats.appointments) && stats.appointments.length > 0 ? (
                    stats.appointments.map((appt) => (
                      <TableRow key={appt._id}>
                        <TableCell>{appt.patientId?.name || 'Unknown Patient'}</TableCell>
                        <TableCell>{appt.doctorId?.name || 'Unknown Doctor'}</TableCell>
                        <TableCell>{formatDate(appt.date)}</TableCell>
                        <TableCell>
                          <StatusBadge status={appt.status}>{appt.status}</StatusBadge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="4">No appointments available</TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>
            </Card>
          </>
        )}
        
        {activeSection === 'appointments' && (
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
            </CardHeader>
            
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Patient</TableHeader>
                  <TableHeader>Doctor</TableHeader>
                  <TableHeader>Date & Time</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {Array.isArray(stats.appointments) && stats.appointments.length > 0 ? (
                  stats.appointments.map((appt) => (
                    <TableRow key={appt._id}>
                      <TableCell>{appt.patientId?.name || 'Unknown Patient'}</TableCell>
                      <TableCell>{appt.doctorId?.name || 'Unknown Doctor'}</TableCell>
                      <TableCell>{formatDate(appt.date)}</TableCell>
                      <TableCell>
                        <StatusBadge status={appt.status}>{appt.status}</StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4">No appointments available</TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </Card>
        )}
        
   
        
        {activeSection === 'reports' && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Patient Report</CardTitle>
            </CardHeader>
            
            <Form onSubmit={uploadReport}>
              <FormGroup>
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  type="text"
                  placeholder="Enter patient ID"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  disabled={isLoading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="reportFile">Report File</Label>
                <Input
                  id="reportFile"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  disabled={isLoading}
                />
              </FormGroup>
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Report'}
              </Button>
            </Form>
          </Card>
        )}
        
        {activeSection === 'doctors' && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Doctor</CardTitle>
            </CardHeader>
            
            <Form onSubmit={addDoctor}>
              <FormGroup>
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input
                  id="doctorName"
                  type="text"
                  placeholder="Enter doctor's full name"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  disabled={isLoading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="doctorEmail">Email</Label>
                <Input
                  id="doctorEmail"
                  type="email"
                  placeholder="Enter doctor's email"
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                  disabled={isLoading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="doctorPassword">Password</Label>
                <Input
                  id="doctorPassword"
                  type="password"
                  placeholder="Enter temporary password"
                  value={doctorPassword}
                  onChange={(e) => setDoctorPassword(e.target.value)}
                  disabled={isLoading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="doctorSpecialist">Specialization</Label>
                <Input
                  id="doctorSpecialist"
                  type="text"
                  placeholder="e.g., Cardiologist, Neurologist"
                  value={doctorSpecialist}
                  onChange={(e) => setDoctorSpecialist(e.target.value)}
                  disabled={isLoading}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="doctorImage">Profile Image</Label>
                <Input
                  id="doctorImage"
                  type="file"
                  onChange={(e) => setDoctorImage(e.target.files[0])}
                  disabled={isLoading}
                />
              </FormGroup>
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Doctor'}
              </Button>
            </Form>
          </Card>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminPanel;