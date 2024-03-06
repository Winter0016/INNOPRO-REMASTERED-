import React, { useContext } from 'react'
import { useAuth } from '../../context/shopContext';
import images from '../../constants/images';
export const CartItem = (props) => {
  const { name,price,id } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemAmount } = useAuth();

  const imageName = name.replace(/\s+/g,'');
  return (
      <div className='cartItem'>
        <div className='img-container'>
          <img src={images[imageName]} alt='b'/>
        </div>
        <div className='description'>
            <p>
                <b> {name} </b> {price} vnđ
            </p>
        </div>
        <div className='countHandler'>
                <button className="buttonminor" onClick={() => removeFromCart(id)}> - </button>
                  <input className='input_number' value={cartItems[id]} onChange={(e) => updateCartItemAmount(Number(e.target.value), id)}/>
                <button className='buttonplus' onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
  )
}
