import React from 'react';
import images from '../constants/images';
import { useAuth } from '../context/shopContext';

export const Checkout_item = (props) => {
    const { name,price,id } = props.data;
    const { cartItems} = useAuth();
    const imageName = name.replace(/\s+/g,'');
    return (
        <>
            <tr>
                <td>
                    <img className='don_hang_hinhanh' src={images[imageName]} alt=""/>
                </td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{cartItems[id]}</td>
                <td>{cartItems[id] * price} VND</td>
            </tr>
        </>
    )
}
