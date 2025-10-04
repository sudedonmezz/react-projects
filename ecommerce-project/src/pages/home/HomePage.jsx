import './HomePage.css';
import axios from 'axios';
import { ProductsGrid } from './ProductsGrid';
import { useEffect,useState } from 'react';
import { Header } from '../../components/Header';
export function HomePage({cart})
{

  const [products,setProducts]=useState([]);
  
 useEffect(()=>{
   axios.get('/api/products')
  .then((response)=>{
  setProducts(response.data);
  });
  
 
 },[]);
  
 return ( 
  <>
  <Header cart={cart}/>
 
    <div className="home-page">
      <ProductsGrid products={products}/>
    </div>

  </>
    );
}