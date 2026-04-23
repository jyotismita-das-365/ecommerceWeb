import { Heart } from "lucide-react";

function ProductPage({
  categories,
  category,
  query,
  filteredProducts,
  wishlist,
  onSetCategory,
  onSetQuery,
  onReset,
  onToggleWishlist,
  onAddToCart,
  onDirectOrder,
  onQuickView,
  onBackHome,
  formatPrice,
}) {
  return (
    <section
      id="products"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-cyan-400/5 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-7 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-300">
              Product page
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
              Browse every product by category
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Use the category chips to filter the catalog, search the full
              collection, and open any product in quick view.
            </p>
            <button
              type="button"
              onClick={onBackHome}
              className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Back to Home
            </button>
          </div>

          <div className="flex w-full flex-col gap-3 lg:max-w-xl lg:flex-row">
            <input
              value={query}
              onChange={(event) => onSetQuery(event.target.value)}
              placeholder="Search earbuds, mic, gimbal..."
              className="w-full rounded-full border border-white/10 bg-slate-950/60 px-5 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSetCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? "bg-amber-300 text-slate-950"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-white/10 bg-slate-950/60 p-10 text-center text-slate-400">
              No products match your search.
            </div>
          ) : (
            filteredProducts.map((product) => {
              const liked = wishlist.some((item) => item.id === product.id);

              return (
                <article
                  key={product.id}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4 transition hover:-translate-y-1 hover:border-amber-300/40 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex rounded-full bg-amber-300/15 px-3 py-1 text-xs text-amber-200">
                        {product.badge}
                      </span>
                      <h3 className="mt-3 text-xl font-semibold text-white sm:mt-4 sm:text-2xl">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm uppercase tracking-[0.25em] text-slate-500">
                        {product.category}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs transition ${
                        liked
                          ? "border-amber-300/40 bg-amber-300/15 text-amber-200"
                          : "border-white/10 bg-white/5 text-slate-300"
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`}
                        aria-hidden="true"
                      />
                      {liked ? "Wishlisted" : "Save"}
                    </button>
                  </div>

                  <div className="mt-4 flex h-32 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-white/10 via-slate-900 to-cyan-400/10 sm:mt-5 sm:h-36">
                    <div className="h-16 w-16 rounded-[1.25rem] border border-white/15 bg-white/10 sm:h-20 sm:w-20 sm:rounded-[1.5rem]" />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-300 sm:mt-5">
                    {product.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-slate-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </p>
                      <p className="text-2xl font-semibold text-amber-300">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="text-left text-sm text-slate-300 sm:text-right">
                      <p>Rating</p>
                      <p className="font-semibold text-white">
                        {product.rating} / 5
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="w-full rounded-full bg-amber-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 sm:col-span-2"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => onDirectOrder(product)}
                      className="w-full rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Order Now
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Quick View
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
