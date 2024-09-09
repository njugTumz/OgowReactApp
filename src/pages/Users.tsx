import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import UserForm from '../components/UserForm';
import { fetchUsers, createUser, updateUser } from '../services/userService';
import { User } from '../models/types';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers().then(data => setUsers(data));
  }, []);

 

  const handleOpenDialog = (user?: User) => {
    setEditingUser(user || null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleFormSubmit = (data: User) => {
    if (editingUser) {
      updateUser(editingUser.id, data).then(() => {
        setUsers(prev => prev.map(user => user.id === editingUser.id ? data : user));
      });
    } else {
      createUser(data).then((newUser: User) => {
        setUsers(prev => [...prev, newUser]);
      });
    }
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom style={{ color: '#9c27b0' }}>Users</Typography>
      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()} sx={{ marginBottom: 2 }}>
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.roleName}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpenDialog(user)} variant="outlined" color="primary" sx={{ marginRight: 1 }}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <UserForm initialData={editingUser} onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
