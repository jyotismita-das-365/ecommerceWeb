function ToastMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-amber-300/30 bg-slate-950 px-5 py-3 text-center text-sm text-white shadow-glow sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
      {message}
    </div>
  );
}

export default ToastMessage;
