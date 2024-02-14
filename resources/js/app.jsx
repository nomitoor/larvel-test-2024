import './bootstrap'
import '../css/app.css'
import 'react-toastify/dist/ReactToastify.css'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes'
import setupAxiosInterceptors from './auth/axiosInterceptor'

const App = () => {
  useEffect(() => {
    setupAxiosInterceptors()
  }, [])

  return <AppRoutes />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <App />
)
