export const SERVICES = [
  {
    id: 'domotica',
    title: 'Domótica',
    description: 'Sistemas de automatización residencial y comercial con control remoto y programación inteligente.',
    imageSrc: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600',
    iconClass: 'bi bi-house-gear-fill', // Actualizado a clase de Bootstrap
  },
  {
    id: 'cctv',
    title: 'Sistemas CCTV',
    description: 'Sistemas de videovigilancia y seguridad para ambientes residenciales y comerciales.',
    imageSrc: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600',
    iconClass: 'bi bi-camera-video-fill', // Actualizado
  },
  {
    id: 'web',
    title: 'Desarrollo Web',
    description: 'Interfaces web diseñadas a la necesidad de tu negocio.',
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    iconClass: 'bi bi-code-slash', // Actualizado
    
  },
  {
    id: 'cableado',
    title: 'Cableado Estructurado',
    description: 'Soluciones de infraestructura de red, cobre y fibra óptica para entornos de alta disponibilidad.',
    imageSrc: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600',
    iconClass: 'bi bi-hdd-network-fill', // Actualizado
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento',
    description: 'Planes correctivos y preventivos para tableros de control, instrumentación y hardware IoT.',
    imageSrc: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
    iconClass: 'bi bi-tools', // Actualizado
  },
  {
    id: 'soporte',
    title: 'Soporte Técnico',
    description: 'Diagnóstico de equipos, calibración de sensores y asistencia especializada.',
    imageSrc: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=600',
    iconClass: 'bi bi-headset', // Actualizado
  },

];

export const QUESTIONS_BY_SERVICE: Record<string, any[]> = {
  domotica: [
    { label: '¿Qué tipo de lugar deseas hacer inteligente?', name: 'tipo_espacio', options: ['Mi casa / departamento', 'Mi oficina / local comercial', 'Un edificio o planta industrial'] },
    { label: '¿Cómo prefieres que se conecten los equipos?', name: 'protocolo_domotica', options: ['Por cables ocultos (Para construcciones nuevas)', 'Por Wi-Fi / Inalámbrico (Para lugares ya terminados)', 'Prefiero recibir asesoría técnica'] },
    { label: '¿Qué te gustaría controlar desde tu celular o voz?', name: 'alcance_domotica', options: ['Luces, aire acondicionado y persianas', 'Alarmas, cerraduras y cámaras de seguridad', 'Música ambiental y pantallas de video', 'Todo lo anterior integrado'] }
  ],
  cctv: [
    { label: '¿Cuántas cámaras estimas que necesitas?', name: 'num_camaras', options: ['Paquete básico (1 a 4 cámaras)', 'Paquete comercial (5 a 16 cámaras)', 'Paquete industrial (Más de 16 cámaras)'] },
    { label: '¿Dónde se van a instalar principalmente?', name: 'entorno_cctv', options: ['Solo adentro del inmueble', 'Solo en el exterior / fachadas', 'Tanto adentro como afuera'] },
    { label: '¿Necesitas alguna función inteligente en especial?', name: 'analiticas_cctv', options: ['Solo grabación normal', 'Reconocimiento de rostros o placas', 'Conteo de personas o alertas por cruce de líneas'] }
  ],
  web: [
    { label: '¿Qué tipo de proyecto web tienes en mente?', name: 'tipo_desarrollo', options: ['Página web para mi empresa o portafolio', 'Tienda en línea / Ecommerce', 'Panel de control para monitorear datos (IoT)', 'Un sistema personalizado desde cero'] },
    { label: '¿Tu página necesita conectarse a sensores físicos?', name: 'comunicacion_web', options: ['Sí, mostrará datos de sensores en tiempo real', 'No, es una página estándar', 'Requiero asesoría'] },
    { label: '¿Planeas guardar bases de datos o cuentas de usuarios?', name: 'requiere_bd', options: ['Sí, los usuarios tendrán cuentas', 'No, solo mostrará información pública', 'Por definir'] }
  ],
  cableado: [
    { label: '¿Qué tipo de instalación de red requieres?', name: 'tipo_red', options: ['Conexión por cable tradicional', 'Instalación de antenas inalámbricas', 'Enlaces rápidos con Fibra Óptica'] },
    { label: '¿Para cuántos equipos o habitaciones es el servicio?', name: 'nodos_red', options: ['Espacio pequeño (1 a 15 conexiones)', 'Espacio mediano (16 a 50 conexiones)', 'Planta industrial (Más de 50 conexiones)'] },
    { label: '¿Requieres reportes oficiales de certificación?', name: 'certificacion_red', options: ['Sí, reporte técnico certificado (Fluke)', 'No, con que funcione correctamente es suficiente'] }
  ],
  mantenimiento: [
    { label: '¿Cuál es la situación actual del equipo?', name: 'tipo_manto', options: ['Funciona bien, busco mantenimiento preventivo', 'Tiene una falla activa que urge reparar', 'Necesito calibrar sensores'] },
    { label: '¿Qué elemento requiere atención prioritaria?', name: 'elemento_manto', options: ['Tableros eléctricos o de control', 'Antenas o equipos de comunicación', 'Cables de datos o sensores'] }
  ]
};

export const EVIDENCES_BY_SERVICE: Record<string, any[]> = {
  domotica: [
    { src: '/IMG/Evidencias/domotica1.jpeg', desc: 'Integración de sistemas de alarma residencial.',  fecha: '2026-02', estado: 'Desplegado' }
  ],
  cctv: [
    { src: '/IMG/CCTV/Camaras (3).jpeg', desc: 'Cámaras punto fijo.',fecha: '2026-03', estado: 'Activo' },
    { src: '/IMG/CCTV/Camara 360.jpeg', desc: 'Cámaras 360°.', fecha: '2026-01', estado: 'Monitoreado' },
    { src: '/IMG/CCTV/integrado.jpeg', desc: 'Sistema hibrido°.', fecha: '2026-01', estado: 'Monitoreado' }
  ],
  web: [
    { src: '/IMG/Landing_page.png', 
      desc: 'Landing page interactiva para diseñadores de multimedia y editores de video.', 
      fecha: '2026-04', 
      estado: 'Estable',
      link: 'https://landingpagevideoeditor.netlify.app' }
    
  ],
  cableado: [
    { src: '/IMG/Evidencias/cableado_estructurado1.jpeg', desc: 'Peinado y certificación de rack Cat6A.',  fecha: '2026-06', estado: 'Certificado' },
    { src: '/IMG/Evidencias/cableado_estructurado2.jpeg', desc: 'Peinado y certificación de rack Cat6A.', fecha: '2026-06', estado: 'Certificado' },
    { src: '/IMG/Evidencias/pruebas_red.jpeg', desc: 'Instalación de patch panel y switch.',  fecha: '2026-06', estado: 'Certificado' }
  ],
  mantenimiento: [
    { src: '/IMG/Evidencias/mantenimiento1.jpeg', desc: 'Instalación de gabinete de control.', fecha: '2026-02', estado: 'Mantenido' },
    { src: '/IMG/Evidencias/mantenimiento2.jpeg', desc: 'Mantenimiento de ordenadores.',fecha: '2026-03', estado: 'Calibrado' },
    { src: '/IMG/Evidencias/armado.jpeg', desc: 'Armado de equipos de cómputo.',fecha: '2026-03', estado: 'Calibrado' },
  ],
  soporte: [
    { src: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800', desc: 'Calibración de buses industriales Modbus.',  fecha: '2026-05', estado: 'Calibrado' }
  ]
};