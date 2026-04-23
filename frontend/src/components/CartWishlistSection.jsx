function CartWishlistSection({
  cart,
  wishlist,
  subtotal,
  totalWishlist,
  orderCustomer,
  orderState,
  orderMessage,
  onUpdateCartQuantity,
  onClearCart,
  onPlaceOrder,
  onUpdateOrderCustomer,
  formatPrice,
}) {
  return (
    <section id="cart" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
            Cart preview
          </p>
          <h3 className="mt-2 font-serif text-3xl text-white">
            Your live cart
          </h3>
          <div className="mt-5 space-y-4">
            {cart.length === 0 ? (
              <p className="text-slate-400">
                Add a product to start building your order.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-amber-300">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateCartQuantity(item.id, "decrement")}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white hover:bg-white/10"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateCartQuantity(item.id, "increment")}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white hover:bg-white/10"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateCartQuantity(item.id, "remove")}
                      className="ml-auto rounded-full border border-rose-300/30 bg-rose-300/10 px-3 py-1 text-xs text-rose-200 hover:bg-rose-300/20"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-lg">
            <span className="text-slate-300">Subtotal</span>
            <span className="font-semibold text-white">
              {formatPrice(subtotal)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClearCart}
            disabled={cart.length === 0}
            className="mt-4 w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Clear Cart
          </button>

          <form
            onSubmit={onPlaceOrder}
            className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
          >
            <p className="text-sm font-medium text-slate-200">Quick Checkout</p>
            <input
              type="text"
              value={orderCustomer.name}
              onChange={(event) =>
                onUpdateOrderCustomer("name", event.target.value)
              }
              placeholder="Your name"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />
            <input
              type="tel"
              value={orderCustomer.phone}
              onChange={(event) =>
                onUpdateOrderCustomer("phone", event.target.value)
              }
              placeholder="Phone number"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />
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
              value={orderCustomer.location}
              onChange={(event) =>
                onUpdateOrderCustomer("location", event.target.value)
              }
              placeholder="Delivery location (optional)"
              className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />
            <button
              type="submit"
              disabled={orderState === "loading"}
              className="w-full rounded-full bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {orderState === "loading" ? "Placing Order..." : "Place Order"}
            </button>
            {orderMessage ? (
              <p
                className={`text-sm ${orderState === "success" ? "text-emerald-300" : "text-rose-300"}`}
              >
                {orderMessage}
              </p>
            ) : null}
          </form>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
            Wishlist
          </p>
          <h3 className="mt-2 font-serif text-3xl text-white">
            Saved for later
          </h3>
          <div className="mt-5 space-y-3">
            {wishlist.length === 0 ? (
              <p className="text-slate-400">
                Tap save on a product card to build a wishlist.
              </p>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                  <p className="text-sm text-amber-300">
                    {formatPrice(item.price)}
                  </p>
                </div>
              ))
            )}
          </div>
          <p className="mt-6 text-sm text-slate-400">
            {totalWishlist} item(s) saved
          </p>
        </div>
      </div>
    </section>
  );
}

export default CartWishlistSection;
