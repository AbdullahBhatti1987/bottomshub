export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="table-auto w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Name</th>
          <th className="p-2">Mobile</th>
          <th className="p-2">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Verified</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id} className="border-t">
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.mobile}</td>
            <td className="p-2">{u.email}</td>
            <td className="p-2">{u.role}</td>
            <td className="p-2">{u.isVerified ? "✅" : "❌"}</td>
            <td className="p-2 flex gap-2">
              <button className="text-blue-500" onClick={() => onEdit(u)}>
                Edit
              </button>
              <button className="text-red-500" onClick={() => onDelete(u)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
