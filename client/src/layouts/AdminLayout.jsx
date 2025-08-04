import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  const toggleNotifications = () => setShowNotifications(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const handleSettings = () => navigate("/admin/dashboard/settings");
  const handleProfile = () => navigate("/admin/dashboard/profile");

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <h5 className="m-0 fw-bold">Admin Dashboard</h5>

            <div className="d-flex align-items-center gap-3">
              {/* Notification Bell */}
              <div className="position-relative" ref={notificationsRef}>
                <button
                  className="btn btn-outline-secondary rounded-circle"
                  onClick={toggleNotifications}
                  aria-label="Toggle notifications"
                  title="Notifications"
                >
                  <i className="bi bi-bell fs-5"></i>
                </button>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>

                {showNotifications && (
                  <div
                    className="position-absolute bg-white shadow border rounded p-3"
                    style={{
                      width: "280px",
                      top: "calc(100% + 10px)",
                      right: 0,
                      zIndex: 9999,
                    }}
                  >
                    <p className="fw-bold mb-2">Notifications</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">New user registered</li>
                      <li className="list-group-item">Verification request received</li>
                      <li className="list-group-item">Server backup completed</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i> Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li>
                    <button className="dropdown-item" onClick={handleProfile}>
                      <i className="bi bi-person me-2"></i> Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleSettings}>
                      <i className="bi bi-gear me-2"></i> Settings
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/admin/dashboard/messages")}
                    >
                      <i className="bi bi-envelope me-2"></i> Messages
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
