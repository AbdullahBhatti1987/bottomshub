"use client";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";

export default function AddReviewForm() {
  const [form, setForm] = useState({
    product: "",
    user: "",
    review: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.product || !form.user || !form.review) {
      addToast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/reviews`, form);
      addToast({ title: "Success", description: "Review added successfully!" });
      setForm({ product: "", user: "", review: "", rating: 5 });
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Failed to add review", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Add Customer Review</h2>

      <input
        type="text"
        placeholder="Product ID"
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
        value={form.product}
        onChange={(e) => setForm({ ...form, product: e.target.value })}
      />
      <input
        type="text"
        placeholder="User ID"
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
        value={form.user}
        onChange={(e) => setForm({ ...form, user: e.target.value })}
      />
      <textarea
        placeholder="Write your review..."
        className="w-full border rounded-lg p-3 h-24 focus:ring-2 focus:ring-black outline-none resize-none"
        value={form.review}
        onChange={(e) => setForm({ ...form, review: e.target.value })}
      />
      <input
        type="number"
        min="1"
        max="5"
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
