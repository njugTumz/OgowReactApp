import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import Header from './pages/Header';
import HealthFacilityList from './components/HealthFacilityList';
import HealthWorkers from './components/HealthWorkerList';
import PatientList from './components/PatientList';
import UsersList from './pages/Users';
import RolesList from './pages/Roles';

const App: React.FC = () => {
  const { isAuthenticated, Role } = useAuth();

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated && Role.includes('Super Admin') ? <About /> : <Navigate to="/login" />} />
          <Route path="/health-facilities" element={isAuthenticated && Role.includes('Super Admin') ? <HealthFacilityList /> : <Navigate to="/login" />} />
        
          <Route path="/health-workers" element={isAuthenticated && Role.includes('Super Admin') ? <HealthWorkers /> : <Navigate to="/login" />} />
          <Route path="/patients" element={isAuthenticated && Role.includes('Super Admin') ? <PatientList /> : <Navigate to="/login" />} />
          <Route path="/users" element={isAuthenticated && Role.includes('Super Admin') ? <UsersList /> : <Navigate to="/login" />} />
          <Route path="/roles" element={isAuthenticated && Role.includes('Super Admin') ? <RolesList /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
