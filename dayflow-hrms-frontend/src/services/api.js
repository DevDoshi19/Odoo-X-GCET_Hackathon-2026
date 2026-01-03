import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hrms_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
}

export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
}

export const attendanceAPI = {
  checkIn: (data) => api.post('/attendance/checkin', data),
  checkOut: (data) => api.post('/attendance/checkout', data),
  getAttendance: (params) => api.get('/attendance', { params }),
}

export const leaveAPI = {
  apply: (data) => api.post('/leave', data),
  getAll: () => api.get('/leave'),
  updateStatus: (id, status) => api.put(`/leave/${id}`, { status }),
}

export const payrollAPI = {
  getSalary: (employeeId) => api.get(`/payroll/${employeeId}`),
  generatePayslip: (data) => api.post('/payroll/generate', data),
}

export default api