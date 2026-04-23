import React from "react";

export default function CartPage({
  cart,
  subtotal,
  formatPrice,
  onUpdateCartQuantity,
  onClearCart,
  onOrderNow,
  onBackHome,
}) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-white">Your Cart</h2>
          <p className="text-sm text-slate-400 mt-1">
            Review items before checkout
          </p>
        </div>
        <div>
          <button
            onClick={onBackHome}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
          >
            Back
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {cart.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-slate-800 p-6 text-center text-sm text-slate-400">
            Your cart is empty.
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-slate-800 p-4"
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
                  onClick={() => onUpdateCartQuantity(item.id, "decrement")}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white hover:bg-white/10"
                >
                  -
                </button>
                <div className="px-3 text-sm text-white">{item.quantity}</div>
                <button
                  type="button"
                  onClick={() => onUpdateCartQuantity(item.id, "increment")}
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
          ))
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <div className="text-sm text-slate-300">Subtotal</div>
          <div className="font-semibold text-white text-xl">
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
            onClick={onOrderNow}
            disabled={cart.length === 0}
            className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
