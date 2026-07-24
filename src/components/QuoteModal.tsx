'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { QUESTIONS_BY_SERVICE } from '@/data/pixelpalsData';

const slideVariants = {
  hidden: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0, transition: { duration: 0.3 } })
};

export default function QuoteModal({ isOpen, mode, onClose }: any) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<any>({});

  // Cada vez que el modal se abre o cambia de modo, reiniciamos el formulario al Paso 1
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({});
    }
  }, [isOpen, mode]);
  
  if (!isOpen) return null;
  const isQuote = mode === 'cotizacion';
  const totalSteps = isQuote ? 2 : 1;

  const nextStep = () => { setDirection(1); setStep(s => s + 1); };
  const prevStep = () => { setDirection(-1); setStep(s => s - 1); };

  return (
    <AnimatePresence>
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1055, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="modal-dialog modal-dialog-centered w-100 px-3" style={{ maxWidth: '550px' }}
        >
          <div className="modal-content border-0 shadow-lg style-modal-tech w-100">
            <div className="modal-header border-0 bg-dark position-relative" style={{ borderRadius: '24px 24px 0 0' }}>
              <h5 className="modal-title fw-bold font-accent text-white">
                {isQuote ? <><i className="bi bi-calculator text-info me-2"></i>Solicitar Cotización</> : <><i className="bi bi-envelope-check text-info me-2"></i>Hablemos</>}
              </h5>
              <button type="button" onClick={onClose} className="btn-close btn-close-white"></button>
            </div>
            
            <div className="modal-body p-4 bg-light overflow-hidden">
              {/* Barra de progreso */}
              {step <= totalSteps && (
                <div className="cuestionario-progress mb-4">
                  <motion.div className="cuestionario-progress-bar" initial={{ width: 0 }} animate={{ width: `${(step / totalSteps) * 100}%` }} transition={{ duration: 0.5 }} />
                </div>
              )}

              <div className="position-relative" style={{ minHeight: '300px' }}>
                <AnimatePresence custom={direction} mode="wait">
                  {/* PASO 1: Datos Generales */}
                  {step === 1 && (
                    <motion.form key="step1" custom={direction} variants={slideVariants} initial="hidden" animate="visible" exit="exit" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Nombre Completo / Empresa</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="bi bi-person"></i></span>
                          <input required type="text" className="form-control border-start-0 ps-0" placeholder="Ej. Juan Pérez" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Correo Electrónico</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                          <input required type="email" className="form-control border-start-0 ps-0" placeholder="correo@empresa.com" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                      </div>
                      {!isQuote && (
                        <div className="mb-4">
                          <label className="form-label small fw-bold text-muted">Mensaje</label>
                          <textarea rows={3} className="form-control" placeholder="Cuéntanos en qué podemos ayudarte..." value={formData.msg || ''} onChange={e => setFormData({...formData, msg: e.target.value})} />
                        </div>
                      )}
                      <button type="submit" className="btn btn-gradient w-100 py-3 fw-bold">
                        {isQuote ? 'Continuar' : 'Enviar Mensaje'} <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </motion.form>
                  )}

                  {/* PASO 2: Cuestionario Dinámico (Solo si es Cotización) */}
                  {step === 2 && isQuote && (
                    <motion.form key="step2" custom={direction} variants={slideVariants} initial="hidden" animate="visible" exit="exit" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Servicio a Cotizar</label>
                        <select required className="form-select" value={formData.service || ''} onChange={e => setFormData({...formData, service: e.target.value})}>
                          <option value="">Selecciona una solución...</option>
                          <option value="domotica">Domótica & Automatización</option>
                          <option value="cctv">Sistemas CCTV & Seguridad</option>
                          <option value="web">Desarrollo Web & Interfaces</option>
                          <option value="cableado">Cableado Estructurado</option>
                          <option value="mantenimiento">Mantenimiento Industrial</option>
                        </select>
                      </div>
                      {formData.service && QUESTIONS_BY_SERVICE[formData.service]?.map((q: any, i: number) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={q.name} className="pregunta-card text-start">
                          <label className="form-label small fw-bold text-white">{q.label}</label>
                          <select required className="form-select">
                            <option value="">Selecciona una respuesta...</option>
                            {q.options.map((o: string) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </motion.div>
                      ))}
                      <div className="d-flex gap-2 mt-4">
                        <button type="button" onClick={prevStep} className="btn btn-outline-light px-4"><i className="bi bi-arrow-left"></i></button>
                        <button type="submit" className="btn btn-gradient flex-grow-1 py-3 fw-bold">Finalizar Solicitud</button>
                      </div>
                    </motion.form>
                  )}

                  {/* PANTALLA DE ÉXITO */}
                  {step > totalSteps && (
                    <motion.div key="success" custom={direction} variants={slideVariants} initial="hidden" animate="visible" className="text-center py-5">
                      <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle" style={{ width: '90px', height: '90px' }}>
                        <i className="bi bi-cpu text-info" style={{ fontSize: '3.5rem' }}></i>
                      </div>
                      <h4 className="fw-bold text-white font-accent mb-2">Envío Exitoso</h4>
                      <p className="text-muted small mx-auto speech-text mb-4">Los requerimientos técnicos han sido procesados. Nos comunicaremos de inmediato.</p>
                      <button onClick={onClose} className="btn btn-gradient px-5 py-2 text-white">Cerrar</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}