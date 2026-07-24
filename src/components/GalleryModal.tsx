'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { EVIDENCES_BY_SERVICE, SERVICES } from '@/data/pixelpalsData';
import { X } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function GalleryModal({ isOpen, serviceId, onClose }: any) {
  if (!isOpen || !serviceId) return null;
  const evidences = EVIDENCES_BY_SERVICE[serviceId] || [];
  const serviceName = SERVICES.find((s:any) => s.id === serviceId)?.title || '';

  return (
    <AnimatePresence>
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1055, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="modal-dialog modal-xl modal-dialog-centered w-100 px-3"
        >
          <div className="modal-content border-0 style-modal-tech text-white shadow-lg">
            
            {/* ENCABEZADO CON FLEXBOX: Título a la izquierda, Botón de cierre visible a la derecha */}
            <div className="modal-header border-0 bg-dark d-flex justify-content-between align-items-center px-4 py-3">
              <h5 className="modal-title fw-bold font-accent text-info m-0">Evidencias — {serviceName}</h5>
              <button 
                type="button" 
                onClick={onClose} 
                className="d-flex align-items-center justify-content-center text-white rounded-circle border border-white/20 transition-all"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  background: 'rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body p-4 bg-dark overflow-hidden">
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                coverflowEffect={{ rotate: 40, stretch: 0, depth: 250, modifier: 1, slideShadows: true }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                className="w-100 py-4"
              >
                {evidences.map((ev: any, idx: number) => (
                  <SwiperSlide key={idx} style={{ width: '800px', maxWidth: '90vw', height: '450px', backgroundColor: '#0b0f19' }} className="rounded-4 overflow-hidden position-relative">
                    <img src={ev.src} className="w-100 h-100" style={{ objectFit: 'contain' }} alt="Evidencia" />
                    <div className="position-absolute bottom-0 start-0 w-100 carousel-caption-custom" style={{ background: 'linear-gradient(to top, rgba(11, 15, 25, 0.95) 40%, transparent)' }}>
                      <div className="d-flex flex-wrap mb-2">
                         <span className="evidence-meta-badge"><i className="bi bi-person me-1"></i>{ev.autor}</span>
                         <span className="evidence-meta-badge"><i className="bi bi-calendar3 me-1"></i>{ev.fecha}</span>
                      </div>
                      <p className="mb-0 small opacity-90">{ev.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}