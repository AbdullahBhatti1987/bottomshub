// "use client";

// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "@/lib/axios";
// import axios from "axios";
// import { useToastContext } from "@/components/ui/ToastProvider";

// import Button from "@/components/ui/Button";
// import Loader from "@/components/ui/Loader";
// import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

// import UserTable from "@/components/admin/customers/UserTable";
// import UserModal from "@/components/admin/customers/UserModal";
// import UserFilter from "@/components/admin/customers/UserFilter";

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const { addToast } = useToastContext();

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/customers`);
//       console.log("Fetched users:", res?.data);
//       setUsers(res?.data || []);
//     } catch (err) {
//       addToast("Failed to fetch users", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleSubmit = async (formData) => {
//     try {
//       if (selectedUser) {
//         await axios.put(
//           `${BASE_URL}/api/admin/customers/${selectedUser._id}`,
//           formData
//         );
//         addToast("User updated successfully", "success");
//       } else {
//         await axios.post(`${BASE_URL}/api/admin/customers`, formData);
//         addToast("User created successfully", "success");
//       }
//       setModalOpen(false);
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       addToast("Error saving user", "error");
//     }
//   };

//   const handleDelete = (user) => {
//     setUserToDelete(user);
//     setDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`${BASE_URL}/api/admin/customers/${userToDelete._id}`);
//       addToast("User deleted successfully", "success");
//       setDeleteModalOpen(false);
//       fetchUsers();
//     } catch (err) {
//       addToast("Failed to delete user", "error");
//     }
//   };

//   const handleFilter = async (filters) => {
//     console.log("Filter applied:", filters);
//     try {
//       await axios.get(`${BASE_URL}/api/admin/customers/${userToDelete._id}`);
//       ad
//       fetchUsers();
//     } catch (err) {
//       addToast("Failed to delete user", "error");
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold">Users</h2>
//         <Button
//           onClick={() => {
//             setSelectedUser(null);
//             setModalOpen(true);
//           }}
//         >
//           Add User
//         </Button>
//       </div>
//       <UserFilter onFilter={handleFilter} />

//       {loading ? (
//         <Loader />
//       ) : (
//         <UserTable
//           users={users}
//           onEdit={(user) => {
//             setSelectedUser(user);
//             setModalOpen(true);
//           }}
//           onDelete={handleDelete}
//         />
//       )}

//       <ConfirmDeleteModal
//         isOpen={deleteModalOpen}
//         onClose={() => setDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//         itemName={userToDelete?.name}
//       />

//       <UserModal
//         isOpen={modalOpen}
//         onClose={() => {
//           setModalOpen(false);
//           setSelectedUser(null);
//         }}
//         onSubmit={handleSubmit}
//         user={selectedUser}
//       />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import UserTable from "@/components/admin/customers/UserTable";
import UserModal from "@/components/admin/customers/UserModal";
import UserFilter from "@/components/admin/customers/UserFilter";

import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import { useToastContext } from "@/components/ui/ToastProvider";

import { BASE_URL } from "@/lib/axios";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { addToast } = useToastContext();

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/customers`);
      console.log("Fetched users:", res?.data);
      // Assuming API returns { success: true, message: "...", data: [users] }
      setUsers(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      addToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on filters from UserFilter component
  const handleFilter = ({ search = "", role = "" }) => {
    let filteredUsers = [...users];

    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(lowerSearch) ||
          u.email.toLowerCase().includes(lowerSearch) ||
          u.mobile.toLowerCase().includes(lowerSearch)
      );
    }

    if (role.trim() !== "") {
      filteredUsers = filteredUsers.filter((u) => u.role === role);
    }

    setFiltered(filteredUsers);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await axios.put(
          `${BASE_URL}/api/admin/customers/${selectedUser._id}`,
          formData
        );
        addToast("User updated successfully", "success");
      } else {
        await axios.post(`${BASE_URL}/api/admin/customers`, formData);
        addToast("User created successfully", "success");
      }
      setModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      addToast("Error saving user", "error");
    }
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/customers/${userToDelete._id}`);
      addToast("User deleted successfully", "success");
      setDeleteModalOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (err) {
      addToast("Failed to delete user", "error");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setModalOpen(true);
          }}
        >
          Add User
        </Button>
      </div>

      <UserFilter onFilter={handleFilter} />

      {loading ? (
        <Loader />
      ) : (
        <UserTable
          users={filtered}
          onEdit={(user) => {
            setSelectedUser(user);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={userToDelete?.name}
      />

      <UserModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleSubmit}
        user={selectedUser}
      />
    </div>
  );
}
