import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumd from '../components/Breadcrumd'
import {useCartContext} from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import baseURL from '../config/baseURL'

const BookDetails = () => {
    const { id } = useParams()
    const {addToCart} = useCartContext()
    const [bookData, setBookData] = useState()
   
    useEffect(() => {
        const getBook = () => {
            axios.get('/api/books/' + id)
                .then((result) => setBookData(result.data))
        }
        getBook()
    }, [id])

    const {user} = useAuth()
    const navigate = useNavigate()


    return (
        <>
            <Breadcrumd></Breadcrumd>
            {bookData && <div className="container mt-4 md:h-[600px] h-fit">
                <div className="md:grid md:grid-cols-12 flex flex-col justify-center h-[fit] md:max-h-[600px] gap-2">
                    <div className="md:col-span-3 my-auto">
                        <img className='md:h-[400px] rounded mx-auto md:p-0 px-20 object-fill' src={baseURL.book_img+bookData.book_image} alt="" />
                        {/* <div className="project-info-box">
                            <p><b>Categories:</b> Design, Illustration</p>
                            <p><b>Skills:</b> Illustrator</p>
                        </div> */}
                    </div>
                    <div className="md:col-span-9 px-10 flex flex-col justify-between">
                        <div className="project-info-box mt-0">
                            <h5 className=' text-6xl capitalize font-dancing md:text-left text-center '>{bookData.book_name}</h5>
                            <p className="mb-3 mt-3 ">{bookData.book_description}</p>
                            <p><b>Tác giả:</b> {bookData.author.author_name}</p>
                            <p><b>Nhà xuất bản:</b> {bookData.publisher.publisher_name}</p>
                            <p><b>Tools:</b> Illustrator</p>
                            <p className="mb-0"><b>Giá:</b> {bookData.book_price.toLocaleString()} đ</p>
                        </div>
                        <button onClick={()=>{
                            if(user.auth)
                                addToCart(bookData)
                            else
                                navigate('/login')
                                }
                            } className='border block mx-auto md:mx-0 mt-4 w-fit border-gray-500 px-4 py-2 rounded-lg bg-[#b8e8ec]  hover:bg-blue-400 text-black hover:shadow-md'>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>}
            

        </>
    )
}

export default BookDetails