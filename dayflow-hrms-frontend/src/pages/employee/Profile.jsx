import { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from '@mui/material'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  CalendarMonth as CalendarIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  Badge as BadgeIcon,
  AttachMoney as SalaryIcon,
} from '@mui/icons-material'

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    department: '',
    position: '',
    employeeId: '',
    joinDate: '',
    salary: '',
    manager: '',
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = () => {
    setLoading(true)
    
    // Get current logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('hrms_user') || 'null')
    
    if (!loggedInUser || !loggedInUser.email) {
      setSnackbar({
        open: true,
        message: 'No user logged in. Please login first.',
        severity: 'error',
      })
      setLoading(false)
      return
    }

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('hrms_users') || '[]')
    
    // Find the user with matching email
    const foundUser = users.find(user => user.email === loggedInUser.email)
    
    if (!foundUser) {
      setSnackbar({
        open: true,
        message: 'User not found. Please contact HR.',
        severity: 'error',
      })
      setLoading(false)
      return
    }

    // Set user data
    setUser(foundUser)
    setFormData({
      firstName: foundUser.firstName || '',
      lastName: foundUser.lastName || '',
      email: foundUser.email || '',
      phone: foundUser.phone || '',
      address: foundUser.address || '',
      dateOfBirth: foundUser.dateOfBirth || '',
      department: foundUser.department || '',
      position: foundUser.position || '',
      employeeId: foundUser.employeeId || '',
      joinDate: foundUser.joinDate || '',
      salary: foundUser.salary || '',
      manager: foundUser.manager || '',
      role: foundUser.role || 'employee',
      status: foundUser.status || 'active',
    })
    
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    // Get current logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem('hrms_user') || 'null')
    
    if (!loggedInUser) {
      setSnackbar({
        open: true,
        message: 'No user logged in. Please login first.',
        severity: 'error',
      })
      return
    }

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('hrms_users') || '[]')
    
    // Find the index of current user
    const userIndex = users.findIndex(u => u.email === loggedInUser.email)
    
    if (userIndex === -1) {
      setSnackbar({
        open: true,
        message: 'User not found. Please contact HR.',
        severity: 'error',
      })
      return
    }

    // Update user data
    const updatedUser = {
      ...users[userIndex],
      ...formData,
      // Don't update these fields
      employeeId: users[userIndex].employeeId, // Keep original employee ID
      email: users[userIndex].email, // Keep original email
      role: users[userIndex].role, // Keep original role
      joinDate: users[userIndex].joinDate, // Keep original join date
      password: users[userIndex].password, // Keep original password
      status: users[userIndex].status, // Keep original status
    }
    
    users[userIndex] = updatedUser
    
    // Save updated users to localStorage
    localStorage.setItem('hrms_users', JSON.stringify(users))
    
    // Update localStorage user data
    localStorage.setItem('hrms_user', JSON.stringify({
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      employeeId: updatedUser.employeeId,
      department: updatedUser.department,
      position: updatedUser.position,
      phone: updatedUser.phone,
      status: updatedUser.status,
      joinDate: updatedUser.joinDate,
    }))
    
    // Update state
    setUser(updatedUser)
    setIsEditing(false)
    
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success',
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const personalInfo = [
    { icon: <PersonIcon />, label: 'Full Name', value: `${user?.firstName || ''} ${user?.lastName || ''}` },
    { icon: <EmailIcon />, label: 'Email', value: user?.email || '' },
    { icon: <PhoneIcon />, label: 'Phone', value: user?.phone || '' },
    { icon: <LocationIcon />, label: 'Address', value: user?.address || '' },
    { icon: <CalendarIcon />, label: 'Date of Birth', value: user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '' },
  ]

  const jobInfo = [
    { icon: <BadgeIcon />, label: 'Employee ID', value: user?.employeeId || '' },
    { icon: <WorkIcon />, label: 'Department', value: user?.department || '' },
    { icon: <WorkIcon />, label: 'Position', value: user?.position || '' },
    { icon: <CalendarIcon />, label: 'Join Date', value: user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : '' },
    { icon: <PersonIcon />, label: 'Manager', value: user?.manager || 'Not assigned' },
    { icon: <SalaryIcon />, label: 'Salary', value: user?.salary ? `$${parseInt(user.salary).toLocaleString()}` : 'Not disclosed' },
  ]

  const accountInfo = [
    { icon: <BusinessIcon />, label: 'Account Status', value: user?.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : '' },
    { icon: <BusinessIcon />, label: 'Role', value: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '' },
  ]

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    )
  }

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Unable to load profile. Please try logging in again.
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          My Profile
        </Typography>
        <Button
          variant={isEditing ? 'contained' : 'outlined'}
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Picture and Basic Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '2.5rem',
                  bgcolor: 'primary.main',
                  mb: 2,
                }}
              >
                {user?.firstName?.charAt(0) || ''}
                {user?.lastName?.charAt(0) || ''}
              </Avatar>
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
                disabled
              >
                <PhotoCameraIcon />
              </IconButton>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
              {user?.position || 'Employee'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.department || 'Department not assigned'}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" color="text.secondary">
              Employee ID: {user?.employeeId || 'Not assigned'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Status: <span style={{ color: user?.status === 'active' ? 'green' : 'red', fontWeight: 'bold' }}>
                {user?.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Unknown'}
              </span>
            </Typography>
          </Paper>
        </Grid>

        {/* Editable Form / Display Info */}
        <Grid item xs={12} md={8}>
          {isEditing ? (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Edit Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    type="email"
                    disabled
                    helperText="Email cannot be changed"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Employee ID"
                    name="employeeId"
                    value={formData.employeeId}
                    disabled
                    helperText="Employee ID cannot be changed"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Join Date"
                    name="joinDate"
                    value={formData.joinDate}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    disabled
                    helperText="Join date cannot be changed"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Manager"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Personal Information
                </Typography>
                <List>
                  {personalInfo.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        secondary={item.value || 'Not provided'}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Job Information
                </Typography>
                <List>
                  {jobInfo.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        secondary={item.value || 'Not provided'}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Account Information
                </Typography>
                <List>
                  {accountInfo.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        secondary={item.value || 'Not provided'}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </>
          )}
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default EmployeeProfile