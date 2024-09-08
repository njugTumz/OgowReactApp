import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Patient } from '../models/types';
import { fetchHealthFacilities } from '../services/facilitiesService'; // Import the service

interface PatientFormProps {
  initialData: Patient | null;
  onSubmit: (formData: Patient) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSubmit }) => {
  const [id, setId] = useState<number | undefined>(undefined); // Updated to number
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [healthFacilityId, setHealthFacilityId] = useState<number | undefined>(undefined);
  const [healthFacilities, setHealthFacilities] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      const facilities = await fetchHealthFacilities();
      const validFacilities = facilities
        .filter((facility) => facility.id !== undefined) // Filter out undefined ids
        .map((facility) => ({ id: facility.id!, name: facility.name })); // Ensure valid ids
      setHealthFacilities(validFacilities);
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    if (initialData) {
      setId(initialData.id); // Now `id` is a number
      setName(initialData.name);
      setGender(initialData.gender);
      setAddress(initialData.address);
      setHealthFacilityId(initialData.healthFacilityId);
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData: Patient = {
      id: id || 0, // Assign 0 as a placeholder if id is undefined
      name,
      gender,
      address,
      healthFacilityId: healthFacilityId!
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
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Health Facility</InputLabel>
        <Select
          value={healthFacilityId}
          onChange={(e) => setHealthFacilityId(e.target.value as number)}
          label="Select Health Facility"
        >
          {healthFacilities.map((facility) => (
            <MenuItem key={facility.id} value={facility.id}>
              {facility.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update Patient' : 'Add Patient'}
      </Button>
    </form>
  );
};

export default PatientForm;
