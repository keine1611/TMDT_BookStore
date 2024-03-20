import React, { useEffect } from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'

const AuthSecurity = ({children}) => {
    const auth = useAuth()
    if(auth.user.auth == true)
      return (
        children
      )
    return <Navigate to='/login' replace={true}/>
 
}

export default AuthSecurity