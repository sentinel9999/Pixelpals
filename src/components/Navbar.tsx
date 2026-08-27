'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar({ onOpenModal }: { onOpenModal: (m: 'contacto') => void }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'shadow-lg' : ''}`}
      style={{ 
        backgroundColor: scrolled ? 'rgba(15, 17, 21, 0.95)' : 'rgba(15, 17, 21, 0.6)',
        backdropFilter: 'blur(14px)',
        transition: 'background-color 0.4s ease'
      }}
    >
      <div className="container">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <i className="bi bi-cpu-fill text-info me-2 anim-pulse" style={{ fontSize: '1.5rem' }}></i>
          Pixel<span className="text-info">Pals</span> 
        </a>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><a className="nav-link px-3" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link px-3" href="#servicios">Servicios</a></li>
            <li className="nav-item"><a className="nav-link px-3" href="#nosotros">Nosotros</a></li>
        
            <li className="nav-item ms-lg-3">
              <button 
                onClick={() => onOpenModal('contacto')}
                className="btn btn-info rounded-pill px-4 text-white btn-contact-nav"
              >
                Contacto
              </button>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}