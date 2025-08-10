"use client";
import { useState } from "react";

export default function Login() {
  const [mobile, setMobile] = useState("");

  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ mobile }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.data.token);
      alert("Logged in!");
    } else {
      alert(data.message);
    }
  }

  return (
    <div>
      <input placeholder="Mobile" onChange={e => setMobile(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
