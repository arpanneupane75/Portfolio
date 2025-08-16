// import { useEffect, useState } from "react";
// import { Github, Globe } from "lucide-react";
// import axios from "axios";
// import "../App.css"; // Assuming you have a CSS file for styling

// const dummyProjects = [
//   {
//     _id: "1",
//     title: "Portfolio Website",
//     description: "A personal portfolio website to showcase projects and skills.",
//     imageUrl: "https://via.placeholder.com/400x180.png?text=Portfolio+Image",
//     liveUrl: "https://portfolio-arpan-neupanes-projects-676ecedb.vercel.app/",
//     githubUrl: "https://github.com/arpanneupane75/portfolio",
//     technologies: ["React", "Bootstrap", "Node.js"],
//     features: [
//       "Responsive design",
//       "Dark mode toggle",
//       "Smooth scrolling navigation",
//     ],
//   },
//   {
//     _id: "2",
//     title: "Medical Chatbot",
//     description: "An intelligent medical chatbot that assists users in identifying symptoms and potential health conditions using AI/ML models.",
//     imageUrl: "client/public/Medibot.png",
//     liveUrl: "https://medicalchatbot.example.com", // Replace with actual live URL if available
//     githubUrl: "https://github.com/arpanneupane75/Medical-chatbot",
//     technologies: ["Python", "Streamlit", "LangChain", "OpenAI", "Pandas"],
//     features: [
//       "Natural language symptom analysis",
//       "AI-driven health condition suggestions",
//       "Interactive and user-friendly UI",
//       "Streamlit-based real-time interaction",
//       "Supports large-scale medical data processing"
//     ]
//   }
// ]

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await axios.get("https://portfolio-r436.onrender.com/api/projects",
//   {
//     headers: {
//       Authorization: `Bearer ${token}`, // JWT goes here
//     },
//   }
// );

//         if (Array.isArray(res.data) && res.data.length > 0) {
//           setProjects(res.data);
//         } else {
//           setProjects(dummyProjects); // fallback to dummy if empty
//         }
//       } catch (error) {
//         console.error("Error fetching projects:", error.message);
//         setProjects(dummyProjects); // fallback to dummy if error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-5 fs-5">Loading projects...</p>;
//   }

//   return (
//     <section
//       id="projects"
//       className="projects-section container my-5"
//       aria-label="Projects section"
//     >
//       <header className="projects-header mb-4 text-center">
//         <h2 className="projects-title display-4 fw-bold text-gradient">
//           My Projects
//         </h2>
//         <p className="projects-subtitle text-muted fs-5">
//           Some of my recent work and personal projects.
//         </p>
//       </header>

//       <div className="projects-grid row g-4" style={{ marginTop: "1rem" }}>
//         {projects.map((project) => (
//           <article
//             key={project._id}
//             className="project-card col-sm-12 col-md-6 col-lg-4 card h-100 shadow-lg border-0 rounded-4 overflow-hidden"
//             aria-label={`Project: ${project.title}`}
//           >
//             {project.imageUrl && (
//               <div className="image-wrapper overflow-hidden rounded-top">
//                 <img
//                   src={project.imageUrl}
//                   alt={`Screenshot of ${project.title}`}
//                   loading="lazy"
//                   className="card-img-top project-img"
//                 />
//               </div>
//             )}

//             <div className="card-body d-flex flex-column">
//               <h3 className="project-title card-title fs-3 fw-semibold text-primary">
//                 {project.title}
//               </h3>
//               <p
//                 className="project-description text-secondary flex-grow-1"
//                 style={{ minHeight: "3.5rem" }}
//               >
//                 {project.description}
//               </p>

//               <div className="project-tech mb-3" aria-label="Technologies used">
//                 {(project.technologies ?? []).map((tech, idx) => (
//                   <span
//                     key={idx}
//                     className="badge tech-badge me-2 mb-2"
//                     aria-label={`Technology: ${tech}`}
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>

//               {(project.features ?? []).length > 0 && (
//                 <div className="project-features mb-3">
//                   <h4 className="fs-6 text-primary fw-semibold mb-2">
//                     Key Features
//                   </h4>
//                   <ul className="ps-3 mb-0 feature-list">
//                     {project.features.map((feature, idx) => (
//                       <li key={idx}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             <footer className="project-footer card-footer d-flex justify-content-start gap-3 flex-wrap">
//               {project.liveUrl && (
//                 <a
//                   href={project.liveUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="btn btn-success btn-sm d-flex align-items-center gap-1 shadow-sm btn-gradient"
//                   aria-label={`Live or Demo of ${project.title}`}
//                 >
//                   <Globe size={18} />
//                   Live Demo
//                 </a>
//               )}
//               {project.githubUrl && (
//                 <a
//                   href={project.githubUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="btn btn-dark btn-sm d-flex align-items-center gap-1 shadow-sm btn-gradient"
//                   aria-label={`GitHub repository of ${project.title}`}
//                 >
//                   <Github size={18} />
//                   GitHub
//                 </a>
//               )}
//             </footer>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// };

// // export default Projects;
// import { useEffect, useState } from "react";
// import { Github, Globe } from "lucide-react";
// import axios from "axios";
// import "../App.css";

// const dummyProjects = [
//   {
//     _id: "1",
//     title: "Portfolio Website",
//     description: "A personal portfolio website to showcase projects and skills.",
//     imageUrl: "https://via.placeholder.com/400x180.png?text=Portfolio+Image",
//     liveUrl: "https://portfolio-arpan-neupanes-projects-676ecedb.vercel.app/",
//     githubUrl: "https://github.com/arpanneupane75/portfolio",
//     technologies: ["React", "Bootstrap", "Node.js"],
//     features: ["Responsive design", "Dark mode toggle", "Smooth scrolling navigation"],
//   },
//   {
//     _id: "2",
//     title: "Medical Chatbot",
//     description: "An intelligent medical chatbot that assists users in identifying symptoms and potential health conditions using AI/ML models.",
//     imageUrl: "client/public/Medibot.png",
//     liveUrl: "https://medicalchatbot.example.com",
//     githubUrl: "https://github.com/arpanneupane75/Medical-chatbot",
//     technologies: ["Python", "Streamlit", "LangChain", "OpenAI", "Pandas"],
//     features: [
//       "Natural language symptom analysis",
//       "AI-driven health condition suggestions",
//       "Interactive and user-friendly UI",
//       "Streamlit-based real-time interaction",
//       "Supports large-scale medical data processing",
//     ],
//   },
// ];

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setProjects(dummyProjects);
//           return;
//         }
//         const res = await axios.get("https://portfolio-r436.onrender.com/api/projects", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProjects(Array.isArray(res.data) && res.data.length ? res.data : dummyProjects);
//       } catch (error) {
//         console.error("Error fetching projects:", error.response?.data || error.message);
//         setProjects(dummyProjects);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   if (loading) return <p className="text-center mt-5 fs-5">Loading projects...</p>;

//   return (
//     <section id="projects" className="projects-section container my-5" aria-label="Projects section">
//       <header className="projects-header mb-4 text-center">
//         <h2 className="projects-title display-4 fw-bold text-gradient">My Projects</h2>
//         <p className="projects-subtitle text-muted fs-5">Some of my recent work and personal projects.</p>
//       </header>

//       <div className="projects-grid row g-4" style={{ marginTop: "1rem" }}>
//         {projects.map((project) => (
//           <article
//             key={project._id}
//             className="project-card col-sm-12 col-md-6 col-lg-4 card h-100 shadow-lg border-0 rounded-4 overflow-hidden"
//             aria-label={`Project: ${project.title}`}
//           >
//             {project.imageUrl && (
//               <div className="image-wrapper overflow-hidden rounded-top">
//                 <img src={project.imageUrl} alt={`Screenshot of ${project.title}`} loading="lazy" className="card-img-top project-img" />
//               </div>
//             )}
//             <div className="card-body d-flex flex-column">
//               <h3 className="project-title card-title fs-3 fw-semibold text-primary">{project.title}</h3>
//               <p className="project-description text-secondary flex-grow-1" style={{ minHeight: "3.5rem" }}>{project.description}</p>

//               <div className="project-tech mb-3" aria-label="Technologies used">
//                 {(project.technologies ?? []).map((tech, idx) => (
//                   <span key={idx} className="badge tech-badge me-2 mb-2" aria-label={`Technology: ${tech}`}>{tech}</span>
//                 ))}
//               </div>

//               {(project.features ?? []).length > 0 && (
//                 <div className="project-features mb-3">
//                   <h4 className="fs-6 text-primary fw-semibold mb-2">Key Features</h4>
//                   <ul className="ps-3 mb-0 feature-list">
//                     {project.features.map((feature, idx) => (
//                       <li key={idx}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             <footer className="project-footer card-footer d-flex justify-content-start gap-3 flex-wrap">
//               {project.liveUrl && (
//                 <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm d-flex align-items-center gap-1 shadow-sm btn-gradient" aria-label={`Live or Demo of ${project.title}`}>
//                   <Globe size={18} /> Live Demo
//                 </a>
//               )}
//               {project.githubUrl && (
//                 <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm d-flex align-items-center gap-1 shadow-sm btn-gradient" aria-label={`GitHub repository of ${project.title}`}>
//                   <Github size={18} /> GitHub
//                 </a>
//               )}
//             </footer>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Projects;

// export default Projects;
import { useEffect, useState } from "react";
import { Github, Globe } from "lucide-react";
import axios from "axios";
import "../App.css";

const dummyProjects = [
  {
    _id: "1",
    title: "Nepali AI Studio: Speech to Text + Summarization",
    description:
      "Full-stack web app for real-time Nepali speech-to-text transcription and summarization with an interactive Streamlit UI.",
    githubUrl: "https://github.com/arpanneupane75/Nepali-Speech-Recognition-Summarizer",
    technologies: ["Python", "Streamlit", "PyTorch", "Hugging Face Transformers", "Sounddevice", "Soundfile", "Librosa"],
    features: [
      "Real-time Nepali speech-to-text transcription",
      "Text summarization using pre-trained Hugging Face models",
      "Audio recording and file upload",
      "Interactive and custom-styled Streamlit UI",
      "Session management and user feedback integration",
    ],
  },
  {
    _id: "2",
    title: "VisionQAI – Advanced Continuous Live VQA System",
    description:
      "Real-time Visual Question Answering platform supporting webcam, uploaded images, voice input, and text-to-speech output.",
    githubUrl: "https://github.com/arpanneupane75/VisionQAI",
    technologies: ["Python", "Streamlit", "PyTorch", "Hugging Face Transformers", "OpenCV", "SpeechRecognition", "gTTS"],
    features: [
      "Live webcam and uploaded image analysis",
      "Voice input and text-to-speech output",
      "Confidence scoring and batch question processing",
      "JSON session export",
      "Hardware-aware deployment (CPU, GPU, Apple MPS)",
    ],
  },
  {
    _id: "3",
    title: "AI Document Verification System",
    description:
      "Real-time system for secure ID and facial verification using OCR and face matching.",
    githubUrl: "https://github.com/arpanneupane75/AI-Document-Verification",
    technologies: ["Django", "React", "TrOCR", "YOLOv8"],
    features: [
      "Secure ID and facial verification",
      "Advanced OCR integration",
      "Face matching for security",
      "Real-time verification system",
    ],
  },
  {
    _id: "4",
    title: "Domain-Specific Chatbot",
    description:
      "Context-aware conversational AI trained on custom datasets for precise and relevant user interactions.",
    githubUrl: "https://github.com/arpanneupane75/Domain-Chatbot",
    technologies: ["LangChain", "LLMs", "Streamlit"],
    features: [
      "Context-aware conversational AI",
      "Trained on custom datasets",
      "Precise and relevant user responses",
      "Streamlit-based interface",
    ],
  },
  {
    _id: "5",
    title: "Automated MCQ Generator",
    description:
      "Intelligent tool that automatically generates multiple-choice questions from text for educational platforms.",
    githubUrl: "https://github.com/arpanneupane75/MCQ-Generator",
    technologies: ["Python", "NLP", "spaCy"],
    features: [
      "Automatic generation of multiple-choice questions",
      "Supports diverse question formats",
      "Streamlines educational content creation",
      "Text processing with NLP",
    ],
  },
  {
    _id: "6",
    title: "Global COVID-19 Data Dashboard",
    description:
      "Interactive dashboard providing dynamic visualizations and insights into global COVID-19 trends.",
    githubUrl: "https://github.com/arpanneupane75/COVID-Dashboard",
    technologies: ["Pandas", "Matplotlib", "Interactive Plotting"],
    features: [
      "Interactive global COVID-19 visualizations",
      "Dynamic data analysis",
      "Insightful trends and statistics",
      "Supports data-driven decision-making",
    ],
  },
  {
    _id: "7",
    title: "AI Resume Screening & Ranking System",
    description:
      "AI-powered resume ranking system that matches resumes with job descriptions using TF-IDF and BERT similarity.",
    githubUrl: "https://github.com/arpanneupane75/AI-Resume-Screener",
    technologies: ["Python", "Streamlit", "spaCy", "BERT", "TF-IDF"],
    features: [
      "Extracts text from resumes (PDF/DOCX)",
      "Computes TF-IDF and BERT similarity with job descriptions",
      "Calculates skill match scores",
      "Visualizes top resumes",
      "Download and search functionality",
    ],
  },
  {
    _id: "8",
    title: "Car Price Prediction Application",
    description:
      "ML application predicting car prices using multiple regression models with a real-time Streamlit interface.",
    githubUrl: "https://github.com/arpanneupane75/Car-Price-Predictor",
    technologies: ["Python", "Scikit-learn", "Streamlit"],
    features: [
      "Predicts car prices using multiple regression models",
      "Real-time predictions with Streamlit UI",
      "Supports SVR, KNN, Polynomial, Lasso, Ridge, ElasticNet models",
      "Interactive and user-friendly interface",
    ],
  },
  {
    _id: "9",
    title: "Cardiovascular Disease Prediction System",
    description:
      "End-to-end ML workflow for early detection of CVD with real-time predictions and interactive interface.",
    githubUrl: "https://github.com/arpanneupane75/CVD-Predictor",
    technologies: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    features: [
      "Early detection of cardiovascular disease",
      "Analyzes patient data",
      "Trains multiple ML models",
      "Real-time predictions through interactive interface",
    ],
  },
];


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setProjects(dummyProjects);
          return;
        }
        const res = await axios.get("https://portfolio-r436.onrender.com/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(Array.isArray(res.data) && res.data.length ? res.data : dummyProjects);
      } catch (error) {
        console.error("Error fetching projects:", error.response?.data || error.message);
        setProjects(dummyProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center mt-5 fs-5">Loading projects...</p>;

  return (
    <section id="projects" className="projects-section container my-5" aria-label="Projects section">
      <header className="projects-header mb-4 text-center">
        <h2 className="projects-title display-4 fw-bold text-gradient">My Projects</h2>
        <p className="projects-subtitle text-muted fs-5">Some of my recent work and personal projects.</p>
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
                <img src={project.imageUrl} alt={`Screenshot of ${project.title}`} loading="lazy" className="card-img-top project-img" />
              </div>
            )}
            <div className="card-body d-flex flex-column">
              <h3 className="project-title card-title fs-3 fw-semibold text-primary">{project.title}</h3>
              <p className="project-description text-secondary flex-grow-1" style={{ minHeight: "3.5rem" }}>{project.description}</p>

              <div className="project-tech mb-3" aria-label="Technologies used">
                {(project.technologies ?? []).map((tech, idx) => (
                  <span key={idx} className="badge tech-badge me-2 mb-2" aria-label={`Technology: ${tech}`}>{tech}</span>
                ))}
              </div>

              {(project.features ?? []).length > 0 && (
                <div className="project-features mb-3">
                  <h4 className="fs-6 text-primary fw-semibold mb-2">Key Features</h4>
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
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm d-flex align-items-center gap-1 shadow-sm btn-gradient" aria-label={`Live or Demo of ${project.title}`}>
                  <Globe size={18} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm d-flex align-items-center gap-1 shadow-sm btn-gradient" aria-label={`GitHub repository of ${project.title}`}>
                  <Github size={18} /> GitHub
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




