import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Debounce helper
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const truncateText = (text, maxLength = 120) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
};

const PAGE_SIZE = 6;

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("title"); // title, createdAt, category
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Debounce search term to improve performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5001/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      setError("Failed to fetch projects. Please try again.");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = projects
      .map((p) => p.category)
      .filter((c) => c && c.trim() !== "");
    return Array.from(new Set(cats)).sort();
  }, [projects]);

  // Filter & Sort projects
  const filteredAndSortedProjects = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();

    let filtered = projects.filter((project) => {
      if (categoryFilter && project.category !== categoryFilter) return false;

      if (!term) return true;

      const inTitle = project.title?.toLowerCase().includes(term);
      const inDesc = project.description?.toLowerCase().includes(term);
      const inCategory = project.category?.toLowerCase().includes(term);
      const inTech = project.technologies?.some((tech) =>
        tech.toLowerCase().includes(term)
      );
      const inFeatures = project.features?.some((feat) =>
        feat.toLowerCase().includes(term)
      );

      return inTitle || inDesc || inCategory || inTech || inFeatures;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "category") {
        return (a.category ?? "").localeCompare(b.category ?? "");
      }
      if (sortBy === "createdAt") {
        // assuming createdAt exists as ISO string or Date string
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return filtered;
  }, [projects, debouncedSearchTerm, categoryFilter, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedProjects.length / PAGE_SIZE);
  const currentProjects = filteredAndSortedProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Pagination handlers
  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSortBy("title");
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5001/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (err) {
      alert("Failed to delete project. Please try again.");
      console.error("Error deleting project:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/projects/${id}/edit`);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">All Projects</h2>

      {/* Filters and Sort */}
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4 flex-wrap">
        {/* Search */}
        <input
          type="search"
          className="form-control"
          placeholder="Search projects..."
          aria-label="Search projects"
          style={{ maxWidth: 320 }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Category Filter */}
        <select
          className="form-select"
          aria-label="Filter projects by category"
          style={{ maxWidth: 240 }}
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="form-select"
          aria-label="Sort projects"
          style={{ maxWidth: 200 }}
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="title">Sort by Title (A-Z)</option>
          <option value="createdAt">Sort by Date (Newest)</option>
          <option value="category">Sort by Category</option>
        </select>

        {/* Clear Filters Button */}
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={clearFilters}
          aria-label="Clear search and filters"
        >
          Clear Filters
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5" role="status" aria-live="polite" aria-busy="true">
          <div className="spinner-border text-primary" aria-hidden="true" />
          <span className="visually-hidden">Loading projects...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">
          <p>{error}</p>
          <button
            className="btn btn-sm btn-outline-primary mt-2"
            onClick={fetchProjects}
            aria-label="Retry fetching projects"
          >
            Retry
          </button>
        </div>
      ) : filteredAndSortedProjects.length === 0 ? (
        <div className="text-center text-muted fst-italic my-5" role="alert" aria-live="polite">
          <p>No projects match your search/filter criteria.</p>
          <p>
            Try clearing filters or adding new projects.
          </p>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {currentProjects.map((project) => (
              <div className="col-12 col-md-6 col-lg-4" key={project._id}>
                <div
                  className="card h-100 shadow-sm border-0 rounded-3"
                  style={{ transition: "box-shadow 0.3s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 8px rgba(0,0,0,0.1)")
                  }
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="card-img-top rounded-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-top"
                      style={{ height: "180px", fontSize: "1.2rem" }}
                    >
                      No Image
                    </div>
                  )}

                  <div className="card-body d-flex flex-column">
                    <h5
                      className="card-title text-truncate"
                      title={project.title}
                      style={{ fontWeight: "600" }}
                    >
                      {project.title}
                    </h5>

                    <p className="card-text flex-grow-1" title={project.description}>
                      {truncateText(project.description, 140)}
                    </p>

                    <div className="mb-2">
                      <strong>Technologies:</strong>{" "}
                      {project.technologies?.length > 0 ? (
                        project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="badge bg-info text-dark me-1 mb-1"
                            title={tech}
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
                    </div>

                    {project.category && (
                      <div>
                        <strong>Category:</strong>{" "}
                        <span className="badge bg-secondary">{project.category}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-footer d-flex flex-wrap justify-content-between gap-2 align-items-center">
                    <div className="d-flex gap-2 flex-wrap">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-success"
                          aria-label={`Visit live site of ${project.title}`}
                        >
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-dark"
                          aria-label={`View GitHub repo of ${project.title}`}
                        >
                          GitHub
                        </a>
                      )}
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(project._id)}
                        aria-label={`Edit project ${project.title}`}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(project._id)}
                        aria-label={`Delete project ${project.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Project list pagination"
              className="d-flex justify-content-center mt-4"
            >
              <ul className="pagination flex-wrap gap-2">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    aria-label="Go to previous page"
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    &laquo; Prev
                  </button>
                </li>

                {[...Array(totalPages).keys()].map((num) => {
                  const pageNum = num + 1;
                  // Show all pages if totalPages <= 7, else show sliding window
                  if (
                    totalPages > 7 &&
                    (pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1))
                  ) {
                    return (
                      <li
                        key={pageNum}
                        className={`page-item ${pageNum === currentPage ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => goToPage(pageNum)}
                          aria-current={pageNum === currentPage ? "page" : undefined}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  } else if (
                    totalPages > 7 &&
                    (pageNum === currentPage - 2 || pageNum === currentPage + 2)
                  ) {
                    // show ellipsis
                    return (
                      <li key={pageNum} className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    );
                  }
                  return null;
                })}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    aria-label="Go to next page"
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Next &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProjects;
