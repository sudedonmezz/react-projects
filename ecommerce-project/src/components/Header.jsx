import './header.css';
import {Link} from "react-router";
export function Header({cart})
{

  let TotalQuantity=0;

  cart.forEach((cartItem)=>{
    TotalQuantity+=cartItem.quantity;
  });

return (
  <>
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
        <p className='logo-name'>E-commerce Website</p> 
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{TotalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>

  </>
);
}