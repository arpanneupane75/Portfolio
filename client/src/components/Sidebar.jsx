import { Folder, FolderPlus, Home, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <>
      <style>{`
        .sidebar {
          width: 260px;
          background-color: #1e1e2f;
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: white;
          text-decoration: none;
          margin-bottom: 1.5rem;
        }
        .nav-link {
          color: #bbb;
          transition: color 0.3s, background-color 0.3s;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          user-select: none;
        }
        .nav-link:hover,
        .nav-link[aria-current="page"] {
          color: white;
          background-color: #3a3a5a;
          text-decoration: none;
        }
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dropdown-menu {
          min-width: 12rem;
          padding: 0.5rem 0;
          background-color: #2a2a4d;
          border-radius: 0.3rem;
          border: none;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        .dropdown-item {
          color: #ccc;
          padding: 0.4rem 1.5rem;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s ease;
        }
        .dropdown-item:hover {
          background-color: #454574;
          color: white;
          text-decoration: none;
        }
        .dropdown-divider {
          border-color: #3a3a5a;
          margin: 0.25rem 0;
        }
        .btn-secondary {
          background-color: #2a2a4d;
          border: none;
          color: #ccc;
          width: 100%;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 0.375rem;
          cursor: pointer;
          user-select: none;
        }
        .btn-secondary:hover {
          background-color: #454574;
          color: white;
        }
        .btn-danger {
          color: #ff6b6b;
          font-weight: 600;
        }
        .btn-danger:hover {
          color: #ff8787;
          background-color: transparent;
        }
      `}</style>

      <aside
        className="sidebar d-none d-lg-flex"
        aria-label="Sidebar navigation"
      >
        <Link
          to="/admin/dashboard"
          className="sidebar-brand"
        >
          <span role="img" aria-label="Dashboard icon">
            📊
          </span>
          <span>Dashboard</span>
        </Link>

        <nav className="nav flex-column" aria-label="Main navigation">
          <Link
            to="/admin/dashboard"
            className="nav-link"
            aria-current={location.pathname === "/admin/dashboard" ? "page" : undefined}
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            to="/admin/dashboard/messages"
            className="nav-link"
            aria-current={location.pathname === "/admin/dashboard/messages" ? "page" : undefined}
          >
            <Mail size={20} />
            Messages
          </Link>

          <Link
            to="/admin/dashboard/projects"
            className="nav-link"
            aria-current={location.pathname === "/admin/dashboard/projects" ? "page" : undefined}
          >
            <Folder size={20} />
            Projects
          </Link>

          <Link
            to="/admin/dashboard/projects/add"
            className="nav-link"
            aria-current={location.pathname === "/admin/dashboard/projects/add" ? "page" : undefined}
          >
            <FolderPlus size={20} />
            Add Project
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-top border-secondary">
          <div className="dropdown">
            <button
              className="btn btn-secondary"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-haspopup="true"
              type="button"
            >
              <img
                src="/ankit.webp"
                alt={`${user.email} avatar`}
                width={36}
                height={36}
                className="rounded-circle"
                loading="lazy"
              />
              <span className="text-truncate flex-grow-1">{user.email}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M7.247 11.14 2.451 5.658C2.18 5.31 2.521 5 2.9 5h10.2c.378 0 .72.31.448.658l-4.796 5.482a.5.5 0 0 1-.708 0z" />
              </svg>
            </button>

            <ul
              className="dropdown-menu dropdown-menu-dark mt-2 shadow"
              aria-labelledby="userDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/">
                  View Portfolio
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item btn-danger"
                  onClick={logout}
                  type="button"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
