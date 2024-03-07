import React, { useContext } from 'react';

import images from '../constants/images';
import { useAuth } from '../context/shopContext';
import "./checkout.css";
import { json } from 'react-router-dom';
import  { Checkout_item } from './checkout-item';

export const Checkout = () => {
   const {productlist} = useAuth()
  const { cartItems, getTotalCartAmount } = useAuth()
  const totalAmount = getTotalCartAmount();
  const {submitorder} = useAuth();
  //console.log(`cartItem in checkout: ${JSON.stringify(cartItems)}`);

  return (
    <div className='checkout_container'>
      <div className='don_hang_container'>
         <table>
            <thead>
               <tr>
                  <td></td> 
                  <td>Product</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Total</td>
               </tr>
            </thead>
            <tbody>
               {productlist.map((product) => {
                     if(cartItems[product.id] !== 0) {
                        return <Checkout_item data={product} />
                     }
               })} 
            </tbody>
         </table>
         <div className="checkout_buy">
            <a >
               <img onClick={() => submitorder()}src={images.checkout_buy} alt="" />
            </a>
         </div>    
      </div>
      <div className='checkout_total'>
         <h2 style={{fontSize : "2vw"}}>Cart Totals</h2>
         <img src={images.lineVector} />
         <h2 style={{marginTop:"2vw" , fontSize: "2vw"}}>{totalAmount} VND</h2>
      </div>
    </div>
  )
}
