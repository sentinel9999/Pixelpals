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
// 3. Banco de Preguntas Dinámicas para el Cuestionario de Cotización
// =========================================================================
const preguntasPorServicio = {
    domotica: [
        { label: '¿Qué tipo de espacio deseas automatizar?', type: 'select', name: 'tipo_espacio', options: ['Residencial / Casa', 'Comercial / Oficina', 'Industrial'] },
        { label: '¿Qué funciones te interesa integrar?', type: 'select', name: 'alcance_domotica', options: ['Iluminación y Climatización', 'Seguridad y Accesos', 'Audio / Video Distribuido', 'Automatización Completa'] }
    ],
    cctv: [
        { label: 'Número estimado de cámaras requeridas', type: 'select', name: 'num_camaras', options: ['1 a 4 cámaras', '5 a 8 cámaras', '9 a 16 cámaras', 'Más de 16'] },
        { label: 'Tipo de entorno de instalación', type: 'select', name: 'entorno_cctv', options: ['Interiores únicamente', 'Exteriores / Intemperie', 'Mixto (Interior y Exterior)'] }
    ],
    web: [
        { label: 'Tipo de interfaz o desarrollo solicitado', type: 'select', name: 'tipo_desarrollo', options: ['Dashboard de Telemetría (IoT)', 'Sistema de control', 'Página Web Corporativa / Portafolio', 'Desarrollo de Software a la Medida'] },
        { label: '¿Requiere integración con bases de datos en tiempo real?', type: 'select', name: 'requiere_bd', options: ['Sí, procesamiento continuo (MongoDB, etc.)', 'No, sólo visualización de parámetros', 'Por definir en la llamada'] }
    ],
    cableado: [
        { label: 'Tipo de infraestructura principal', type: 'select', name: 'tipo_red', options: ['Cableado estructurado de Cobre (UTP/STP)', 'Enlaces de Fibra Óptica (FTTx)', 'Infraestructura híbrida(Cobre/Fibra)'] },
        { label: 'Cantidad aproximada de nodos de red', type: 'select', name: 'nodos_red', options: ['1 a 10 nodos', '11 a 50 nodos', 'Más de 50 nodos'] }
    ],
    mantenimiento: [
        { label: '¿Qué tipo de mantenimiento requieres?', type: 'select', name: 'tipo_manto', options: ['Preventivo programado', 'Correctivo urgente / Falla activa', 'Calibración de sensores / Instrumentación'] },
        { label: 'Elemento principal a intervenir', type: 'select', name: 'elemento_manto', options: ['Tableros de control / PLC', 'Hardware de comunicación / RadioEnlaces', 'Buses de campo (RS-485, Modbus)'] }
    ]
};

// =========================================================================
// 4. Lógica de adaptabilidad del Modal y Cuestionario Dinámico
// =========================================================================
document.querySelectorAll('.btn-trigger-modal').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        
        // Elementos del Modal a modificar
        const modalTitle = document.getElementById('modalCitaLabel');
        const btnSubmit = document.getElementById('btnSubmitModal');
        const selectServicio = document.getElementById('servicioInteres');
        const contenedorCuestionario = document.getElementById('cuestionarioDinamico');
        const camposPreguntas = document.getElementById('camposPreguntas');

        // Resetear el estado interno del formulario cada vez que se abre el modal
        if (selectServicio) selectServicio.value = '';
        if (contenedorCuestionario) contenedorCuestionario.classList.add('d-none');
        if (camposPreguntas) camposPreguntas.innerHTML = '';
        document.getElementById('formCita').classList.remove('was-validated');

        if (action === 'contacto') {
            // Configuración para consulta o contacto libre
            if (modalTitle) modalTitle.innerHTML = '<i class="bi bi-envelope-check text-info me-2"></i>Enviar Mensaje';
            if (btnSubmit) btnSubmit.textContent = 'Enviar Mensaje';
            if (selectServicio) selectServicio.removeAttribute('required');
        } else {
            // Configuración para el flujo estricto de Solicitud de Cotización
            if (modalTitle) modalTitle.innerHTML = '<i class="bi bi-calculator text-info me-2"></i>Solicitar Cotización';
            if (btnSubmit) btnSubmit.textContent = 'Enviar Solicitud';
            if (selectServicio) selectServicio.setAttribute('required', '');
        }
    });
});

// Listener para el cambio de servicio de interés
const selectServicio = document.getElementById('servicioInteres');
if (selectServicio) {
    selectServicio.addEventListener('change', function() {
        const servicioSeleccionado = this.value;
        const contenedorCuestionario = document.getElementById('cuestionarioDinamico');
        const camposPreguntas = document.getElementById('camposPreguntas');

        // Limpiar el contenedor de preguntas previas antes de renderizar
        if (camposPreguntas) camposPreguntas.innerHTML = '';

        if (preguntasPorServicio[servicioSeleccionado]) {
            // Mostrar la sección del cuestionario
            if (contenedorCuestionario) contenedorCuestionario.classList.remove('d-none');

            // Inyectar inputs dinámicamente según la categoría
            preguntasPorServicio[servicioSeleccionado].forEach(pregunta => {
                const divGrupo = document.createElement('div');
                divGrupo.className = 'mb-3';

                const label = document.createElement('label');
                label.className = 'form-label small fw-bold text-dark';
                label.textContent = pregunta.label;

                const select = document.createElement('select');
                select.className = 'form-select';
                select.name = pregunta.name;
                select.setAttribute('required', ''); // Hace obligatoria la respuesta dinámica

                // Opción placeholder por defecto
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Selecciona una respuesta...';
                defaultOption.disabled = true;
                defaultOption.selected = true;
                select.appendChild(defaultOption);

                // Agregar opciones de respuesta configuradas
                pregunta.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = opt;
                    select.appendChild(option);
                });

                // Añadir el feedback de error nativo por si intentan enviar en blanco
                const invalidFeedback = document.createElement('div');
                invalidFeedback.className = 'invalid-feedback';
                invalidFeedback.textContent = 'Por favor, selecciona una opción válida.';

                divGrupo.appendChild(label);
                divGrupo.appendChild(select);
                divGrupo.appendChild(invalidFeedback);
                camposPreguntas.appendChild(divGrupo);
            });
        } else {
            // Ocultar si se selecciona la opción vacía
            if (contenedorCuestionario) contenedorCuestionario.classList.add('d-none');
        }
    });
}

// =========================================================================
// 5. Repositorio de Trabajos e Imágenes por Servicio
// =========================================================================
const proyectosGaleria = {
    domotica: [
        { src: 'IMG/Evidencias/domotica1.jpeg', desc: 'Integración de sistemas de alarma' },
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
        { src: 'IMG/Evidencias/cableado_estructurado1.jpeg', desc: 'Peinado de Rack de Telecomunicaciones' },
        { src: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=500', desc: 'Certificación de Enlaces de Fibra' },
        { src: 'IMG/Evidencias/pruebas_red.jpeg', desc: 'Verificación de la red de cableado estructurado' }
    ],
    mantenimiento: [
         { src: 'IMG/Evidencias/mantenimiento1.jpeg', desc: 'Instalación de gabinetes de control' },
         { src: 'IMG/Evidencias/mantenimiento2.jpeg', desc: 'Mantenimiento de equipos' }
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