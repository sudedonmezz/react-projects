import './CheckoutPage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Checkout-header.css';
import { Header } from '../../components/Header';
import { CheckoutGrid } from './CheckoutGrid';

export function Checkout({ cart = [] }) {
  // 1) Başlangıçta [] ver -> map/find patlamasın
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    Promise.all([
      axios.get('/api/delivery-options?expand=estimatedDeliveryTime'),
      axios.get('/api/payment-summary'),
    ])
      .then(([respOptions, respSummary]) => {
        if (!alive) return;
        setDeliveryOptions(Array.isArray(respOptions.data) ? respOptions.data : []);
        setPaymentSummary(respSummary.data ?? null);
      })
      .catch((err) => {
        console.error('Checkout load error:', err);
        // Hata durumunda da boş dizi ver ki UI çalışsın
        setDeliveryOptions([]);
        setPaymentSummary(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>
      <CheckoutGrid deliveryOptions={deliveryOptions} cart={cart} paymentSummary={paymentSummary} loading={loading}/>
        
      </div>
    </>
  );
}
