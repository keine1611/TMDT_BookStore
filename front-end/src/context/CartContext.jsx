import React, { createContext, useContext, useEffect, useState } from 'react'
import { MyToast } from '../components/MyToast'
import axios from 'axios'

const CartContext = createContext()


const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])
    const [cartQuality, setCartQuality] = useState(0)
    const [openCartModal, setOpenCartModal] = useState(false)

    const HandleOpenCart = () => {
        setOpenCartModal(true)
    }
    const HandleCloseCart = () => {
        setOpenCartModal(false)
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])


    useEffect(() => {
        function getQuantityCart() {
            return cartItems.length
        }
        setCartQuality(getQuantityCart())
    }, [cartItems])

    function addToCart(book) {
        const isBookInCart = cartItems.find((cartItem) => cartItem.book.id === book.id)
        if (isBookInCart) {
            setCartItems(cartItems.map((cartItem) =>
                cartItem.book.id === book.id
                    ? { ...cartItem, cart_item_quantity: cartItem.cart_item_quantity + 1 } : cartItem))

        }
        else {
            setCartItems([...cartItems, { cart_item_quantity: 1, book: book, selected:false }])
        }
        MyToast('success', 'Thêm vào giỏ hàng thành công')

    }

    function removeFromCart(book) {
        const isProductInCart = cartItems.find((cartItem) => cartItem.book.id === book.id)
        if(isProductInCart){
            if (isProductInCart.cart_item_quantity === 1) {
                setCartItems(cartItems.filter((cartItem) => cartItem.book.id !== book.id))
            }
            else {
                setCartItems(cartItems.map((cartItem) =>
                    cartItem.book.id === book.id ? { ...cartItem, cart_item_quantity: cartItem.cart_item_quantity - 1 } : cartItem))
            }
        }
        
    }
    const handleToggle = (itemId) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.book.id === itemId ? { ...item, selected: !item.selected } : item
          )
        );
      };

    function clearCartItem() {
        setCartItems([])
    }

    function removeBookInCart(book) {
        setCartItems(cartItems.filter((cartItem) => cartItem.book.id !== book.id))
    }


    function getCartTotal() {
        return cartItems.filter((item) => item.selected).reduce((total, item) =>
            total + item.book.book_price * item.cart_item_quantity
        , 0)
    }

    

    function checkAllCart(state){
        const updateCart = cartItems.map((item)=>({...item, selected: state}))
        setCartItems(updateCart)
    }

    function updateCartToDB(user_id){
        const cartUpdate = cartItems.map(item => ({
            book_id: item.book.id,
            cart_item_quantity: item.cart_item_quantity
        }))
        axios.post('/api/cart/'+user_id, cartUpdate)
        .then(() => {
        }).catch(() => {          
        })
    }



    return (
        <CartContext.Provider value={{clearCartItem, openCartModal, handleToggle,HandleOpenCart, HandleCloseCart, cartItems, removeBookInCart, cartQuality, addToCart, removeFromCart, getCartTotal, setCartItems, checkAllCart, updateCartToDB}}>{children}</CartContext.Provider>
    )
}

export const useCartContext = () => { return useContext(CartContext) }

export default CartProvider