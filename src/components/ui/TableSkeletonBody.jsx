import { Table } from "./Table";

export function TableSkeletonBody({ totalColumns = 6, rows = 5 }) {
  const colsArray = Array.from({ length: totalColumns });
  const rowsArray = Array.from({ length: rows });

  return (
    <Table>
      <tbody>
        {rowsArray.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {colsArray.map((_, colIndex) => (
              <td key={colIndex} className="px-4 py-3">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
