"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ReviewModal({ isOpen, onClose, review, onSave }) {
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (review && isOpen) {
      setForm({
        rating: review.rating ?? 5,
        comment: review.comment ?? "",
      });
    } else if (isOpen) {
      setForm({ rating: 5, comment: "" });
    }
  }, [review, isOpen]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(review._id, form);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Review Details" showFooter={false}>
      <div className="space-y-4">
        <div>
          <strong>Product:</strong> {review?.product?.name}
        </div>
        <div>
          <strong>User:</strong> {review?.user?.name} ({review?.user?.email})
        </div>

        <div>
          <label className="block font-medium mb-1">Rating</label>
          <select
            value={form.rating}
            onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
            className="border rounded px-3 py-2"
          >
            {[5,4,3,2,1].map((r) => (
              <option key={r} value={r}>{r} / 5</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Comment</label>
          <textarea
            value={form.comment}
            onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
