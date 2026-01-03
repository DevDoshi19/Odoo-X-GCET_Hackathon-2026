import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Divider,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from '@mui/material'
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  CalendarMonth as CalendarIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@company.com', 
      employeeId: 'EMP001', 
      department: 'Engineering', 
      position: 'Senior Developer', 
      status: 'active', 
      joinDate: '2020-06-15',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, San Francisco, CA',
      dateOfBirth: '1990-05-15',
      manager: 'Alex Johnson',
      salary: '$85,000',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@company.com', 
      employeeId: 'EMP002', 
      department: 'Marketing', 
      position: 'Marketing Manager', 
      status: 'active', 
      joinDate: '2019-08-22',
      phone: '+1 (555) 987-6543',
      address: '456 Market Ave, New York, NY',
      dateOfBirth: '1988-11-30',
      manager: 'Sarah Wilson',
      salary: '$95,000',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@company.com', 
      employeeId: 'EMP003', 
      department: 'Sales', 
      position: 'Sales Executive', 
      status: 'inactive', 
      joinDate: '2021-03-10',
      phone: '+1 (555) 456-7890',
      address: '789 Sales Blvd, Chicago, IL',
      dateOfBirth: '1992-07-22',
      manager: 'Robert Brown',
      salary: '$75,000',
      skills: ['Sales', 'CRM', 'Negotiation', 'Client Relations'],
    },
    { 
      id: 4, 
      name: 'Sarah Wilson', 
      email: 'sarah@company.com', 
      employeeId: 'EMP004', 
      department: 'HR', 
      position: 'HR Manager', 
      status: 'active', 
      joinDate: '2018-11-05',
      phone: '+1 (555) 234-5678',
      address: '321 HR Plaza, Austin, TX',
      dateOfBirth: '1985-03-18',
      manager: 'CEO',
      salary: '$90,000',
      skills: ['Recruitment', 'Employee Relations', 'Compliance', 'Training'],
    },
    { 
      id: 5, 
      name: 'Robert Brown', 
      email: 'robert@company.com', 
      employeeId: 'EMP005', 
      department: 'Engineering', 
      position: 'Frontend Developer', 
      status: 'active', 
      joinDate: '2022-01-20',
      phone: '+1 (555) 876-5432',
      address: '654 Code Lane, Seattle, WA',
      dateOfBirth: '1993-09-10',
      manager: 'John Doe',
      salary: '$80,000',
      skills: ['JavaScript', 'React', 'CSS', 'UI/UX'],
    },
  ])

  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  // Handle View Profile
  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee)
    setOpenViewDialog(true)
  }

  // Handle Edit Employee
  const handleEdit = (employee) => {
    setSelectedEmployee(employee)
    setEditFormData({ ...employee })
    setOpenEditDialog(true)
  }

  // Handle Delete Employee
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee)
    setOpenDeleteDialog(true)
  }

  // Confirm Delete
  const confirmDelete = () => {
    setEmployees(prev => prev.filter(emp => emp.id !== selectedEmployee.id))
    setOpenDeleteDialog(false)
    setSelectedEmployee(null)
    showSnackbar('Employee deleted successfully!', 'success')
  }

  // Handle Edit Form Change
  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Save Edited Employee
  const saveEditedEmployee = () => {
    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id ? editFormData : emp
    ))
    setOpenEditDialog(false)
    setSelectedEmployee(null)
    showSnackbar('Employee updated successfully!', 'success')
  }

  // Add New Employee
  const addNewEmployee = () => {
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
    const newEmployee = {
      id: newId,
      name: `${editFormData.firstName || ''} ${editFormData.lastName || ''}`.trim(),
      email: editFormData.email || '',
      employeeId: editFormData.employeeId || `EMP${String(newId).padStart(3, '0')}`,
      department: editFormData.department || '',
      position: editFormData.position || '',
      status: editFormData.status ? 'active' : 'inactive',
      joinDate: editFormData.joinDate || new Date().toISOString().split('T')[0],
      phone: editFormData.phone || '',
      address: editFormData.address || '',
      dateOfBirth: editFormData.dateOfBirth || '',
      manager: editFormData.manager || '',
      salary: editFormData.salary || '',
      skills: editFormData.skills ? editFormData.skills.split(',').map(s => s.trim()) : [],
    }
    
    setEmployees(prev => [...prev, newEmployee])
    setOpenAddDialog(false)
    setEditFormData({})
    showSnackbar('Employee added successfully!', 'success')
  }

  // Toggle Employee Status
  const toggleEmployeeStatus = (employeeId) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' }
        : emp
    ))
    showSnackbar('Employee status updated!', 'info')
  }

  // Show Snackbar
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Employee',
      width: 220,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            {params.row.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { field: 'employeeId', headerName: 'Employee ID', width: 130 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'position', headerName: 'Position', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'active' ? 'success' : 'error'}
          size="small"
          variant="outlined"
          onClick={() => toggleEmployeeStatus(params.row.id)}
          sx={{ cursor: 'pointer' }}
        />
      ),
    },
    { field: 'joinDate', headerName: 'Join Date', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <Box>
          <IconButton 
            size="small" 
            color="info"
            onClick={() => handleViewProfile(params.row)}
            title="View Profile"
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton 
            size="small" 
            color="primary"
            onClick={() => handleEdit(params.row)}
            title="Edit Employee"
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            color="error"
            onClick={() => handleDeleteClick(params.row)}
            title="Delete Employee"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Employee Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditFormData({})
            setOpenAddDialog(true)
          }}
        >
          Add Employee
        </Button>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search employees by name, email, ID, or department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button startIcon={<FilterIcon />} variant="outlined">
                Filters
              </Button>
              <Button variant="outlined">Export</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Employees Table */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filteredEmployees}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </Box>
      </Paper>

      {/* View Profile Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonIcon color="primary" />
            <Typography variant="h6">Employee Profile</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ mr: 3, bgcolor: 'primary.main', width: 80, height: 80, fontSize: '1.5rem' }}>
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {selectedEmployee.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {selectedEmployee.position}
                    </Typography>
                    <Chip
                      label={selectedEmployee.status.toUpperCase()}
                      color={selectedEmployee.status === 'active' ? 'success' : 'error'}
                      icon={selectedEmployee.status === 'active' ? <CheckCircleIcon /> : <CancelIcon />}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }} gutterBottom>
                      Personal Information
                    </Typography>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><EmailIcon sx={{ mr: 1, fontSize: 16 }} /> Email</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><PhoneIcon sx={{ mr: 1, fontSize: 16 }} /> Phone</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><CalendarIcon sx={{ mr: 1, fontSize: 16 }} /> Date of Birth</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.dateOfBirth}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><LocationIcon sx={{ mr: 1, fontSize: 16 }} /> Address</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.address}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }} gutterBottom>
                      Employment Details
                    </Typography>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><BusinessIcon sx={{ mr: 1, fontSize: 16 }} /> Employee ID</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.employeeId}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><WorkIcon sx={{ mr: 1, fontSize: 16 }} /> Department</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.department}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><PersonIcon sx={{ mr: 1, fontSize: 16 }} /> Manager</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.manager}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><CalendarIcon sx={{ mr: 1, fontSize: 16 }} /> Join Date</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.joinDate}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 500, border: 'none' }}><WorkIcon sx={{ mr: 1, fontSize: 16 }} /> Salary</TableCell>
                          <TableCell sx={{ border: 'none' }}>{selectedEmployee.salary}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }} gutterBottom>
                      Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedEmployee.skills.map((skill, index) => (
                        <Chip key={index} label={skill} color="primary" variant="outlined" size="small" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setOpenViewDialog(false)
              handleEdit(selectedEmployee)
            }}
          >
            Edit Profile
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="First Name" 
                value={editFormData.name ? editFormData.name.split(' ')[0] : ''}
                onChange={(e) => handleEditFormChange('firstName', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Last Name" 
                value={editFormData.name ? editFormData.name.split(' ').slice(1).join(' ') : ''}
                onChange={(e) => handleEditFormChange('lastName', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Email" 
                type="email" 
                value={editFormData.email || ''}
                onChange={(e) => handleEditFormChange('email', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Employee ID" 
                value={editFormData.employeeId || ''}
                onChange={(e) => handleEditFormChange('employeeId', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                select 
                label="Department" 
                value={editFormData.department || ''}
                onChange={(e) => handleEditFormChange('department', e.target.value)}
                required
              >
                <MenuItem value="">Select Department</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="HR">Human Resources</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Position" 
                value={editFormData.position || ''}
                onChange={(e) => handleEditFormChange('position', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Salary" 
                value={editFormData.salary || ''}
                onChange={(e) => handleEditFormChange('salary', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Phone" 
                value={editFormData.phone || ''}
                onChange={(e) => handleEditFormChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Date of Birth" 
                type="date"
                value={editFormData.dateOfBirth || ''}
                onChange={(e) => handleEditFormChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Address" 
                value={editFormData.address || ''}
                onChange={(e) => handleEditFormChange('address', e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Skills (comma-separated)" 
                value={editFormData.skills ? editFormData.skills.join(', ') : ''}
                onChange={(e) => handleEditFormChange('skills', e.target.value)}
                placeholder="e.g., React, Node.js, TypeScript"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Manager" 
                value={editFormData.manager || ''}
                onChange={(e) => handleEditFormChange('manager', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={editFormData.status === 'active'}
                    onChange={(e) => handleEditFormChange('status', e.target.checked ? 'active' : 'inactive')}
                  />
                }
                label="Active Employee"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveEditedEmployee}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Employee Dialog (similar to edit but with create functionality) */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="First Name" 
                value={editFormData.firstName || ''}
                onChange={(e) => handleEditFormChange('firstName', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Last Name" 
                value={editFormData.lastName || ''}
                onChange={(e) => handleEditFormChange('lastName', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Email" 
                type="email" 
                value={editFormData.email || ''}
                onChange={(e) => handleEditFormChange('email', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Employee ID" 
                value={editFormData.employeeId || ''}
                onChange={(e) => handleEditFormChange('employeeId', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                select 
                label="Department" 
                value={editFormData.department || ''}
                onChange={(e) => handleEditFormChange('department', e.target.value)}
                required
              >
                <MenuItem value="">Select Department</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="HR">Human Resources</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Position" 
                value={editFormData.position || ''}
                onChange={(e) => handleEditFormChange('position', e.target.value)}
                required 
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={editFormData.status || false}
                    onChange={(e) => handleEditFormChange('status', e.target.checked)}
                  />
                }
                label="Active Employee"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={addNewEmployee}>
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'error.main' }}>
                {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {selectedEmployee.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedEmployee.position} • {selectedEmployee.department}
              </Typography>
              <Alert severity="warning" sx={{ mt: 2 }}>
                Are you sure you want to delete this employee? This action cannot be undone.
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  )
}

export default EmployeeManagement