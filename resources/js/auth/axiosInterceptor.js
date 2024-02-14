import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const setupAxiosInterceptors = () => {
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.baseURL = 'http://task-scheduler.test/'

  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        const navigate = useNavigate()

        localStorage.removeItem('token')
        axios.defaults.headers.common.Authorization = 'Bearer'

        navigate('/login')
      }
      return Promise.reject(error)
    }
  )
}

export default setupAxiosInterceptors
