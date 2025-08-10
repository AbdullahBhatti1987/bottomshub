"use client";
import { useState } from "react";

export default function Signup() {
  const [step, setStep] = useState("send");
  const [form, setForm] = useState({ name: "", mobile: "", email: "", otp: "" });

  async function sendOtp() {
    await fetch("/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ mobile: form.mobile }),
    });
    setStep("verify");
  }

  async function verifyOtp() {
    await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Signup complete!");
  }

  return (
    <div>
      {step === "send" ? (
        <>
          <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Mobile" onChange={e => setForm({ ...form, mobile: e.target.value })} />
          <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input placeholder="OTP" onChange={e => setForm({ ...form, otp: e.target.value })} />
          <button onClick={verifyOtp}>Verify & Signup</button>
        </>
      )}
    </div>
  );
}
