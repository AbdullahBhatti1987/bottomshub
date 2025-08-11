"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReviewsTable from "@/components/admin/reviews/ReviewsTable";
import ReviewModal from "@/components/admin/reviews/ReviewModal";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { useToastContext } from "@/components/ui/ToastProvider";
import { BASE_URL } from "@/lib/axios";
import ReviewFilter from "@/components/admin/reviews/ReviewFilter";
import Pagination from "@/components/ui/Pagination";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    rating: "",
    productId: "",
    userId: "",
    dateFrom: "",
    dateTo: "",
  });

  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const { addToast } = useToastContext();

  const fetchReviews = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params[k] = v;
      });

      const { data } = await axios.get(`${BASE_URL}/api/admin/reviews`, {
        params,
      });
      if (data.success) {
        const {
          reviews: items = [],
          total = 0,
          page: p = 1,
          pages = 1,
        } = data.data || {};
        setReviews(items);
        setPageInfo({ page: p, pages, total });
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const openView = (review) => {
    setSelected(review);
    setModalOpen(true);
  };

  const handleUpdate = async (id, payload) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/admin/reviews/${id}`,
        payload
      );
      if (data.success) {
        addToast("Review updated", "success");
        setModalOpen(false);
        fetchReviews(pageInfo.page);
      } else addToast(data.error || "Failed to update", "error");
    } catch (err) {
      console.error(err);
      addToast("Failed to update review", "error");
    }
  };

  const confirmDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/admin/reviews/${toDelete._id}`
      );
      if (data.success) {
        addToast("Review deleted", "success");
        setDeleteOpen(false);
        setToDelete(null);
        fetchReviews(pageInfo.page);
      } else addToast(data.error || "Failed to delete", "error");
    } catch (err) {
      console.error(err);
      addToast("Failed to delete review", "error");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Reviews</h2>
      </div>

      <ReviewFilter onFilter={setFilters} />

      {loading ? (
        <Loader />
      ) : (
        <ReviewsTable
          reviews={reviews}
          onView={openView}
          onDelete={(rev) => {
            setToDelete(rev);
            setDeleteOpen(true);
          }}
        />
      )}

      <Pagination
        page={pageInfo.page}
        pages={pageInfo.pages}
        total={pageInfo.total}
        onPageChange={fetchReviews}
      />

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        review={selected}
        onSave={handleUpdate}
      />

      <ConfirmDeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={toDelete?.comment?.slice(0, 40) || toDelete?.product?.name}
      />
    </div>
  );
}
