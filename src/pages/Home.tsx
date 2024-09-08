import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import { fetchHealthFacilities, fetchHealthWorkers, fetchPatients } from '../services/facilitiesService';

const Dashboard: React.FC = () => {
  const [facilitiesCount, setFacilitiesCount] = useState<number>(0);
  const [workersCount, setWorkersCount] = useState<number>(0);
  const [patientsCount, setPatientsCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const facilities = await fetchHealthFacilities();
      const workers = await fetchHealthWorkers();
      const patients = await fetchPatients();

      setFacilitiesCount(facilities.length);
      setWorkersCount(workers.length);
      setPatientsCount(patients.length);
    };

    fetchData();
  }, []);

  const data = [
    { name: 'Facilities', value: facilitiesCount },
    { name: 'Workers', value: workersCount },
    { name: 'Patients', value: patientsCount },
  ];

  return (
    <Container>
       <Typography variant="h5" gutterBottom style={{ color: '#9c27b0', textAlign:'center', marginTop:'12px' }}>
        Health Facility Data Management System Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Health Facilities</Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={data.filter(item => item.name === 'Facilities')}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Health Workers</Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={data.filter(item => item.name === 'Workers')}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Patients</Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={data.filter(item => item.name === 'Patients')}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#ffc658"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
