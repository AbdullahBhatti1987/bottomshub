export default function Toast({ type = "info", message }) {
  const base = "px-4 py-2 rounded text-white shadow-md text-sm";
  let bg = "";

  if (type === "success") bg = "bg-green-600";
  else if (type === "error") bg = "bg-red-600";
  else bg = "bg-blue-600";

  return <div className={`${base} ${bg}`}>{message}</div>;
}
