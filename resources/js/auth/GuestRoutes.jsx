import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export const GuestRoutes = ({ children }) => {
  const { user } = useAuth()
  if (user) {
    return <Navigate to='/' />
  }

  return children
}
