"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import colors from "@/theme/colors";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section
        className="relative text-white py-20"
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-200"
          >
            Have questions or need help? We’re just a message away.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Left - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Reach out to us anytime — whether it’s about your order, feedback, or
            just to say hi. Our team is always here for you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-gray-700" />
              <span className="text-gray-700">support@bottomshub.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-gray-700" />
              <span className="text-gray-700">+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-gray-700" />
              <span className="text-gray-700">
                Lahore, Punjab, Pakistan
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Send us a Message
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
