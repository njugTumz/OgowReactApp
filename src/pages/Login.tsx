/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/apiService';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting login

    try {
      const token = await login(username, password);
      setAuth(token);
      navigate('/');
    } catch (error:any) {
      alert(error.message);
    } finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '2rem', borderRadius: '12px', backgroundColor: '#f5f5f5' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" gutterBottom sx={{ marginBottom: '1rem', fontWeight: 'bold', color: '#9c27b0' }}>
            Health Facility Management System
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom sx={{ marginBottom: '1rem' }}>
            Please sign in to continue
          </Typography>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              helperText="Default: superadmin@gmail.com"
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              helperText="Default: 12Buns3*"
              sx={{ marginBottom: '1.5rem' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ backgroundColor: '#9c27b0', marginTop: '1rem' }}
              disabled={loading} // Disable button while loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'} {/* Show spinner or text */}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
