import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {  useDeleteFaqMutation, useGetFaqsQuery } from '../../../api/faqSlice';
import Header from '../../../Components/Admin Components/header/Header';
import SideNav from '../../../Components/Admin Components/sideNav/SideNav';
import PageHeader from '../../../Components/Common/page header/PageHeader';
import Swal from 'sweetalert2';

const Faqs = () => {
    const {data: faqs, isLoading ,error,refetch} = useGetFaqsQuery();
    const navigate = useNavigate();
    const [deleteFaq] = useDeleteFaqMutation();
    useEffect(() => {
      document.body.classList.remove("sidebar-icon-only") // Close sidebar on page change
    }, []);
    useEffect(() => {
      refetch();
    }, [refetch]);
    console.log(faqs);
    const handleDelete = async (id) => {
      const result = await Swal.fire({
        title: "هل انت متأكد؟",
        text: "سيتم حذف السؤال بشكل نهائي",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
      });
      if (result.isConfirmed) {
        try {
          await deleteFaq(id).unwrap();
          refetch();
          Swal.fire("تم الحذف!", "تم حذف السؤال بنجاح.", "success");
        } catch (err) {
          console.error("Failed to delete faq:", err);
          Swal.fire("خطأ!", "حدث خطأ أثناء محاولة حذف السؤال.", "error");
        }
      }
    }
  return (
    <div>
    <Header />
    <div className="page-body-wrapper">
      <SideNav />
      <div className="add_user_container">
        <div style={{ marginTop: "30px" }}>
          <PageHeader name=" الحجوزات" icon="fa fa-cogs" />
        </div>
        <div className="row content-wrapper">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="p-3">
                <h3 className="latest_users mt-2 mb-3 text-center">
                  <i
                    className="fa fa-angle-double-left"
                    aria-hidden="true"
                  ></i>
                  كل الاسئلة
                  <i
                    className="fa fa-angle-double-right"
                    aria-hidden="true"
                  ></i>
                  <hr />
                </h3>
                <div className="table-responsive">
                  {isLoading ? (
                          <div className="center-loader">
                              <div class="loader"></div>
                          </div>
                      ) : error ? (
                      <div>Error loading users</div> // Display error message if there is an error
                      ) : (
                  <table className="table text-center table-hover">
                    <thead className="table-dark">
                      <tr style={{ fontWeight: "bold" }}>
                        <th># </th>
                        <th>السؤال </th>
                        <th>الاجابة</th>
                        <th> اجراء </th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqs.faqs.length > 0 ? (
                        faqs.faqs.map((faq, index) => (
                          <tr key={faq.id}>
                            <td>{index + 1} </td>{" "}
                            <td>{faq.question}</td>
                            <td>{faq.answer}</td>
                            <td>
                            <button
                                className="btn text-info"
                                title="عرض"
                                onClick={() => navigate(`/admin/edit-faq/${faq.id}`)}
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </button>
                              <button
                                className="btn text-success"
                                title="تعديل"
                                onClick={() => navigate(`/admin/edit-faq/${faq.id}`)}
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button className="btn text-danger" onClick={() => handleDelete(faq.id)} title="حذف">
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            لا يوجد اسئلة
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Faqs
