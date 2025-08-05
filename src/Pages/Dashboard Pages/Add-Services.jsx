import React, { useState } from "react";
import { useCreateServiceMutation } from "../../api/servicesSlice";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function AddServiceForm() {
  const [serviceType, setServiceType] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [price, setPrice] = useState("0");

  const [createService, { isLoading }] = useCreateServiceMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createService({
        serviceType,
        quantity,
        price,
      }).unwrap();

      // Reset the form
      setServiceType("");
      setQuantity("0");
      setPrice("0");

      Swal.fire({
        icon: "success",
        title: "تم إضافة الخدمة بنجاح!",
        text: "تم حفظ الخدمة الجديدة في النظام.",
        confirmButtonColor: "#0d6efd",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "فشل في إضافة الخدمة",
        text: error?.data?.message || "حدث خطأ غير متوقع!",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h2 className="text-center mb-4 text-primary">إضافة خدمة جديدة</h2>
          <form onSubmit={handleSubmit}>
            {/* Service Type */}
            <div className="mb-3">
              <label className="form-label">نوع الخدمة</label>
              <input
                type="text"
                className="form-control"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
              />
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label className="form-label">الكمية</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">السعر</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-100"
            >
              {isLoading ? "جارٍ الإضافة..." : "إضافة البرنامج"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddServiceForm;
