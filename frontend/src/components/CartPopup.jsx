import React, { useState } from "react";

function CartPopup({
  open,
  onClose,
  cart,
  subtotal,
  orderCustomer,
  orderState,
  orderMessage,
  onUpdateCartQuantity,
  onClearCart,
  onPlaceOrder,
  onUpdateOrderCustomer,
  formatPrice,
}) {
  if (!open) return null;

  const [errors, setErrors] = useState({});

  const validateAndPlace = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const next = {};
    if (!cart || cart.length === 0)
      next.cart = "Add items to cart before placing an order.";
    if (!orderCustomer.name || !orderCustomer.name.trim())
      next.name = "Name is required.";
    if (!orderCustomer.phone || !orderCustomer.phone.trim())
      next.phone = "Phone is required.";
    if (Object.keys(next).length) {
      setErrors(next);
      return false;
    }
    setErrors({});
    if (onPlaceOrder) onPlaceOrder(e);
    return true;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900 p-6 max-h-[80vh] relative"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
                Cart
              </p>
              <h3 className="mt-2 font-serif text-2xl text-white">Your Cart</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
            >
              Close
            </button>
          </div>

          <div className="mt-4 overflow-y-auto pr-2 pb-24">
            {cart.length === 0 ? (
              <p className="text-sm text-slate-400">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 pb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-slate-800 p-3"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-sm text-slate-400">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateCartQuantity(item.id, "decrement")
                        }
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white hover:bg-white/10"
                      >
                        -
                      </button>
                      <div className="px-3 text-sm text-white">
                        {item.quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateCartQuantity(item.id, "increment")
                        }
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white hover:bg-white/10"
                      >
                        +
                      </button>
                      <div className="ml-4 font-semibold text-white">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <button
                        type="button"
                        onClick={() => onUpdateCartQuantity(item.id, "remove")}
                        className="ml-3 rounded-full border border-rose-300/30 bg-rose-300/10 px-3 py-1 text-xs text-rose-200 hover:bg-rose-300/20"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-2">
              <form
                onSubmit={validateAndPlace}
                className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
              >
                <p className="text-sm font-medium text-slate-200">
                  Quick Checkout
                </p>

                {errors.cart ? (
                  <p className="text-xs text-rose-300 mb-2">{errors.cart}</p>
                ) : null}

                <input
                  type="text"
                  value={orderCustomer.name}
                  onChange={(event) =>
                    onUpdateOrderCustomer("name", event.target.value)
                  }
                  placeholder="Your name"
                  className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
                />
                {errors.name ? (
                  <p className="text-xs text-rose-300 mt-1">{errors.name}</p>
                ) : null}

                <input
                  type="tel"
                  value={orderCustomer.phone}
                  onChange={(event) =>
                    onUpdateOrderCustomer("phone", event.target.value)
                  }
                  placeholder="Phone number"
                  className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
                />
                {errors.phone ? (
                  <p className="text-xs text-rose-300 mt-1">{errors.phone}</p>
                ) : null}

                <input
                  type="email"
                  value={orderCustomer.email}
                  onChange={(event) =>
                    onUpdateOrderCustomer("email", event.target.value)
                  }
                  placeholder="Email (optional)"
                  className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
                />

                <input
                  type="text"
                  value={orderCustomer.addressLine1}
                  onChange={(event) =>
                    onUpdateOrderCustomer("addressLine1", event.target.value)
                  }
                  placeholder="Flat / House no (e.g. 12A)"
                  className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
                />

                <input
                  type="text"
                  value={orderCustomer.addressLine2}
                  onChange={(event) =>
                    onUpdateOrderCustomer("addressLine2", event.target.value)
                  }
                  placeholder="Street / Building"
                  className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={orderCustomer.city}
                    onChange={(event) =>
                      onUpdateOrderCustomer("city", event.target.value)
                    }
                    placeholder="City"
                    className="rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
                  />
                  <input
                    type="text"
                    value={orderCustomer.state}
                    onChange={(event) =>
                      onUpdateOrderCustomer("state", event.target.value)
                    }
                    placeholder="State"
                    className="rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
                  />
                </div>

                <input
                  type="text"
                  value={orderCustomer.pincode}
                  onChange={(event) =>
                    onUpdateOrderCustomer("pincode", event.target.value)
                  }
                  placeholder="Pincode"
                  className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
                />

                <div className="mt-2">
                  <p className="text-sm text-slate-300 mb-2">Payment method</p>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="cartPayment"
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
                        name="cartPayment"
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

                {/* no submit button here; sticky footer has confirm button */}
              </form>
            </div>
          </div>

          <div className="absolute left-0 right-0 bottom-0 border-t border-white/10 pt-4 bg-gradient-to-t from-slate-900/90 to-transparent">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-slate-300">Subtotal</div>
                <div className="font-semibold text-white">
                  {formatPrice(subtotal)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClearCart}
                  disabled={cart.length === 0}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={() => validateAndPlace()}
                  disabled={cart.length === 0 || orderState === "loading"}
                  className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {orderState === "loading"
                    ? "Placing..."
                    : "Confirm & Place Order"}
                </button>
              </div>
            </div>

            {orderState === "success" && orderMessage ? (
              <p className="mt-2 text-sm text-emerald-300">{orderMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPopup;
