import React from 'react'
import { useCartContext } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import baseURL from '../config/baseURL'


const BookCard = ({ book }) => {
    const { addToCart } = useCartContext()
    const {user} = useAuth()
    const navigate = useNavigate()
    return (
        <div key={book.id} className="col-md-3">
            <div className="product-item">
                <figure className="product-style flex flex-row justify-center p-[5%] xl:h-[450px]  lg:h-[300px] md:h-[220px] ">
                    <Link to={'/books/' + book.id}>
                        <img className='object-cover max-h-[100%] product-item' src={baseURL.book_img+book.book_image} alt="Books" />
                    </Link>
                    <button onClick={() => {if(user.auth) addToCart(book); else navigate('/login')}} type="button" className="add-to-cart" data-product-tile="add-to-cart">Thêm vào giỏ hàng</button>
                </figure>
                <Link to={'/books/' + book.id}>
                    <figcaption className='px-4 mt-2 mb-4 h-full'>
                        <div>
                            <h3 className='line-clamp-2'>{book.book_name}</h3>
                            <span>{book.author.author_name}</span>
                        </div>
                        <div className='w-full mt-auto'>
                            <span className="item-price">{book.book_price.toLocaleString()} đ</span>
                        </div>
                    </figcaption>
                </Link>
            </div>
        </div>
    )
}

export default BookCard