import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../Components/auth/Login";
import Protected from "../Components/Common/Protected";
import ProtectedRoute from "../Components/protectedRoute/ProtectedRoute";
import Print from "./Dashboard Pages/Print";
import AddInvioce from "./Dashboard Pages/add-invioce";
import AdTrip from "./Dashboard Pages/Add-Trip";
import Header from "../Components/Admin Components/header/Header";
import SideNav from "../Components/Admin Components/sideNav/SideNav";
import InvoicesList from "./Dashboard Pages/all-invoice";

const Pages = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  return (
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/login" element={<Protected Cmp={Login} />} />
          <Route
            path="/*"
            element={
              <>
                <Header />
                <div className="d-flex">
                  <SideNav />
                  <div className="flex-grow-1 p-3">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <InvoicesList />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/add-invoice"
                        element={
                          <ProtectedRoute>
                            <AddInvioce setInvoiceData={setInvoiceData} />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/add-trip"
                        element={
                          <ProtectedRoute>
                            <AdTrip setInvoiceData={setInvoiceData} />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/invoices"
                        element={
                          <ProtectedRoute>{<InvoicesList />}</ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/print"
                        element={
                          <ProtectedRoute>
                            <Print invoiceData={invoiceData} />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/print/:invoiceId"
                        element={
                          // <ProtectedRoute>
                          <Print />
                          // </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Pages;
