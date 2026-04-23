function ReviewsSection({ reviews }) {
  return (
    <section
      id="reviews"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
          Customer reviews
        </p>
        <h3 className="mt-2 font-serif text-3xl text-white">
          Trusted by modern creators
        </h3>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.id}
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5"
            >
              <p className="text-sm leading-7 text-slate-300">
                “{review.quote}”
              </p>
              <footer className="mt-4 text-sm text-white">
                <span className="font-semibold">{review.name}</span>
                <span className="text-slate-500"> · {review.city}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
