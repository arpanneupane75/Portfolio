import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const categories = [
  "Web Development",
  "Mobile App",
  "Data Science",
  "Machine Learning",
  "Other",
];

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    customCategory: "",
    technologiesInput: "",
    featuresInput: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
  });

  // Tags
  const [technologies, setTechnologies] = useState([]);
  const [features, setFeatures] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [validated, setValidated] = useState(false);

  const imagePreviewRef = useRef(null);

  // Fetch project data on mount
  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5001/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const project = res.data;

        // If category is not in predefined list, set customCategory and clear category select
        const catInList = categories.includes(project.category);
        setFormData({
          title: project.title || "",
          description: project.description || "",
          category: catInList ? project.category : "Other",
          customCategory: catInList ? "" : project.category || "",
          technologiesInput: "",
          featuresInput: "",
          imageUrl: project.imageUrl || "",
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
        });

        setTechnologies(project.technologies || []);
        setFeatures(project.features || []);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setStatus({ message: "Failed to load project.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add tag (technology or feature)
  const addTag = (type) => {
    const inputName = type === "tech" ? "technologiesInput" : "featuresInput";
    const tagList = type === "tech" ? technologies : features;
    const inputVal = formData[inputName].trim();
    if (!inputVal) return;

    const newTags = inputVal
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !tagList.includes(t));

    if (newTags.length === 0) return;

    if (type === "tech") {
      setTechnologies([...technologies, ...newTags]);
      setFormData((prev) => ({ ...prev, technologiesInput: "" }));
    } else {
      setFeatures([...features, ...newTags]);
      setFormData((prev) => ({ ...prev, featuresInput: "" }));
    }
  };

  // Remove tag
  const removeTag = (type, tag) => {
    if (type === "tech") {
      setTechnologies(technologies.filter((t) => t !== tag));
    } else {
      setFeatures(features.filter((f) => f !== tag));
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.title.trim()) return false;
    if (!formData.description.trim()) return false;

    // category required: either selected from list (except empty) or customCategory filled if "Other"
    if (!formData.category) return false;
    if (formData.category === "Other" && !formData.customCategory.trim()) return false;

    return true;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setValidated(true);
      setStatus({ message: "Please fill all required fields.", type: "error" });
      return;
    }

    setLoading(true);
    setStatus(null);

    const token = localStorage.getItem("token");

    const finalCategory =
      formData.category === "Other" ? formData.customCategory.trim() : formData.category;

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: finalCategory,
      technologies,
      features,
      imageUrl: formData.imageUrl.trim() || null,
      liveUrl: formData.liveUrl.trim() || null,
      githubUrl: formData.githubUrl.trim() || null,
    };

    try {
      await axios.put(`http://localhost:5001/api/projects/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStatus({ message: "Project updated successfully!", type: "success" });
      setValidated(false);
      setTimeout(() => navigate("/admin/dashboard/projects"), 1500);
    } catch (error) {
      console.error("Error updating project:", error);
      setStatus({ message: "Failed to update project.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const renderImagePreview = () => {
    if (!formData.imageUrl) return null;
    return (
      <img
        src={formData.imageUrl}
        alt="Project Preview"
        className="img-fluid rounded"
        style={{ maxHeight: "180px", objectFit: "contain" }}
        ref={imagePreviewRef}
        onError={() => {
          if (imagePreviewRef.current) imagePreviewRef.current.style.display = "none";
        }}
        onLoad={() => {
          if (imagePreviewRef.current) imagePreviewRef.current.style.display = "block";
        }}
      />
    );
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <h2 className="mb-4 text-primary text-center">Edit Project</h2>

      {status && (
        <div
          className={`alert alert-${status.type === "success" ? "success" : "danger"} alert-dismissible fade show`}
          role="alert"
          aria-live="assertive"
        >
          {status.message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setStatus(null)}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className={validated ? "was-validated" : ""}>
        <div className="row g-4">
          {/* Left column */}
          <div className="col-lg-7">
            <div className="card shadow-sm p-4">
              {/* Title */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-semibold">
                  Project Title <span className="text-danger">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className={`form-control ${validated && !formData.title.trim() ? "is-invalid" : ""}`}
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoFocus
                />
                <div className="invalid-feedback">Project title is required.</div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-control ${validated && !formData.description.trim() ? "is-invalid" : ""}`}
                  rows={5}
                  placeholder="Describe your project"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <div className="invalid-feedback">Description is required.</div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label htmlFor="category" className="form-label fw-semibold">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className={`form-select ${validated && !formData.category ? "is-invalid" : ""}`}
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Please select a category.</div>
              </div>

              {/* Custom Category Input, only shown if category === "Other" */}
              {formData.category === "Other" && (
                <div className="mb-3">
                  <label htmlFor="customCategory" className="form-label fw-semibold">
                    Enter Custom Category <span className="text-danger">*</span>
                  </label>
                  <input
                    id="customCategory"
                    type="text"
                    name="customCategory"
                    className={`form-control ${
                      validated && !formData.customCategory.trim() ? "is-invalid" : ""
                    }`}
                    placeholder="Enter custom category"
                    value={formData.customCategory}
                    onChange={handleChange}
                    disabled={loading}
                    required={formData.category === "Other"}
                  />
                  <div className="invalid-feedback">Custom category is required.</div>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="col-lg-5">
            {/* Technologies */}
            <div className="card shadow-sm p-4 mb-4">
              <h5 className="mb-3 text-secondary">Technologies</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="technologiesInput"
                  className="form-control"
                  placeholder="Add technology and press Add or Enter"
                  value={formData.technologiesInput}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag("tech");
                    }
                  }}
                  disabled={loading}
                  aria-label="Add technology"
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => addTag("tech")}
                  disabled={loading || !formData.technologiesInput.trim()}
                  aria-label="Add technology"
                >
                  Add
                </button>
              </div>
              <div className="mb-3">
                {technologies.length > 0 ? (
                  technologies.map((tech) => (
                    <span
                      key={tech}
                      className="badge bg-primary me-2 mb-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeTag("tech", tech)}
                      title="Click to remove"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && removeTag("tech", tech)}
                    >
                      {tech} &times;
                    </span>
                  ))
                ) : (
                  <small className="text-muted">No technologies added yet.</small>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="card shadow-sm p-4 mb-4">
              <h5 className="mb-3 text-secondary">Features</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="featuresInput"
                  className="form-control"
                  placeholder="Add feature and press Add or Enter"
                  value={formData.featuresInput}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag("feature");
                    }
                  }}
                  disabled={loading}
                  aria-label="Add feature"
                />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => addTag("feature")}
                  disabled={loading || !formData.featuresInput.trim()}
                  aria-label="Add feature"
                >
                  Add
                </button>
              </div>
              <div className="mb-3">
                {features.length > 0 ? (
                  features.map((feat) => (
                    <span
                      key={feat}
                      className="badge bg-success me-2 mb-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeTag("feature", feat)}
                      title="Click to remove"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && removeTag("feature", feat)}
                    >
                      {feat} &times;
                    </span>
                  ))
                ) : (
                  <small className="text-muted">No features added yet.</small>
                )}
              </div>
            </div>

            {/* Links & Image */}
            <div className="card shadow-sm p-4">
              <h5 className="mb-3 text-secondary">Links & Image</h5>

              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label fw-semibold">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  name="imageUrl"
                  className="form-control"
                  placeholder="https://example.com/image.png"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  disabled={loading}
                  aria-describedby="imageHelp"
                />
                <div id="imageHelp" className="form-text mb-2">
                  Optional. Must be a valid image URL.
                </div>
                {renderImagePreview()}
              </div>

              <div className="mb-3">
                <label htmlFor="liveUrl" className="form-label fw-semibold">
                  Live URL
                </label>
                <input
                  id="liveUrl"
                  type="url"
                  name="liveUrl"
                  className="form-control"
                  placeholder="https://live-demo.com"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="githubUrl" className="form-label fw-semibold">
                  GitHub URL
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  name="githubUrl"
                  className="form-control"
                  placeholder="https://github.com/username/repo"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons row */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg px-5"
            disabled={loading}
            aria-live="polite"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Updating...
              </>
            ) : (
              "Update Project"
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-5"
            onClick={() => {
              // Reset to original fetched data
              setLoading(true);
              setStatus(null);
              (async () => {
                const token = localStorage.getItem("token");
                try {
                  const res = await axios.get(`http://localhost:5001//api/projects/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  const project = res.data;

                  const catInList = categories.includes(project.category);

                  setFormData({
                    title: project.title || "",
                    description: project.description || "",
                    category: catInList ? project.category : "Other",
                    customCategory: catInList ? "" : project.category || "",
                    technologiesInput: "",
                    featuresInput: "",
                    imageUrl: project.imageUrl || "",
                    liveUrl: project.liveUrl || "",
                    githubUrl: project.githubUrl || "",
                  });

                  setTechnologies(project.technologies || []);
                  setFeatures(project.features || []);
                } catch (error) {
                  setStatus({ message: "Failed to reset form.", type: "error" });
                } finally {
                  setLoading(false);
                }
              })();
            }}
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
