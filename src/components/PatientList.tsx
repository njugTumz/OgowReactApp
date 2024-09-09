import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PatientForm from './PatientForm';
import { fetchPatients, deletePatient, createPatient, updatePatient } from '../services/facilitiesService';
import { Patient } from '../models/types';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients().then(data => setPatients(data));
  }, []);

  // Change id type from string to number
  const handleDelete = (id: number) => {
    deletePatient(id).then(() => {
      setPatients(prev => prev.filter(patient => patient.id !== id));
    });
  };

  const handleOpenDialog = (patient?: Patient) => {
    setEditingPatient(patient || null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleFormSubmit = (data: Patient) => {
    if (editingPatient) {
      updatePatient(editingPatient.id, data).then(() => {
        setPatients(prev => prev.map(patient => patient.id === editingPatient.id ? data : patient));
      });
    } else {
      createPatient(data).then(newPatient => {
        setPatients(prev => [...prev, newPatient]);
      });
    }
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom style={{ color: '#9c27b0' }}>Patients</Typography>
      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()} sx={{ marginBottom: 2 }}>
        Add Patient
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Health Facility</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map(patient => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.address}</TableCell>
              <TableCell>{patient.healthFacility?.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenDialog(patient)} variant="outlined" color="primary" sx={{ marginRight: 1 }}>Edit</Button>
                <Button color="secondary" onClick={() => handleDelete(patient.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPatient ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
        <DialogContent>
          <PatientForm initialData={editingPatient} onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientList;
