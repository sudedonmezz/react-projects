import './CheckoutPage.css';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import './Checkout-header.css';
import { formatMoney } from '../utils/money';
import { Header } from '../components/Header';

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

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.map((cartItem) => {
              // 2) Güvenli erişim: option bulunamayabilir
              const selected = deliveryOptions.find(
                (opt) => opt.id === cartItem.deliveryOptionId
              );

              return (
                <div key={cartItem.id ?? `${cartItem.productId}-${cartItem.deliveryOptionId}`} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date:{' '}
                    {selected
                      ? dayjs(selected.estimatedDeliveryTimeMs).format('dddd, MMMM D')
                      : (loading ? 'calculating…' : 'N/A')}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src="images/products/athletic-cotton-socks-6-pairs.jpg"
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product?.productName ?? 'Unnamed product'}
                      </div>
                      <div className="product-price">
                        {formatMoney(cartItem.product?.priceCents ?? 0)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:{' '}
                          <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">Update</span>
                        <span className="delete-quantity-link link-primary">Delete</span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">Choose a delivery option:</div>

                      {/* 3) Güvenli map: deliveryOptions her zaman [] */}
                      {deliveryOptions.map((opt) => {
                        const priceString =
                          (opt.priceCents ?? 0) > 0
                            ? formatMoney(opt.priceCents)
                            : 'FREE Shipping';

                        return (
                          <div key={opt.id} className="delivery-option">
                            <input
                              type="radio"
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`}
                              checked={opt.id === cartItem.deliveryOptionId}
                              onChange={() => {
                                // buraya seçimi API'ye PATCH edeceğin/ state'i güncelleyeceğin kod gelecek
                              }}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(opt.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                              </div>
                              <div className="delivery-option-price">{priceString}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {paymentSummary ? (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">Place your order</button>
              </>
            ) : (
              <div className="payment-summary-row">Loading…</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
