import React from 'react'
import images from '../../../constants/images'
import './contact.css'

export const Contact = () => {
  return (
    <>
    <img className="in-touch" src={images.contact} alt='a'/>
    <div className="form">
        <div className="write-form">
            <div className="write-in">Tên</div>
            <input className="input-form" type="text" placeholder="Name" />
            <div className="write-in">Số Điện Thoại</div>
            <input className="input-form" type="text" placeholder="Phone Number" />
            <div className="write-in">Email</div>
            <input className="input-form" type="text" placeholder="Email" />
            <div className="write-in">Mật Khẩu</div>
            <input className="input-form" type="text" placeholder="Password" />
            <a>
                <img className="form-button" src={images.form} alt='a'/>
            </a>
        </div>
        <img className="uber" src={images.uber} alt='a'/>
    </div>
    </>
  )
}
