import { useEffect, useMemo, useState } from "react";
import CartPopup from "./components/CartPopup";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import HomeFeaturedProducts from "./components/HomeFeaturedProducts";
import AboutPage from "./components/AboutPage";
import CategoriesPage from "./components/CategoriesPage";
import DirectOrderModal from "./components/DirectOrderModal";
import ProductModal from "./components/ProductModal";
import ProductPage from "./components/ProductPage";
import ReviewsSection from "./components/ReviewsSection";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import ToastMessage from "./components/ToastMessage";
import WishlistPage from "./components/WishlistPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmModal from "./components/OrderConfirmModal";
import {
  categories,
  fallbackProducts,
  features,
  formatPrice,
  reviews,
  stats,
} from "./data/storeData";

const storeWhatsAppNumber =
  import.meta.env.VITE_STORE_WHATSAPP_NUMBER ?? "918699609193";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("veldora_theme");
    return savedTheme === "light" ? "light" : "dark";
  });
  const [currentPage, setCurrentPage] = useState("home");
  const [pendingScrollTarget, setPendingScrollTarget] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState("idle");
  const [orderCustomer, setOrderCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });
  const [orderState, setOrderState] = useState("idle");
  const [orderMessage, setOrderMessage] = useState("");
  const [directOrderProduct, setDirectOrderProduct] = useState(null);
  const [directOrderCustomer, setDirectOrderCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });
  const [showCart, setShowCart] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [confirmMode, setConfirmMode] = useState(null);
  const [confirmProduct, setConfirmProduct] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("veldora_theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedCart = window.localStorage.getItem("veldora_cart");
    const savedWishlist = window.localStorage.getItem("veldora_wishlist");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("veldora_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem("veldora_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (!pendingScrollTarget) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      scrollToSection(pendingScrollTarget);
      setPendingScrollTarget("");
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [currentPage, pendingScrollTarget]);

  const filteredProducts = useMemo(() => {
    return fallbackProducts.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesQuery = [
        product.name,
        product.description,
        product.badge,
        product.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleAddToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    setToast(`${product.name} added to cart`);
  };

  const handleDirectOrder = (product) => {
    setDirectOrderCustomer({
      name: orderCustomer.name,
      phone: orderCustomer.phone,
      email: orderCustomer.email,
      addressLine1: orderCustomer.addressLine1,
      addressLine2: orderCustomer.addressLine2,
      city: orderCustomer.city,
      state: orderCustomer.state,
      pincode: orderCustomer.pincode,
      paymentMethod: orderCustomer.paymentMethod || "cod",
    });
    setDirectOrderProduct(product);
  };

  const handleUpdateDirectOrderCustomer = (field, value) => {
    setDirectOrderCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleConfirmDirectOrder = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    if (!directOrderProduct) {
      return;
    }

    const shopNumber = sanitizePhoneNumber(storeWhatsAppNumber);

    if (!shopNumber) {
      setToast(
        "Add your shop WhatsApp number in VITE_STORE_WHATSAPP_NUMBER to enable direct ordering.",
      );
      return;
    }

    if (!directOrderCustomer.name.trim() || !directOrderCustomer.phone.trim()) {
      setToast("Name and phone are required for direct order.");
      return;
    }

    const singleItemCart = [{ ...directOrderProduct, quantity: 1 }];
    const shopMessage = buildShopOrderMessage({
      customer: directOrderCustomer,
      cart: singleItemCart,
      subtotal: directOrderProduct.price,
    });
    const customerNumber = sanitizePhoneNumber(directOrderCustomer.phone);

    window.open(
      buildWhatsAppUrl(shopNumber, shopMessage),
      "_blank",
      "noopener,noreferrer",
    );

    if (customerNumber) {
      const customerMessage = buildCustomerOrderMessage({
        customer: directOrderCustomer,
        cart: singleItemCart,
        subtotal: directOrderProduct.price,
      });

      window.open(
        buildWhatsAppUrl(customerNumber, customerMessage),
        "_blank",
        "noopener,noreferrer",
      );
    }

    setOrderCustomer(directOrderCustomer);
    setOrderState("success");
    setOrderMessage(`${directOrderProduct.name} order opened in WhatsApp.`);
    setToast(`${directOrderProduct.name} order opened`);
    setDirectOrderProduct(null);
  };

  const requestCartConfirm = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    // Components perform validation before calling this; simply open confirm.
    setConfirmMode("cart");
    setShowOrderConfirm(true);
  };

  const requestDirectConfirm = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    if (!directOrderProduct) {
      setToast("No product selected for direct order.");
      return;
    }

    setConfirmMode("direct");
    setConfirmProduct(directOrderProduct);
    setShowOrderConfirm(true);
  };

  const handleConfirmOrder = () => {
    if (confirmMode === "cart") {
      handlePlaceOrder();
    } else if (confirmMode === "direct") {
      handleConfirmDirectOrder();
    }

    setShowOrderConfirm(false);
    setConfirmMode(null);
    setConfirmProduct(null);
  };

  const handleUpdateCartQuantity = (productId, action) => {
    setCart((currentCart) => {
      if (action === "remove") {
        return currentCart.filter((item) => item.id !== productId);
      }

      return currentCart
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          const nextQuantity =
            action === "increment" ? item.quantity + 1 : item.quantity - 1;

          return { ...item, quantity: nextQuantity };
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleClearCart = () => {
    setCart([]);
    setToast("Cart cleared");
  };

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) =>
      currentWishlist.some((item) => item.id === product.id)
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product],
    );
  };

  const navigateToPage = (page) => {
    setPendingScrollTarget("");
    setShowCart(false);
    setCurrentPage(page);
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    if (!newsletterEmail.trim()) {
      setNewsletterState("error");
      return;
    }

    setNewsletterState("success");
    setNewsletterEmail("");
  };

  const handlePlaceOrder = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    // Basic guards: components validate inputs before calling this,
    // but keep safety checks and show non-blocking toast messages.
    if (cart.length === 0) {
      setToast("Add items to cart before placing an order.");
      return;
    }

    if (!orderCustomer.name.trim() || !orderCustomer.phone.trim()) {
      setToast("Name and phone are required.");
      return;
    }

    const shopMessage = buildShopOrderMessage({
      customer: orderCustomer,
      cart,
      subtotal,
    });
    const customerMessage = buildCustomerOrderMessage({
      customer: orderCustomer,
      cart,
      subtotal,
    });

    const shopNumber = sanitizePhoneNumber(storeWhatsAppNumber);
    const customerNumber = sanitizePhoneNumber(orderCustomer.phone);

    if (!shopNumber) {
      setToast(
        "Add your shop WhatsApp number in VITE_STORE_WHATSAPP_NUMBER to enable order messaging.",
      );
      return;
    }

    setOrderState("success");
    setOrderMessage(
      "Order placed locally. WhatsApp messages opened for you and the customer.",
    );

    window.open(
      buildWhatsAppUrl(shopNumber, shopMessage),
      "_blank",
      "noopener,noreferrer",
    );
    if (customerNumber) {
      window.open(
        buildWhatsAppUrl(customerNumber, customerMessage),
        "_blank",
        "noopener,noreferrer",
      );
    }

    setCart([]);
    setOrderCustomer({
      name: "",
      phone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      paymentMethod: "cod",
    });
  };

  const updateOrderCustomer = (field, value) => {
    setOrderCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Open cart popup (used by header cart button)
  const handleOpenCartPopup = () => {
    setShowCart(true);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const totalWishlist = wishlist.length;
  const isLightTheme = theme === "light";
  const featuredProducts = fallbackProducts.slice(0, 3);

  const handleOpenProductFromWishlist = (product) => {
    setSelectedProduct(product);
    setCurrentPage("products");
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        isLightTheme
          ? "bg-slate-50 text-slate-900"
          : "bg-[#08111f] text-slate-100"
      }`}
    >
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute left-[-8rem] top-[-8rem] h-72 w-72 rounded-full blur-3xl ${
            isLightTheme ? "bg-amber-300/30" : "bg-amber-400/20"
          }`}
        />
        <div
          className={`absolute right-[-6rem] top-[12rem] h-96 w-96 rounded-full blur-3xl ${
            isLightTheme ? "bg-cyan-300/25" : "bg-cyan-400/15"
          }`}
        />
        <div
          className={`absolute bottom-[-8rem] left-[18%] h-80 w-80 rounded-full blur-3xl ${
            isLightTheme ? "bg-orange-300/20" : "bg-orange-500/10"
          }`}
        />
      </div>

      <SiteHeader
        theme={theme}
        currentPage={currentPage}
        cartCount={cartCount}
        onNavigatePage={navigateToPage}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark",
          )
        }
        onCartClick={() => navigateToPage("cart")}
      />

      <main>
        {currentPage === "home" ? (
          <>
            <HeroSection
              stats={stats}
              onShopClick={() => navigateToPage("products")}
              onBrowseProducts={() => {
                navigateToPage("products");
              }}
              onPickCategory={(value) => {
                setCategory(value);
                navigateToPage("products");
              }}
            />

            <FeaturesSection features={features} />

            <HomeFeaturedProducts
              products={featuredProducts}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onOpenProducts={() => navigateToPage("products")}
              formatPrice={formatPrice}
            />

            <ReviewsSection reviews={reviews} />
          </>
        ) : currentPage === "products" ? (
          <>
            <ProductPage
              categories={categories}
              category={category}
              query={query}
              filteredProducts={filteredProducts}
              wishlist={wishlist}
              onSetCategory={setCategory}
              onSetQuery={setQuery}
              onReset={() => {
                setQuery("");
                setCategory("All");
              }}
              onToggleWishlist={toggleWishlist}
              onAddToCart={handleAddToCart}
              onDirectOrder={handleDirectOrder}
              onQuickView={setSelectedProduct}
              onBackHome={() => navigateToPage("home")}
              formatPrice={formatPrice}
            />

            {/* Cart preview moved to a popup. */}
          </>
        ) : currentPage === "wishlist" ? (
          <WishlistPage
            wishlist={wishlist}
            onOpenProduct={handleOpenProductFromWishlist}
            onRemove={toggleWishlist}
            onBackHome={() => navigateToPage("home")}
            formatPrice={formatPrice}
          />
        ) : currentPage === "cart" ? (
          <CartPage
            cart={cart}
            subtotal={subtotal}
            formatPrice={formatPrice}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onClearCart={handleClearCart}
            onOrderNow={() => navigateToPage("checkout")}
            onBackHome={() => navigateToPage("products")}
          />
        ) : currentPage === "categories" ? (
          <CategoriesPage
            categories={categories}
            products={fallbackProducts}
            onSelectCategory={(value) => {
              setCategory(value);
              navigateToPage("products");
            }}
            onBackHome={() => navigateToPage("home")}
            onBrowseProducts={() => navigateToPage("products")}
          />
        ) : currentPage === "checkout" ? (
          <CheckoutPage
            cart={cart}
            subtotal={subtotal}
            formatPrice={formatPrice}
            orderCustomer={orderCustomer}
            onUpdateOrderCustomer={updateOrderCustomer}
            onPlaceOrder={requestCartConfirm}
            orderState={orderState}
            orderMessage={orderMessage}
            onBack={() => navigateToPage("cart")}
          />
        ) : currentPage === "about" ? (
          <AboutPage
            stats={stats}
            features={features}
            onBrowseProducts={() => navigateToPage("products")}
            onBackHome={() => navigateToPage("home")}
          />
        ) : (
          <ContactPage
            newsletterEmail={newsletterEmail}
            newsletterState={newsletterState}
            onSetEmail={setNewsletterEmail}
            onSubmit={handleNewsletterSubmit}
            onBackHome={() => navigateToPage("home")}
            formatPrice={formatPrice}
          />
        )}
      </main>

      <SiteFooter onNavigatePage={navigateToPage} />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectOrder={handleDirectOrder}
        formatPrice={formatPrice}
      />

      <DirectOrderModal
        product={directOrderProduct}
        customer={directOrderCustomer}
        onClose={() => setDirectOrderProduct(null)}
        onUpdateCustomer={handleUpdateDirectOrderCustomer}
        onSubmit={requestDirectConfirm}
      />

      <CartPopup
        open={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        subtotal={subtotal}
        orderCustomer={orderCustomer}
        orderState={orderState}
        orderMessage={orderMessage}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
        onPlaceOrder={requestCartConfirm}
        onUpdateOrderCustomer={updateOrderCustomer}
        formatPrice={formatPrice}
      />

      <OrderConfirmModal
        open={showOrderConfirm}
        onClose={() => setShowOrderConfirm(false)}
        mode={confirmMode}
        product={confirmProduct}
        cart={cart}
        subtotal={
          confirmMode === "direct" ? confirmProduct?.price || 0 : subtotal
        }
        customer={
          confirmMode === "direct" ? directOrderCustomer : orderCustomer
        }
        onConfirm={handleConfirmOrder}
        formatPrice={formatPrice}
      />

      <ToastMessage message={toast} />
    </div>
  );
}

