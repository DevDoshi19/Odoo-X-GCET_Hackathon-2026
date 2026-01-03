import { useState, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Paper,
  Avatar,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Business as BusinessIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Security as SecurityIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material'

// Mock database of existing employees
const mockEmployeeDatabase = [
  {
    id: 1,
    email: 'admin@dayflow.com',
    password: 'admin123',
    employeeId: 'ADM001',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    department: 'Administration',
    phone: '+1 (555) 123-4567',
    status: 'active',
    joinDate: '2020-01-15',
  },
  {
    id: 2,
    email: 'employee@dayflow.com',
    password: 'employee123',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    role: 'employee',
    department: 'Engineering',
    phone: '+1 (555) 987-6543',
    status: 'active',
    joinDate: '2021-03-20',
  },
  {
    id: 3,
    email: 'jane.smith@company.com',
    password: 'jane123',
    employeeId: 'EMP002',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'employee',
    department: 'Marketing',
    phone: '+1 (555) 456-7890',
    status: 'active',
    joinDate: '2022-06-10',
  },
  {
    id: 4,
    email: 'mike.johnson@company.com',
    password: 'mike123',
    employeeId: 'EMP003',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'employee',
    department: 'Sales',
    phone: '+1 (555) 789-0123',
    status: 'active',
    joinDate: '2022-08-15',
  },
  {
    id: 5,
    email: 'sarah.wilson@company.com',
    password: 'sarah123',
    employeeId: 'EMP004',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'manager',
    department: 'HR',
    phone: '+1 (555) 234-5678',
    status: 'active',
    joinDate: '2021-11-01',
  },
]

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    employeeId: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedEmployees, setSuggestedEmployees] = useState([])
  const [openSuggestionDialog, setOpenSuggestionDialog] = useState(false)
  const [openForgotPassword, setOpenForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const navigate = useNavigate()

  // Load saved email from localStorage for convenience
  useEffect(() => {
    const savedEmail = localStorage.getItem('last_login_email')
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }))
    }
  }, [])

  // Check for employee suggestions when typing email
  useEffect(() => {
    if (formData.email && formData.email.length >= 3) {
      const suggestions = mockEmployeeDatabase.filter(emp => 
        emp.email.toLowerCase().includes(formData.email.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(formData.email.toLowerCase()) ||
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(formData.email.toLowerCase())
      ).slice(0, 3) // Show max 3 suggestions
      
      setSuggestedEmployees(suggestions)
    } else {
      setSuggestedEmployees([])
    }
  }, [formData.email])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required')
      return false
    }
    
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    
    return true
  }

  const checkEmployeeExists = (email) => {
    return mockEmployeeDatabase.find(emp => emp.email.toLowerCase() === email.toLowerCase())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError('')

    // Check if employee exists
    const existingEmployee = checkEmployeeExists(formData.email)
    
    if (!existingEmployee) {
      // Employee doesn't exist - show suggestion dialog
      setIsLoading(false)
      setOpenSuggestionDialog(true)
      return
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check credentials
    if (existingEmployee.password === formData.password) {
      // Successful login
      localStorage.setItem('hrms_token', 'mock_jwt_token_' + Date.now())
      localStorage.setItem('hrms_user', JSON.stringify({
        id: existingEmployee.id,
        email: existingEmployee.email,
        role: existingEmployee.role,
        firstName: existingEmployee.firstName,
        lastName: existingEmployee.lastName,
        employeeId: existingEmployee.employeeId,
        department: existingEmployee.department,
        phone: existingEmployee.phone,
        status: existingEmployee.status,
        joinDate: existingEmployee.joinDate,
      }))
      
      // Save email for convenience
      localStorage.setItem('last_login_email', existingEmployee.email)
      
      setSuccess(`Welcome back, ${existingEmployee.firstName}!`)
      showSnackbar(`Successfully logged in as ${existingEmployee.firstName} ${existingEmployee.lastName}`, 'success')
      
      // Redirect based on role
      setTimeout(() => {
        if (existingEmployee.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/dashboard')
        }
      }, 500)
    } else {
      // Wrong password
      setError('Invalid password. Please try again.')
      showSnackbar('Invalid password. Please check your credentials.', 'error')
    }
    
    setIsLoading(false)
  }

  const handleQuickLogin = (employee) => {
    setFormData({
      email: employee.email,
      password: '',
      employeeId: employee.employeeId,
    })
    setOpenSuggestionDialog(false)
    showSnackbar(`Using ${employee.email} - Please enter your password`, 'info')
  }

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      showSnackbar('Please enter your email address', 'error')
      return
    }

    const employee = checkEmployeeExists(forgotPasswordEmail)
    if (!employee) {
      showSnackbar('No account found with this email address', 'error')
      return
    }

    // Simulate password reset process
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    showSnackbar(`Password reset link sent to ${forgotPasswordEmail}`, 'success')
    setOpenForgotPassword(false)
    setForgotPasswordEmail('')
    setIsLoading(false)
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleTestCredential = (email, password) => {
    setFormData({
      email,
      password,
      employeeId: '',
    })
    showSnackbar(`Using ${email} - Click Sign In to continue`, 'info')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              bgcolor: 'primary.main',
            }}
          >
            <SecurityIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
            Dayflow HRMS
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Secure Employee Portal
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              icon={<ErrorIcon />}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert 
              severity="success" 
              sx={{ mb: 3 }}
              icon={<CheckCircleIcon />}
            >
              {success}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="username"
            error={!!error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color={error ? "error" : "action"} />
                </InputAdornment>
              ),
            }}
            helperText="Enter your registered company email"
          />

          {suggestedEmployees.length > 0 && (
            <Paper elevation={1} sx={{ p: 1, mb: 2, bgcolor: 'grey.50' }}>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                Quick suggestions:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                {suggestedEmployees.map(emp => (
                  <Chip
                    key={emp.id}
                    label={`${emp.firstName} ${emp.lastName}`}
                    size="small"
                    onClick={() => handleQuickLogin(emp)}
                    variant="outlined"
                    avatar={<Avatar sx={{ width: 24, height: 24 }}>{emp.firstName[0]}</Avatar>}
                  />
                ))}
              </Box>
            </Paper>
          )}

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="current-password"
            error={!!error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color={error ? "error" : "action"} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText="Enter your secure password"
          />

          <TextField
            fullWidth
            label="Employee ID (Optional)"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon color="action" />
                </InputAdornment>
              ),
            }}
            helperText="For faster login, enter your employee ID"
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => setOpenForgotPassword(true)}
              sx={{ fontWeight: 500 }}
            >
              Forgot Password?
            </Link>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{ fontWeight: 500 }}
            >
              Need an account?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ 
              mt: 2, 
              mb: 2, 
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
            }}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Quick Access
            </Typography>
          </Divider>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleTestCredential('admin@dayflow.com', 'admin123')}
                startIcon={<PersonIcon />}
                sx={{ textTransform: 'none' }}
              >
                Admin Login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleTestCredential('employee@dayflow.com', 'employee123')}
                startIcon={<PersonIcon />}
                sx={{ textTransform: 'none' }}
              >
                Employee Login
              </Button>
            </Grid>
          </Grid>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Login Tips:
              </Typography>
              <List dense disablePadding>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Use your company email address" 
                    primaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Contact HR if you don't have an account" 
                    primaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              First time here?{' '}
              <Link 
                component={RouterLink} 
                to="/register" 
                sx={{ fontWeight: 600 }}
                underline="hover"
              >
                Create Account
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Employee Not Found Dialog */}
      <Dialog 
        open={openSuggestionDialog} 
        onClose={() => setOpenSuggestionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ErrorIcon color="warning" />
            <Typography variant="h6">Account Not Found</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            No employee account found with email: <strong>{formData.email}</strong>
          </Alert>
          
          <Typography variant="body1" paragraph>
            If you're a new employee, you need to register first or contact HR for account setup.
          </Typography>

          <List>
            <ListItem 
              button 
              component={RouterLink} 
              to="/register"
              onClick={() => setOpenSuggestionDialog(false)}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemIcon>
                <RegisterIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Create New Account" 
                secondary="Register as a new employee" 
              />
              <ArrowForwardIcon color="action" />
            </ListItem>

            <ListItem 
              button 
              onClick={() => {
                // Show similar employees
                const similar = mockEmployeeDatabase.filter(emp => 
                  emp.email.split('@')[0].toLowerCase() === formData.email.split('@')[0].toLowerCase()
                )
                if (similar.length > 0) {
                  setFormData({
                    ...formData,
                    email: similar[0].email,
                  })
                  showSnackbar(`Suggested email: ${similar[0].email}`, 'info')
                }
                setOpenSuggestionDialog(false)
              }}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>
                <EmailIcon color="secondary" />
              </ListItemIcon>
              <ListItemText 
                primary="Check Email Format" 
                secondary="Your email might be different" 
              />
            </ListItem>
          </List>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Common email formats:
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'primary.main' }}>
            • firstname.lastname@company.com
            <br />
            • firstname@company.com
            <br />
            • employeeID@company.com
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSuggestionDialog(false)}>Cancel</Button>
          <Button 
            component={RouterLink} 
            to="/register"
            variant="contained"
            onClick={() => setOpenSuggestionDialog(false)}
            startIcon={<RegisterIcon />}
          >
            Register Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog 
        open={openForgotPassword} 
        onClose={() => setOpenForgotPassword(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Enter your email address to receive a password reset link.
          </Typography>
          
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            The reset link will be sent to your registered email address.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForgotPassword(false)}>Cancel</Button>
          <Button 
            onClick={handleForgotPassword}
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </DialogActions>
      </Dialog>

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

// Import missing SendIcon
import SendIcon from '@mui/icons-material/Send'

export default Login