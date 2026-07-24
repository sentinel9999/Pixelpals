'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import ServiceCard from '@/components/ServiceCard';
import QuoteModal from '@/components/QuoteModal';
import GalleryModal from '@/components/GalleryModal';
import { SERVICES } from '@/data/pixelpalsData';

const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } } };

export default function Home() {
  const [modalMode, setModalMode] = useState<'contacto' | 'cotizacion'>('contacto');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const openQuoteModal = (mode: 'contacto' | 'cotizacion') => {
    setModalMode(mode);
    setIsQuoteOpen(true);
  };

  const openGallery = (id: string) => {
    setActiveServiceId(id);
    setIsGalleryOpen(true);
  };

  return (
    <SmoothScroll>
      <Navbar onOpenModal={openQuoteModal} />

      {/* HERO HEADER */}
      <header id="inicio" className="hero">
        <div className="container">
          <motion.div className="row align-items-center" variants={staggerContainer} initial="hidden" animate="show">
            <div className="col-lg-7">
              <motion.h1 variants={fadeUp} className="display-2 fw-bold mb-4 header-title text-white">
                Ingeniería que <br /><span className="text-gradient">conecta</span> el futuro.
              </motion.h1>
              <motion.p variants={fadeUp} className="lead mb-5 opacity-75 speech-text text-white">
                Expertos en automatización, redes y desarrollo de soluciones tecnológicas adaptadas a tus necesidades.
              </motion.p>
              <motion.div variants={fadeUp} className="d-flex gap-3 flex-wrap">
                <button onClick={() => openQuoteModal('contacto')} className="btn btn-gradient btn-lg px-5 shadow">Contacto</button>
                <button onClick={() => openQuoteModal('cotizacion')} className="btn btn-outline-light btn-lg rounded-pill px-4 btn-custom-outline">Solicitar Cotización</button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* PORTAFOLIO DE SERVICIOS */}
      <section id="servicios" className="section-services">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-5">
            <motion.h6 variants={fadeUp} className="text-info fw-bold text-uppercase tracking-wider section-subtitle">Lo que hacemos</motion.h6>
            <motion.h2 variants={fadeUp} className="display-5 fw-bold title-tech text-dark">Servicios de Vanguardia</motion.h2>
            <motion.div variants={fadeUp} className="mx-auto bg-info mt-3 pipeline-indicator"></motion.div>
          </motion.div>

          <div className="row g-4" id="gridServicios">
            {SERVICES.map((service, index) => (
              <ServiceCard 
                key={service.id} index={index} {...service}
                onOpenGallery={openGallery}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <header id="nosotros" className="hero2">
        <div className="container">
          <div className="row align-items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="col-lg-6 mb-4 mb-lg-0">
              <div className="about-card p-4 p-md-5">
                <h2 className="display-5 fw-bold mb-4 header-title text-white">¿Quiénes Somos?</h2>
                <p className="lead mb-4 speech-text text-white-50 fs-6 text-align-justify">
                  En PixelPals, transformamos ideas en soluciones tecnológicas innovadoras. Somos un equipo de ingenieros y técnicos especializados en mecatrónica, electrónica, automatización y desarrollo de sistemas inteligentes.
                </p>
                <p className="lead mb-4 speech-text text-white-50 fs-6 text-align-justify">
                  Desde sistemas de automatización, domótica e Internet de las Cosas (IoT) hasta el desarrollo de hardware y software, nuestro objetivo es ofrecer herramientas que simplifiquen procesos y aporten valor a cada proyecto.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" as const }} viewport={{ once: true }} className="col-lg-6 text-center">
              <img src="/IMG/Fondos/lobo.jpeg" alt="Equipo" className="img-fluid rounded-4 shadow-lg" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* FOOTER */}
      <footer id="contactos" className="bg-dark text-white py-5 position-relative footer-tech">
        <div className="container text-center">
          <h3 className="fw-bold mb-3 brand-footer">Pixel<span className="text-info">Pals</span></h3>
          <p className="opacity-75 tech-sub">Innovación aplicada en Mecatrónica & Automatización Industrial.</p>
          <div className="d-flex justify-content-center gap-4 my-4">
            <a href="#" className="social-link-icon"><i className="bi bi-linkedin"></i></a>
            <a href="#" className="social-link-icon"><i className="bi bi-github"></i></a>
          </div>
          <hr className="my-4 opacity-10" />
          <p className="small mb-0 opacity-50">&copy; 2026 PixelPals. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* MODALS RENDERIZADOS CONDICIONALMENTE */}
      <QuoteModal isOpen={isQuoteOpen} mode={modalMode} onClose={() => setIsQuoteOpen(false)} />
      <GalleryModal isOpen={isGalleryOpen} serviceId={activeServiceId} onClose={() => setIsGalleryOpen(false)} />
    </SmoothScroll>
  );
}