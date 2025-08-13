// "use client";

// import { useEffect, useState } from "react";
// import CategoryTable from "@/components/admin/category/CategoryTable";
// // import CategoryModal from '@/components/admin/category/CategoryModal';
// import CategoryFilter from "@/components/admin/category/CategoryFilter";
// import Button from "@/components/ui/Button";
// // import  toast from '@/components/ui/Toast';
// import { BASE_URL } from "@/lib/axios";
// import axios from "axios";
// import CategoryModal from "@/components/admin/category/CategoryModal";
// import { useToastContext } from "@/components/ui/ToastProvider";
// import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
// import Loader from "@/components/ui/Loader";
// import ReportDownloader from "@/components/ui/ReportDownload";
// import UserFilter from "@/components/admin/customers/SearchFilter";
// import SearchFilter from "@/components/admin/customers/SearchFilter";
// import { TableSkeletonBody } from "@/components/ui/TableSkeletonBody";
// import Pagination from "@/components/ui/Pagination";

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);

//   const { addToast } = useToastContext();

//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//     const [pageInfo, setPageInfo] = useState({ page: 1, pages: 1, total: 0 });
//   const [filters, setFilters] = useState({ search: "", role: "" });
//   const [limit, setLimit] = useState(10);
//   // Fetch all categories
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/categories`);
//       console.log("Image URL:", res?.data?.data);
//       setCategories(res.data?.data || []);
//     } catch (err) {
//       addToast("Failed to fetch categories", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     fetchCategories(pageInfo.page, filters, limit);
//   }, [pageInfo.page, filters, limit]);

//   // Handle filters
//   const handleFilter = (newFilters) => {
//     setFilters(newFilters);
//     setPageInfo((prev) => ({ ...prev, page: 1 }));
//   };

//   // Filter categories by search input
//   useEffect(() => {
//     const filtered = categories.filter((cat) =>
//       cat.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFiltered(filtered);
//   }, [search, categories]);

//   const handleCreate = () => {
//     setSelectedCategory(null);
//     setModalOpen(true);
//   };

//   const handleEdit = (category) => {
//     console.log("category=>", category);
//     setSelectedCategory(category);
//     setModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     setCategoryToDelete(id);
//     setDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       console.log("category", categoryToDelete);
//       await axios.delete(
//         `${BASE_URL}/api/admin/categories/${categoryToDelete}`
//       );
//       addToast("Category deleted", "success");
//       fetchCategories();
//     } catch (err) {
//       addToast("Failed to delete category", "error");
//     } finally {
//       setDeleteModalOpen(false);
//       setCategoryToDelete(null);
//     }
//   };

//   const handleSubmit = async (data) => {
//     try {
//       if (selectedCategory) {
//         console.log("data", data);
//         console.log("selectedCategory", selectedCategory);
//         const res = await axios.put(
//           `${BASE_URL}/api/admin/categories/${selectedCategory._id}`,
//           data
//         );
//         addToast("Category updated", "success");
//       } else {
//         const res = await axios.post(`${BASE_URL}/api/admin/categories`, data);
//         console.log("res", res);
//         addToast("Category created", "success");
//       }
//       setModalOpen(false);
//       fetchCategories();
//     } catch (err) {
//       addToast("Failed to save category", "error");
//     }
//   };

//   return (
//       <div className=" space-y-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-xl font-semibold">Categories</h1>
//         <Button onClick={handleCreate}>Add Category</Button>
//       </div>

//       <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
//         {/* <CategoryFilter search={search} setSearch={setSearch} /> */}

//         <SearchFilter onFilter={handleFilter} />
//         <ReportDownloader endpoint="categories" />
//       </div>

//       <CategoryTable
//         categories={filtered}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//       {loading && <TableSkeletonBody totalColumns={6} rows={5} />}
//       <Pagination
//         page={pageInfo.page}
//         pages={pageInfo.pages}
//         total={pageInfo.total}
//         limit={limit}
//         onLimitChange={(newLimit) => {
//           setLimit(newLimit);
//           setPageInfo((prev) => ({ ...prev, page: 1 }));
//         }}
//         onPageChange={(p) => {
//           setPageInfo((prev) => ({ ...prev, page: p }));
//         }}
//       />
//       <ConfirmDeleteModal
//         isOpen={deleteModalOpen}
//         onClose={() => setDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//         itemName={categoryToDelete?.name}
//       />

//       <CategoryModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleSubmit}
//         disabled={loading}
//         category={selectedCategory}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import CategoryTable from "@/components/admin/category/CategoryTable";
import CategoryModal from "@/components/admin/category/CategoryModal";
import SearchFilter from "@/components/admin/customers/SearchFilter";
import Button from "@/components/ui/Button";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import { useToastContext } from "@/components/ui/ToastProvider";
import { BASE_URL } from "@/lib/axios";
import Pagination from "@/components/ui/Pagination";
import ReportDownloader from "@/components/ui/ReportDownload";
import { TableSkeletonBody } from "@/components/ui/TableSkeletonBody";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ search: "" });

  const [pageInfo, setPageInfo] = useState({ page: 1, pages: 1, total: 0 });
  const [limit, setLimit] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { addToast } = useToastContext();

  // Fetch categories with pagination & filters
  const fetchCategories = async (
    page = 1,
    filterState = filters,
    pageLimit = limit
  ) => {
    setLoading(true);
    try {
      const params = { page, limit: pageLimit, ...filterState };
      const { data } = await axios.get(`${BASE_URL}/api/admin/categories`, {
        params,
      });

      const { categories, pagination } = data;

      setCategories(categories);
      setPageInfo({
        page: pagination.currentPage,
        pages: pagination.totalPages,
        total: pagination.totalCount,
      });
    } catch (err) {
      console.error(err);
      addToast("Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(pageInfo.page, filters, limit);
  }, [pageInfo.page, filters, limit]);

  // Search effect
  useEffect(() => {
    const result = (categories || []).filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(result);
  }, [search, categories]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPageInfo((prev) => ({ ...prev, page: 1 }));
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (selectedCategory) {
        await axios.put(
          `${BASE_URL}/api/admin/categories/${selectedCategory._id}`,
          formData
        );
        addToast("Category updated successfully", "success");
      } else {
        await axios.post(`${BASE_URL}/api/admin/categories`, formData);
        addToast("Category created successfully", "success");
      }
      setModalOpen(false);
      setSelectedCategory(null);
      fetchCategories(pageInfo.page, filters, limit);
      setLoading(false);
    } catch (err) {
      addToast("Error saving category", "error");
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setCategoryToDelete();
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) {
      addToast("Invalid category selected", "error");
      return;
    }

    console.log(categoryToDelete);
    try {
      await axios.delete(
        `${BASE_URL}/api/admin/categories/${categoryToDelete}`
      );
      addToast("Category deleted successfully", "success");
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
      fetchCategories(pageInfo.page, filters, limit);
    } catch (err) {
      addToast("Failed to delete category", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setViewMode(false);
            setModalOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <SearchFilter onFilter={handleFilter} />
        <ReportDownloader endpoint="categories" />
      </div>

      <CategoryTable
        currentPage={pageInfo.page}
        pageSize={limit}
        categories={filteredCategories}
        onView={(category) => {
          setSelectedCategory(category);
          setViewMode(true);
          setModalOpen(true);
        }}
        onEdit={(category) => {
          setSelectedCategory(category);
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
        itemName={categoryToDelete?.name}
      />

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setLoading(false);
          setSelectedCategory(null);
          setViewMode(false);
        }}
        onSubmit={handleSubmit}
        category={selectedCategory}
        loading={loading}
        viewMode={viewMode}
      />
    </div>
  );
}
