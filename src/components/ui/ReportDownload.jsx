// "use client";

// import { useState } from "react";
// import { Select, SelectItem } from "@/components/ui/Select";
// import DatePicker from "@/components/ui/DatePicker";
// import { BASE_URL } from "@/lib/axios";
// import axios from "axios";
// import { useToastContext } from "./ToastProvider";

// export default function ReportDownloader() {
//   const [fileType, setFileType] = useState("pdf");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { addToast } = useToastContext();

//   const handleDownload = async () => {
//     console.log("Downloading report...");
//     console.log("fileType:", fileType);
//     console.log("fromDate:", fromDate);
//     console.log("toDate:", toDate);

//     if (!fromDate || !toDate) {
//       addToast("Please select date range!", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/admin/reports/customers?type=${fileType}&from=${fromDate}&to=${toDate}`,
//         {
//           responseType: "blob",
//         }
//       );
//       console.log("Response received:", res);

//       if (res.status !== 200) {
//         addToast("Failed to generate report", "error");
//         return;
//       }

//       // res.data is already a Blob
//       const blob = res.data;
//       const csvText = await blob.text();
//       console.log(csvText);
//       console.log("Blob created:", blob);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `report-${fromDate}-to-${toDate}.${fileType}`;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       addToast("File Downloaded Successfully", "success");
//     } catch (err) {
//       console.error(err);
//       addToast("Error generating report", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" w-full md:grid-cols-4 gap-y-4 grid-cols-2 grid lg:grid-cols-4 gap-2 justify-between items-center ">
//       {/* File Type */}
//       <div className="">
//         <Select
//           name="fileType"
//           value={fileType}
//           onChange={(value) => setFileType(value)}
//         >
//           <SelectItem value="pdf">PDF</SelectItem>
//           <SelectItem value="csv">CSV</SelectItem>
//         </Select>
//       </div>

//       {/* Date Pickers */}
//       <DatePicker value={fromDate} onChange={setFromDate} placeholder={"From Date"} />
//       <DatePicker value={toDate} onChange={setToDate} placeholder={"To Date"}/>

//       {/* Download Button */}
//       <div className="flex items-center  w-full ">
//         <button
//           onClick={handleDownload}
//           disabled={loading}
//           className="flex-1 px-4   py-2 text-base bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//         >
//           {loading ? "Generating..." : "Download"}
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Select, SelectItem } from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import axios from "axios";
import { useToastContext } from "./ToastProvider";
import { BASE_URL } from "@/lib/axios";

export default function ReportDownloader({ endpoint }) {
  const [fileType, setFileType] = useState("pdf");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastContext();

  const handleDownload = async () => {
    if (!fromDate || !toDate) {
      addToast("Please select date range!", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/reports/${endpoint}?type=${fileType}&from=${fromDate}&to=${toDate}`,
        { responseType: "blob" }
      );

      if (res.status !== 200) {
        addToast("Failed to generate report", "error");
        return;
      }

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `report-${fromDate}-to-${toDate}.${fileType}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      addToast("File Downloaded Successfully", "success");
    } catch (err) {
      console.error(err);
      addToast("Error generating report", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 gap-y-4 justify-between items-center">
      {/* File Type */}
      <div>
        <Select name="fileType" value={fileType} onChange={setFileType}>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="csv">CSV</SelectItem>
        </Select>
      </div>

      {/* Date Pickers */}
      <DatePicker value={fromDate} onChange={setFromDate} placeholder="From Date" />
      <DatePicker value={toDate} onChange={setToDate} placeholder="To Date" />

      {/* Download Button */}
      <div className="flex items-center w-full">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="flex-1 px-4 py-2 text-base bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {loading ? "Generating..." : "Download"}
        </button>
      </div>
    </div>
  );
}
