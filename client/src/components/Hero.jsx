import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`hero-section py-5 border-bottom ${
        isVisible ? "fade-in" : "opacity-0"
      }`}
      aria-label="Introduction and Hero Section"
      style={{ transition: "opacity 1s ease-in-out" }}
    >
      <div className="container hero-content d-flex flex-column flex-md-row align-items-center gap-4">
        {/* Left: Image */}
        <div className="hero-img-wrapper flex-shrink-0 text-center">
          <img
            className="profile-img shadow rounded-circle"
            src="https://avatars.githubusercontent.com/u/105156973?v=4"
            alt="Arpan Neupane"
            width={160}
            height={160}
            loading="lazy"
          />
        </div>

        {/* Right: Intro Text */}
        <div className="hero-text flex-grow-1 text-center text-md-start">
          <h1 className="display-4 fw-bold text-dark mb-3">Arpan Neupane</h1>
          <p className="fs-5 text-secondary mb-4">
            Data Science & Software Engineer | MERN Stack Developer | AI & ML Enthusiast
          </p>

          {/* Buttons */}
          <div className="hero-buttons d-flex justify-content-center justify-content-md-start gap-3 flex-wrap">
            <a
              href="/Updated_CV.pdf"
              className="btn btn-primary btn-lg shadow-sm hero-btn"
              download
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV of Arpan Neupane"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              style={{ transition: "transform 0.3s ease-in-out" }}
            >
              Download CV
            </a>

            <a
              href="#contact"
              className="btn btn-outline-dark btn-lg hero-btn"
              aria-label="Contact Arpan Neupane"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0d6efd";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#212529";
              }}
              style={{ transition: "all 0.3s ease-in-out", border: "2px solid #0d6efd" }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
