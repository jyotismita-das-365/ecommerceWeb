function AboutPage({ features, stats, onBrowseProducts, onBackHome }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 shadow-2xl shadow-black/15 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-300">
              About us
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
              Built for modern electronics shopping
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Veldora is designed to help customers find useful tech quickly,
              compare options clearly, and place orders with confidence.
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5"
            >
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
