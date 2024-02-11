import './bootstrap'
import '../css/app.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppRoutes />
)
