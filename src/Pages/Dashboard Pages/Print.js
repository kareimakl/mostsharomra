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
          "https://crm-fatora.onrender.com/api/generate-qr",
          {
            url: `http://localhost:3001/admin/print/${invoiceId}`,
          }
        );

        setQrImageTag(qrRes.data.qrImageTag); // base64 QR image string

        // Step 2: Fetch invoice data
        const invoiceRes = await axios.get(
          `https://crm-fatora.onrender.com/api/invoices/${invoiceId}`
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
