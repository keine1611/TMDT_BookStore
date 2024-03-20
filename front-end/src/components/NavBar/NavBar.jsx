import React, { useState } from 'react'
import { useCartContext } from '../../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NavBar = () => {

  const [toggleAccount, setToggleAccount] = useState(false)
  const { HandleOpenCart, cartQuality } = useCartContext()
  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  const handleCartClick = (e) => {
    e.preventDefault()
    if (user.auth)
      HandleOpenCart()
    else
      navigate('/login');
  }
  const handleAccountClick = (e) => {
    e.preventDefault()
    setToggleAccount(true)
  }



  return (
    <div id="header-wrap">
      <div className="top-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="social-links">
                <ul>
                  <li>
                    <a href="/#"><i className="icon icon-facebook"></i></a>
                  </li>
                  <li>
                    <a href="/#"><i className="icon icon-twitter"></i></a>
                  </li>
                  <li>
                    <a href="/#"><i className="icon icon-youtube-play"></i></a>
                  </li>
                  <li>
                    <a href="/#"><i className="icon icon-behance-square"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-element">
                <a href='/#' onClick={(e)=>e.preventDefault()} onMouseEnter={(e) => handleAccountClick(e)} onMouseLeave={() => setToggleAccount(false)} className="user-account for-buy hover:cursor-pointer relative"><i
                  className="icon icon-user"></i>
                  {toggleAccount &&
                    <div className='absolute top-0 right-0 w-36 z-50'>
                      <div className=' flex flex-col w-full gap-2 mt-6 px-4 py-2 bg-white boder border-gray-500 shadow-md rounded-md'>
                        {user.auth ? <>
                        <a href='/#' onClick={(e) =>{e.preventDefault(); navigate('/orders')}} style={{ fontSize: "16px" }} className=" py-2 text-[12px] capitalize rounded-md text-gray-700 hover:bg-background-template hover:text-black">Đơn hàng</a>
                          <a href='/#' onClick={(e) =>{e.preventDefault(); logOut()}} style={{ fontSize: "16px" }} className=" py-2 text-[12px] capitalize rounded-md text-gray-700 hover:bg-background-template hover:text-black">Đăng xuất</a></>
                          : <a href='/#' onClick={(e) =>{e.preventDefault(); navigate('/login')}} style={{ fontSize: "16px" }} className=" py-2 text-[12px] capitalize rounded-md text-gray-700 hover:bg-background-template hover:text-black">Đăng nhập</a>
                        }
                      </div>
                    </div>
                  }
                </a> 
                
                {user.auth && <a href='/#' onClick={(e) => { handleCartClick(e) }} className="cart for-buy hover:cursor-pointer relative"><i className="fas fa-shopping-cart"></i><span className=' text-white bg-red-400 p-[5px] rounded-full absolute -translate-x-1 text-[8px]'>{cartQuality}</span></a>}
                <div className="action-menu">
                  <div className="search-bar">
                    <a href='/#' className="search-button search-toggle" data-selector="#header-wrap">
                      <i className="icon icon-search"></i>
                    </a>
                    <form role="search" method="get" className="search-box">
                      <input className="search-field text search-input" placeholder="Search"
                        type="search" />
                    </form>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div >
      <header id="header">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-2">
              <div className="main-logo">
                <Link to={'/'}><img className=' h-20 w-20' src={process.env.PUBLIC_URL + "/logo_book_store.png"} alt="logo" /></Link>
              </div>

            </div>

            <div className="col-md-10">

              <nav id="navbar">
                <div className="main-menu stellarnav">
                  <ul className="menu-list">
                    <li className="menu-item active"><Link to="/">Trang chủ</Link></li>
                    <li className="menu-item has-sub">
                      <a href='/#' onClick={(e)=>e.preventDefault()} className="nav-link">Pages</a>
                      <ul>
                        <li className="active"><Link to={"/"}>Trang chủ</Link></li>
                        <li><Link to={"/books"}>Sách</Link></li>
                      </ul>
                    </li>
                    <li className="menu-item"><Link to="/books" className="nav-link">Sách</Link></li>
                  </ul>

                  <div className="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>

                </div>
              </nav>

            </div>

          </div>
        </div>
      </header>

    </div >

  )
}

export default NavBar