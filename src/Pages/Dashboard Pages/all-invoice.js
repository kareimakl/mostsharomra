import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://crm-fatora.onrender.com/api/invoices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInvoices(response.data);
        setFilteredInvoices(response.data);
        setLoading(false);
      } catch (err) {
        setError("فشل في جلب الفواتير.");
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = invoices.filter((invoice) =>
      invoice.customerName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredInvoices(filtered);
  };

  if (loading) return <p>جاري تحميل الفواتير...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container" dir="rtl">
      <h2 className="mb-4 text-center">قائمة الفواتير</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ابحث باسم العميل"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>رقم الفاتورة</th>
            <th>اسم العميل</th>
            <th>رقم الجوال</th>
            <th>المجموع</th>
            <th>الدفع</th>
            <th>طباعة</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customerName}</td>
              <td>{invoice.phone}</td>
              <td>{invoice.totalAfterTax} ر.س</td>
              <td>{invoice?.paymentMethod}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/admin/print/${invoice._id}`)}
                >
                  طباعة
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesList;
