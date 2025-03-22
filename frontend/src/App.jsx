// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login'; // Make sure this path is correct
// import Register from './components/Register';// Make sure this path is correct

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         {/* You can add additional routes here */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DoctorPanel from './components/DoctorPanel';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import PatientForm from './pages/PatientForm';
import ApprovePatient from './pages/ApprovePatient';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor" element={<DoctorPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/patientform" element={<PatientForm/>} />
        <Route path="/approvepatient" element={<ApprovePatient/>} />
      </Routes>
    </Router>
  );
};

export default App;