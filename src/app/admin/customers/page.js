"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import UserTable from "@/components/admin/customers/UserTable";
import UserModal from "@/components/admin/customers/UserModal";
import SearchFilter from "@/components/admin/customers/SearchFilter";
import Button from "@/components/ui/Button";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import { useToastContext } from "@/components/ui/ToastProvider";
import { BASE_URL } from "@/lib/axios";
import OTPModal from "@/components/auth/OTPModal";
import Pagination from "@/components/ui/Pagination";
import ReportDownloader from "@/components/ui/ReportDownload";
import { TableSkeletonBody } from "@/components/ui/TableSkeletonBody";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

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

  // Search effect
  useEffect(() => {
    const result = users.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  const fetchUsers = async (
    page = 1,
    filterState = filters,
    pageLimit = limit
  ) => {
    setLoading(true);
    try {
      const params = { page, limit: pageLimit, ...filterState };
      const { data } = await axios.get(`${BASE_URL}/api/admin/customers`, {
        params,
      });

      console.log("Fetched users:", data);
      const { users, pagination } = data;

      setUsers(users);
      setPageInfo({
        page: pagination.currentPage,
        pages: pagination.totalPages,
        total: pagination.totalCount,
      });
    } catch (err) {
      console.error(err);
      addToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pageInfo.page, filters, limit);
  }, [pageInfo.page, filters, limit]);

  // Handle filters
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPageInfo((prev) => ({ ...prev, page: 1 }));
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

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
      setLoading(false);
    } catch (err) {
      addToast("Error saving user", "error");
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setLoading(true);

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
      setLoading(false);
    } catch (err) {
      addToast("OTP verification failed", "error");
      setLoading(false);
    }
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    console.log("Deleting user:", userToDelete);
    // addToast("userToDelete", userToDelete);
    if (!userToDelete) {
      addToast("Invalid user selected", "error");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/api/admin/customers/${userToDelete}`);
      addToast("User deleted successfully", "success");
      setDeleteModalOpen(false);
      setUserToDelete(null);
      fetchUsers(pageInfo.page, filters);
    } catch (err) {
      addToast("Failed to delete user", "error");
    }
  };

  return (
    <div className=" space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setViewMode(false);
            setModalOpen(true);
          }}
        >
          Add User
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <SearchFilter onFilter={handleFilter} />
        <ReportDownloader endpoint="customers" />
      </div>

      <UserTable
        currentPage={pageInfo.page}
        pageSize={limit}
        users={filteredUsers}
        loading={loading}
        onView={(user) => {
          setSelectedUser(user);
          setViewMode(true);
          setModalOpen(true);
        }}
        onEdit={(user) => {
          setSelectedUser(user);
          setViewMode(false);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      {loading && <TableSkeletonBody totalColumns={6} rows={5} />}
      
      <Pagination
        page={pageInfo.page}
        pages={pageInfo.pages}
        total={pageInfo.total}
        limit={limit}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPageInfo((prev) => ({ ...prev, page: 1 }));
        }}
        onPageChange={(p) => {
          setPageInfo((prev) => ({ ...prev, page: p }));
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
          setViewMode(false);
          setSelectedUser(null);
        }}
        onSubmit={handleSubmit}
        user={selectedUser}
        loading={loading}
        viewMode={viewMode}
      />
    </div>
  );
}
