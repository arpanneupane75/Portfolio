import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message received" },
    { id: 2, message: "New project added" },
  ]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/admin/dashboard">
          Admin Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

            <li className="nav-item me-3">
              <Link className="nav-link" to="/admin/dashboard/messages">Messages</Link>
            </li>

            <li className="nav-item me-3">
              <Link className="nav-link" to="/admin/dashboard/projects">Projects</Link>
            </li>

            <li className="nav-item me-3">
              <Link className="btn btn-outline-primary btn-sm" to="/admin/dashboard/projects/add">
                + Add Project
              </Link>
            </li>

            {/* Notification Dropdown */}
            <li className="nav-item dropdown me-3">
              <button
                className="btn btn-light position-relative"
                id="notifDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bell-fill fs-5 text-secondary"></i>
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notifications.length}
                  </span>
                )}
              </button>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notifDropdown">
                {notifications.length === 0 ? (
                  <li><span className="dropdown-item text-muted">No notifications</span></li>
                ) : (
                  notifications.map((notif) => (
                    <li key={notif.id}>
                      <span className="dropdown-item">{notif.message}</span>
                    </li>
                  ))
                )}
              </ul>
            </li>

            <li className="nav-item">
              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
