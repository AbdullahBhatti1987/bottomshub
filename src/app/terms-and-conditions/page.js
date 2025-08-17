"use client";

import { motion } from "framer-motion";
import colors from "@/theme/colors";

export default function TermsPage() {
  return (
    <div
      className="min-h-screen px-6 py-16"
      style={{ backgroundColor: colors.light }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-6"
          style={{ color: colors.primary }}
        >
          Terms & Conditions
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 leading-relaxed"
          style={{ color: colors.text }}
        >
          Welcome to <span className="font-semibold">BottomsHub</span>. By using
          our website, you agree to the following terms and conditions. Please
          read them carefully before making any purchase.
        </motion.p>

        {/* Section: General Use */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: colors.primary }}
          >
            General Use
          </h2>
          <p style={{ color: colors.text }}>
            You must be at least 18 years old to use our services. You agree not
            to misuse the website or violate any applicable laws.
          </p>
        </motion.div>

        {/* Section: Orders & Payments */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6"
        >
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: colors.primary }}
          >
            Orders & Payments
          </h2>
          <p style={{ color: colors.text }}>
            All orders are subject to product availability. Prices are subject
            to change without prior notice. Payment must be completed before
            shipment.
          </p>
        </motion.div>

        {/* Section: Returns & Refunds */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-6"
        >
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: colors.primary }}
          >
            Returns & Refunds
          </h2>
          <p style={{ color: colors.text }}>
            Items can be returned within 7 days of delivery if they meet our
            return policy guidelines. Refunds will be processed through the
            original payment method.
          </p>
        </motion.div>

        {/* Section: Limitation of Liability */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-6"
        >
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: colors.primary }}
          >
            Limitation of Liability
          </h2>
          <p style={{ color: colors.text }}>
            BottomsHub will not be liable for any indirect, incidental, or
            consequential damages resulting from the use of our services.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 text-sm italic"
          style={{ color: colors.muted }}
        >
          Last updated: {new Date().getFullYear()}
        </motion.p>
      </div>
    </div>
  );
}
