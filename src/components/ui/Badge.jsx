export default function Badge({ label, variant = "default" }) {
  const baseStyle = "px-2 py-0.5 rounded text-xs font-medium";

  const variants = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    dark: "bg-black text-white",
  };

  const style = variants[variant] || variants.default;

  return <span className={`${baseStyle} ${style}`}>{label}</span>;
}
