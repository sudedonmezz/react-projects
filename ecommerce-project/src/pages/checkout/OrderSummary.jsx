import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
export function OrderSummary({cart,deliveryOptions,loading})
{
  return (
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
  );
}