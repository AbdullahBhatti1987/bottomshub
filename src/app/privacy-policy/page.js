"use client";

import { motion } from "framer-motion";
import colors from "@/theme/colors";

export default function PrivacyPolicyPage() {
  return (
    <div
      className="min-h-screen px-6 py-16"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
          style={{ color: colors.primary }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
          style={{ color: colors.text }}
        >
          At <span className="font-semibold">BottomsHub</span>, we value your
          privacy and are committed to protecting your personal information. This
          Privacy Policy outlines how we collect, use, and safeguard your data.
        </motion.p>

        {/* Information We Collect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2
            className="text-2xl font-semibold mt-8 mb-3"
            style={{ color: colors.primary }}
          >
            Information We Collect
          </h2>
          <p style={{ color: colors.text }} className="mb-4">
            We may collect personal information such as your name, email, phone
            number, shipping details, and payment information when you place an
            order or register on our website.
          </p>
        </motion.div>

        {/* How We Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2
            className="text-2xl font-semibold mt-8 mb-3"
            style={{ color: colors.primary }}
          >
            How We Use Your Information
          </h2>
          <ul
            className="list-disc pl-6 space-y-2"
            style={{ color: colors.text }}
          >
            <li>To process and deliver your orders</li>
            <li>To send updates, promotions, or offers</li>
            <li>To improve our website experience</li>
            <li>To ensure secure transactions</li>
          </ul>
        </motion.div>

        {/* Data Protection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2
            className="text-2xl font-semibold mt-8 mb-3"
            style={{ color: colors.primary }}
          >
            Data Protection
          </h2>
          <p style={{ color: colors.text }} className="mb-4">
            We implement industry-standard measures to protect your data from
            unauthorized access, disclosure, alteration, or destruction.
          </p>
        </motion.div>

        <p
          className="mt-8 text-sm"
          style={{ color: colors.mutedText }}
        >
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
