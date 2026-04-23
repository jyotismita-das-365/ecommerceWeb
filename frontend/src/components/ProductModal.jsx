function ProductModal({
  product,
  onClose,
  onAddToCart,
  onDirectOrder,
  formatPrice,
}) {
  if (!product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/75 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900 p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="max-h-[75vh] overflow-y-auto pr-1 sm:max-h-none sm:overflow-visible sm:pr-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
                Quick view
              </p>
              <h3 className="mt-2 font-serif text-3xl text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{product.category}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
            >
              Close
            </button>
          </div>
          <p className="mt-5 text-slate-300">{product.description}</p>
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
              <p className="text-3xl font-semibold text-amber-300">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                }}
                className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => onDirectOrder(product)}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
