import { Link, NavLink } from "react-router-dom";
import "./sideNav.css";

const SideNav = ({ isSidebarOpen }) => {
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <nav
        className={isSidebarOpen ? "sidebar" : "hidden sidebar"}
        id="sidebar"
      >
        <ul className="nav">
          {/* Logo */}
          <li className="nav-item nav-profile mt-2">
            <NavLink className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
              <Link className="navbar-brand brand-logo" to="#">
                <img
                  src="/logo.jfif"
                  alt="logo"
                  style={{
                    width: "100%",
                    margin: "10px auto",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </NavLink>
          </li>
          {/* Dashboard */}
          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#dashboard"
              aria-expanded="false"
              aria-controls="dashboard"
            >
              <div>
                <i
                  className="fa fa-globe"
                  aria-hidden="true"
                  // onClick={() => navigate("/admin/dashboard")}
                ></i>
                <span className="menu-title fw-bold"> الفواتير</span>
              </div>
              <i className="menu-arrow me-3" />
            </Link>
            <div className="collapse" id="dashboard">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/invoices">
                    كل الفواتير
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/add-invoice">
                    اضافة فاتورة
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/add-trip">
                    اضافة رحلة
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          {/* Logout */}
          <li className="nav-item" onClick={handleLogout}>
            <Link className="nav-link" to="/login">
              <i className="fa fa-sign-out" aria-hidden="true" />
              <span className="menu-title fw-bold">تسجيل الخروج</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
