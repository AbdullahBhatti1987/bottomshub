export default function Loader({
  label = "Loading...",
  size = "md",
  center = true,
  overlay = true,
}) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const spinnerSize = sizes[size] || sizes.md;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-2">
      <span
        className={`animate-spin rounded-full border-t-transparent border-solid ${spinnerSize} border-black`}
      />
      {/* {label && <span className="text-sm text-gray-700">{label}</span>} */}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-[1000] bg-transparent  flex items-center justify-center pointer-events-auto">
        {spinner}
      </div>
    );
  }

  // fallback to inline loader
  return (
    <div className={center ? "flex justify-center items-center py-4" : "inline-flex items-center gap-2"}>
      {spinner}
    </div>
  );
}
