import React, { useEffect } from 'react';
import Header from '../../../Components/Admin Components/header/Header';
import SideNav from '../../../Components/Admin Components/sideNav/SideNav';
import PageHeader from '../../../Components/Common/page header/PageHeader';
import { useGetTransactionsQuery } from '../../../api/transactionsSlice';

const Transactions = () => {
  // Sample transactions data
  const { data: transactions, error, isLoading } = useGetTransactionsQuery();
  console.log(transactions);
  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only") // Close sidebar on page change
  }, []);
  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: '30px' }}>
            <PageHeader name="المعاملات المالية" icon="fa fa-credit-card" />
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
                    كل المعاملات المالية
                    <i
                      className="fa fa-angle-double-right"
                      aria-hidden="true"
                    ></i>
                    <hr />
                  </h3>
                  <div className="table-responsive">
                    {isLoading ? (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : error ? (
                      <div>Error loading countries</div>
                    ) : (
                      <table className="table text-center table-hover">
                        <thead className="table-dark">
                          <tr style={{ fontWeight: 'bold' }}>
                            <th># </th>
                            <th>العميل</th>
                            <th>الخدمة</th>
                            <th>المبلغ</th>
                            <th>حالة الدفع</th>
                            <th>تاريخ المعاملة</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.transactions.map((transaction, index) => (
                            <tr key={transaction.id}>
                              <td>{index + 1}</td>
                              <td>{transaction.booking.client_name}</td>
                              <td>{transaction.booking.service.title}</td>
                              <td>{transaction.amount} ريال</td>
                              <td>
                                <span
                                  className={`badge ${
                                    transaction.payment_status === 'success'
                                      ? 'badge-success'
                                      : 'badge-warning'
                                  }`}
                                >
                                  {transaction.payment_status === 'success' ? "ناجحة" : "فاشلة"}
                                </span>
                              </td>
                              <td>{new Date(transaction.created_at).toLocaleDateString('en')}</td>
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
    </div>
  );
};

export default Transactions;
