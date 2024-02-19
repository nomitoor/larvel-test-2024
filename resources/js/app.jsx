import './bootstrap'
import '../css/app.css'
import '@/dashoboard/css/style.css'
import '@/dashoboard/css/satoshi.css'

import 'react-toastify/dist/ReactToastify.css'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes'
import setupAxiosInterceptors from './auth/axiosInterceptor'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    setupAxiosInterceptors()
  }, [])

  return <AppRoutes />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
