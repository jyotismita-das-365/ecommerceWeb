import { useState } from "react";
import logoImage from "../assets/veldora.png";
import { Heart, Sun, Moon, ShoppingCart } from "lucide-react";

function SiteHeader({
  cartCount,
  currentPage,
  theme,
  onCartClick,
  onNavigatePage,
  onToggleTheme,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const navItems = [
    { label: "Home", page: "home" },
    { label: "Products", page: "products" },
    { label: "Categories", page: "categories" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const navClassName = (page) =>
    `rounded-full px-4 py-2 transform transition-transform duration-200 ease-out hover:scale-105 active:scale-95 ${
      currentPage === page
        ? "bg-amber-300 text-slate-950"
        : "hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#08111f]/80 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigatePage("home")}
          className="flex items-center gap-3 text-left transform transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg shadow-cyan-950/30">
            <img
              src={logoImage}
              alt="Veldora logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p
              className="text-2xl sm:text-3xl font-semibold text-white"
              style={{
                fontFamily:
                  '"SF Pro Display", -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              VELDORA
            </p>
            <p className="text-xs sm:text-sm text-amber-300">
              The Gadget Store
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => onNavigatePage(item.page)}
              className={navClassName(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigatePage("wishlist")}
              aria-label="Open wishlist"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <Heart className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              aria-pressed={theme === "dark"}
              className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 transform hover:scale-105 active:scale-95 focus:outline-none"
            >
              <span
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-slate-700" : "bg-white/10"
                }`}
              />

              <span
                className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transform transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-0" : "translate-x-6"
                }`}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 text-slate-800" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-400" />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={onCartClick}
              aria-label="Open cart"
              className="relative inline-flex items-center justify-center rounded-full border border-amber-300/20 bg-amber-300 p-2 text-slate-950 transform transition-transform duration-200 hover:scale-105 active:scale-95  hover:bg-amber-200"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
                {cartCount}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpenMenu((current) => !current)}
            aria-expanded={openMenu}
            aria-label={openMenu ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-3 text-white transform transition-transform duration-200 hover:scale-105 active:scale-95  hover:bg-white/10 md:hidden"
          >
            {openMenu ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {openMenu ? (
        <nav className="mx-4 mb-4 grid gap-2 rounded-3xl border border-white/10 bg-slate-900/85 p-3 text-sm text-slate-300 shadow-2xl shadow-black/20 md:hidden">
          <button
            type="button"
            onClick={() => {
              setOpenMenu(false);
              onToggleTheme();
            }}
            className="rounded-2xl px-4 py-3 text-left transform transition-transform duration-200 hover:scale-105 active:scale-95 hover:bg-white/10 hover:text-white"
          >
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
          {navItems.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => {
                setOpenMenu(false);
                onNavigatePage(item.page);
              }}
              className={`rounded-2xl px-4 py-3 transform transition-transform duration-200 hover:scale-105 active:scale-95  hover:bg-white/10 hover:text-white ${
                currentPage === item.page ? "bg-white/10 text-white" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export default SiteHeader;
