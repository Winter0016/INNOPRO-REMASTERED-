import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from './Header/Header';
import { useRoutes } from "react-router-dom";
import { ShopContextProvider } from './context/shopContext';
import {Login} from './Auth/login';
import {Register} from "./Auth/regis";
import { Home } from "./Home/Home";
import { Checkout } from "./Checkout/checkout";
function App() {
  return (
      <ShopContextProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </ShopContextProvider>
  );
}

export default App;
