import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { invoiceStore } from "../../utils/invoiceData";
import { useGetFaqsQuery } from "../../api/program"; // لجلب البرامج
import { useGetServicesQuery } from "../../api/servicesSlice"; // لجلب الخدمات

const AddInvioce = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAffiliates, setHasAffiliates] = useState(false);

  const { data: programsData = [], isLoading: programsLoading } =
    useGetFaqsQuery();
  const { data: servicesData = [], isLoading: servicesLoading } =
    useGetServicesQuery();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    members: [
      {
        member: "Active",
        name: "",
        room: "",
        bed: "",
        seatNo: "",
        busNo: "",
        type: "Single",
        residenceNumber: "",
        nationality: "",
      },
    ],
    services: [
      {
        serviceType: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ],
    selectedProgram: "",
    paymentMethod: "",
    totalBeforeTax: 0,
    valueAddedTax: 0,
    totalAfterTax: 0,
  });
  const programOptions = programsData.map((program) => ({
    key: program._id,
    label: program.title,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][field] = value;
    setFormData((prev) => ({ ...prev, members: updatedMembers }));
  };
  const handleProgramSelect = (programKey) => {
    setFormData((prev) => ({
      ...prev,
      selectedProgram: programKey,
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];

    // لو الحقل quantity أو price نحوله رقم
    if (field === "quantity" || field === "price") {
      updatedServices[index][field] = Number(value);
    } else {
      updatedServices[index][field] = value;
    }

    // لو السعر أو الكمية اتغيروا نحسب الإجمالي
    updatedServices[index].total =
      updatedServices[index].quantity * updatedServices[index].price;

    const totalBeforeTax = updatedServices.reduce(
      (sum, service) => sum + service.total,
      0
    );
    const valueAddedTax = totalBeforeTax * 0.15;
    const totalAfterTax = totalBeforeTax + valueAddedTax;

    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
      totalBeforeTax,
      valueAddedTax,
      totalAfterTax,
    }));
  };

  const addMember = () => {
    const hasActive = formData.members.some((m) => m.member === "Active");

    setFormData((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          member: hasActive ? "Affiliate" : "Active",
          name: "",
          room: "",
          bed: "",
          seatNo: "",
          busNo: "",
          type: "Single",
          residenceNumber: "",
          nationality: "",
        },
      ],
    }));
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          serviceType: "",
          quantity: 1,
          price: 0,
          total: 0,
        },
      ],
    }));
  };

  const formatForAPI = (data) => {
    const selectedProgramObj =
      programsData.find((p) => p._id === data.selectedProgram) || {};

    return {
      customerName: data.customerName,
      phone: data.phone,
      program: {
        title: selectedProgramObj.title || "",
        description: selectedProgramObj.description || "",
        active: selectedProgramObj.active || false,
      },
      members: data.members.map((member) => ({
        member: member.member,
        name: member.name,
        room: member.room,
        bed: member.bed,
        seatNo: member.seatNo,
        busNo: member.busNo,
        type: member.type,
        residenceNumber: member.residenceNumber,
        nationality: member.nationality,
      })),
      services: data.services.map((service) => ({
        serviceType: service.serviceType,
        quantity: service.quantity,
        price: service.price,
        total: service.total,
      })),
      paymentMethod: data.paymentMethod,
      totalBeforeTax: data.totalBeforeTax,
      valueAddedTax: data.valueAddedTax,
      totalAfterTax: data.totalAfterTax,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.selectedProgram) {
        alert("يرجى اختيار البرنامج أولاً");
        setIsSubmitting(false);
        return;
      }
      const token = localStorage.getItem("token");

      // Format data for API
      const apiData = {
        ...formatForAPI(formData),
        token: token,
      };

      // Send to API
      const response = await fetch(
        "https://crm-fatora.onrender.com/api/invoices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit invoice");
      }
      console.log(" Submitting invoice:", apiData);

      const result = await response.json();
      console.log("API Response:", result);

      // Save data for printing
      invoiceStore.setInvoiceData({
        ...formData,
        invoiceNumber: result.invoiceNumber || `INV-${Date.now()}`,
        date: new Date().toLocaleDateString("ar-SA"),
      });

      // Navigate to print page
      navigate(`/admin/print/${result._id || result.invoiceNumber}`);
    } catch (error) {
      console.error("Error submitting invoice:", error);
      alert("فشل في إرسال الفاتورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4" dir="rtl">
      <h2 className="text-center mb-4" style={{ marginTop: "100px" }}>
        إنشاء فاتورة جديدة
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Customer Information */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            معلومات العميل
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">اسم العميل</label>
                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">رقم الجوال</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            البرامج المتاحة
          </div>

          <div className="card-body">
            {programsLoading ? (
              <p>جاري تحميل البرامج...</p>
            ) : (
              <div className="row g-2">
                {programOptions.map((program) => (
                  <div className="col-6" key={program.key}>
                    <button
                      type="button"
                      onClick={() => handleProgramSelect(program.key)}
                      className={`w-100  px-4 py-2 rounded-lg border transition-all duration-200
                ${
                  formData.selectedProgram === program.key
                    ? "bg-primary text-white border-blue-700 shadow"
                    : "bg-white text-[#000] border-gray-300 hover:bg-gray-100"
                }`}
                    >
                      {program.label}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Members Information */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            معلومات المسافرين
          </div>
          <div className="card-body">
            {formData.members.map((member, index) => {
              if (index === 0 || hasAffiliates) {
                return (
                  <div key={index} className="mb-4 border-bottom pb-3">
                    <h5 className="mb-3">
                      {member.member === "Active"
                        ? "القائد"
                        : `المرافق ${index}`}
                    </h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">الاسم</label>
                        <input
                          type="text"
                          className="form-control"
                          value={member.name}
                          onChange={(e) =>
                            handleMemberChange(index, "name", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">نوع العضوية</label>
                        <select
                          className="form-select"
                          value={member.type}
                          onChange={(e) =>
                            handleMemberChange(index, "type", e.target.value)
                          }
                        >
                          <option value="Family">عائلة</option>
                          <option value="Single">أعزب</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">
                          رقم الهوية الوطنية / رقم جواز السفر / رقم الإقامة
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={member.residenceNumber}
                          onChange={(e) =>
                            handleMemberChange(
                              index,
                              "residenceNumber",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">الجنسية</label>
                        <input
                          type="text"
                          className="form-control"
                          value={member.nationality}
                          onChange={(e) =>
                            handleMemberChange(
                              index,
                              "nationality",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">رقم الغرفة</label>
                        <input
                          type="text"
                          className="form-control"
                          value={member.room}
                          onChange={(e) =>
                            handleMemberChange(index, "room", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">رقم السرير</label>
                        <input
                          type="text"
                          className="form-control"
                          value={member.bed}
                          onChange={(e) =>
                            handleMemberChange(index, "bed", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">رقم المقعد</label>
                        <input
                          type="text"
                          className="form-control"
                          value={member.seatNo}
                          onChange={(e) =>
                            handleMemberChange(index, "seatNo", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">رقم الباص</label>
                        <input
                          type="text"
                          className="form-control"
                          value={member.busNo}
                          onChange={(e) =>
                            handleMemberChange(index, "busNo", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}

            <div className="mb-3">
              <label className="form-label fw-bold">هل لديك مرافقين؟</label>
              <div>
                <button
                  type="button"
                  className={`btn me-2 ${
                    hasAffiliates ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setHasAffiliates(true)}
                >
                  نعم
                </button>
                <button
                  type="button"
                  className={`btn ${
                    !hasAffiliates ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => {
                    setHasAffiliates(false);
                    setFormData((prev) => ({
                      ...prev,
                      members: [prev.members[0]],
                    }));
                  }}
                >
                  لا
                </button>
              </div>
            </div>

            {hasAffiliates && (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addMember}
              >
                إضافة مرافق
              </button>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">الخدمات</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>نوع الخدمة</th>
                  <th>الكمية</th>
                  <th>السعر</th>
                  <th>الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {formData.services.map((service, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        className="form-select"
                        value={service.serviceType}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "serviceType",
                            e.target.value
                          )
                        }
                      >
                        {servicesLoading ? (
                          <option>جارٍ التحميل...</option>
                        ) : (
                          servicesData.map((service) => (
                            <option
                              key={service._id}
                              value={service.serviceType}
                            >
                              {service.serviceType}
                            </option>
                          ))
                        )}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={service.quantity}
                        onChange={(e) =>
                          handleServiceChange(index, "quantity", e.target.value)
                        }
                        min="1"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={service.price}
                        onChange={(e) =>
                          handleServiceChange(index, "price", e.target.value)
                        }
                        min="0"
                      />
                    </td>
                    <td>{service.total} ر.س</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={addService}
            >
              إضافة خدمة
            </button>
          </div>
        </div>

        {/* Payment */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">الدفع</div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="border rounded p-2">
                  <p className="fw-bold mb-1">الإجمالي قبل الضريبة</p>
                  <p className="h5 mb-0">{formData.totalBeforeTax} ر.س</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border rounded p-2">
                  <label className="form-label fw-bold">نسبة الضريبة (%)</label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    value={formData.taxRate || 15}
                    onChange={(e) => {
                      const newTaxRate = Number(e.target.value);
                      const valueAddedTax =
                        formData.totalBeforeTax * (newTaxRate / 100);
                      const totalAfterTax =
                        formData.totalBeforeTax + valueAddedTax;

                      setFormData((prev) => ({
                        ...prev,
                        taxRate: newTaxRate,
                        valueAddedTax,
                        totalAfterTax,
                      }));
                    }}
                  />
                  <p className="fw-bold mb-1">
                    الضريبة: {formData.valueAddedTax.toFixed(2)} ر.س
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border rounded p-2 bg-light">
                  <p className="fw-bold mb-1">الإجمالي بعد الضريبة</p>
                  <p className="h5 mb-0">
                    {formData.totalAfterTax.toFixed(2)} ر.س
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">طريقة الدفع</label>
              <select
                className="form-select"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="Cash">نقدًا (Cash)</option>
                <option value="Card">بطاقة (Card)</option>
                <option value="RajhiNetwork">شبكة الراجحي</option>
                <option value="HalNetwork">شبكة الهل</option>
                <option value="STC">STC</option>
                <option value="RajhiBank">تحويل - الراجحي</option>
                <option value="HalBank">تحويل - الهل</option>
                <option value="STCPay">STC Pay</option>
                <option value="Other">أخرى</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ وطباعة الفاتورة"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInvioce;
