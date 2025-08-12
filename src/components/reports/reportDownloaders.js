

"use client";

import { useState } from "react";
// import { downloadCSV, downloadPDF } from "./reportDownloaders"; // assume ye file me rakha hai
import Button from "@/components/ui/Button";
import { downloadPDF } from "../reports/downloadPDF";
import { downloadCSV } from "../reports/downloadCSV";

export default function ReportDownloader() {
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState("csv"); // or "pdf"
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // API call to get report data (JSON)
  async function fetchReportData() {
    if (!fromDate || !toDate) {
      alert("Select from and to dates");
      return null;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/reports/customers?type=json&from=${fromDate}&to=${toDate}`
      );
      if (!res.ok) throw new Error("Failed to fetch report data");
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      alert(err.message);
      return null;
    }
  }

  // Handler for download button
  async function handleDownload() {
    const data = await fetchReportData();
    if (!data) return;

    if (fileType === "csv") {
      downloadCSV(data, `customer-report-${fromDate}-to-${toDate}.csv`);
    } else if (fileType === "pdf") {
      downloadPDF(data, `customer-report-${fromDate}-to-${toDate}.pdf`);
    }
  }

  return (
    <div>
      {/* Inputs for date range and file type */}
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
      <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
        <option value="csv">CSV</option>
        <option value="pdf">PDF</option>
      </select>

      <Button onClick={handleDownload} disabled={loading}>
        {loading ? "Generating..." : "Download Report"}
      </Button>
    </div>
  );
}
