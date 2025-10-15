import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Leva sekcija */}
        <div className="footer-section about">
          <h3>Velvet Skills</h3>
          <p>
            Velvet Skills je platforma koja povezuje učenje, napredak i lični
            razvoj kroz moderne tehnologije. Tvoj prostor za rast i inspiraciju.
          </p>
        </div>

        {/* Srednja sekcija */}
        <div className="footer-section links">
          
          <ul>
           <li>
            <button
              type="button"
              className="footer-btn"
              onClick={() => window.open("https://en.wikipedia.org/wiki/Credential", "_blank", "noopener,noreferrer")}
            >
              O kredencijalima
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-btn"
              onClick={() => window.open("https://www.fon.bg.ac.rs/", "_blank", "noopener,noreferrer")}
            >
              FON
            </button>
          </li>
          </ul>
        </div>

        {/* Desna sekcija */}
        <div className="footer-section contact">
          <h4>Kontakt</h4>
          <p>📧 info@velvetskills.com</p>
          <div className="footer-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Velvet Skills. Sva prava zadržana.</p>
      </div>
    </footer>
  );
};

export default Footer;
