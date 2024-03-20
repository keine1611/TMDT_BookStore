import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/CartContext'
import PayPalComponent from '../components/Paypal'
import { useAuth } from '../context/AuthContext'
import baseURL from '../config/baseURL'

const Checkout = () => {

    const [now, setNow] = useState(new Date())
    const [formattedDate, setFormattedDate] = useState('')
    const [order, setOrder] = useState({
        book_cost: 0,
        ship_cost: 0,
        subtotal: 0
    })
    const { getCartTotal, cartItems } = useCartContext()
    const [bookOrder, setBookOrder] = useState([])

    useEffect(() => {
        setBookOrder(cartItems.filter((item) => item.selected))
    }, [cartItems])

    useEffect(() => {
        setOrder({ ship_cost: 30000, book_cost: getCartTotal(), subtotal: getCartTotal() + 30000 })
    }, [bookOrder, getCartTotal])

    const { user } = useAuth()

   

    React.useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        }
        setFormattedDate(now.toLocaleDateString('vi-VN', options))
    }, [now])


    return (
        <div className="py-4 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 uppercase font-kantit">Đơn hàng</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{formattedDate}</p>
            </div>
            <div className="mt-4 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Sản phẩm</p>
                        <div className=' h-[400px] overflow-y-auto px-3 w-full'>
                            {bookOrder.length !== 0 && bookOrder.map((item, index) => {
                                return (
                                    <div key={index} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                            <img className='w-full' src={baseURL.book_img + item.book.book_image} alt=''></img>
                                        </div>
                                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.book.book_name}</h3>
                                                <div className="flex justify-start items-start flex-col space-y-2">
                                                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-black font-semibold">Tác giả: </span> {item.book.author.author_name}</p>
                                                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-black font-semibold">Thể loại: </span> {item.book.category.category_name}</p>
                                                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-black font-semibold">NXB: </span>{item.book.publisher.publisher_name}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-8 items-start w-full">
                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{item.book.book_price.toLocaleString()} đ</p>
                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">x {item.cart_item_quantity}</p>
                                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{(item.book.book_price * item.cart_item_quantity).toLocaleString()} đ</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}</div>
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Tổng cộng</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Tạm tính</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{order.book_cost.toLocaleString()} đ</p>
                                </div>
                                {/* <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Giảm <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">STUDENT</span></p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{order.} đ (10%)</p>
                                </div> */}
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Ship</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{order.ship_cost.toLocaleString()} đ</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Tổng cộng</p>
                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{order.subtotal.toLocaleString()} đ</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Thanh toán đơn hàng</h3>
                            <div className="w-full">
                                <PayPalComponent order={order} orderItem={bookOrder} user={user.user} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-[400px] flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Thông tin khách hàng</h3>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <img className='h-10 w-10 object-fill' src={baseURL.avatar_img + user.user.avatar} alt="avatar" />
                                <div className="flex justify-cente items-start flex-col space-y-2">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{user.user.fullname}</p>
                                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">{user.user.phone}</p>
                                </div>
                            </div>
                            <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email" />
                                <img className="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email" />
                                <p className="cursor-pointer text-sm leading-5 ">{user.user.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Địa chỉ cửa hàng</p>
                                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-left md:text-left text-sm leading-5 text-gray-600 line-clamp-3">147/29 Mạc Thiên Tích, Ninh Kiều, Cần Thơ</p>
                                </div>
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Địa chỉ nhận hàng</p>
                                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-left md:text-left text-sm leading-5 text-gray-600">{user.user.address}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout