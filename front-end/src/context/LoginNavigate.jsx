
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'


const LoginNavigate = () => {
    const auth = useAuth()
    if (auth.user.auth) {
        return <Navigate to={'/'} replace={true}/>
    }
    else
        return 
}

export default LoginNavigate