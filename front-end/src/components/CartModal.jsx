import React, { useEffect, useState } from 'react'
import { Modal, Backdrop } from '@mui/material'
import { useCartContext } from '../context/CartContext'
import baseURL from '../config/baseURL'


const CartModal = () => {
  const { openCartModal, HandleCloseCart, cartItems, removeFromCart, addToCart, handleToggle, getCartTotal,checkAllCart } = useCartContext()

  const [cartTotal, setCartTotal] = useState(0)
  const [stateCheckBox, setStateCheckBox] = useState(false)



  const handleCheckAllChange = (e)=>{
    setStateCheckBox(e.target.checked)
    checkAllCart(e.target.checked)
  }


  useEffect(() => {
    const checkStateCheckBoxAll = ()=>{
      setStateCheckBox(cartItems.some((item)=>item.selected))
    }
    setCartTotal(getCartTotal())
    checkStateCheckBoxAll()
  }, [cartItems])// eslint-disable-line react-hooks/exhaustive-deps

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  return (
    <div>
      <Modal
        sx={{ border: 'none' }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCartModal}
        onClose={HandleCloseCart}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div in={openCartModal ? 1 : 0} className='absolute w-screen h-screen pt-[100px]'>
          <div className="bg-gray-100 py-8 w-[80%] h-[90%] m-auto">
            <div className="container mx-auto px-4 ">
              <div className=' flex flex-row justify-between px-4'>
                <h1 className="text-2xl font-semibold mb-4 font-kantit">Giỏ hàng</h1>
                <i className="fas fa-times cursor-pointer" onClick={()=>HandleCloseCart()}></i>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <div className=''>
                      <div className='grid grid-cols-8 gap-2'>
                        <span className=' col-span-3 font-semibold text-black'>Sản phẩm</span>
                        <span className=' font-semibold text-black'>Giá</span>
                        <span className=' col-span-2 font-semibold text-black'>Số lượng</span>
                        <div className=' font-semibold text-black'>Tổng</div>
                        <div className=' flex flex-col'>
                          <span>All</span>
                          <input type='checkbox' checked={stateCheckBox} onChange={(e)=>handleCheckAllChange(e)} className=' w-4 h-4'></input>
                        </div>
                      </div>
                      <div className='h-[380px] overflow-y-auto'>
                        {cartItems.map((item) => {
                          return (
                            <div key={item.book.id} className=' mt-4'>
                              <div className='grid grid-cols-8 gap-2'>
                                <div className="flex items-center col-span-3 gap-4">
                                  <img className=" w-28 object-fit" src={baseURL.book_img+item.book.book_image} alt="" />
                                  <span className=" font-semibold text-gray-800">{item.book.book_name}</span>
                                </div>
                                <span className='my-auto'>{item.book.book_price.toLocaleString()} đ</span>
                                <div className="flex items-center col-span-2">
                                  <button onClick={()=> removeFromCart(item.book)} className="border border-gray-900 rounded-full w-fit h-fit px-3 py-2 hover:bg-background-template">-</button>
                                  <span className="text-center w-8">{item.cart_item_quantity}</span>
                                  <button onClick={()=> addToCart(item.book)} className="border border-gray-900 rounded-full w-fit h-fit px-3 py-2 hover:bg-background-template">+</button>
                                </div>
                                <span className=' my-auto'>{(item.book.book_price * item.cart_item_quantity).toLocaleString()} đ</span>
                                <input checked={item.selected} onChange={()=>handleToggle(item.book.id)} type='checkbox' className='block my-auto w-4 h-4'></input>
                              </div>
                            </div>

                          )
                        })}

                      </div>

                    </div>
                  </div>
                </div>
                <div className="md:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Tổng</h2>
                    <div className="flex justify-between mb-2">
                      <span>Tổng tiền sản phẩm:</span>
                      <span>{cartTotal.toLocaleString()} đ</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-semibold">{cartTotal.toLocaleString()} đ</span>
                    </div>
                    <button onClick={()=>{HandleCloseCart(); openInNewTab('/checkout');}} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )

}

export default CartModal