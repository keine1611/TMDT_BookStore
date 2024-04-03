import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { MyToast } from "./MyToast";

import axios from "axios";
import MailTemplate from "./MailTemplate";
import ReactDOMServer from 'react-dom/server';
import baseURL from "../config/baseURL";

const PayPalComponent = ({ order, orderItem, user }) => {

  const [item, setItem] = useState([])

  const imageToByteArray = async (url)=>{
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const arrayBuffer = response.data;
      const bytes = new Uint8Array(arrayBuffer);
      const base64String = btoa(String.fromCharCode.apply(null, bytes));
      return `data:image/jpeg;base64,${base64String}` 
    } catch (error) {
        return null
    }
  }

  useEffect(()=>{
    const createByteArray = async()=>{
      if(orderItem){
          try {
              const updatedOrderItem = await Promise.all(orderItem.map(async (book) => {
                  const url = '/images/books/'+book.book.book_image
                  const updatedBook = { ...book };
                  updatedBook.book.book_image = await imageToByteArray(url);
                  return updatedBook;
              }));
              setItem(updatedOrderItem);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }
    }
    createByteArray()
  },[orderItem])


  const initialOptions = {
    clientId: 'ASFTulj0-xMpVEQwcqEUxPFmTKYS_OG_dWPOfWjNFO3r07oR5V1PoGohRFRY9soX5vO-6dfwxUxcfUnQ',
    currency: "USD",
    intent: "capture",
  };


  // const handleRefund = () => {
  //   const refundData = {
  //     invoice_id: 'ORIGINAL_TRANSACTION_ID',
  //     amount: {
  //       value: 'AMOUNT_TO_REFUND',
  //     },
  //   };

  //   axios.post('https://api.paypal.com/v2/payments/captures/CAPTURE_ID/refund', refundData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer YOUR_PAYPAL_API_TOKEN`,
  //     },
  //   })
  //     .then((response) => {
  //       // Handle the refund response.
  //       console.log('Refund Successful', response.data);
  //     })
  //     .catch((error) => {
  //       // Handle refund error.
  //       console.error('Refund Error', error);
  //     });
  // };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: (order.subtotal/24000).toFixed(2),
                  currency_code: "USD"
                },
                shipping: {
                  name: {
                    full_name: user.fullname,
                  },
                  address: {
                    address_line_1: user.address,
                    admin_area_2: 'Shipping City',
                    admin_area_1: 'Shipping State',
                    postal_code: '700000',
                    country_code: 'VN',
                  },
                },
              },
            ],
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {
            const bookOrder = new FormData()
            bookOrder.append("subtotal", order.subtotal)
            bookOrder.append("book_cost", order.book_cost)
            bookOrder.append("ship_cost", order.ship_cost)
            axios.post('/api/order/' + user.id, bookOrder)
              .then(async res => {
                const orderDetail = []
                orderItem.map((item) => {
                  orderDetail.push({ book_id: item.book.id, quantity: item.cart_item_quantity }) 
                  return null
                })
                const message = ReactDOMServer.renderToString(<MailTemplate order={res.data} orderItem={item} user={user}></MailTemplate>)
                const formData = new FormData()
                    formData.append('subject','Xác nhận đơn hàng')
                    formData.append('message',message )
                    formData.append('email',user.email)
                    
                    axios.post('/api/mail',formData)
                axios.post('/api/orderdetail/' + res.data.id, orderDetail)
                  .then(() => {
                    MyToast('success', 'Đặt hàng thành công')
                  })
                  .catch(() => {
                    MyToast('error', 'Lỗi tạo chi tiết đơn hàng')
                  })

              })
              .catch((err) => {
                MyToast('error', 'Lỗi tạo đơn hàng')
              })

          });
        }}
        onCancel={(data, actions) => {
          MyToast('error', 'Thanh toán bị huỷ')
        }
        }
        onError={(data, actions) => {
          MyToast('error', 'Lỗi thanh toán')
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;