'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { EVIDENCES_BY_SERVICE, SERVICES } from '@/data/pixelpalsData';

export default function GalleryModal({ isOpen, serviceId, onClose }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [isOpen, serviceId]);

  if (!isOpen || !serviceId) return null;

  const serviceInfo = SERVICES.find((s) => s.id === serviceId);
  const evidences = EVIDENCES_BY_SERVICE[serviceId] || [];
  const currentEvidence = evidences[currentIndex];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? evidences.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === evidences.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
        style={{ zIndex: 1055, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.95 }}
          className="modal-dialog modal-dialog-centered w-100 px-3" 
          style={{ maxWidth: '850px' }}
        >
          <div className="modal-content border-0 shadow-lg style-modal-tech w-100 overflow-hidden">
            
            {/* Header del Modal */}
            <div className="modal-header border-0 bg-dark position-relative d-flex justify-content-between align-items-center px-4 py-3" style={{ borderRadius: '24px 24px 0 0' }}>
              <h5 className="modal-title fw-bold font-accent text-white m-0 d-flex align-items-center">
                <i className="bi bi-display text-info me-2"></i> 
                Evidencias: {serviceInfo?.title || 'Proyecto'}
              </h5>
              <button 
                type="button" 
                onClick={onClose} 
                className="d-flex align-items-center justify-content-center text-white rounded-circle border border-white/20 transition-all"
                style={{ width: '38px', height: '38px', background: 'rgba(255, 255, 255, 0.1)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Cuerpo del Modal */}
            <div className="modal-body p-4 bg-light">
              {evidences.length === 0 ? (
                <div className="text-center py-5 text-muted">No hay evidencias registradas para este servicio todavía.</div>
              ) : (
                <div className="position-relative">
                  <div className="rounded-4 shadow-sm bg-dark overflow-hidden">
                    
                    {/* Contenedor de Imagen */}
                    <div className="carousel-img-wrap position-relative d-flex align-items-center justify-content-center" style={{ height: '420px', background: '#080c14' }}>
                      <img 
                        src={currentEvidence.src} 
                        className="d-block w-100 h-100" 
                        style={{ objectFit: 'contain' }} 
                        alt={currentEvidence.desc} 
                      />
                      
                      {/* Botón flotante dinámico */}
                      {currentEvidence.link && (
                        <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 10 }}>
                          <a 
                            href={currentEvidence.link} 
                            target={currentEvidence.link.startsWith('#') ? '_self' : '_blank'} 
                            rel="noopener noreferrer" 
                            onClick={() => {
                              if (currentEvidence.link.startsWith('#')) onClose();
                            }}
                            className="btn btn-gradient shadow-lg d-inline-flex align-items-center gap-2 fw-bold px-3 py-2 text-white"
                            style={{ fontSize: '0.85rem' }}
                          >
                            <ExternalLink size={16} /> {currentEvidence.buttonText || 'Ver Demo'}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Metadata y descripción */}
                    <div className="carousel-caption-custom position-relative p-3">
                      <div className="d-flex flex-wrap gap-2 mb-2 align-items-center justify-content-between">
                        <div className="d-flex flex-wrap gap-2">
                          {currentEvidence.fecha && (
                            <span className="evidence-meta-badge"><i className="bi bi-calendar me-1"></i> {currentEvidence.fecha}</span>
                          )}
                          
                        </div>
                        {evidences.length > 1 && (
                          <span className="text-white-50 small font-accent">
                            {currentIndex + 1} de {evidences.length}
                          </span>
                        )}
                      </div>
                      <p className="mb-0 text-white-50 small text-start">{currentEvidence.desc}</p>
                    </div>

                  </div>

                  {/* Flechas de navegación */}
                  {evidences.length > 1 && (
                    <>
                      <button 
                        onClick={prevSlide}
                        className="position-absolute top-50 start-0 translate-middle-y btn btn-dark bg-opacity-75 text-white border-0 ms-2 rounded-circle d-flex align-items-center justify-content-center shadow"
                        style={{ width: '45px', height: '45px', zIndex: 20 }}
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={nextSlide}
                        className="position-absolute top-50 end-0 translate-middle-y btn btn-dark bg-opacity-75 text-white border-0 me-2 rounded-circle d-flex align-items-center justify-content-center shadow"
                        style={{ width: '45px', height: '45px', zIndex: 20 }}
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}