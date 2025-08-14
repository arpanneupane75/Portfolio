import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date_desc"); // default sort newest first

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getAllMessages = async () => {
      try {
        const res = await axios.get("https://portfolio-r436.onrender.com/api/contact", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setError("Unable to load messages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getAllMessages();
    } else {
      setError("You are not authorized. Please log in.");
      setLoading(false);
    }
  }, []);

  // Filter messages by search
  const filteredMessages = useMemo(() => {
    if (!searchTerm.trim()) return messages;

    const lower = searchTerm.toLowerCase();
    return messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(lower) ||
        msg.email.toLowerCase().includes(lower) ||
        msg.message.toLowerCase().includes(lower)
    );
  }, [messages, searchTerm]);

  // Sort filtered messages
  const sortedMessages = useMemo(() => {
    let sorted = [...filteredMessages];
    if (sortBy === "date_asc") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "date_desc") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "name_asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sorted;
  }, [filteredMessages, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedMessages.length / ITEMS_PER_PAGE);
  const paginatedMessages = sortedMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="container py-5">
      <h2 className="mb-4 text-primary fw-bold d-flex align-items-center gap-2">
        <i className="bi bi-envelope-fill fs-3"></i> Messages
      </h2>

      {/* Controls: Search + Sort */}
      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search messages"
          />
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-md-end">
          <label htmlFor="sortBy" className="me-2 fw-semibold">
            Sort by:
          </label>
          <select
            id="sortBy"
            className="form-select w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort messages"
          >
            <option value="date_desc">Date: Newest First</option>
            <option value="date_asc">Date: Oldest First</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Status messages */}
      {loading && (
        <div className="alert alert-info d-flex align-items-center gap-2" role="alert">
          <i className="bi bi-hourglass-split fs-4"></i> Loading messages...
        </div>
      )}

      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <i className="bi bi-exclamation-triangle-fill fs-4"></i> {error}
        </div>
      )}

      {!loading && !error && sortedMessages.length === 0 && (
        <div className="alert alert-warning d-flex align-items-center gap-2" role="alert">
          <i className="bi bi-info-circle-fill fs-4"></i> No messages found.
        </div>
      )}

      {/* Messages List */}
      {!loading && !error && sortedMessages.length > 0 && (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {paginatedMessages.map((msg) => (
              <div key={msg._id} className="col">
                <div className="card h-100 shadow rounded-3">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-1">{msg.name}</h5>
                    <small
                      className="text-muted mb-3 d-flex align-items-center gap-1"
                      title={new Date(msg.createdAt).toLocaleString()}
                    >
                      <i className="bi bi-clock"></i>{" "}
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </small>
                    <p className="card-text flex-grow-1">{msg.message}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="btn btn-sm btn-outline-primary mt-auto d-flex align-items-center gap-2"
                      aria-label={`Send email to ${msg.name}`}
                    >
                      <i className="bi bi-envelope"></i> {msg.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Message list pagination"
              className="mt-4 d-flex justify-content-center"
            >
              <ul className="pagination pagination-sm">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => goToPage(currentPage - 1)}
                    aria-label="Previous page"
                  >
                    &laquo;
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(i + 1)}
                      aria-label={`Go to page ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => goToPage(currentPage + 1)}
                    aria-label="Next page"
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </section>
  );
};

export default AdminMessages;
