import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export const ProtectedRoute = ({ children }) => {
  const {logout, user } = useAuth()
  let userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)PLAIN-TEXT-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (!user || userCookie === '') {
    logout()
    return <Navigate to='/auth/signin' />
  }

  return children
}
