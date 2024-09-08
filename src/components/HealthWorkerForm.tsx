import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { HealthWorker } from '../models/types';
import { fetchHealthFacilities } from '../services/facilitiesService'; // Import the service

interface HealthWorkerFormProps {
  initialData: HealthWorker | null;
  onSubmit: (formData: HealthWorker) => void;
}

const HealthWorkerForm: React.FC<HealthWorkerFormProps> = ({ initialData, onSubmit }) => {
  const [id, setId] = useState<number | undefined>(undefined); // Updated to number
  const [name, setName] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [healthFacilityId, setHealthFacilityId] = useState<number | undefined>(undefined); // Updated to number
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
      setId(initialData.id); // Updated to number
      setName(initialData.name);
      setDesignation(initialData.designation);
      setEmail(initialData.email);
      setPhoneNumber(initialData.phoneNumber);
      setHealthFacilityId(initialData.healthFacilityId);
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData: HealthWorker = {
      id: id || 0, // Set a default id value as 0 if undefined
      name,
      designation,
      email,
      phoneNumber,
      healthFacilityId: healthFacilityId!, // Non-null assertion for healthFacilityId
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
        label="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Health Facility</InputLabel>
        <Select
          value={healthFacilityId || ''} // Default to empty string if undefined
          onChange={(e) => setHealthFacilityId(Number(e.target.value))} // Ensure value is cast to number
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
        {id ? 'Update Worker' : 'Add Worker'}
      </Button>
    </form>
  );
};

export default HealthWorkerForm;
