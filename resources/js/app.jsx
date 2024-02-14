import './bootstrap'
import '../css/app.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.baseURL = 'http://task-scheduler.test/'
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const navigate = useNavigate();

      localStorage.removeItem('token')
      axios.defaults.headers.common.Authorization = 'Bearer'

      navigate('/login')
    }
    return Promise.reject(error)
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppRoutes />
)
