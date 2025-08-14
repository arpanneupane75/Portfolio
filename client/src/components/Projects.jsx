import { useEffect, useState } from "react";
import { Github, Globe } from "lucide-react";
import axios from "axios";
import "../App.css"; // Assuming you have a CSS file for styling

const dummyProjects = [
  {
    _id: "1",
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase projects and skills.",
    imageUrl: "https://via.placeholder.com/400x180.png?text=Portfolio+Image",
    liveUrl: "https://portfolio-arpan-neupanes-projects-676ecedb.vercel.app/",
    githubUrl: "https://github.com/arpanneupane75/portfolio",
    technologies: ["React", "Bootstrap", "Node.js"],
    features: [
      "Responsive design",
      "Dark mode toggle",
      "Smooth scrolling navigation",
    ],
  },
  {
    _id: "2",
    title: "Medical Chatbot",
    description: "An intelligent medical chatbot that assists users in identifying symptoms and potential health conditions using AI/ML models.",
    imageUrl: "client/public/Medibot.png",
    liveUrl: "https://medicalchatbot.example.com", // Replace with actual live URL if available
    githubUrl: "https://github.com/arpanneupane75/Medical-chatbot",
    technologies: ["Python", "Streamlit", "LangChain", "OpenAI", "Pandas"],
    features: [
      "Natural language symptom analysis",
      "AI-driven health condition suggestions",
      "Interactive and user-friendly UI",
      "Streamlit-based real-time interaction",
      "Supports large-scale medical data processing"
    ]
  }
]

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://portfolio-r436.onrender.com/api/projects", {
          withCredentials: true,
        });

        if (Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        } else {
          setProjects(dummyProjects); // fallback to dummy if empty
        }
      } catch (error) {
        console.error("Error fetching projects:", error.message);
        setProjects(dummyProjects); // fallback to dummy if error
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-center mt-5 fs-5">Loading projects...</p>;
  }

  return (
    <section
      id="projects"
      className="projects-section container my-5"
      aria-label="Projects section"
    >
      <header className="projects-header mb-4 text-center">
        <h2 className="projects-title display-4 fw-bold text-gradient">
          My Projects
        </h2>
        <p className="projects-subtitle text-muted fs-5">
          Some of my recent work and personal projects.
        </p>
      </header>

      <div className="projects-grid row g-4" style={{ marginTop: "1rem" }}>
        {projects.map((project) => (
          <article
            key={project._id}
            className="project-card col-sm-12 col-md-6 col-lg-4 card h-100 shadow-lg border-0 rounded-4 overflow-hidden"
            aria-label={`Project: ${project.title}`}
          >
            {project.imageUrl && (
              <div className="image-wrapper overflow-hidden rounded-top">
                <img
                  src={project.imageUrl}
                  alt={`Screenshot of ${project.title}`}
                  loading="lazy"
                  className="card-img-top project-img"
                />
              </div>
            )}

            <div className="card-body d-flex flex-column">
              <h3 className="project-title card-title fs-3 fw-semibold text-primary">
                {project.title}
              </h3>
              <p
                className="project-description text-secondary flex-grow-1"
                style={{ minHeight: "3.5rem" }}
              >
                {project.description}
              </p>

              <div className="project-tech mb-3" aria-label="Technologies used">
                {(project.technologies ?? []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="badge tech-badge me-2 mb-2"
                    aria-label={`Technology: ${tech}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(project.features ?? []).length > 0 && (
                <div className="project-features mb-3">
                  <h4 className="fs-6 text-primary fw-semibold mb-2">
                    Key Features
                  </h4>
                  <ul className="ps-3 mb-0 feature-list">
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <footer className="project-footer card-footer d-flex justify-content-start gap-3 flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-sm d-flex align-items-center gap-1 shadow-sm btn-gradient"
                  aria-label={`Live or Demo of ${project.title}`}
                >
                  <Globe size={18} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-sm d-flex align-items-center gap-1 shadow-sm btn-gradient"
                  aria-label={`GitHub repository of ${project.title}`}
                >
                  <Github size={18} />
                  GitHub
                </a>
              )}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
