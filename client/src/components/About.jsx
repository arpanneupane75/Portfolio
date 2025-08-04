const About = () => {
  const skills = [
    'Data Science', 'Machine Learning', 'Python', 'MERN Stack',
    'React.js', 'Node.js', 'Pandas', 'NumPy', 'SQL',
  ];

  return (
    <section
      className="container py-5"
      id="about"
      aria-label="About Arpan Neupane"
      style={{ scrollMarginTop: '80px' }}
    >
      <div className="row align-items-center gy-5">
        {/* Profile Image */}
        <div className="col-lg-5 text-center">
          <div
            className="rounded-circle overflow-hidden mx-auto shadow-lg"
            style={{
              width: '260px',
              height: '260px',
              transition: 'transform 0.4s ease',
              border: '4px solid #0d6efd',
            }}
          >
            <img
              src="https://avatars.githubusercontent.com/u/105156973?v=4"
              alt="Arpan Neupane profile"
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
        </div>

        {/* Bio + Skills */}
        <div className="col-lg-7">
          <h2 className="display-5 fw-bold mb-3 text-primary">About Me</h2>
          <p className="lead text-dark mb-3">
            I'm <strong>Arpan Neupane</strong>, a <span className="text-primary">Data Science Engineer</span> from Nepal, passionate about merging intelligent systems with real-world solutions.
          </p>
          <p className="text-secondary" style={{ fontSize: '1.05rem' }}>
            With a foundation in <strong>Computer Engineering</strong> from IOE and experience in full-stack web development, I focus on creating robust, data-powered software using tools like Python, React, and machine learning frameworks. I thrive on collaborative work, building scalable systems, and continual learning.
          </p>

          {/* Skills Section */}
          <div className="mt-4" aria-label="Technical Skills">
            <h5 className="fw-semibold text-dark mb-3">Skills & Technologies:</h5>
            <div className="d-flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="badge fs-6 px-3 py-2"
                  style={{
                    backgroundColor: '#f0f8ff',
                    color: '#0d6efd',
                    borderRadius: '2rem',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0d6efd';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f8ff';
                    e.currentTarget.style.color = '#0d6efd';
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
