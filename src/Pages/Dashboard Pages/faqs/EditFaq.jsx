import React, { useEffect, useState } from "react";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetFaqByIdQuery,
  useUpdateFaqMutation,
} from "../../../api/faqSlice";
import Swal from "sweetalert2";

const EditFaq = () => {
  const { id } = useParams();
  const [setError] = useState({});
  const navigate = useNavigate();
  const [updateFaq] = useUpdateFaqMutation(); // API hook
  const { data: faqData, isLoading } = useGetFaqByIdQuery(id); // API hook

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only"); // Close sidebar on page change
  }, []);
  useEffect(() => {
    if (faqData && !isLoading) {
      setFormData({
        question: faqData.faq.question,
        answer: faqData.faq.answer,
      });
    }
  }, [faqData, isLoading]);
  if (isLoading) {
    return (
      <div className="center-main-loader">
        <div className="main-loader"></div>
      </div>
    );
  }

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFaq({id:id,updatedFaq:formData}).unwrap(); // Send data to the backend
      Swal.fire("تم!", "تم تعديل السؤال بنجاح.", "success");
      navigate("/admin/faqs"); // Navigate to faqs page on success
    } catch (err) {
      console.error("Failed to create faq:", err);
      setError(err);
      Swal.fire("خطأ!", "حدث خطأ أثناء محاولة تعديل السؤال.", "error");
    }
  };
  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="تعديل سؤال جديد" icon="fa fa-calendar-plus" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 stretch-card content-wrapper">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">نموذج تعديل سؤال جديد</h4>
                  <p className="card-description">
                    الرجاء ملء الحقول التالية والتأكد من صحة البيانات قبل
                    التأكيد.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="question">السؤال</label>
                      <input
                        type="text"
                        className="form-control"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="answer">الاجابة</label>
                      <textarea
                        className="form-control"
                        id="answer"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      تعديل
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFaq;
