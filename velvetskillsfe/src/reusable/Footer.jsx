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
          <h4>Korisni linkovi</h4>
          <ul>
            <li>
              <button className="footer-btn">O nama</button>
            </li>
            <li>
              <button className="footer-btn">Politika privatnosti</button>
            </li>
            <li>
              <button className="footer-btn">Podrška</button>
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
