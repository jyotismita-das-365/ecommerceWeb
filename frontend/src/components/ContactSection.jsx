function ContactSection({
  newsletterEmail,
  newsletterState,
  onSetEmail,
  onSubmit,
}) {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 lg:grid-cols-[1fr_0.9fr] lg:p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
            Contact & signup
          </p>
          <h3 className="mt-2 font-serif text-4xl text-white">
            Stay in the loop
          </h3>
          <p className="mt-4 max-w-2xl text-slate-300">
            Get product drops and restock updates. This CTA section works as a
            clean local signup flow.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
        >
          <label
            className="mb-2 block text-sm text-slate-300"
            htmlFor="newsletter-email"
          >
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={newsletterEmail}
            onChange={(event) => onSetEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Join Newsletter
          </button>
          <p
            className={`mt-3 text-sm ${
              newsletterState === "success"
                ? "text-emerald-300"
                : newsletterState === "error"
                  ? "text-rose-300"
                  : "text-slate-400"
            }`}
          >
            {newsletterState === "success"
              ? "Subscription confirmed."
              : newsletterState === "error"
                ? "Enter a valid email address."
                : "We only use your email for product updates."}
          </p>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
