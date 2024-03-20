import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { MyToast } from '../components/MyToast'
import { Link, useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'

const Login = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, user } = useAuth()
  
  useEffect(()=>{
    if(user.auth){
      navigate('/')
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  
  

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }


  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (formData.username.trim() === '') {
      newErrors.username = 'Tên tài khoản là bắt buộc'
      isValid = false
    } else {
      newErrors.username = ''
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Mật khẩu là bắt buộc';
      isValid = false;
    } else {
      newErrors.password = ''
    }
    setErrors(newErrors)
    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const log = async()=>{
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        login(formData)
          .then(async (result) => {
            MyToast('success', 'Đăng nhập thành công')
            await new Promise(resolve => setTimeout(resolve, 2000))
            setLoading(false)
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
              navigate('/')
            }
          }).catch((err) => {
            MyToast('error', 'Sai tài khoản mật khẩu')
            setLoading(false)
          })  
      }
      log()
      
    }
  }

  return (<>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto w-full">
        <div
          class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

          <div class="max-w-md mx-auto">
            <div>
              <h1 class="text-2xl font-semibold">Đăng nhập</h1>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="relative mb-4">
                  <input value={formData.username} onChange={(e) => handleChange(e)} autocomplete="off" id="username" name="username" type="text" class="peer placeholder-transparent text-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Tài khoản" />
                  <label for="usernam" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0  peer-focus:text-gray-600 peer-focus:text-sm">Tài khoản</label>
                  <div className={errors.username.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.username}</span></div>
                </div>
                <div class="relative">
                  <input value={formData.password} onChange={(e) => handleChange(e)} autocomplete="off" id="password" name="password" type="password" class="peer text-sm placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Mật khẩu" />
                  <label for="password" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-sm">Mật khẩu</label>
                  <div className={errors.password.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.password}</span></div>
                </div>
                <div class="relative mt-4">
                  <button onClick={(e) => handleSubmit(e)} class="bg-cyan-500 text-whiteh block h-fit w-fit mx-auto rounded-md px-4 py-2">{loading?
                    <SyncLoader
                      color="#36d7b7"
                      speedMultiplier={0.5}
                      size={8}
                    />:"Đăng nhập"}</button>
                </div>
                <div className=' mt-4  text-center text-sm'>
                  <Link to={"/register"}>Đăng ký tài khoản</Link>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="w-full flex justify-center">
          <button class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
            <span>Continue with Google</span>
          </button>
        </div> */}

        </div>
      </div>
    </div>
  </>
  )
}

export default Login