'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ServiceCard({ id, title, description, imageSrc, iconClass, onOpenGallery, index }: any) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Físicas de Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Para rotación 3D
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    
    // Para tu CSS personalizado de Glow
    ref.current.style.setProperty('--mouse-x', `${mouseX}px`);
    ref.current.style.setProperty('--mouse-y', `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="col-md-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="card h-100 border-0 card-service"
      >
        <div className="card-img-container" style={{ transform: "translateZ(20px)" }}>
          <img src={imageSrc} className="card-img-top tech-project-img" alt={title} />
          <div className="icon-box-badge text-info shadow">
            <i className={iconClass}></i>
          </div>
        </div>
        <div className="card-body p-4 text-center mt-2" style={{ transform: "translateZ(30px)" }}>
          <h4 className="fw-bold mb-3 card-title-tech">{title}</h4>
          <p className="text-muted small">{description}</p>
          <button 
            onClick={() => onOpenGallery(id)}
            className="btn btn-sm btn-outline-primary rounded-pill px-3 mt-2 btn-view-gallery"
          >
            Ver Evidencias
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}