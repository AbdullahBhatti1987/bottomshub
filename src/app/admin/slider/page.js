"use client";

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";


export default function SliderUploadPage() {
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    buttonName: "",
    buttonRoute: "",
    // mainImage: null,
    backgroundImage: null,
    // overlayImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]); // base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/slider`, formData);
      setMessage("Slider uploaded successfully!");
      setFormData({
        heading: "",
        content: "",
        buttonName: "",
        buttonRoute: "",
        // mainImage: null,
        backgroundImage: null,
        // overlayImage: null,
      });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload New Slider</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="heading"
          placeholder="Heading"
          value={formData.heading}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="buttonName"
          placeholder="Button Name"
          value={formData.buttonName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="buttonRoute"
          placeholder="Button Route (e.g., /products/trousers)"
          value={formData.buttonRoute}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        {/* <div>
          <label className="block mb-1 font-medium">Main Image</label>
          <input
            type="file"
            name="mainImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div> */}

        <div>
          <label className="block mb-1 font-medium">Background Image</label>
          <input
            type="file"
            name="backgroundImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* <div>
          <label className="block mb-1 font-medium">Overlay Image (PNG)</label>
          <input
            type="file"
            name="overlayImage"
            accept="image/png"
            onChange={handleFileChange}
          />
        </div> */}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload Slider"}
        </button>
      </form>
    </div>
  );
}
