function SiteFooter({ onNavigatePage }) {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
            VELDORA
          </p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
            Premium creator-tech storefront focused on a fast, modern shopping
            experience.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <button type="button" onClick={() => onNavigatePage("home")}>
              Home
            </button>
            <button type="button" onClick={() => onNavigatePage("products")}>
              Products
            </button>
            <button type="button" onClick={() => onNavigatePage("categories")}>
              Categories
            </button>
            <button type="button" onClick={() => onNavigatePage("about")}>
              About
            </button>
            <button type="button" onClick={() => onNavigatePage("contact")}>
              Contact Us
            </button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white">Support</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-400">
            <p>Dibyajyoti Pradhan</p>
            <a
              href="tel:+919692960497"
              className="inline-block hover:text-white"
            >
              9692960497
            </a>
            <p>Puri, Odisha, India</p>
            <p>COD available</p>
            <a
              href="https://wa.me/919692960497"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-amber-300 hover:text-amber-200"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
