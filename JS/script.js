// =========================================================================
// 1. Inicializar animaciones de scroll (AOS)
// =========================================================================
AOS.init({ 
    once: true 
});

// =========================================================================
// 2. Validación nativa de formularios de Bootstrap 5
// =========================================================================
(function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

// =========================================================================
// 3. Bloquear fechas anteriores a hoy en el calendario
// =========================================================================
const mFecha = document.getElementById('fecha');
if (mFecha) {
    const hoy = new Date().toISOString().split("T")[0];
    mFecha.setAttribute('min', hoy);
}

// =========================================================================
// 4. Lógica de adaptabilidad del Modal (Contacto vs Agendar Consulta)
// =========================================================================
document.querySelectorAll('.btn-trigger-modal').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        
        // Elementos del Modal que se van a modificar
        const modalTitle = document.getElementById('modalCitaLabel');
        const fechaContainer = document.getElementById('contenedorFechaHora');
        const inputFecha = document.getElementById('fecha');
        const inputHora = document.getElementById('hora');
        const btnSubmit = document.getElementById('btnSubmitModal');

        if (action === 'contacto') {
            // Configuración dinámica para Contacto General
            if (modalTitle) modalTitle.innerHTML = '<i class="bi bi-envelope-check text-info me-2"></i>Enviar Mensaje';
            if (btnSubmit) btnSubmit.textContent = 'Enviar Mensaje';
            
            // Ocultar la fila de fecha/hora de forma forzada usando !important
            if (fechaContainer) fechaContainer.style.setProperty('display', 'none', 'important'); 
            
            // Quitar obligatoriedad para que el formulario sea válido sin estos campos
            if (inputFecha) { 
                inputFecha.removeAttribute('required'); 
                inputFecha.value = ''; 
            }
            if (inputHora) { 
                inputHora.removeAttribute('required'); 
                inputHora.value = ''; 
            }
        } else {
            // Configuración dinámica para Agendar Consulta Técnica
            if (modalTitle) modalTitle.innerHTML = '<i class="bi bi-calendar-check text-info me-2"></i>Agendar Consulta';
            if (btnSubmit) btnSubmit.textContent = 'Solicitar Agendamiento';
            
            // Mostrar la fila de fecha/hora
            if (fechaContainer) fechaContainer.style.setProperty('display', 'flex', 'important'); 
            
            // Volver a exigir que se llenen los campos antes de enviar
            if (inputFecha) inputFecha.setAttribute('required', '');
            if (inputHora) inputHora.setAttribute('required', '');
        }
    });
});

// =========================================================================
// 5. Repositorio de Trabajos e Imágenes por Servicio
// =========================================================================
const proyectosGaleria = {
    domotica: [
        { src: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=500', desc: 'Integración Residencial' },
        { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=500', desc: 'Control de Iluminación Automatizado' }
    ],
    cctv: [
        { src: 'IMG/CCTV/Camaras (3).jpeg', desc: 'Cámaras de Seguridad punto fijo' },
        { src: 'IMG/CCTV/Camara 360.jpeg', desc: 'Cámaras de 360 grados' },
        { src: 'IMG/CCTV/integrado.jpeg', desc: 'Sistema de Integrado' }
    ],
    web: [
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500', desc: 'Dashboard de Telemetría e Interfaces' },
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500', desc: 'Monitoreo SCADA en tiempo real' }
    ],
    cableado: [
        { src: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500', desc: 'Peinado de Rack de Telecomunicaciones' },
        { src: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=500', desc: 'Certificación de Enlaces de Fibra' }
    ],
    mantenimiento: [
        { src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=500', desc: 'Ajuste de Tableros Eléctricos' },
        { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=500', desc: 'Mantenimiento Preventivo a Controladores' }
    ],
    soporte: [
        { src: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=500', desc: 'Análisis de Redes y Protocolos Industriales' },
        { src: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&q=80&w=500', desc: 'Calibración en sitio de Sensores IoT' }
    ]
};

// Instanciar Modal de Bootstrap de forma segura
const elModalGaleria = document.getElementById('modalGaleria');
if (elModalGaleria) {
    const bsGaleriaModal = new bootstrap.Modal(elModalGaleria);

    document.querySelectorAll('.btn-view-gallery').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.getAttribute('data-gallery');
            const tituloModal = document.getElementById('modalGaleriaTitle');
            const contenedorFotos = document.getElementById('galeriaContenedorFotos');
            
            if (contenedorFotos) contenedorFotos.innerHTML = '';
            
            // Buscar el título del servicio
            const cardBody = this.closest('.card-body');
            if (cardBody) {
                const textEl = cardBody.querySelector('.card-title-tech');
                if (textEl && tituloModal) {
                    tituloModal.textContent = `Proyectos Ejecutados — ${textEl.textContent}`;
                }
            }
            
            // Carga e inyección de imágenes dinámicas
            if (proyectosGaleria[categoria] && contenedorFotos) {
                proyectosGaleria[categoria].forEach(foto => {
                    const col = document.createElement('div');
                    col.className = 'col-md-6 text-center';
                    col.innerHTML = `
                        <div class="gallery-thumbnail position-relative">
                            <img src="${foto.src}" alt="${foto.desc}">
                            <div class="p-2 position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-truncate small font-accent">
                                ${foto.desc}
                            </div>
                        </div>
                    `;
                    contenedorFotos.appendChild(col);
                });
            }
            
            // Lanzar modal
            bsGaleriaModal.show();
        });
    });
}