import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Assuming you have a separate CSS file for styles
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim() || !email.trim() || !message.trim()) {
      return "All fields are required.";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setStatus({ type: "error", message: error });
      setShowStatus(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001//api/contact", formData);
      if (res.status === 201) {
        setStatus({ type: "success", message: "✅ Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: "❌ Failed to send message." });
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus({ type: "error", message: "❌ Something went wrong. Please try again." });
    } finally {
      setLoading(false);
      setShowStatus(true);
    }
  };

  // Auto-hide status after 5 seconds
  useEffect(() => {
    if (showStatus) {
      const timer = setTimeout(() => setShowStatus(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showStatus]);

  return (
    <>
      <section id="contact" className="contact-section" aria-label="Contact form">
        <h2 className="contact-title">Let’s Get In Touch</h2>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="input-group">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="floating-textarea"
              placeholder=" "
            />
            <label htmlFor="message">Your Message</label>
          </div>

          <button type="submit" className="contact-btn" disabled={loading}>
            {loading ? "Sending..." : "📤 Send Message"}
          </button>
        </form>

        {showStatus && (
          <p
            className={`contact-status ${status.type === "success" ? "text-success" : "text-danger"} fade-in`}
            role="alert"
          >
            {status.message}
          </p>
        )}
      </section>

      <style>{`
        /* Container */
        .contact-section {
          max-width: 480px;
          margin: 3rem auto;
          padding: 2rem 2.5rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #f9faff, #e0f7ff);
          box-shadow:
            0 10px 30px rgba(0, 123, 255, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.07);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
          user-select: none;
        }

        /* Title */
        .contact-title {
          text-align: center;
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #007bff;
          letter-spacing: 1.1px;
          text-shadow: 1px 1px 3px rgba(0,123,255,0.3);
        }

        /* Form layout */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Floating label container */
        .input-group {
          position: relative;
          width: 100%;
        }

        /* Inputs & Textarea */
        .floating-input,
        .floating-textarea {
          width: 100%;
          padding: 1.2rem 1rem 0.4rem 1rem;
          font-size: 1rem;
          border: 2px solid #c4d7f5;
          border-radius: 10px;
          background: #fff;
          resize: vertical;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .floating-input:focus,
        .floating-textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
          outline: none;
        }

        /* Hide placeholder, but keep space */
        .floating-input::placeholder,
        .floating-textarea::placeholder {
          color: transparent;
        }

        /* Floating labels */
        label {
          position: absolute;
          top: 1.1rem;
          left: 1rem;
          font-size: 1rem;
          color: #6c757d;
          pointer-events: none;
          transition: all 0.25s ease;
          background: #f9faff;
          padding: 0 0.3rem;
          border-radius: 4px;
          user-select: none;
        }

        /* Move label up when input has value or focus */
        .floating-input:focus + label,
        .floating-input:not(:placeholder-shown) + label,
        .floating-textarea:focus + label,
        .floating-textarea:not(:placeholder-shown) + label {
          top: 0.2rem;
          font-size: 0.8rem;
          color: #007bff;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        /* Button */
        .contact-btn {
          padding: 0.8rem;
          font-size: 1.15rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(45deg, #007bff, #0056b3);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          user-select: none;
          box-shadow: 0 6px 15px rgba(0, 91, 187, 0.6);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.6rem;
        }
        .contact-btn:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px rgba(0, 91, 187, 0.8);
          animation: bounce 0.35s ease forwards;
        }
        .contact-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        /* Bounce animation for button */
        @keyframes bounce {
          0% { transform: translateY(-4px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(-4px); }
        }

        /* Status message */
        .contact-status {
          margin-top: 1.5rem;
          font-weight: 700;
          text-align: center;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .fade-in {
          animation: fadeInOpacity 0.5s ease forwards;
        }
        @keyframes fadeInOpacity {
          from {opacity: 0;}
          to {opacity: 1;}
        }

        .text-success {
          color: #28a745;
          text-shadow: 1px 1px 3px rgba(40, 167, 69, 0.6);
        }
        .text-danger {
          color: #dc3545;
          text-shadow: 1px 1px 3px rgba(220, 53, 69, 0.6);
        }

        /* Responsive tweaks */
        @media (max-width: 520px) {
          .contact-section {
            margin: 2rem 1rem;
            padding: 1.5rem 1.5rem;
          }
          .contact-title {
            font-size: 1.8rem;
          }
          .contact-btn {
            font-size: 1rem;
            padding: 0.7rem;
          }
        }
      `}</style>
    </>
  );
};

export default ContactForm;
