function ContactPage({
  newsletterEmail,
  newsletterState,
  onSetEmail,
  onSubmit,
  onBackHome,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 shadow-2xl shadow-black/15">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-300">
              Contact us
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
              Reach the Veldora support team
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Use the store’s direct contact options below if you need help with
              products, orders, delivery, or payment questions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">Call us</p>
                <a
                  href="tel:+919692960497"
                  className="mt-2 inline-block text-sm text-amber-300 transition hover:text-amber-200"
                >
                  9692960497
                </a>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">WhatsApp</p>
                <a
                  href="https://wa.me/919692960497"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-amber-300 transition hover:text-amber-200"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onBackHome}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Back Home
              </button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 sm:p-6">
            <h3 className="text-xl font-semibold text-white">Stay updated</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Subscribe for product updates, offers, and order announcements.
            </p>

            <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => onSetEmail(event.target.value)}
                placeholder="Enter your email"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-300/60"
              />
              <button
                type="submit"
                className="rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
              >
                Subscribe
              </button>
            </form>

            {newsletterState !== "idle" ? (
              <p
                className={`mt-4 text-sm ${
                  newsletterState === "success"
                    ? "text-emerald-300"
                    : "text-rose-300"
                }`}
              >
                {newsletterState === "success"
                  ? "Thanks for subscribing."
                  : "Please enter a valid email address."}
              </p>
            ) : null}

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
              <p className="font-semibold text-white">Store details</p>
              <p className="mt-2">Dibyajyoti Pradhan</p>
              <p>Puri, Odisha, India</p>
              <p>COD available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
