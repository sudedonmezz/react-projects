import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
export function CheckoutGrid({cart,deliveryOptions,paymentSummary,loading})
{
  return (
    <div className="checkout-grid">
       
       <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loading={loading}/>
      <PaymentSummary paymentSummary={paymentSummary}/>
          
        </div>
  );
}