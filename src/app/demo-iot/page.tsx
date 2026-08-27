import IoTDashboardDemo from '@/components/iot-dashboard';
import Link from 'next/link';
import { ArrowLeft, Cpu, Activity, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Consola de Telemetría IoT | PixelPals',
  description: 'Panel interactivo de control y monitoreo para sistemas embebidos de grado industrial.',
};

export default function DemoIoTPage() {
  return (
    <div className="min-h-screen bg-[#070b14] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d1527] via-[#070b14] to-[#03050a] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Fondo Decorativo de Grid Tecnológica */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Navegación de regreso */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#00f2fe] transition-colors duration-200 group bg-slate-900/40 backdrop-blur-md border border-slate-800/60 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver al Inicio
          </Link>
        </div>

        {/* Encabezado Principal */}
        <header className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between border-b border-slate-800/60 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/20 text-[#00f2fe] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
              Entorno de Pruebas Activo
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              IoT Telemetry <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4facfe]">Console</span>
            </h1>
            <p className="mt-3 text-slate-400 text-base sm:text-lg">
              Interactúa con nuestra demo interactiva de hardware embebido. Simula lecturas de sensores, tasas de muestreo en microcontroladores (ESP32 / STM32) y logs MQTT en tiempo real.
            </p>
          </div>

          {/* Estadísticas Rápidas de la Demo */}
          <div className="hidden md:flex gap-4">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 p-4 rounded-xl">
              <div className="text-xs text-slate-500 uppercase font-semibold">Latencia Promedio</div>
              <div className="text-lg font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <Activity className="w-4 h-4" /> 14ms
              </div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 p-4 rounded-xl">
              <div className="text-xs text-slate-500 uppercase font-semibold">Trama de Datos</div>
              <div className="text-lg font-bold text-blue-400 flex items-center gap-1.5 mt-0.5">
                <Cpu className="w-4 h-4" /> MQTT v5.0
              </div>
            </div>
          </div>
        </header>

        {/* Componente del Dashboard de Telemetría */}
        <main className="w-full">
          <IoTDashboardDemo />
        </main>

        {/* Nota informativa inferior para el Cliente */}
        <footer className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/20 via-slate-900/40 to-slate-950/20 border border-slate-800/60 text-slate-400 text-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-[#00f2fe] shrink-0" />
            <span>
              <strong>¿Buscas una solución a medida?</strong> Diseñamos, programamos e implementamos arquitecturas completas de hardware y software industrial.
            </span>
          </div>
          <Link 
            href="/#contacto" 
            className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:from-[#00e2ee] hover:to-[#3e9ce5] text-slate-950 font-bold transition-all duration-200 shadow-lg shadow-[#00f2fe]/10"
          >
            Cotizar Proyecto IoT
          </Link>
        </footer>

      </div>
    </div>
  );
}
