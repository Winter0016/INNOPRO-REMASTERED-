import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../myfirebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection,addDoc,setDoc,updateDoc,doc } from "firebase/firestore";
import { Toast } from "bootstrap";

export const ShopContext = createContext(null);

export function useAuth() {
  return useContext(ShopContext);
}

export const ShopContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productlist, setProductlist] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getProductlist = async () => {
      try {
        const data = await getDocs(collection(db, "production"));
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: parseInt(doc.id),
        }));
        setProductlist(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getProductlist();
  }, []);

  useEffect(() => {
    setCartItems(getDefaultCart());
  }, [productlist]);

  const initializeUser = (user) => {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < productlist.length; i++) {
      cart[productlist[i].id] = 0;
    }
    return cart;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = productlist.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    if(userLoggedIn) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    else{
      alert('please login to purchase');
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemAmount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const onsubmitproduct = async (product) => {
    try {
        const productDoc = doc(db, "orders", auth.currentUser.email);
        const cartItemValue = cartItems[product.id] || 0; // Get the cart item value or default to 0 if undefined
        const dataToUpdate = {
            [product.id]: {
                productName: product.name,
                quantity: cartItemValue,
                totalPrice: cartItemValue * product.price
            }
        };

        await updateDoc(productDoc, dataToUpdate);
        console.log("Document updated successfully");
    } catch (err) {
        console.error(err);
    }
};

  const makedoc = async () => {
      try {
        await setDoc(doc(db, 'orders', auth.currentUser.email), {}); // Set empty object as data
        // console.log('Empty document created successfully');
    } catch (err) {
        console.error(err);
    }
  }

  const productstotalprice = getTotalCartAmount();

  const product_total = async () => {
    try{
      const productDoc2 = doc(db, "orders", auth.currentUser.email);
      await updateDoc(productDoc2,{total : productstotalprice});
    }catch(err){
      console.log(err);
    }
  };

  const submitorder = async () => {
    console.log('submit order');
    makedoc();
    productlist.map((product) => {
      if(cartItems[product.id] !== 0) {
         onsubmitproduct(product);
      }
    })
    await product_total();
    alert('Purchased sucessfully'); 
  }

  const contextValue = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    productlist,
    cartItems,
    getTotalCartAmount,
    addToCart,
    removeFromCart,
    updateCartItemAmount,
    submitorder,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {!loading && children}
    </ShopContext.Provider>
  );
};
