function CategoriesPage({
  categories,
  products,
  onSelectCategory,
  onBackHome,
  onBrowseProducts,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-300">
              Categories
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
              Shop electronics by category
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Jump straight to the right product family and keep the shopping
              flow fast.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onBackHome}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Back Home
            </button>
            <button
              type="button"
              onClick={onBrowseProducts}
              className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Browse Products
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories
            .filter((item) => item !== "All")
            .map((item) => {
              const count = products.filter(
                (product) => product.category === item,
              ).length;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelectCategory(item)}
                  className="group rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 text-left transition hover:-translate-y-1 hover:border-amber-300/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-amber-300/90">
                        {item}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        {count} products
                      </h3>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-300/30 via-white/10 to-cyan-300/20" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    View the full collection for {item.toLowerCase()} and pick
                    the best match for your setup.
                  </p>
                  <p className="mt-4 text-sm font-medium text-amber-300">
                    Open category
                  </p>
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default CategoriesPage;
