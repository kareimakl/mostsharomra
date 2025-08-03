import logo from "../../images/logo.jfif";
import qrApp from "../../images/نزل_التطبيق-1024.jpeg";
import qrApp2 from "../../images/وسائل_التواصل_الاجتماعي_والموقع_ع_الخريطه-1024.jpeg";
import qrTrack from "../../images/زور_موقعنا_الان-1024.jpeg";
import qrGuide from "../../images/دليل_المعتمر-1024.jpeg";

export default function ArabicInvoice({ invoiceData, qrImageTag }) {
  // Format date to display
  const formatDate = (dateString) => {
    if (!dateString) return "....................";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA");
  };

  return (
    <div className="invoice-container" dir="rtl">
      <button onClick={() => window.print()} className="no-print">
        طباعة الفاتورة
      </button>
      <style jsx>{`
        .invoice-container {
          /* max-width: 1200px; */

          margin: 70px auto;
          background: white;
          border: 1px solid #e2e8f0;
          font-family: sans-serif;
          position: relative;
        }

        .no-print {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: #3b82f6;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          z-index: 100;
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .invoice-header img {
          width: 6rem;
          height: 6rem;
          object-fit: contain;
        }

        .invoice-title {
          text-align: center;
        }

        .invoice-title h1 {
          font-size: 1.25rem;
          color: #0673cc;
          margin-bottom: 0.25rem;
        }

        .invoice-title p {
          color: #0673cc;
          font-weight: 600;
        }

        .invoice-layout {
          display: grid;
          grid-template-columns: 1fr 4fr;
          gap: 0;
        }

        .invoice-sidebar {
          padding: 1rem;
          background: #f0f0f2;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
        }

        .sidebar-section h2 {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .sidebar-section h3 {
          color: #718096;
          margin-bottom: 0.5rem;
        }

        .sidebar-section p {
          margin-bottom: 0.5rem;
        }

        .qr-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .qr-grid img {
          width: 4rem;
          height: 4rem;
          margin: 0 auto;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
        }

        .sidebar-info {
          text-align: right;
        }

        .sidebar-info h2 {
          font-weight: bold;
        }

        .sidebar-info h3 {
          color: #718096;
          margin-bottom: 0.25rem;
        }

        .sidebar-info p {
          margin-bottom: 0.25rem;
        }

        .invoice-main {
          padding: 1rem;
          border-left: 1px solid #e2e8f0;
        }

        .customer-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .customer-info-right {
          text-align: left;
        }

        .customer-info-right p:first-child {
          text-align: right;
        }

        .programs-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .program-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .program-checkbox input[type="checkbox"] {
          accent-color: #0673cc;
          border-radius: 50%;
        }

        .programs-english {
          text-align: left;
        }

        .seat-member-section {
          width: 100%;
          margin-bottom: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.5rem;
          background: #f9fafb;
        }

        .seat-member-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.5rem;
          text-align: center;
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .seat-member-grid label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .seat-member-grid input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 0.25rem;
          text-align: center;
        }

        .member-type {
          display: flex;
          justify-content: flex-end;
          gap: 1.5rem;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .member-type label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .member-type input[type="radio"] {
          accent-color: #0673cc;
        }

        .traveler-data {
          margin-bottom: 1rem;
        }

        .traveler-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          font-size: 0.75rem;
          border: 1px solid #e2e8f0;
          border-bottom: none;
          margin-bottom: 0.25rem;
          padding: 0.25rem;
        }

        .traveler-row:last-child {
          border-bottom: 1px solid #e2e8f0;
        }

        .traveler-row input {
          border: 1px solid #e2e8f0;
          padding: 0.25rem;
          font-size: 0.75rem;
        }

        .payment-wrapper {
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.25rem;
          margin-bottom: 1.5rem;
        }

        .payment-content {
          display: flex;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.25rem;
          gap: 1rem;
          font-size: 0.625rem;
        }

        .services-section {
          width: 50%;
        }

        .services-section h3 {
          font-weight: bold;
          text-align: right;
          margin-bottom: 0.25rem;
        }

        .services-table {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-collapse: collapse;
          text-align: center;
        }

        .services-table th {
          border: 1px solid #e2e8f0;
          padding: 0.5rem;
          background: #f0f0f2;
        }

        .services-table td {
          border: 1px solid #e2e8f0;
          padding: 0.25rem;
        }

        .payment-method {
          width: 50%;
          border-right: 1px solid #e2e8f0;
          padding-right: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .payment-method h3 {
          font-weight: bold;
          text-align: right;
          margin-bottom: 0.5rem;
        }

        .payment-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          text-align: right;
        }

        .payment-options label {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0.25rem;
        }

        .other-payment {
          margin-top: 0.75rem;
          text-align: right;
          font-weight: bold;
        }

        .other-payment span {
          display: inline-block;
          border-bottom: 1px dotted #6b7280;
          width: 8rem;
          margin-left: 0.5rem;
          vertical-align: middle;
        }

        .totals-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
          font-size: 0.75rem;
        }

        .totals-section p {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .totals-section input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          padding: 0.25rem;
        }

        .signatures {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
          font-size: 0.75rem;
        }

        .signature-line {
          border-top: 1px solid #9ca3af;
          margin-top: 1rem;
          padding-top: 0.25rem;
          color: #9ca3af;
          font-size: 0.75rem;
          height: 5rem;
        }

        @media print {
          .no-print {
            display: none !important;
          }

          body {
            background: white !important;
          }

          .invoice-container {
            border: none !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="invoice-header">
        <img src={logo} alt="Logo" />
        <div className="invoice-title">
          <h1>فاتوره ضريبيه</h1>
          <p>Invoice tax</p>
        </div>
        {qrImageTag && (
          <div className="text-center mt-3">
            <img src={qrImageTag} alt="QR Code" style={{ maxWidth: "150px" }} />
          </div>
        )}
      </div>

      {/* Main Layout */}
      <div className="invoice-layout">
        {/* Right Sidebar */}
        <div className="invoice-sidebar">
          <div className="sidebar-section">
            <h2>تفاصيل الرحلة</h2>
            <h3>Trip Details</h3>
            <p>
              رحلة ٤ يوم مكة والمدينة يوم الاحد
              <br />
              - التحرك من المكتب ٣ العصر الأحد
              <br />
              - الوصول مكة صباح الإثنين
              <br />
              - التحرك للمدينة مساء الثلاثاء
              <br />- العودة للدمام الخميس فجراً
            </p>
          </div>

          <div className="sidebar-section">
            <h2>بيانات المسافرين</h2>
            <h3>Traveler data</h3>
          </div>

          <div className="qr-grid">
            {[qrApp, qrTrack, qrGuide, qrApp2].map((qr, i) => (
              <img key={i} src={qr} alt="QR" />
            ))}
          </div>

          <div className="sidebar-info">
            <h2>معلومات عامة</h2>
            <h3>Important Info</h3>
            <p>١- ليك فرصة استرداد المبلغ قبل ٣٠ ساعة</p>
            <p>٢- الحضور قبل الموعد بـ٣٠ دقيقة وإلا المكتب غير مسؤول</p>
          </div>
        </div>

        {/* Left Main Content */}
        <div className="invoice-main">
          {/* Customer Info */}
          <div className="customer-info">
            <div>
              <p>
                اسم العميل / Customer name:{" "}
                {invoiceData?.customerName || "..................."}
              </p>
              <p>
                رقم الجوال / Phone number:{" "}
                {invoiceData?.phone || "..................."}
              </p>
              <p>
                الهويه / Customer ID:{" "}
                {invoiceData?.customerId || "..................."}
              </p>
            </div>
            <div className="customer-info-right">
              <p>
                رقم الفاتورة / Invoice number:{" "}
                {invoiceData?.invoiceNumber || "................"}
              </p>
              <p>
                التاريخ / Date:{" "}
                {formatDate(invoiceData?.createdAt) || "...................."}
              </p>
              <p>
                {` المسؤول / Admin :`}
                {invoiceData?.customerName || "..................."}
              </p>
            </div>
          </div>

          {/* Programs */}
          <div className="programs-section border rounded p-4 my-4">
            <h3 className="text-xs">البرامج المختارة:</h3>
            <ul className="list-disc pl-6 text-xs">
              {invoiceData?.program3DayMakkahMadinah && (
                <li>
                  ✅ برنامج ٣ يوم مكة والمدينة{" "}
                  <span className="text-gray-500 ml-2">
                    / 3Day Makkah & Madinah
                  </span>
                </li>
              )}
              {invoiceData?.program4DayMakkahMadinah && (
                <li>
                  ✅ برنامج ٤ يوم مكة والمدينة{" "}
                  <span className="text-gray-500 ml-2">
                    / 4Day Makkah & Madinah
                  </span>
                </li>
              )}
              {invoiceData?.program3DayMakkah && (
                <li>
                  ✅ برنامج ٣ يوم مكة فقط{" "}
                  <span className="text-gray-500 ml-2">/ 3Day Makkah Only</span>
                </li>
              )}
              {invoiceData?.programOneWayMakkah && (
                <li>
                  ✅ برنامج ذهاب مكة فقط{" "}
                  <span className="text-gray-500 ml-2">
                    / One-Way to Makkah
                  </span>
                </li>
              )}
              {invoiceData?.programReturnDammam && (
                <li>
                  ✅ برنامج عودة الدمام فقط{" "}
                  <span className="text-gray-500 ml-2">/ Return to Dammam</span>
                </li>
              )}
            </ul>
          </div>

          {/* Seat & Member */}
          {invoiceData?.members?.map((member, index) => (
            <div key={index} className="seat-member-section">
              <div className="seat-member-grid">
                <div>
                  <label>
                    رقم الباص <span>.Bus No</span>
                  </label>
                  <input type="text" value={member.busNo || ""} readOnly />
                </div>
                <div>
                  <label>
                    رقم المقعد<span> .Seat No</span>
                  </label>
                  <input type="text" value={member.seatNo || ""} readOnly />
                </div>
                <div>
                  <label>
                    سرير<span> . Bed</span>
                  </label>
                  <input type="text" value={member.bed || ""} readOnly />
                </div>
                <div>
                  <label>
                    غرفة<span> . Room</span>
                  </label>
                  <input type="text" value={member.room || ""} readOnly />
                </div>
                <div>
                  <label>
                    عضو<span> . Member</span>
                  </label>
                  <input type="text" value={member.member || ""} readOnly />
                </div>
              </div>

              <div className="member-type">
                <label>
                  <input
                    type="radio"
                    name={`memberType-${index}`}
                    checked={member.type === "Single"}
                    readOnly
                  />
                  أعزب - Single
                </label>
                <label>
                  <input
                    type="radio"
                    name={`memberType-${index}`}
                    checked={member.type === "Family"}
                    readOnly
                  />
                  عائلة - Family
                </label>
              </div>
            </div>
          ))}

          {/* Traveler Data */}
          <div className="traveler-data">
            {invoiceData?.members?.map((member, i) => (
              <div key={i} className="traveler-row">
                <input value={member.name || ""} readOnly />
                <input value={member.residenceNumber || ""} readOnly />
                <input value={member.nationality || ""} readOnly />
              </div>
            ))}
          </div>

          {/* Payment Section */}
          <div className="payment-wrapper">
            <div className="payment-content">
              <div className="services-section">
                <h3>خدمات والمستلزمات العمره</h3>
                <table className="services-table">
                  <thead>
                    <tr>
                      <th>نوع الخدمة</th>
                      <th>العدد</th>
                      <th>السعر</th>
                      <th>الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData?.services?.map((service, i) => (
                      <tr key={i}>
                        <td>{service.serviceType}</td>
                        <td>{service.quantity}</td>
                        <td>{service.price}</td>
                        <td>{service.total}</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan={3} className="text-right">
                        إجمالي المطلوب
                      </td>
                      <td>{invoiceData?.totalBeforeTax}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="payment-method p-4 border rounded-lg shadow-md bg-white mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  طريقة الدفع:
                </h3>
                <div className="payment-options grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {[
                    { key: "Cash", label: "كاش" },
                    { key: "HalNetwork", label: "شبكة هلا" },
                    { key: "RajhiNetwork", label: "شبكة الراجحي" },
                    { key: "HalaBank", label: "بنك هلا" },
                    { key: "RajhiBank", label: "بنك الراجحي" },
                    { key: "STCPay", label: "stc pay" },
                    { key: "STC", label: "stc" },
                    { key: "Card", label: "بطاقة ائتمان" },
                    { key: "BankTransfer", label: "تحويل بنكي" },
                    { key: "Other", label: "أخرى" },
                  ].map((method) => (
                    <label
                      key={method.key}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={invoiceData?.paymentMethod === method.key}
                        readOnly
                        className="accent-blue-600"
                      />
                      {method.label}
                    </label>
                  ))}
                </div>
                <p className="other-payment text-gray-600">
                  طريقة دفع أخرى:
                  <span className="ml-2 font-medium text-black">
                    {invoiceData?.paymentMethod === "Other"
                      ? invoiceData?.otherPaymentMethod
                      : ""}
                  </span>
                </p>
              </div>
            </div>

            <div className="totals-section">
              <div>
                <p>
                  الإجمالي قبل الضريبة:
                  <span>:Total before tax</span>
                </p>
                <input value={invoiceData?.totalBeforeTax || ""} readOnly />
              </div>
              <div>
                <p>
                  قيمة الضريبة المضافة:
                  <span>:Value Added Tax</span>
                </p>
                <input value={invoiceData?.valueAddedTax || ""} readOnly />
              </div>
              <div>
                <p>
                  الإجمالي بعد الضريبة:
                  <span>:Total after tax</span>
                </p>
                <input value={invoiceData?.totalAfterTax || ""} readOnly />
              </div>
            </div>

            <div className="signatures">
              <div>
                <p>توقيع العميل:</p>
                <div className="signature-line"></div>
              </div>
              <div>
                <p>مستلم المبلغ من العميل:</p>
                <div className="signature-line"></div>
              </div>
              <div>
                <p>توقيع المدير:</p>
                <div className="signature-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
