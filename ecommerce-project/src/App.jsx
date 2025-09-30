import { HomePage } from './pages/HomePage';
import {Checkout} from './pages/CheckoutPage';
import {Route, Routes} from 'react-router';
import { OrdersPage } from './pages/OrdersPage';
import {useEffect,useState} from 'react';
import axios from 'axios';
import './App.css'

function App() {
 
  const [cart,setCart]=useState([]);

  useEffect(()=>{

    axios.get('/api/cart-items?expand=product')
  .then((response)=>{
  setCart(response.data);
  });

  });
   

  return (
      <Routes>
        <Route index element={<HomePage cart={cart}/>}/>
        <Route path="/checkout" element={<Checkout cart={cart}/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
        
      </Routes>
     
   
  
  )
}

export default App
