import React from 'react'

const Footer = () => {
    return (
        <><footer id="footer">
            <div className="container">
                <div className="row">

                    <div className="col-md-4">

                        <div className="footer-item">
                            <div className="company-brand">
                                <img src={process.env.PUBLIC_URL+"/logo_book_store.png"} alt="logo" className="footer-logo"/>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-2">

                        <div className="footer-menu">
                            <h5>Về chúng tôi</h5>
                            <ul className="menu-list">
                                <li className="menu-item">
                                    <a href="/#">Tầm nhìn</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Bài viết</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Điều khoản dịch vụ</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Đóng góp</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="col-md-2">

                        <div className="footer-menu">
                            <h5>Khám phá</h5>
                            <ul className="menu-list">
                                <li className="menu-item">
                                    <a href="/#">Trang chủ</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Sách</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Tác giả</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Chủ đề</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Tìm kiếm</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="col-md-2">

                        <div className="footer-menu">
                            <h5>Tài khoản</h5>
                            <ul className="menu-list">
                                <li className="menu-item">
                                    <a href="/#">Đăng nhập</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Giỏ hàng</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Danh sách yêu thích</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Truy cập đơn hàng </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="col-md-2">

                        <div className="footer-menu">
                            <h5>Hỗ trợ</h5>
                            <ul className="menu-list">
                                <li className="menu-item">
                                    <a href="/#">Trung tâm trợ giúp</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Báo cáo vấn đề</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Mong muốn thay đổi</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#">Liên hệ</a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>

            </div>
        </footer>

            <div id="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="copyright">
                                <div className="row">

                                    <div className="col-md-6">
                                        <p>© Nhóm chúng tôi</p>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="social-links align-right">
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

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Footer