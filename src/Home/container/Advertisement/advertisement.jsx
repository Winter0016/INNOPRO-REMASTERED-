import React from 'react';
import images from '../../../constants/images';
import './advertisement.css';

export const Advertisement = () => {
  return (
    <>
    <div className='home'>
      <div className="invisible1">
              <div>Chả giò Chà Bông</div>
              <div>Chất lượng</div>
              <button className="button1"> SHOP NOW</button>
      </div>
          <img className="yellow" src={images.ad2} alt='a'/>
          <img className="crispy" src={images.ad} alt='a'/>
          <img className="fact" src={images.facts} alt='a'/>
    </div>
    </>
  )
}
