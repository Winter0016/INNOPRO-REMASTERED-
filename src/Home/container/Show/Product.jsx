import React from 'react';
import images from '../../../constants/images';
import { useAuth } from '../../../context/shopContext';
export const Product = (props) => {
    const { name, price, id } = props.data;
    const {addToCart} = useAuth();

    // Replace spaces with underscores to match the image keys
    const imageName = name.replace(/\s+/g,'');

    //console.log(`${name}'s id is : ${typeof id}`);

    return (
        <div className='product'>
            <img className='product-image' src={images[imageName]} alt={name} />
            <div className='description'>
                <div className="product-name"> {name} </div>
                <div className='product-price'> {price} vnđ </div>
            </div>
            <button className='hehe' onClick={() => addToCart(id)}>
                <img className='order' src={images.orderButton} alt='a' />
            </button>
        </div>
    );
};
