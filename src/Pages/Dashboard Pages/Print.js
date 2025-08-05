import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ArabicInvoice from "./ArabicInvoice";

const PrintPage = () => {
  const { invoiceId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [qrImageTag, setQrImageTag] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDataAndQR = async () => {
      try {
        // Step 1: Generate QR code
        const qrRes = await axios.post(
          "https://crm-fatora.onrender.com/api/invoices/generate-qr",
          {
            url: `https://mostsharomra.vercel.app/admin/print/${invoiceId}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setQrImageTag(qrRes.data.qrImageTag); // base64 QR image string

        // Step 2: Fetch invoice data
        const invoiceRes = await axios.get(
          `https://crm-fatora.onrender.com/api/invoices/${invoiceId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setInvoiceData(invoiceRes.data);
      } catch (err) {
        setError("فشل في تحميل الفاتورة أو رمز الاستجابة السريعة.");
      }
    };

    fetchDataAndQR();
  }, [invoiceId]);

  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!invoiceData)
    return <p className="text-center">جاري تحميل الفاتورة...</p>;

  return <ArabicInvoice invoiceData={invoiceData} qrImageTag={qrImageTag} />;
};

export default PrintPage;
