import { Outlet, Navigate } from 'react-router-dom'
import { Box, Container, Paper, Typography } from '@mui/material'

const AuthLayout = () => {
  const token = localStorage.getItem('hrms_token')

  // If user is already logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 1,
              }}
            >
              Dayflow HRMS
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Every workday, perfectly aligned
            </Typography>
          </Box>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthLayout