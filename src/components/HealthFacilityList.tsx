import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import HealthFacilityForm from './HealthFacilityForm'; // Import the form component
import { fetchHealthFacilities, deleteHealthFacility, createHealthFacility, updateHealthFacility } from '../services/facilitiesService';
import { HealthFacility, FacilityFData  } from '../models/types'; // Import types

const HealthFacilityList: React.FC = () => {
  const [facilities, setFacilities] = useState<HealthFacility[]>([]);
  const [open, setOpen] = useState<boolean>(false); // State for dialog open/close
  const [editingFacility, setEditingFacility] = useState<HealthFacility | null>(null);

  useEffect(() => {
    fetchHealthFacilities().then(data => setFacilities(data));
  }, []);

  const handleDelete = (id?: number) => {
    if (id !== undefined) {
      deleteHealthFacility(id).then(() => {
        setFacilities(prev => prev.filter(facility => facility.id !== id));
      });
    }  
  };

  const handleOpenDialog = (facility?: HealthFacility) => {
    setEditingFacility(facility || null); // If facility is provided, edit, else create new
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleFormSubmit = (d: FacilityFData) => {
    if (editingFacility && editingFacility.id !== undefined) {
      // Ensure that editingFacility exists and has a valid id before updating
      updateHealthFacility(editingFacility.id, d).then(() => {
        setFacilities(prev => prev.map(facility => facility.id === editingFacility.id ? { ...facility, ...d } : facility));
      });
    } else {
      // If no editingFacility, create a new one
      createHealthFacility(d).then((newFacility: HealthFacility) => {
        setFacilities(prev => [...prev, newFacility]);
      });
    }
    setOpen(false);
  };
  return (
    <Container>
       <Typography variant="h5" gutterBottom style={{ color: '#9c27b0' }}>Health Facilities</Typography>
      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()} sx={{ marginBottom: 2 }}>
        Add Health Facility
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>District</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facilities.map(facility => (
            <TableRow key={facility.id}>
              <TableCell>{facility.name}</TableCell>
              <TableCell>{facility.district}</TableCell>
              <TableCell>{facility.region}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenDialog(facility)} variant="outlined" color="primary" sx={{ marginRight: 1 }}>Edit</Button>
                <Button color="secondary" onClick={() => handleDelete(facility.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal Dialog for Health Facility Form */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingFacility ? 'Edit Health Facility' : 'Add Health Facility'}</DialogTitle>
        <DialogContent>
          <HealthFacilityForm initialData={editingFacility} onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HealthFacilityList;
