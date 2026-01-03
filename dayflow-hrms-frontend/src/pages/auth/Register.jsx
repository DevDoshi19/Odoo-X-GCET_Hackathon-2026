// import { useState } from 'react';
// import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Alert,
//   Link,
//   Grid,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormLabel,
//   Paper,
//   Avatar,
//   InputAdornment,
//   IconButton,
//   Card,
//   CardContent,
//   Divider,
//   Chip,
//   Snackbar,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Stepper,
//   Step,
//   StepLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
// } from '@mui/material';
// import {
//   Person as PersonIcon,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Phone as PhoneIcon,
//   LocationOn as LocationIcon,
//   Work as WorkIcon,
//   AttachMoney as SalaryIcon,
//   CalendarMonth as CalendarIcon,
//   Visibility,
//   VisibilityOff,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   HowToReg as RegisterIcon,
//   ArrowForward as ArrowForwardIcon,
//   Badge as BadgeIcon,
//   Security as SecurityIcon,
// } from '@mui/icons-material';

// const steps = ['Personal Info', 'Employment Details', 'Account Setup', 'Confirmation'];

// const Register = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     dateOfBirth: '',
//     employeeId: '',
//     department: '',
//     position: '',
//     manager: '',
//     salary: '',
//     joinDate: '',
//     password: '',
//     confirmPassword: '',
//     role: 'employee',
//     securityQuestion: '',
//     securityAnswer: '',
//     receiveUpdates: true,
//     termsAccepted: false,
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });
//   const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
//   const [generatedCredentials, setGeneratedCredentials] = useState(null);
//   const navigate = useNavigate();

//   const departments = [
//     'Engineering',
//     'Marketing',
//     'Sales',
//     'Human Resources',
//     'Finance',
//     'Operations',
//     'IT Support',
//     'Customer Service',
//     'Product Management',
//     'Quality Assurance',
//   ];

//   const positionsByDepartment = {
//     'Engineering': ['Software Engineer', 'Senior Developer', 'Tech Lead', 'DevOps Engineer', 'QA Engineer'],
//     'Marketing': ['Marketing Manager', 'Content Writer', 'SEO Specialist', 'Digital Marketer'],
//     'Sales': ['Sales Executive', 'Sales Manager', 'Account Executive'],
//     'Human Resources': ['HR Manager', 'Recruiter', 'HR Generalist'],
//     'Finance': ['Accountant', 'Financial Analyst', 'Finance Manager'],
//     'Operations': ['Operations Manager', 'Project Coordinator'],
//     'IT Support': ['IT Support Specialist', 'System Administrator'],
//     'Customer Service': ['Customer Service Representative', 'Support Manager'],
//     'Product Management': ['Product Manager', 'Product Owner'],
//     'Quality Assurance': ['QA Analyst', 'Test Engineer'],
//   };

//   const securityQuestions = [
//     "What was your first pet's name?",
//     "What is your mother's maiden name?",
//     'What was your first car?',
//     'What elementary school did you attend?',
//     'What city were you born in?',
//   ];

//   const checkEmailExists = (email) => {
//     const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
//     return users.find(user => user.email.toLowerCase() === email.toLowerCase());
//   };

//   const checkEmployeeIdExists = (employeeId) => {
//     const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
//     return users.find(user => user.employeeId === employeeId);
//   };

//   const generateEmployeeId = () => {
//     const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
//     const employeeUsers = users.filter(user => user.employeeId?.startsWith('EMP'));
//     const nextNumber = employeeUsers.length + 1;
//     return `EMP${String(nextNumber).padStart(3, '0')}`;
//   };

//   const validateStep = (step) => {
//     setError('');
    
