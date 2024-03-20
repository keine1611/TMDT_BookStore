import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useCartContext } from './CartContext'


const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
   
    const { setCartItems, updateCartToDB } = useCartContext()
    const findCurrentUser = () => {
        if (getCurrentUser() !== null) {
            return {
                auth: true,
                user: getCurrentUser()
            }
        }
        else {
            return {
                auth: false,
                user: {}
            }
        }
    }

    const getCurrentUser = () => (JSON.parse(localStorage.getItem('user')))
    const [user, setUser] = useState(findCurrentUser())

    

    useEffect(() => {
        return () => {
          updateCartToDB(user.user.id)
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
   
    const login = async (data) => new Promise((resolve, reject) => {
        axios.post('/api/auth/login', data)
            .then(async (res) => {
                localStorage.setItem('user', JSON.stringify(res.data))
                setUser({ auth: true, user: (res.data) })
                axios.get('/api/cart/'+res.data.id)
                .then((result) => {
                    setCartItems(result.data)
                    localStorage.setItem('cart', JSON.stringify(result.data))
                    resolve()
                }).catch((err) => {
                    reject()
                });
                resolve()
            })
            .catch((err) => reject(err))
    })

    const register = async (data) => new Promise((resolve, reject) =>{
        axios.post('/api/auth/signup', data)
        .then(function (res) {
            localStorage.setItem('user', JSON.stringify(res.data))
            setUser({ auth: true, user: (res.data) })
            resolve()
        })
        .catch((error) => reject(error))
    }) 
    const logOut = async () => {
        localStorage.removeItem('user')
        localStorage.removeItem('cart')
        updateCartToDB(user.user.id)
        setUser({
            auth: false,
            user: {}
        })
        setCartItems([])
    }
    
    return (
        <AuthContext.Provider value={{ user, setUser, getCurrentUser, login, logOut, register }}>{children}</AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}

