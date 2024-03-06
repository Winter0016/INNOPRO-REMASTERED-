import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import images from '../constants/images';
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { doSignOut } from '../myfirebase/auth';
import { useAuth } from '../context/shopContext';
import { Cart } from './Cart/cart';





export const Header = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);
    const [toggleCart, setToggleCart] = React.useState(false);
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <>
            <header class="p-3 text-bg-dark">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <img className="mylogo"src={images.logo}   />
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <Link to="/" className="nav-link px-2 text-white home-header">Home</Link>                        <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">About</a></li>
                        </ul>

                    {
                        userLoggedIn
                            ?
                            <>
                                <button onClick={() => { doSignOut().then(() => { navigate('/') }) }} class="btn btn-outline-light me-2">Logout</button>
                                <div className='navbar-cart'>
                                    <img className="bag" src={images.bag} alt='bag' onClick={() => setToggleCart(true)}/>
                                    {toggleCart && (
                                        <div className='navbar-cart_area'>
                                            <div className="sidebar">
                                                <img className='x1' src={images.x} alt='x' onClick={() => setToggleCart(false)} />
                                                <div className="title">
                                                    <h1 className='yourcartitem'> Your Cart Items </h1>
                                                </div>
                                                <div className="cartItems">
                                                    <Cart />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div> 
                            </>
                            :
                            <>
                                <div class="text-end">
                                    <Link to = {'/login'}><button type="button" class="btn btn-outline-light me-2">Login</button></Link>
                                    <Link to ={'/register'}><button type="button" class="btn btn-warning">Sign-up</button></Link>
                                </div>
                           
                            </>
                    }
                    </div>
                </div>
            </header>
        </>
    );
};
