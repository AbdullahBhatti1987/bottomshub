// "use client";

// import { useState, useEffect } from "react";
// // import Modal from "./Modal"; // your modal component path
// import Button from "../ui/Button";
// import Modal from "../ui/Modal";
// // import Button from "./Button";

// export default function OTPModal({ isOpen, onClose, onVerify, mobile }) {
//   const [otp, setOtp] = useState(new Array(6).fill(""));

//   useEffect(() => {
//     if (!isOpen) setOtp(new Array(6).fill(""));
//   }, [isOpen]);

//   const handleChange = (e, index) => {
//     const val = e.target.value;
//     if (!/^\d*$/.test(val)) return; // Only digits allowed

//     const newOtp = [...otp];
//     newOtp[index] = val.slice(-1); // last digit only

//     setOtp(newOtp);

//     if (val && index < 5) {
//       const nextInput = document.getElementById(`otp-input-${index + 1}`);
//       nextInput?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-input-${index - 1}`);
//       prevInput?.focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (otp.some((digit) => digit === "")) {
//       alert("Please enter complete 6-digit OTP");
//       return;
//     }
//     onVerify(otp.join(""));
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title={`Enter OTP for ${mobile}`} showFooter={false}>
//       <form onSubmit={handleSubmit} className="flex justify-between space-x-2">
//         {otp.map((digit, idx) => (
//           <input
//             key={idx}
//             id={`otp-input-${idx}`}
//             type="text"
//             inputMode="numeric"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleChange(e, idx)}
//             onKeyDown={(e) => handleKeyDown(e, idx)}
//             className="w-12 h-14 text-center border border-gray-300 rounded-md text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             autoFocus={idx === 0}
//           />
//         ))}
//         <Button type="submit" className="ml-4 self-center px-5 py-2">
//           Verify
//         </Button>
//       </form>
//       <Button variant="ghost" onClick={onClose} className="mt-6 w-full">
//         Cancel
//       </Button>
//     </Modal>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

export default function OTPModal({ isOpen, onClose, onVerify, mobile }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  useEffect(() => {
    if (!isOpen) setOtp(new Array(6).fill(""));
  }, [isOpen]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // Only digits allowed

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1); // last digit only

    setOtp(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      alert("Please enter complete 6-digit OTP");
      return;
    }
    onVerify(otp.join(""));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Enter OTP for ${mobile}`}
      showFooter={false}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="flex justify-center space-x-3">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-14 text-center border border-gray-300 rounded-md text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus={idx === 0}
              style={{ marginRight: idx !== otp.length - 1 ? "6px" : "0" }}
            />
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit" className="px-6 py-2">
            Verify
          </Button>
          <Button variant="ghost" onClick={onClose} className="px-6 py-2">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

