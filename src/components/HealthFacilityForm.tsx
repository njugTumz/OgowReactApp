import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { HealthFacility, FacilityFData } from '../models/types';

interface HealthFacilityFormProps {
  initialData: HealthFacility | null;
  onSubmit: (formData: FacilityFData) => void;
}

const HealthFacilityForm: React.FC<HealthFacilityFormProps> = ({ initialData, onSubmit }) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  // Populate form fields with initial data if provided
  useEffect(() => {
    if (initialData) {
      setId(initialData.id); // Set the ID when editing
      setName(initialData.name);
      setDistrict(initialData.district);
      setRegion(initialData.region);
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Create the form data object with or without ID
    const formData: FacilityFData = {
      id, // Pass the id, it will be undefined if not editing
      name,
      district,
      region,
      state: '',
      country: '',
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="District"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update Facility' : 'Add Facility'} {/* Change button label based on edit or add */}
      </Button>
    </form>
  );
};

export default HealthFacilityForm;
