import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import baseURL from '../config/baseURL'
import Breadcrumd from '../components/Breadcrumd'

const Order = () => {

    const [orders, setOrder] = useState([])

    const { user } = useAuth()
    useEffect(() => {
        const getOrder = () => {
            if (user.auth) {
                axios.get('/api/order/' + user.user.id)
                    .then((result) => {
                        setOrder(result.data)
                    })
            }
        }
        getOrder()
    }, [user.auth, user.user.id])

    return (
        <>
        <Breadcrumd/>
        <div className="mx-auto max-w-4xl mt-10">
            <div className="divide-y divide-gray-100">
                {orders.map((order, index) =>
                    <details key={index} className="group" close="true">
                        <summary className="flex px-2 cursor-pointer list-none items-center justify-between py-4 text-md font-medium text-secondary-900 group-open:text-primary-500 bg-background-template rounded-lg mt-4">
                            <img className='w-20 h-20' src={process.env.PUBLIC_URL + "/image/icon/order.png"} alt=''></img>
                            <div className='flex flex-row gap-5'>
                                <div className=' flex flex-col items-center'>
                                    <span className=' font-semibold text-black'>Giá sách</span>
                                    <span>{order.book_cost.toLocaleString()} đ</span>
                                </div>
                                <div className=' flex flex-col items-center'>
                                    <span className=' font-semibold text-black'>Giá ship</span>
                                    <span>{order.ship_cost.toLocaleString()} đ</span>
                                </div>
                                <div className=' flex flex-col items-center'>
                                    <span className=' font-semibold text-black'>Tổng</span>
                                    <span>{order.subtotal.toLocaleString()} đ</span>
                                </div>
                                <div className=' flex flex-col items-center'>
                                    <span className=' font-semibold text-black'>Trạng thái đơn hàng</span>
                                    <span>{order.status}</span>
                                </div>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </div>
                        </summary>
                        <div className=" flex flex-col gap-4 py-4 text-secondary-500 border border-gray-700 p-2 rounded-lg">
                            {order.orderDetails.map((orderDetail, index) => {
                                return (
                                    <div key={index} className=' grid grid-cols-6 px-10'>
                                        <img alt='' className=' h-32 object-cover' src={baseURL.book_img+orderDetail.book.book_image}></img>
                                        <div className='flex flex-col gap-2 col-span-2'>
                                            <span className=' text-black font-semibold'>{orderDetail.book.book_name}</span>
                                            <span>{orderDetail.book.author.author_name}</span>
                                        </div>
                                        <span className=' my-auto'>{orderDetail.book.book_price.toLocaleString()} đ</span>
                                        <span className=' my-auto'>x{orderDetail.quantity.toLocaleString()}</span>
                                        <span className=' my-auto'>{(orderDetail.book.book_price * orderDetail.quantity).toLocaleString()} đ</span>
                                    </div>
                                )
                            })}
                        </div>
                    </details>
                )}
            </div>
        </div>
        </>
    )
}

export default Order