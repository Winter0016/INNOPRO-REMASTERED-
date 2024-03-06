import "./show.css";
import { Product } from "./Product";

import { useAuth } from "../../../context/shopContext";

export const Show = () => {
  const {productlist} = useAuth();

    
  return (
    <div className="product-show1">
        <div className="line1">
            {productlist.map((product) => (
                <Product data={product} />
            ))}
        </div>
        <div className="line2">
            {productlist.map((product) => (
                <Product data={product} />
            ))}              
        </div>
    </div>
  )
}
