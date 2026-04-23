import React from "react";

export default function OrderConfirmModal({
  open,
  onClose,
  mode, // 'cart' | 'direct'
  product,
  cart,
  subtotal,
  customer,
  onConfirm,
  formatPrice,
}) {
  if (!open) return null;

  const address = [
    customer?.addressLine1,
    customer?.addressLine2,
    customer?.city,
    customer?.state,
    customer?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  const paymentLabel =
    customer?.paymentMethod === "cod"
      ? "Cash on Delivery (COD)"
      : customer?.paymentMethod === "online"
        ? "Online Payment"
        : customer?.paymentMethod || null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/80 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-slate-900 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-2xl text-white">Confirm Order</h3>
        <p className="text-sm text-slate-400 mt-1">
          Review your order before placing it
        </p>

        <div className="mt-4 space-y-3">
          <div className="text-sm text-slate-300">Items</div>

          {mode === "direct" ? (
            <div className="rounded-xl border border-white/5 bg-slate-800 p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-200">{product?.name}</div>
                <div className="text-sm font-semibold text-white">
                  {formatPrice(product?.price || 0)}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {cart?.length ? (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-md p-2"
                  >
                    <div className="text-sm text-slate-200">
                      {item.name} x{item.quantity}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-400">No items</div>
              )}
            </div>
          )}

          <div className="mt-3 border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-300">Subtotal</div>
              <div className="font-semibold text-white">
                {formatPrice(subtotal)}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-slate-300">Delivery</div>
            <div className="mt-2 text-sm text-slate-200">{customer?.name}</div>
            <div className="text-sm text-slate-200">{customer?.phone}</div>
            {customer?.email ? (
              <div className="text-sm text-slate-200">{customer.email}</div>
            ) : null}
            {address ? (
              <div className="text-sm text-slate-200 mt-2">{address}</div>
            ) : null}
            {paymentLabel ? (
              <div className="text-sm text-slate-200 mt-2">
                Payment: {paymentLabel}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm && onConfirm()}
            className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-200"
          >
            Confirm & Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
