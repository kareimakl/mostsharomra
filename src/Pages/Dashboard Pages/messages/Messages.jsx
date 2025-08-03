import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Admin Components/header/Header';
import SideNav from '../../../Components/Admin Components/sideNav/SideNav';
import PageHeader from '../../../Components/Common/page header/PageHeader';
import './messages.css'; // Assuming you want to add styles
import {useGetMessagesQuery,useDeleteMessageMutation} from '../../../api/messageSlice';
import Swal from 'sweetalert2';
const Messages = () => {
  const [showPopup, setShowPopup] = useState(false); // For controlling popup visibility
  const [selectedMessage, setSelectedMessage] = useState(null); // To store the selected message data
  const {data:messagesData,isLoading,error,refetch} = useGetMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();
  const openPopup = (message) => {
    setSelectedMessage(message); // Set the selected message
    setShowPopup(true); // Show the popup
  };

  const closePopup = () => {
    setShowPopup(false); // Hide the popup
    setSelectedMessage(null); // Clear selected message
  };
  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only") // Close sidebar on page change
  }, []);
  const handleDelete = async (messageId) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "الغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMessage(messageId).unwrap();
          Swal.fire("تم الحذف!", "تم حذف الدولة بنجاح.", "success");
          refetch(); // Refresh the countries list after deletion
        } catch (err) {
          console.error("Failed to delete country:", err);
          Swal.fire("خطأ!", "حدث خطأ أثناء محاولة حذف الدولة.", "error");
        }
      }
    });
  };
  return (
    <div className='messages'>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: '30px' }}>
            <PageHeader name="الرسائل" icon="fa fa-envelope" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                    كل الرسائل
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                    <hr />
                  </h3>
                  <div className="table-responsive">
                  {isLoading ? (
                      <div className="center-loader">
                        <div className="loader"></div>
                      </div>
                    ) : error ? (
                      <div>Error loading countries</div> // Display error message if there is an error
                    ) : (
                    <table className="table text-center table-hover">
                      <thead className="table-dark">
                        <tr style={{ fontWeight: 'bold' }}>
                          <th>#</th>
                          <th>الاسم</th>
                          <th>الرسالة</th>
                          <th>الهاتف</th>
                          <th>اجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messagesData && messagesData.messages.map((message,index) => (
                          <tr key={message.id}>
                            <td>{index + 1}</td>
                            <td>{message.name}</td>
                            <td>{message.message.slice(0, 20)}</td>
                            <td>{message.phone}</td>
                            <td>
                              <button
                                className="btn text-info"
                                title="عرض"
                                onClick={() => openPopup(message)} // Open popup with message data
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </button>
                              <button className="btn text-danger" title="حذف" onClick={() => handleDelete(message.id)}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
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

      {/* Popup for viewing detailed message */}
      {showPopup && selectedMessage && (
        <div className="popup-overlay">
          <div className="popup-content ">
            <button className="close-btn" onClick={closePopup}>
              &times;
            </button>
            <h4>تفاصيل الرسالة</h4>
            <p className='mt-2'><strong>الاسم:</strong> {selectedMessage.name}</p>
            <p ><strong>الهاتف:</strong> {selectedMessage.phone}</p>
            <p ><strong>الرسالة:</strong> {selectedMessage.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
