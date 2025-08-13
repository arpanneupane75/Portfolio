import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-light border-top pt-5 pb-4 px-3">
      <div className="container">
        <div className="row gy-4">

          {/* About Section */}
          <div className="col-md-4">
            <h5 className="mb-3 text-primary fw-bold">About Me</h5>
            <p className="text-muted small">
              I'm Arpan Neupane — a Data Science Engineer & Full-Stack Developer.
              I specialize in building scalable applications and applying machine learning
              to solve complex real-world problems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="mb-3 text-primary fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-decoration-none text-muted">About</a></li>
              <li><a href="#projects" className="text-decoration-none text-muted">Projects</a></li>
              <li><a href="#contact" className="text-decoration-none text-muted">Contact</a></li>
              <li>
                <a 
                  href="/Final_CV_2.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-decoration-none text-muted"
                  download
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-5">
            <h5 className="mb-3 text-primary fw-bold">Contact</h5>
            <ul className="list-unstyled text-muted small">
              <li className="d-flex align-items-center mb-2">
                <Mail size={18} className="me-2" />
                <a href="mailto:arpanneupane75@gmail.com" className="text-decoration-none text-muted">
                  arpanneupane75@gmail.com
                </a>
              </li>
              <li className="d-flex align-items-center mb-2">
                <Phone size={18} className="me-2" />
                <a href="tel:+9779869540374" className="text-decoration-none text-muted">
                  +977-9869540374
                </a>
              </li>
              <li className="d-flex align-items-center">
                <Linkedin size={18} className="me-2" />
                <a 
                  href="https://linkedin.com/in/arpan-neupane-232a861b2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-muted"
                >
                  linkedin.com/in/arpan-neupane-232a861b2
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <small className="text-muted mb-3 mb-md-0">
            © {new Date().getFullYear()} Arpan Neupane. All rights reserved.
          </small>

          <ul className="nav gap-3">
            <li>
              <a 
                href="https://www.instagram.com/arpanneupane75/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
            </li>
            <li>
              <a 
                href="https://www.facebook.com/neupane.arpan75" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com/arpanneupane75" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted"
                aria-label="Twitter"
              >
                <Twitter size={22} />
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/arpanneupane75" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
