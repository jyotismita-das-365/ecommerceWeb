function HeroSection({ stats, onShopClick, onBrowseProducts, onPickCategory }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live now: creator tech savings
        </div>
        <div className="space-y-5">
          <h2 className="max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-7xl">
            Smart gadgets for creators, students, and high-energy teams.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            A sharper version of the reference storefront: premium hero design,
            real filtering, a cart flow, wishlist support, and a polished
            shopping experience.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <button
            type="button"
            onClick={onShopClick}
            className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Shop Now
          </button>
          <button
            type="button"
            onClick={onBrowseProducts}
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Browse Products
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
            Featured collection
          </p>
          <h3 className="mt-3 font-serif text-3xl text-white">
            Browse the full catalog
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Explore every product by category, compare prices, and open quick
            view for any item.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <button
              type="button"
              onClick={onBrowseProducts}
              className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Browse Products
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {["Earbuds", "Smartwatch", "Gimbal"].map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => onPickCategory(label)}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-amber-300/40"
            >
              <div className="mx-auto mb-3 h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-300/20 via-white/10 to-cyan-300/20" />
              <p className="text-sm font-medium text-slate-200">{label}</p>
              <p className="text-xs text-slate-400">Top pick {index + 1}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