function sanitizePhoneNumber(value) {
  return String(value).replace(/\D/g, "");
}

function buildWhatsAppUrl(phoneNumber, message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function buildShopOrderMessage({ customer, cart, subtotal }) {
  const address = [
    customer.addressLine1,
    customer.addressLine2,
    customer.city,
    customer.state,
    customer.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  const paymentLabel =
    customer.paymentMethod === "cod"
      ? "Cash on Delivery (COD)"
      : customer.paymentMethod === "online"
        ? "Online Payment"
        : customer.paymentMethod || null;

  return [
    "New order received",
    `Customer: ${customer.name}`,
    `Phone: ${customer.phone}`,
    customer.email ? `Email: ${customer.email}` : null,
    address ? `Delivery address: ${address}` : null,
    paymentLabel ? `Payment method: ${paymentLabel}` : null,
    "",
    "Items:",
    ...cart.map(
      (item) =>
        `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`,
    ),
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildCustomerOrderMessage({ customer, cart, subtotal }) {
  const address = [
    customer.addressLine1,
    customer.addressLine2,
    customer.city,
    customer.state,
    customer.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  const paymentLabel =
    customer.paymentMethod === "cod"
      ? "Cash on Delivery (COD)"
      : customer.paymentMethod === "online"
        ? "Online Payment"
        : customer.paymentMethod || null;

  return [
    `Hi ${customer.name}, your order has been placed successfully.`,
    "",
    "Order summary:",
    ...cart.map(
      (item) =>
        `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`,
    ),
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    address ? `Delivery address: ${address}` : null,
    paymentLabel ? `Payment method: ${paymentLabel}` : null,
    "We will contact you soon with the next steps.",
  ]
    .filter(Boolean)
    .join("\n");
}

export default App;
