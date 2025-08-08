"use client";

import { useState } from "react";

export default function SettingsDrawerContent({ onClose }) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // Placeholder save logic
    alert("Settings saved!");
    onClose(); // Close drawer
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-gray-800">Preferences</h3>

      {/* Email Notifications Toggle */}
      <div className="flex items-center justify-between border rounded px-4 py-3">
        <span className="text-sm text-gray-700">Email Notifications</span>
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
          className="w-5 h-5"
        />
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between border rounded px-4 py-3">
        <span className="text-sm text-gray-700">Enable Dark Mode</span>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-5 h-5"
        />
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
        >
          Save Settings
        </button>
      </div>

      {/* Cancel */}
      <button
        onClick={onClose}
        className="mt-2 w-full text-center text-sm text-gray-500 hover:underline"
      >
        Cancel
      </button>
    </div>
  );
}
