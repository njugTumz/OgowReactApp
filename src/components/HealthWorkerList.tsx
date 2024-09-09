import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import HealthWorkerForm from './HealthWorkerForm';
import { fetchHealthWorkers, deleteHealthWorker, createHealthWorker, updateHealthWorker } from '../services/facilitiesService';
import { HealthWorker } from '../models/types';

const HealthWorkerList: React.FC = () => {
  const [workers, setWorkers] = useState<HealthWorker[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editingWorker, setEditingWorker] = useState<HealthWorker | null>(null);

  useEffect(() => {
    fetchHealthWorkers().then(data => setWorkers(data));
  }, []);

  const handleDelete = (id: number) => {
    deleteHealthWorker(id).then(() => {
      setWorkers(prev => prev.filter(worker => worker.id !== id));
    });
  };

  const handleOpenDialog = (worker?: HealthWorker) => {
    setEditingWorker(worker || null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleFormSubmit = (data: HealthWorker) => {
    if (editingWorker) {
      updateHealthWorker(editingWorker.id, data).then(() => {
        setWorkers(prev => prev.map(worker => worker.id === editingWorker.id ? data : worker));
      });
    } else {
      createHealthWorker(data).then((newWorker: HealthWorker) => {
        setWorkers(prev => [...prev, newWorker]);
      });
    }
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom style={{ color: '#9c27b0' }}>Health Workers</Typography>
      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()} sx={{ marginBottom: 2 }}>
        Add Health Worker
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Health Facility</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map(worker => (
            <TableRow key={worker.id}>
              <TableCell>{worker.name}</TableCell>
              <TableCell>{worker.designation}</TableCell>
              <TableCell>{worker.email}</TableCell>
              <TableCell>{worker.phoneNumber}</TableCell>
              <TableCell>{worker.healthFacility?.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenDialog(worker)} variant="outlined" color="primary" sx={{ marginRight: 1 }}>Edit</Button>
                <Button color="secondary" onClick={() => handleDelete(worker.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingWorker ? 'Edit Health Worker' : 'Add Health Worker'}</DialogTitle>
        <DialogContent>
          <HealthWorkerForm initialData={editingWorker} onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HealthWorkerList;
