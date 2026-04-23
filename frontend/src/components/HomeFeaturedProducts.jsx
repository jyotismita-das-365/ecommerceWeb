import { Heart } from "lucide-react";

function HomeFeaturedProducts({
  products,
  wishlist,
  onToggleWishlist,
  onOpenProducts,
  formatPrice,
}) {
  return (
    <section
      id="home-products"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-cyan-400/5 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
              Featured products
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
              Handpicked items on home
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              These are quick highlights. For cart, checkout, and full ordering,
              open the Products page.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenProducts}
            className="inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Open Products Page
          </button>
        </div>

        <div className="mt-7 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const liked = wishlist.some((item) => item.id === product.id);

            return (
              <article
                key={product.id}
                className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-full bg-amber-300/15 px-3 py-1 text-xs text-amber-200">
                    {product.badge}
                  </span>
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
                <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm uppercase tracking-[0.22em] text-slate-500">
                  {product.category}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {product.description}
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-2xl font-semibold text-amber-300">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-sm text-slate-300">{product.rating} / 5</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeFeaturedProducts;
