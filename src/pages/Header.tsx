import React from 'react';
import { AppBar, Tabs, Tab, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const { isAuthenticated, Role, logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} centered>
        {isAuthenticated && (
          <>
            <Tab label="Dashboard" component={Link} to="/" />
            
            {/* Admin and Super Admin */}
            {(Role === 'Super Admin') && (
              <>
                <Tab label="Health Facilities" component={Link} to="/health-facilities" />
                <Tab label="Health Workers" component={Link} to="/health-workers" />
                <Tab label="Patients" component={Link} to="/patients" />
                <Tab label="Users" component={Link} to="/users" />
                <Tab label="Roles" component={Link} to="/roles" />
              </>
            )}

            {/* Super Admin only */}
            {Role === 'Admin' && (
              <>
                <Tab label="Health Facilities" component={Link} to="/health-facilities" />
                <Tab label="Health Workers" component={Link} to="/health-workers" />
                <Tab label="Users" component={Link} to="/users" />
              </>
            )}

            {/* Admin only */}
            {Role === 'HealthW' && (
              <>
                 <Tab label="Patients" component={Link} to="/patients" />
              </>
            )}
          </>
        )}
      </Tabs>
      {isAuthenticated && (
        <Button
          color="inherit"
          onClick={handleLogout}
          style={{ position: 'absolute', right: '16px' }}
        >
          Logout
        </Button>
      )}
    </AppBar>
  );
};

export default Header;
