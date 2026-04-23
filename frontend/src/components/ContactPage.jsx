import ContactSection from "./ContactSection";

function ContactPage({
  newsletterEmail,
  newsletterState,
  onSetEmail,
  onSubmit,
  onBackHome,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-300">
              Contact
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
              Talk to the electronics store team
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Reach out for product help, order support, or business enquiries.
            </p>
          </div>

          <button
            type="button"
            onClick={onBackHome}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Back Home
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/90">
              Phone
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              +91 96929 60497
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/90">
              WhatsApp
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              Instant order support
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/90">
              Location
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              Puri, Odisha, India
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ContactSection
          newsletterEmail={newsletterEmail}
          newsletterState={newsletterState}
          onSetEmail={onSetEmail}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}

export default ContactPage;
