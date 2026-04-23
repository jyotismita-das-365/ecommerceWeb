import React, { useState } from "react";

function DirectOrderModal({
  product,
  customer,
  onClose,
  onUpdateCustomer,
  onSubmit,
}) {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!customer.name || !customer.name.trim())
      next.name = "Customer name is required.";
    if (!customer.phone || !customer.phone.trim())
      next.phone = "Customer phone is required.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    if (onSubmit) onSubmit(e);
  };
  if (!product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-900 p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
              Direct order
            </p>
            <h3 className="mt-2 font-serif text-3xl text-white">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Fill customer details to place this order on WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            value={customer.name}
            onChange={(event) => onUpdateCustomer("name", event.target.value)}
            placeholder="Customer name"
            className="w-full rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
          />
          {errors.name ? (
            <p className="text-xs text-rose-300 mt-1">{errors.name}</p>
          ) : null}
          <input
            type="tel"
            value={customer.phone}
            onChange={(event) => onUpdateCustomer("phone", event.target.value)}
            placeholder="Customer phone"
            className="w-full rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
          />
          {errors.phone ? (
            <p className="text-xs text-rose-300 mt-1">{errors.phone}</p>
          ) : null}
          <input
            type="email"
            value={customer.email}
            onChange={(event) => onUpdateCustomer("email", event.target.value)}
            placeholder="Customer email (optional)"
            className="w-full rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
          />

          <input
            type="text"
            value={customer.addressLine1}
            onChange={(event) =>
              onUpdateCustomer("addressLine1", event.target.value)
            }
            placeholder="Flat / House no (e.g. 12A)"
            className="w-full rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
          />

          <input
            type="text"
            value={customer.addressLine2}
            onChange={(event) =>
              onUpdateCustomer("addressLine2", event.target.value)
            }
            placeholder="Street / Building"
            className="w-full rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={customer.city}
              onChange={(event) => onUpdateCustomer("city", event.target.value)}
              placeholder="City"
              className="rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />
            <input
              type="text"
              value={customer.state}
              onChange={(event) =>
                onUpdateCustomer("state", event.target.value)
              }
              placeholder="State"
              className="rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
            />
          </div>

          <input
            type="text"
            value={customer.pincode}
            onChange={(event) =>
              onUpdateCustomer("pincode", event.target.value)
            }
            placeholder="Pincode"
            className="w-full rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/50"
          />

          <div className="mt-2">
            <p className="text-sm text-slate-300 mb-2">Payment method</p>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={customer.paymentMethod === "cod"}
                  onChange={(e) =>
                    onUpdateCustomer("paymentMethod", e.target.value)
                  }
                />
                <span className="text-sm">Cash on Delivery (COD)</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={customer.paymentMethod === "online"}
                  onChange={(e) =>
                    onUpdateCustomer("paymentMethod", e.target.value)
                  }
                />
                <span className="text-sm">Online Payment</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Place Order Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default DirectOrderModal;