//     switch (step) {
//       case 0:
//         if (!formData.firstName.trim()) {
//           setError('First name is required');
//           return false;
//         }
//         if (!formData.lastName.trim()) {
//           setError('Last name is required');
//           return false;
//         }
//         if (!formData.email.trim()) {
//           setError('Email is required');
//           return false;
//         }
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) {
//           setError('Please enter a valid email address');
//           return false;
//         }
//         if (checkEmailExists(formData.email)) {
//           setError('This email is already registered. Please use a different email or login.');
//           return false;
//         }
//         if (!formData.phone.trim()) {
//           setError('Phone number is required');
//           return false;
//         }
//         if (!formData.dateOfBirth) {
//           setError('Date of birth is required');
//           return false;
//         }
//         return true;

//       case 1:
//         if (!formData.department) {
//           setError('Department is required');
//           return false;
//         }
//         if (!formData.position) {
//           setError('Position is required');
//           return false;
//         }
//         if (!formData.joinDate) {
//           setError('Join date is required');
//           return false;
//         }
//         if (!formData.employeeId.trim()) {
//           const generatedId = generateEmployeeId();
//           setFormData(prev => ({ ...prev, employeeId: generatedId }));
//         } else if (checkEmployeeIdExists(formData.employeeId)) {
//           setError('This Employee ID is already taken. Please use a different ID.');
//           return false;
//         }
//         return true;

//       case 2:
//         if (!formData.password) {
//           setError('Password is required');
//           return false;
//         }
//         if (formData.password.length < 8) {
//           setError('Password must be at least 8 characters');
//           return false;
//         }
//         if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//           setError('Password must contain uppercase, lowercase, and numbers');
//           return false;
//         }
//         if (formData.password !== formData.confirmPassword) {
//           setError('Passwords do not match');
//           return false;
//         }
//         if (!formData.termsAccepted) {
//           setError('You must accept the terms and conditions');
//           return false;
//         }
//         return true;

//       default:
//         return true;
//     }
//   };

//   const handleNext = () => {
//     if (validateStep(activeStep)) {
//       setActiveStep((prevStep) => prevStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//     setError('');
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateStep(activeStep)) {
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     try {
//       const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
      
//       const newUser = {
//         id: Date.now(),
//         ...formData,
//         status: 'active',
//         createdAt: new Date().toISOString(),
//         lastLogin: null,
//         profilePicture: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random`,
//       };

//       users.push(newUser);
//       localStorage.setItem('hrms_users', JSON.stringify(users));

//       setGeneratedCredentials({
//         email: newUser.email,
//         password: newUser.password,
//         employeeId: newUser.employeeId,
//         role: newUser.role,
//       });

//       setSuccess('Account created successfully!');
//       setOpenSuccessDialog(true);
//       showSnackbar('Registration successful!', 'success');
      
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//       showSnackbar('Registration failed. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLoginWithNewAccount = () => {
//     const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
//     const newUser = users.find(user => user.email === generatedCredentials?.email);
    
//     if (newUser) {
//       localStorage.setItem('hrms_token', 'mock_jwt_token_' + Date.now());
//       localStorage.setItem('hrms_user', JSON.stringify({
//         id: newUser.id,
//         email: newUser.email,
//         role: newUser.role,
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         employeeId: newUser.employeeId,
//         department: newUser.department,
//         position: newUser.position,
//         phone: newUser.phone,
//         status: newUser.status,
//         joinDate: newUser.joinDate,
//       }));
      
//       showSnackbar(`Welcome ${newUser.firstName}!`, 'success');
      
//       setTimeout(() => {
//         if (newUser.role === 'admin') {
//           navigate('/admin');
//         } else {
//           navigate('/dashboard');
//         }
//       }, 1000);
//     }
//   };

//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbar({
//       open: true,
//       message,
//       severity,
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const getPasswordStrength = (password) => {
//     if (!password) return { strength: 0, label: '', color: 'grey' };
    
//     let strength = 0;
//     if (password.length >= 8) strength += 1;
//     if (/[a-z]/.test(password)) strength += 1;
//     if (/[A-Z]/.test(password)) strength += 1;
//     if (/\d/.test(password)) strength += 1;
//     if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
//     const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
//     const colors = ['error', 'warning', 'warning', 'success', 'success', 'success'];
    
//     return {
//       strength: (strength / 5) * 100,
//       label: labels[strength],
//       color: colors[strength],
//     };
//   };

//   const passwordStrength = getPasswordStrength(formData.password);

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 helperText="Use your company email address"
//               />
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PhoneIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Date of Birth"
//                 name="dateOfBirth"
//                 type="date"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 required
//                 InputLabelProps={{ shrink: true }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <CalendarIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 multiline
//                 rows={2}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LocationIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//           </Grid>
//         );

//       case 1:
//         return (
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <InputLabel>Department</InputLabel>
//                 <Select
//                   name="department"
//                   value={formData.department}
//                   onChange={handleChange}
//                   label="Department"
//                 >
//                   <MenuItem value="">Select Department</MenuItem>
//                   {departments.map(dept => (
//                     <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <InputLabel>Position</InputLabel>
//                 <Select
//                   name="position"
//                   value={formData.position}
//                   onChange={handleChange}
//                   label="Position"
//                   disabled={!formData.department}
//                 >
//                   <MenuItem value="">Select Position</MenuItem>
//                   {formData.department && positionsByDepartment[formData.department]?.map(pos => (
//                     <MenuItem key={pos} value={pos}>{pos}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Employee ID"
//                 name="employeeId"
//                 value={formData.employeeId}
//                 onChange={handleChange}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <BadgeIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 helperText="Leave blank to auto-generate"
//               />
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Join Date"
//                 name="joinDate"
//                 type="date"
//                 value={formData.joinDate}
//                 onChange={handleChange}
//                 required
//                 InputLabelProps={{ shrink: true }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <CalendarIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Manager"
//                 name="manager"
//                 value={formData.manager}
//                 onChange={handleChange}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 helperText="Reporting manager's name"
//               />
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Salary"
//                 name="salary"
//                 type="number"
//                 value={formData.salary}
//                 onChange={handleChange}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SalaryIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 helperText="Annual salary"
//               />
//             </Grid>
//           </Grid>
//         );

//       case 2:
//         return (
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <FormLabel sx={{ mb: 2, display: 'block' }}>
//                 Account Type
//               </FormLabel>
//               <RadioGroup
//                 row
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <FormControlLabel 
//                   value="employee" 
//                   control={<Radio />} 
//                   label="Employee"
//                 />
//                 <FormControlLabel 
//                   value="admin" 
//                   control={<Radio />} 
//                   label="Administrator"
//                 />
//               </RadioGroup>
//             </Grid>
            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon color="action" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
              
//               {formData.password && (
//                 <Box sx={{ mt: 1, mb: 2 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                     <Typography variant="caption" color="text.secondary">
//                       Password Strength: {passwordStrength.label}
//                     </Typography>
//                     <Typography variant="caption" color={passwordStrength.color}>
//                       {Math.round(passwordStrength.strength)}%
//                     </Typography>
//                   </Box>
//                   <Box sx={{ width: '100%', height: 4, bgcolor: 'grey.200', borderRadius: 2, overflow: 'hidden' }}>
//                     <Box 
//                       sx={{ 
//                         width: `${passwordStrength.strength}%`, 
//                         height: '100%', 
//                         bgcolor: `${passwordStrength.color}.main`,
//                       }} 
//                     />
//                   </Box>
//                 </Box>
//               )}
//             </Grid>
            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 error={formData.password !== formData.confirmPassword && !!formData.confirmPassword}
//                 helperText={formData.password !== formData.confirmPassword && !!formData.confirmPassword ? "Passwords don't match" : ""}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon color="action" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         edge="end"
//                       >
//                         {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
            
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Security Question</InputLabel>
//                 <Select
//                   name="securityQuestion"
//                   value={formData.securityQuestion}
//                   onChange={handleChange}
//                   label="Security Question"
//                 >
//                   <MenuItem value="">Select a security question</MenuItem>
//                   {securityQuestions.map((question, index) => (
//                     <MenuItem key={index} value={question}>{question}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Security Answer"
//                 name="securityAnswer"
//                 value={formData.securityAnswer}
//                 onChange={handleChange}
//               />
//             </Grid>
            
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox 
//                     name="receiveUpdates"
//                     checked={formData.receiveUpdates}
//                     onChange={handleChange}
//                   />
//                 }
//                 label="Receive email updates about my account and company news"
//               />
//             </Grid>
            
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox 
//                     name="termsAccepted"
//                     checked={formData.termsAccepted}
//                     onChange={handleChange}
//                     required
//                   />
//                 }
//                 label={
//                   <Typography variant="body2">
//                     I accept the{' '}
//                     <Link href="#" onClick={(e) => { e.preventDefault(); showSnackbar('Terms and conditions would open here', 'info'); }}>
//                       Terms and Conditions
//                     </Link>
//                     {' '}and{' '}
//                     <Link href="#" onClick={(e) => { e.preventDefault(); showSnackbar('Privacy policy would open here', 'info'); }}>
//                       Privacy Policy
//                     </Link>
//                   </Typography>
//                 }
//               />
//             </Grid>
//           </Grid>
//         );

//       case 3:
//         return (
//           <Box sx={{ textAlign: 'center', py: 4 }}>
//             <Avatar
//               sx={{
//                 width: 80,
//                 height: 80,
//                 mx: 'auto',
//                 mb: 3,
//                 bgcolor: 'success.light',
//               }}
//             >
//               <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
//             </Avatar>
            
//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//               Ready to Create Account
//             </Typography>
            
//             <Typography variant="body1" color="text.secondary" paragraph>
//               Review your information before submitting
//             </Typography>
            
//             <Card variant="outlined" sx={{ mt: 3 }}>
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Full Name
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                       {formData.firstName} {formData.lastName}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Employee ID
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                       {formData.employeeId || 'Will be generated'}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Email
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                       {formData.email}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Department
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                       {formData.department || 'Not selected'}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Position
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                       {formData.position || 'Not selected'}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="caption" color="text.secondary">
//                       Account Type
//                     </Typography>
//                     <Chip 
//                       label={formData.role.toUpperCase()} 
//                       color={formData.role === 'admin' ? 'error' : 'primary'}
//                       size="small"
//                     />
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Box>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
//         <Box sx={{ textAlign: 'center', mb: 4 }}>
//           <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
//             <RegisterIcon sx={{ fontSize: 40, color: 'white' }} />
//           </Avatar>
//           <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
//             Join HRMS
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Create your employee account in 4 simple steps
//           </Typography>
//         </Box>

//         <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
//           <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>

//           {error && (
//             <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
//               {error}
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit}>
//             {renderStepContent(activeStep)}

//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//               <Button
//                 disabled={activeStep === 0 || isLoading}
//                 onClick={handleBack}
//                 variant="outlined"
//               >
//                 Back
//               </Button>
              
//               {activeStep === steps.length - 1 ? (
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={isLoading}
//                   startIcon={isLoading ? <CircularProgress size={20} /> : <RegisterIcon />}
//                 >
//                   {isLoading ? 'Creating Account...' : 'Create Account'}
//                 </Button>
//               ) : (
//                 <Button variant="contained" onClick={handleNext}>
//                   Next
//                 </Button>
//               )}
//             </Box>
//           </form>
//         </Paper>

//         <Divider sx={{ my: 3 }}>
//           <Typography variant="body2" color="text.secondary">
//             Already registered?
//           </Typography>
//         </Divider>

//         <Box sx={{ textAlign: 'center' }}>
//           <Button
//             component={RouterLink}
//             to="/login"
//             variant="outlined"
//           >
//             Sign In to Existing Account
//           </Button>
//         </Box>
//       </Paper>

//       {/* Success Dialog */}
//       <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
//         <DialogTitle>Registration Successful!</DialogTitle>
//         <DialogContent>
//           <Alert severity="success" sx={{ mb: 3 }}>
//             Your account has been created successfully.
//           </Alert>
          
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             <strong>Email:</strong> {generatedCredentials?.email}
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             <strong>Employee ID:</strong> {generatedCredentials?.employeeId}
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             <strong>Account Type:</strong> {generatedCredentials?.role.toUpperCase()}
//           </Typography>
          
//           <Alert severity="warning" sx={{ mt: 2 }}>
//             Please save your login credentials.
//           </Alert>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => navigate('/login')}>Go to Login</Button>
//           <Button variant="contained" onClick={handleLoginWithNewAccount}>
//             Login Now
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Register;

import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Paper,
  Avatar,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Divider,
  Chip,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  AttachMoney as SalaryIcon,
  CalendarMonth as CalendarIcon,
  Visibility,
  VisibilityOff,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  HowToReg as RegisterIcon,
  ArrowForward as ArrowForwardIcon,
  Badge as BadgeIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const steps = ['Personal Info', 'Employment Details', 'Account Setup', 'Confirmation'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    employeeId: '',
    department: '',
    position: '',
    manager: '',
    salary: '',
    joinDate: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
    securityQuestion: '',
    securityAnswer: '',
    receiveUpdates: true,
    termsAccepted: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState(null);
  const navigate = useNavigate();

  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'IT Support',
    'Customer Service',
    'Product Management',
    'Quality Assurance',
  ];

  const positionsByDepartment = {
    'Engineering': ['Software Engineer', 'Senior Developer', 'Tech Lead', 'DevOps Engineer', 'QA Engineer'],
    'Marketing': ['Marketing Manager', 'Content Writer', 'SEO Specialist', 'Digital Marketer'],
    'Sales': ['Sales Executive', 'Sales Manager', 'Account Executive'],
    'Human Resources': ['HR Manager', 'Recruiter', 'HR Generalist'],
    'Finance': ['Accountant', 'Financial Analyst', 'Finance Manager'],
    'Operations': ['Operations Manager', 'Project Coordinator'],
    'IT Support': ['IT Support Specialist', 'System Administrator'],
    'Customer Service': ['Customer Service Representative', 'Support Manager'],
    'Product Management': ['Product Manager', 'Product Owner'],
    'Quality Assurance': ['QA Analyst', 'Test Engineer'],
  };

  const securityQuestions = [
    "What was your first pet's name?",
    "What is your mother's maiden name?",
    'What was your first car?',
    'What elementary school did you attend?',
    'What city were you born in?',
  ];

  const checkEmailExists = (email) => {
    const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  };

  const checkEmployeeIdExists = (employeeId) => {
    const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
    return users.find(user => user.employeeId === employeeId);
  };

  const generateEmployeeId = () => {
    const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
    
    // Get joining year from joinDate
    const joinYear = formData.joinDate ? new Date(formData.joinDate).getFullYear() : new Date().getFullYear();
    
    // Generate base ID: OI + first two letters of first name + first two letters of last name + joining year
    const firstNameFirstTwo = formData.firstName.substring(0, 2).toUpperCase();
    const lastNameFirstTwo = formData.lastName.substring(0, 2).toUpperCase();
    const baseId = `OI${firstNameFirstTwo}${lastNameFirstTwo}${joinYear}`;
    
    // Find all existing IDs with the same base pattern
    const existingIds = users
      .filter(user => user.employeeId?.startsWith(baseId))
      .map(user => user.employeeId);
    
    // Find the highest sequence number
    let nextSequence = 1;
    if (existingIds.length > 0) {
      const sequenceNumbers = existingIds.map(id => {
        const sequencePart = id.substring(baseId.length);
        return parseInt(sequencePart) || 0;
      });
      const maxSequence = Math.max(...sequenceNumbers);
      nextSequence = maxSequence + 1;
    }
    
    // Format sequence as 4-digit number
    const sequenceStr = String(nextSequence).padStart(4, '0');
    
    return `${baseId}${sequenceStr}`;
  };

  const validateStep = (step) => {
    setError('');
    
    switch (step) {
      case 0:
        if (!formData.firstName.trim()) {
          setError('First name is required');
          return false;
        }
        if (!formData.lastName.trim()) {
          setError('Last name is required');
          return false;
        }
        if (formData.firstName.length < 2) {
          setError('First name must be at least 2 characters for employee ID generation');
          return false;
        }
        if (formData.lastName.length < 2) {
          setError('Last name must be at least 2 characters for employee ID generation');
          return false;
        }
        if (!formData.email.trim()) {
          setError('Email is required');
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError('Please enter a valid email address');
          return false;
        }
        if (checkEmailExists(formData.email)) {
          setError('This email is already registered. Please use a different email or login.');
          return false;
        }
        if (!formData.phone.trim()) {
          setError('Phone number is required');
          return false;
        }
        if (!formData.dateOfBirth) {
          setError('Date of birth is required');
          return false;
        }
        return true;

      case 1:
        if (!formData.department) {
          setError('Department is required');
          return false;
        }
        if (!formData.position) {
          setError('Position is required');
          return false;
        }
        if (!formData.joinDate) {
          setError('Join date is required');
          return false;
        }
        // Auto-generate employee ID (user cannot change it)
        const generatedId = generateEmployeeId();
        setFormData(prev => ({ ...prev, employeeId: generatedId }));
        
        if (checkEmployeeIdExists(generatedId)) {
          setError('Generated Employee ID already exists. Please try again.');
          return false;
        }
        return true;

      case 2:
        if (!formData.password) {
          setError('Password is required');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters');
          return false;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          setError('Password must contain uppercase, lowercase, and numbers');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        if (!formData.termsAccepted) {
          setError('You must accept the terms and conditions');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(activeStep)) {
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
      
      const newUser = {
        id: Date.now(),
        ...formData,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: null,
        profilePicture: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random`,
      };

      users.push(newUser);
      localStorage.setItem('hrms_users', JSON.stringify(users));

      setGeneratedCredentials({
        email: newUser.email,
        password: newUser.password,
        employeeId: newUser.employeeId,
        role: newUser.role,
      });

      setSuccess('Account created successfully!');
      setOpenSuccessDialog(true);
      showSnackbar('Registration successful!', 'success');
      
    } catch (err) {
      setError('Registration failed. Please try again.');
      showSnackbar('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithNewAccount = () => {
    const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
    const newUser = users.find(user => user.email === generatedCredentials?.email);
    
    if (newUser) {
      localStorage.setItem('hrms_token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('hrms_user', JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        employeeId: newUser.employeeId,
        department: newUser.department,
        position: newUser.position,
        phone: newUser.phone,
        status: newUser.status,
        joinDate: newUser.joinDate,
      }));
      
      showSnackbar(`Welcome ${newUser.firstName}!`, 'success');
      
      setTimeout(() => {
        if (newUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: 'grey' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['error', 'warning', 'warning', 'success', 'success', 'success'];
    
    return {
      strength: (strength / 5) * 100,
      label: labels[strength],
      color: colors[strength],
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Function to show employee ID preview
  const getEmployeeIdPreview = () => {
    if (formData.firstName.length >= 2 && formData.lastName.length >= 2 && formData.joinDate) {
      const joinYear = new Date(formData.joinDate).getFullYear();
      const firstNameFirstTwo = formData.firstName.substring(0, 2).toUpperCase();
      const lastNameFirstTwo = formData.lastName.substring(0, 2).toUpperCase();
      const baseId = `OI${firstNameFirstTwo}${lastNameFirstTwo}${joinYear}`;
      return `${baseId}0001`; // Preview with first sequence
    }
    return '';
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                helperText="Minimum 2 characters required"
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                helperText="Minimum 2 characters required"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                helperText="Use your company email address"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  label="Department"
                >
                  <MenuItem value="">Select Department</MenuItem>
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Position</InputLabel>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  label="Position"
                  disabled={!formData.department}
                >
                  <MenuItem value="">Select Position</MenuItem>
                  {formData.department && positionsByDepartment[formData.department]?.map(pos => (
                    <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Join Date"
                name="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                helperText="Employee ID will be generated based on this date"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manager"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                helperText="Reporting manager's name"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SalaryIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                helperText="Annual salary"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                name="employeeId"
                value={formData.employeeId || (formData.joinDate ? getEmployeeIdPreview() : '')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon color="action" />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                helperText="Auto-generated (Format: OIXXYYYEAR####)"
                disabled
              />
            </Grid>
            
            {formData.joinDate && formData.firstName.length >= 2 && formData.lastName.length >= 2 && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    Your employee ID will be auto-generated as: <strong>{formData.employeeId || getEmployeeIdPreview()}</strong>
                    <br />
                    Format: OI + First 2 letters of first name ({formData.firstName.substring(0, 2).toUpperCase()}) + 
                    First 2 letters of last name ({formData.lastName.substring(0, 2).toUpperCase()}) + 
                    Joining year ({new Date(formData.joinDate).getFullYear()}) + Sequence number (0001, 0002, ...)
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel sx={{ mb: 2, display: 'block' }}>
                Account Type
              </FormLabel>
              <RadioGroup
                row
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <FormControlLabel 
                  value="employee" 
                  control={<Radio />} 
                  label="Employee"
                />
                <FormControlLabel 
                  value="admin" 
                  control={<Radio />} 
                  label="Administrator"
                />
              </RadioGroup>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              {formData.password && (
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Password Strength: {passwordStrength.label}
                    </Typography>
                    <Typography variant="caption" color={passwordStrength.color}>
                      {Math.round(passwordStrength.strength)}%
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%', height: 4, bgcolor: 'grey.200', borderRadius: 2, overflow: 'hidden' }}>
                    <Box 
                      sx={{ 
                        width: `${passwordStrength.strength}%`, 
                        height: '100%', 
                        bgcolor: `${passwordStrength.color}.main`,
                      }} 
                    />
                  </Box>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={formData.password !== formData.confirmPassword && !!formData.confirmPassword}
                helperText={formData.password !== formData.confirmPassword && !!formData.confirmPassword ? "Passwords don't match" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Security Question</InputLabel>
                <Select
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  label="Security Question"
                >
                  <MenuItem value="">Select a security question</MenuItem>
                  {securityQuestions.map((question, index) => (
                    <MenuItem key={index} value={question}>{question}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Security Answer"
                name="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox 
                    name="receiveUpdates"
                    checked={formData.receiveUpdates}
                    onChange={handleChange}
                  />
                }
                label="Receive email updates about my account and company news"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                }
                label={
                  <Typography variant="body2">
                    I accept the{' '}
                    <Link href="#" onClick={(e) => { e.preventDefault(); showSnackbar('Terms and conditions would open here', 'info'); }}>
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href="#" onClick={(e) => { e.preventDefault(); showSnackbar('Privacy policy would open here', 'info'); }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                bgcolor: 'success.light',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
            </Avatar>
            
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Ready to Create Account
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              Review your information before submitting
            </Typography>
            
            <Card variant="outlined" sx={{ mt: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formData.firstName} {formData.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      Employee ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                      {formData.employeeId || getEmployeeIdPreview() || 'Will be generated'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formData.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      Department
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formData.department || 'Not selected'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      Position
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formData.position || 'Not selected'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      Account Type
                    </Typography>
                    <Chip 
                      label={formData.role.toUpperCase()} 
                      color={formData.role === 'admin' ? 'error' : 'primary'}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
            <RegisterIcon sx={{ fontSize: 40, color: 'white' }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Join HRMS
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create your employee account in 4 simple steps
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0 || isLoading}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <RegisterIcon />}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Already registered?
          </Typography>
        </Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
          >
            Sign In to Existing Account
          </Button>
        </Box>
      </Paper>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
        <DialogTitle>Registration Successful!</DialogTitle>
        <DialogContent>
          <Alert severity="success" sx={{ mb: 3 }}>
            Your account has been created successfully.
          </Alert>
          
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Employee ID:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{generatedCredentials?.employeeId}</span>
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Email:</strong> {generatedCredentials?.email}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Account Type:</strong> {generatedCredentials?.role.toUpperCase()}
          </Typography>
          
          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Important:</strong> Please save your Employee ID and login credentials.
              <br />
              Employee ID format: OI + First 2 letters of first name + First 2 letters of last name + Joining year + Sequence number
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
          <Button variant="contained" onClick={handleLoginWithNewAccount}>
            Login Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;