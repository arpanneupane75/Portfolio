import { useEffect, useState } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "Project Submitted",
    message: "New project has been submitted successfully.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "error",
    title: "Submission Failed",
    message: "Image upload failed in recent project submission.",
    time: "10 minutes ago",
  },
  {
    id: 3,
    type: "info",
    title: "Message Received",
    message: "You received a new message from a visitor.",
    time: "30 minutes ago",
  },
];

const getIconByType = (type) => {
  switch (type) {
    case "success":
      return <FaCheckCircle className="text-success me-2" />;
    case "error":
      return <FaTimesCircle className="text-danger me-2" />;
    case "info":
    default:
      return <FaInfoCircle className="text-primary me-2" />;
  }
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetch from API
    setTimeout(() => {
      setNotifications(mockNotifications);
    }, 500);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3">
        <FaBell className="me-2 text-warning fs-4" />
        <h2 className="m-0">Notifications</h2>
      </div>
      {notifications.length === 0 ? (
        <p className="text-muted">No notifications at the moment.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="list-group-item d-flex align-items-start"
            >
              {getIconByType(notification.type)}
              <div>
                <strong>{notification.title}</strong>
                <div className="text-muted small">{notification.message}</div>
                <span className="badge bg-light text-dark mt-1">
                  {notification.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotifications;
