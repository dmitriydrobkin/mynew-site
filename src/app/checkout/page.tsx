import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-milk">
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:py-20 flex-grow">
        <h1 className="text-4xl md:text-5xl font-serif text-chocolate mb-4 text-center">Оформление заказа</h1>
        <div className="w-24 h-px bg-gold mx-auto mb-16"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form Section */}
          <div className="lg:col-span-7">
            <CheckoutForm />
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
