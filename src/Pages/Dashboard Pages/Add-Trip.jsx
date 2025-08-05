import React, { useState } from "react";
import { useCreateFaqMutation } from "../../api/program";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import AddServiceForm from "./Add-Services";

function AddTrip() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);

  const [createFaq, { isLoading }] = useCreateFaqMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFaq({
        title,
        description,
        active,
      }).unwrap();

      // Reset form
      setTitle("");
      setDescription("");
      setActive(true);

      // Success alert in Arabic
      Swal.fire({
        icon: "success",
        title: "تم إضافة البرنامج بنجاح!",
        text: "تم حفظ البرنامج الجديد في النظام.",
        confirmButtonColor: "#0d6efd",
      });
    } catch (error) {
      console.error(error);
      // Error alert in Arabic
      Swal.fire({
        icon: "error",
        title: "فشل في إضافة البرنامج",
        text: error?.data?.message || "حدث خطأ غير متوقع!",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0" style={{ marginTop: "100px" }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4 text-primary">إضافة برنامج جديد</h2>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">عنوان البرنامج</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">وصف البرنامج</label>
              <textarea
                className="form-control"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Active Checkbox */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="activeCheckbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="activeCheckbox">
                مفعل
              </label>
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

      <AddServiceForm />
    </div>
  );
}

export default AddTrip;
