export default function Loader({ label = "Loading...", size = "md", center = false }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-4",
  };

  const spinnerSize = sizes[size] || sizes.md;

  return (
    <div className={center ? "flex justify-center items-center py-4" : "inline-flex items-center gap-2"}>
      <span
        className={`animate-spin rounded-full border-t-transparent border-solid ${spinnerSize} border-blue-600`}
      />
      {/* {label && <span className="ml-2 text-sm text-gray-700">{label}</span>} */}
    </div>
  );
}
