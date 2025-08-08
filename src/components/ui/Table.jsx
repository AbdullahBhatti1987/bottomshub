// components/ui/table.jsx

export function Table({ children }) {
  return (
    <table className="min-w-full text-sm text-left divide-y divide-gray-200">
      {children}
    </table>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="bg-gray-100 text-gray-700 font-semibold">{children}</thead>
  );
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-100">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

export function TableHead({ children }) {
  return (
    <th className="px-4 py-2 text-sm font-medium tracking-wide text-gray-600 whitespace-nowrap">
      {children}
    </th>
  );
}

export function TableCell({ children, className = "" }) {
  return (
    <td className={`px-4 py-2 text-gray-800 whitespace-nowrap ${className}`}>
      {children}
    </td>
  );
}
