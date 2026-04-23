import React, { useState } from "react";

export default function CheckoutPage({
  cart,
  subtotal,
  formatPrice,
  orderCustomer,
  onUpdateOrderCustomer,
  onPlaceOrder,
  orderState,
  orderMessage,
  onBack,
}) {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};

    if (!cart || cart.length === 0) {
      next.cart = "Add items to cart before placing an order.";
    }

    if (!orderCustomer.name || !orderCustomer.name.trim()) {
      next.name = "Full name is required.";
    }

    if (!orderCustomer.phone || !orderCustomer.phone.trim()) {
      next.phone = "Phone number is required.";
    }

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setErrors({});
    if (onPlaceOrder) onPlaceOrder(e);
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-white">Checkout</h2>
          <p className="text-sm text-slate-400 mt-1">
            Enter delivery and payment details
          </p>
        </div>
        <div>
          <button
            onClick={onBack}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
          >
            Back
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
          >
            <p className="text-sm font-medium text-slate-200">
              Customer details
            </p>

            {errors.cart ? (
              <p className="text-xs text-rose-300 mb-2">{errors.cart}</p>
            ) : null}

            <input
              type="text"
              value={orderCustomer.name}
              onChange={(e) => onUpdateOrderCustomer("name", e.target.value)}
              placeholder="Full name"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />
            {errors.name ? (
              <p className="text-xs text-rose-300 mt-1">{errors.name}</p>
            ) : null}

            <input
              type="tel"
              value={orderCustomer.phone}
              onChange={(e) => onUpdateOrderCustomer("phone", e.target.value)}
              placeholder="Phone"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />
            {errors.phone ? (
              <p className="text-xs text-rose-300 mt-1">{errors.phone}</p>
            ) : null}

            <input
              type="email"
              value={orderCustomer.email}
              onChange={(e) => onUpdateOrderCustomer("email", e.target.value)}
              placeholder="Email (optional)"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />

            <input
              type="text"
              value={orderCustomer.addressLine1}
              onChange={(e) =>
                onUpdateOrderCustomer("addressLine1", e.target.value)
              }
              placeholder="Flat / House no (e.g. 12A)"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />

            <input
              type="text"
              value={orderCustomer.addressLine2}
              onChange={(e) =>
                onUpdateOrderCustomer("addressLine2", e.target.value)
              }
              placeholder="Street / Building"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={orderCustomer.city}
                onChange={(e) => onUpdateOrderCustomer("city", e.target.value)}
                placeholder="City"
                className="rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
              />
              <input
                type="text"
                value={orderCustomer.state}
                onChange={(e) => onUpdateOrderCustomer("state", e.target.value)}
                placeholder="State"
                className="rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
              />
            </div>

            <input
              type="text"
              value={orderCustomer.pincode}
              onChange={(e) => onUpdateOrderCustomer("pincode", e.target.value)}
              placeholder="Pincode"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />

            <div className="mt-2">
              <p className="text-sm text-slate-300 mb-2">Payment method</p>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={orderCustomer.paymentMethod === "cod"}
                    onChange={(e) =>
                      onUpdateOrderCustomer("paymentMethod", e.target.value)
                    }
                  />
                  <span className="text-sm">Cash on Delivery (COD)</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={orderCustomer.paymentMethod === "online"}
                    onChange={(e) =>
                      onUpdateOrderCustomer("paymentMethod", e.target.value)
                    }
                  />
                  <span className="text-sm">Online Payment</span>
                </label>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={cart.length === 0 || orderState === "loading"}
                className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {orderState === "loading" ? "Placing..." : "Place Order"}
              </button>
            </div>

            {orderState === "success" && orderMessage ? (
              <p className="mt-2 text-sm text-emerald-300">{orderMessage}</p>
            ) : null}
          </form>
        </div>

        <div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <p className="text-sm text-slate-300">Order summary</p>
            <div className="mt-3 space-y-3">
              {cart.length === 0 ? (
                <p className="text-sm text-slate-400">No items in cart.</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="text-sm text-slate-200">
                      {item.name} x{item.quantity}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between">
              <div className="text-sm text-slate-300">Total</div>
              <div className="font-semibold text-white">
                {formatPrice(subtotal)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
