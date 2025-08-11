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
import OTPModal from "@/components/auth/OTPModal";
import Pagination from "@/components/ui/Pagination";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageInfo, setPageInfo] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({ search: "", role: "" });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [pendingUserData, setPendingUserData] = useState(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [mobileForOtp, setMobileForOtp] = useState("");

  const { addToast } = useToastContext();

  // API call
  const [limit, setLimit] = useState(10);

  const fetchUsers = async (
    page = 1,
    filterState = filters,
    pageLimit = limit
  ) => {
    setLoading(true);
    try {
      const params = { page, limit, ...filterState };
      const { data } = await axios.get(`${BASE_URL}/api/admin/customers`, {
        params,
      });
      setUsers(data.users);
      setPageInfo({ page: data.page, pages: data.pages, total: data.total });

      if (Array.isArray(data) && data.length > 0) {
        const startIndex = (page - 1) * pageLimit;
        const endIndex = startIndex + pageLimit;
        setUsers(data.slice(startIndex, endIndex));
        setPageInfo({
          page,
          pages: Math.ceil(data.length / pageLimit),
          total: data.length,
        });
      } else {
        setUsers([]);
        setPageInfo({ page: 1, pages: 1, total: 0 });
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pageInfo.page, filters, limit);
  }, [pageInfo.page, filters]);

  // Handle filters
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPageInfo((prev) => ({ ...prev, page: 1 })); // reset to first page
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
        await axios.post(`${BASE_URL}/api/auth/send-otp`, {
          mobile: formData.mobile,
        });
        addToast("OTP Send Successfully", "success");
        setPendingUserData(formData);
        setMobileForOtp(formData.mobile);
        setOtpModalOpen(true);
      }
      setModalOpen(false);
      setSelectedUser(null);
      fetchUsers(pageInfo.page, filters);
    } catch (err) {
      addToast("Error saving user", "error");
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        mobile: mobileForOtp,
        otp,
        name: pendingUserData?.name,
        email: pendingUserData?.email,
      });

      addToast("OTP verified successfully", "success");
      setOtpModalOpen(false);
      setPendingUserData(null);
      fetchUsers(pageInfo.page, filters);
    } catch (err) {
      addToast("OTP verification failed", "error");
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
      fetchUsers(pageInfo.page, filters);
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
          currentPage={pageInfo.page}
          pageSize={limit}
          users={users}
          onEdit={(user) => {
            setSelectedUser(user);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination always visible */}
      <Pagination
        page={pageInfo.page}
        pages={pageInfo.pages}
        total={pageInfo.total}
        currentPage={pageInfo.page}
        pageSize={limit}
        limit={limit}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          fetchUsers(1, filters, newLimit);
          setPageInfo((prev) => ({ ...prev, page: 1 }));
        }}
        onPageChange={(p) => {
          setPageInfo((prev) => ({ ...prev, page: p }));
          fetchUsers(p, filters, limit);
        }}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={userToDelete?.name}
      />

      <OTPModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={handleVerifyOtp}
        mobile={mobileForOtp}
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
