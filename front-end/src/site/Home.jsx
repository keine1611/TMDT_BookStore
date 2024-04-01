import React from 'react'
import PopularBook from '../components/Home/PopularBook'
import BestSeller from '../components/Home/BestSeller'
import BillBoard from '../components/Home/BillBoard'
import MailTemplate from '../components/MailTemplate'

const Home = () => {
  



  return (
    <>
    <MailTemplate></MailTemplate>
    <BillBoard/>

      <section id="client-holder" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="inner-content">
              <div className="logo-wrap">
                <div className="grid grid-cols-5">
                  <a href="/#"><img src={process.env.PUBLIC_URL + "/template/images/client-image1.png"} alt="client" /></a>
                  <a href="/#"><img src={process.env.PUBLIC_URL + "/template/images/client-image2.png"} alt="client" /></a>
                  <a href="/#"><img src={process.env.PUBLIC_URL + "/template/images/client-image3.png"} alt="client" /></a>
                  <a href="/#"><img src={process.env.PUBLIC_URL + "/template/images/client-image4.png"} alt="client" /></a>
                  <a href="/#"><img src={process.env.PUBLIC_URL + "/template/images/client-image5.png"} alt="client" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <BestSeller/>
      <PopularBook/>
    </>
  )
}

export default Home