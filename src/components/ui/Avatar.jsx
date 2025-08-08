export default function Avatar({ src, alt = "User", name = "", size = "md" }) {
  const getInitials = (name) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    return words.length === 1
      ? words[0][0]
      : words[0][0] + words[1][0];
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-lg",
  };

  return src ? (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${sizeClasses[size]}`}
    />
  ) : (
    <div
      className={`rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium uppercase ${sizeClasses[size]}`}
    >
      {getInitials(name)}
    </div>
  );
}
