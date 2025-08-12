// Example for backend response handling:

const { BASE_URL } = require("@/lib/axios");
const { default: axios } = require("axios");

async function downloadReport(format, from, to) {
  const res = await axios.get(`${BASE_URL}/api/report?format=${format}&from=${from}&to=${to}`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `report.${format}`;
  link.click();
}
