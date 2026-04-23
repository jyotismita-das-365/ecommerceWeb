function WishlistPage({
  wishlist,
  onOpenProduct,
  onRemove,
  onBackHome,
  formatPrice,
}) {
  return (
    <section
      id="wishlist"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-cyan-400/5 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-7 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
              Wishlist
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white">Saved items</h2>
            <p className="mt-2 text-sm text-slate-300">
              Click any item to view or order it on the Products page.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-6">
          {wishlist.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-center text-slate-400">
              Your wishlist is empty. Save items from product cards to build a
              wishlist.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-300 font-semibold">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-sm text-slate-300">
                        {item.rating} / 5
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-300">
                    {item.description}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenProduct(item)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                    >
                      View & Order
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(item)}
                      className="inline-flex w-full items-center justify-center rounded-full border border-rose-300/30 bg-rose-300/10 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-300/20"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WishlistPage;
