import React, { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { MyToast } from '../components/MyToast'
import { SyncLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Register = () => {

    const upLoadRef = useRef()
    const [loading, setLoading] = useState(false)

    const handleButtonClick = () => {
        upLoadRef.current.click()
    }

    const { register } = useAuth()

    const [avatar, setAvatar] = useState(null)
    const [avatarURL, setAvatarURL] = useState(null)


    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setAvatar(file)
        const url = URL.createObjectURL(file)
        setAvatarURL(url)
    }




    const [formData, setFormData] = useState({
        fullname:'',
        username: '',
        password: '',
        repassword: '',
        email: '',
        address: '',
        phone: '',
        avatar: '',
        
    })

    const [errors, setErrors] = useState({
        fullname:'',
        username: '',
        password: '',
        repassword: '',
        email: '',
        address: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

     const navigate = useNavigate()


    const validateForm = () => {
        let isValid = true
        const newErrors = { ...errors }
    
        if (formData.fullname.trim() === '') {
            newErrors.fullname = 'Họ tên là bắt buộc'
            isValid = false
        } else {
            newErrors.fullname = ''
        }

        if (formData.username.trim() === '') {
            newErrors.username = 'Tên tài khoản là bắt buộc'
            isValid = false
        } else {
            newErrors.username = ''
        }

        if (formData.password.trim() === '') {
            newErrors.password = 'Mật khẩu là bắt buộc';
            isValid = false;
        }
        else {
            if (formData.password.trim() !== formData.repassword.trim()) {
                newErrors.password = 'Mật khẩu không khớp'
                isValid = false;
            }
            else {
                newErrors.password = ''
            }
        }

        if (formData.repassword.trim() === '') {
            newErrors.repassword = 'Mật khẩu là bắt buộc';
            isValid = false;
        }
        else {
            if (formData.password.trim() !== formData.repassword.trim()) {
                newErrors.repassword = 'Mật khẩu không khớp'
                isValid = false;
            }
            else {
                newErrors.repassword = ''
            }
        }

        if (formData.email.trim() === '') {
            newErrors.email = 'Email là bắt buộc';
            isValid = false;
        }
        else {
            if (!formData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                newErrors.email = 'Chắc chắn bạn nhập là email';
                isValid = false;
              }
            else {
                newErrors.email = ''
            }
        }

        if (formData.address.trim() === '') {
            newErrors.address = 'Địa chỉ là bắt buộc';
            isValid = false;
        }
        else {
            newErrors.address = ''
        }

        if (formData.phone.trim() === '') {
            newErrors.phone = 'Số điện thoại là bắt buộc';
            isValid = false;
        }
        else {
            if (!formData.phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
                newErrors.phone = 'Chắc chắn bạn nhập là số điện thoại'
                isValid = false;
            }
            else {
                newErrors.phone = ''
            }
        }



        setErrors(newErrors)
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            const form = new FormData()
            form.append('fullname', formData.fullname)
            form.append('username', formData.username)
            form.append('password', formData.password)
            form.append('address', formData.address)
            form.append('phone', formData.phone)
            form.append('email', formData.email)
            form.append('avatar', avatar)
            const log = async()=>{
                setLoading(true)
                await new Promise(resolve => setTimeout(resolve, 2000))
                register(form)
                  .then(async (result) => {
                    MyToast('success', 'Đăng ký thành công')
                    await new Promise(resolve => setTimeout(resolve, 2000))
                    setLoading(false)
                    const user = JSON.parse(localStorage.getItem('user'))
                    if (user) {
                      navigate('/')
                    }
          
                  }).catch((err) => {
                    MyToast('error', err.response.data)
                    setLoading(false)
                  })  
              }
              log()
        }
    }

    return (
        <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-4xl sm:mx-auto w-full">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-10 py-4 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                    <div class="w-full mx-auto">
                        <div>
                            <h1 class="text-2xl font-semibold text-center uppercase">Đăng ký</h1>
                        </div>
                        <div class="divide-y flex flex-row divide-gray-200  items-center justify-between gap-5">
                            <div className=''>
                                <div class="relative">
                                    <img class=" w-48 h-48 rounded-full mx-auto" src={avatarURL ? avatarURL : "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"} alt="" />
                                    <i onClick={() => handleButtonClick()} class='bx bxs-camera text-[40px] text-black absolute bottom-0 right-7 p-1 bg-gray-300 hover:cursor-pointer rounded-full'><input onChange={(e) => handleFileChange(e)} ref={upLoadRef} accept="image/*" type='file' style={{ display: 'none' }}></input></i>
                                </div>
                            </div>
                            <div class="flex-1 py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 px-5">

                                <div class="relative mt-4">
                                    <input value={formData.username} onChange={(e) => handleChange(e)} autocomplete="off" id="username" name="username" type="text" class="peer placeholder-transparent text-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Tài khoản" />
                                    <label htmlFor="username" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0  peer-focus:text-gray-600 peer-focus:text-sm">Tài khoản</label>
                                    <div className={errors.username.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.username}</span></div>
                                </div>
                                <div class="relative mt-4">
                                    <input value={formData.password} onChange={(e) => handleChange(e)} autocomplete="off" id="password" name="password" type="password" class="peer text-sm placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Mật khẩu" />
                                    <label htmlFor="password" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-sm">Mật khẩu</label>
                                    <div className={errors.password.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.password}</span></div>
                                </div>
                                <div class="relative mt-4">
                                    <input value={formData.repassword} onChange={(e) => handleChange(e)} autocomplete="off" id="repassword" name="repassword" type="password" class="peer placeholder-transparent text-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Nhập lại mật khẩu" />
                                    <label htmlFor="repassword" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0  peer-focus:text-gray-600 peer-focus:text-sm">Nhập lại mật khẩu</label>
                                    <div className={errors.repassword.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.repassword}</span></div>
                                </div>
                                <div class="relative mt-4">
                                    <input value={formData.fullname} onChange={(e) => handleChange(e)} autocomplete="off" id="fullname" name="fullname" type="text" class="peer placeholder-transparent text-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Họ tên" />
                                    <label htmlFor="fullname" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0  peer-focus:text-gray-600 peer-focus:text-sm">Họ tên</label>
                                    <div className={errors.fullname.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.fullname}</span></div>
                                </div>
                                <div class="relative mt-4">
                                    <input value={formData.email} onChange={(e) => handleChange(e)} autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent text-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email" />
                                    <label htmlFor="email" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0  peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                                    <div className={errors.email.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.email}</span></div>
                                </div>
                                <div class="relative mt-4">
                                    <input value={formData.address} onChange={(e) => handleChange(e)} autocomplete="off" id="address" name="address" type="text" class="peer text-sm placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Địa chỉ" />
                                    <label htmlFor="address" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-sm">Địa chỉ</label>
                                    <div className={errors.address.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.address}</span></div>
                                </div>
                                <div class="relative mt-4">
                                    <input value={formData.phone} onChange={(e) => handleChange(e)} autocomplete="off" id="phone" name="phone" type="text" class="peer placeholder-transparent text-sm h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Số điện thoại" />
                                    <label htmlFor="phone" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-placeholder-shown:left-2 peer-focus:left-0  peer-focus:text-gray-600 peer-focus:text-sm">Số điện thoại</label>
                                    <div className={errors.phone.length === 0 ? ' hidden' : 'block text-sm text-red-500'}><span>{errors.phone}</span></div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="w-full flex justify-center">
                        <div class="relative">
                            <button onClick={(e) => handleSubmit(e)} class="bg-cyan-500 text-whiteh block h-fit w-fit mx-auto rounded-md px-4 py-2">{loading ?
                                <SyncLoader
                                    color="#36d7b7"
                                    speedMultiplier={0.5}
                                    size={8}
                                /> : "Đăng ký"}</button>                        
                            </div>
                    </div>
                <div className='mt-4  text-center text-sm'>
                  <Link to={"/login"}>Đăng nhập</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Register