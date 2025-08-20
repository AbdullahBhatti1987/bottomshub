"use client";

import { useState } from "react";
import colors from "@/theme/colors";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: integrate with newsletter API
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-gray-50 py-12 flex justify-center">
      <div className="w-full max-w-xl px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
          Join Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe now & get <span className="font-semibold">10% off</span> your first order!
        </p>

        {submitted ? (
          <p className="text-green-600 font-semibold">Thank you for subscribing!</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col  sm:flex-row items-center gap-3 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="  px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: colors.primary }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
