import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const isActive = (path) => location.pathname === path;

  const handleHashClick = (e, hash) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsCollapsed(true);
    }
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <Link
          to="/"
          className="navbar-brand"
          aria-label="Go to homepage"
          onClick={() => setIsCollapsed(true)}
        >
          Portfolio
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Open navigation menu" : "Close navigation menu"}
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse${isCollapsed ? "" : " show"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {[
              { label: "Home", to: "/" },
              { label: "About", to: "#about" },
              { label: "Projects", to: "#projects" },
              { label: "Contact", to: "#contact" },
            ].map(({ label, to }) => (
              <li className="nav-item" key={to}>
                {to.startsWith("#") ? (
                  <a
                    href={to}
                    className="nav-link"
                    tabIndex={0}
                    onClick={(e) => handleHashClick(e, to)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleHashClick(e, to);
                      }
                    }}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    to={to}
                    className={`nav-link${isActive(to) ? " active" : ""}`}
                    aria-current={isActive(to) ? "page" : undefined}
                    onClick={() => setIsCollapsed(true)}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}

            {user?.email && (
              <li className="nav-item">
                <Link
                  to="/admin/dashboard"
                  className={`nav-link${isActive("/admin/dashboard") ? " active" : ""}`}
                  aria-current={isActive("/admin/dashboard") ? "page" : undefined}
                  onClick={() => setIsCollapsed(true)}
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li className="nav-item ms-3">
              <button
                type="button"
                className="btn btn-toggle-mode"
                aria-pressed={darkMode}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
