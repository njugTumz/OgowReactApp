import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { User, Role } from '../models/types';
import { fetchRoles } from '../services/userService'; // Fetch roles service

interface UserFormProps {
  initialData: User | null;
  onSubmit: (formData: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [roleName, setRole] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [roleId, setRoleId] = useState<number | undefined>(undefined);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRolesData = async () => {
      const rolesData = await fetchRoles();
      setRoles(rolesData);
    };

    fetchRolesData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setName(initialData.name);
      setEmail(initialData.email);
      setPassword(initialData.password);
      setRole(initialData.roleName) // For updating users, password could be hidden or optional
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData: User = {
      id: id || 0, 
      name,
      email,
      password,
      roleName,
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
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          value={roleId !== undefined ? roleId : ''}
          onChange={(e) => setRoleId(Number(e.target.value))}
          label="Role"
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update User' : 'Add User'}
      </Button>
    </form>
  );
};

export default UserForm;
