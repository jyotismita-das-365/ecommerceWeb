function FeaturesSection({ features }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <h3 className="text-xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
