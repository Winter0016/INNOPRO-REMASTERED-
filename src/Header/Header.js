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
            <header className="p-3 text-bg-dark fixed w-full top-0 z-10">
                <div className="container mx-auto">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <img className="mylogo" src={images.logo} alt="Logo" />
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link px-2 text-white home-header">Home</Link></li>
                            <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                        </ul>
                        {userLoggedIn ? (
                            <>
                                <button onClick={() => { doSignOut().then(() => { navigate('/') }) }} className="btn btn-outline-light me-2">Logout</button>
                                <div className='navbar-cart'>
                                    <img className="bag" src={images.bag} alt='bag' onClick={() => setToggleCart(true)} />
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
                        ) : (
                            <div className="text-end">
                                <Link to={'/login'}><button type="button" className="btn btn-outline-light me-2">Login</button></Link>
                                <Link to={'/register'}><button type="button" className="btn btn-warning">Sign-up</button></Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

        </>
    );
};
