"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, User2 } from "lucide-react";
import { useToastContext } from "../ui/ToastProvider";
import colors from "@/theme/colors";

export default function OtpLoginModal({ user, setUser, isOpen, setIsOpen }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("send"); // send | verify | loggedin
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { addToast } = useToastContext();
  const [userExists, setUserExists] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    if (user) setMenuOpen(true); // direct open if logged in
  }, [user]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const sendOtp = async () => {
    if (!email) return addToast("Please enter email", "error");
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/auth/email/send-otp`, {
        email,
      });
      setUserExists(res.data.userExists); // set this
      setStep("verify");
      addToast("OTP sent successfully", "success");
    } catch (err) {
      addToast("Error sending OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return addToast("Enter OTP", "error");

    // Only validate name/mobile if user does NOT exist
    if (!userExists) {
      if (!name) return addToast("Enter your name", "error");
      if (!mobile) return addToast("Enter your mobile number", "error");
    }
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/auth/email/verify-otp`, {
        email,
        name: userExists ? undefined : name,
        mobile: userExists ? undefined : mobile,
        otp,
      });
      const { user } = res.data;
      localStorage.setItem("bottomsHub_user", JSON.stringify(user));
      setUser(user);
      setStep("loggedin");
      setIsOpen(false);
      addToast("Login successful", "success");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };


  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* User Icon + Dropdown */}

      {/* OTP Modal */}
      <AnimatePresence>
        {isOpen && !user && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 h-screen w-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-center">
                {step === "send" && "Login with Email OTP"}
                {step === "verify" && "Enter OTP & Info"}
              </h2>

              {step === "send" && (
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={sendOtp}
                    className={`w-full py-2 rounded text-white ${
                      loading ? "cursor-not-allowed" : ""
                    }`}
                    style={{
                      backgroundColor: loading
                        ? colors.primaryHover
                        : colors.primary,
                    }}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              )}

              {step === "verify" && (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  {!userExists && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Enter your Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </>
                  )}
                  <button
                    onClick={verifyOtp}
                    className={`w-full py-2 rounded text-white ${
                      loading ? "cursor-not-allowed" : ""
                    }`}
                    style={{
                      backgroundColor: loading
                        ? colors.primaryHover
                        : colors.primary,
                    }}
                    disabled={loading}
                  >
                    {loading ? "Login..." : "Login"}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
