'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Activity, 
  Cpu, 
  Thermometer, 
  Droplets, 
  Zap, 
  Power, 
  Radio, 
  Wifi, 
  Gauge, 
  ShieldCheck, 
  Sliders, 
  Terminal, 
  RefreshCw,
  Wind
} from 'lucide-react';

export default function DemoIoTPage() {
  // Dispositivo / Nodo activo
  const [activeNode, setActiveNode] = useState('ESP32-NODE-01');
  const [latency, setLatency] = useState(14);
  
  // Sensores simulados
  const [temp, setTemp] = useState(24.6);
  const [humidity, setHumidity] = useState(58.4);
  const [voltage, setVoltage] = useState(220.8);
  const [pressure, setPressure] = useState(1014.2);
  const [current, setCurrent] = useState(3.42);
  
  // Historial para osciloscopio en tiempo real (10 puntos)
  const [history, setHistory] = useState<number[]>([23.8, 24.1, 24.4, 24.0, 24.5, 24.9, 24.6, 24.8, 24.3, 24.6]);

  // Canales de Actuadores (4 Relés Industriales)
  const [relays, setRelays] = useState({
    relay1: { name: 'Bomba Principal Hidráulica', pin: 'GPIO-18', active: true, icon: Activity },
    relay2: { name: 'Extractor de Gases Sur', pin: 'GPIO-19', active: false, icon: Wind },
    relay3: { name: 'Iluminación Perimetral LED', pin: 'GPIO-21', active: true, icon: Zap },
    relay4: { name: 'Válvula Solenoide de Corte', pin: 'GPIO-22', active: false, icon: Power },
  });

  // Consola de eventos MQTT
  const [logs, setLogs] = useState<Array<{ id: string; time: string; topic: string; msg: string; type: 'info' | 'warn' | 'ok' }>>([
    { id: '1', time: '12:00:05', topic: 'pixelpals/node01/telemetry', msg: 'Paquete de telemetría parseado correctamente (JSON 128B)', type: 'ok' },
    { id: '2', time: '12:00:08', topic: 'pixelpals/broker/status', msg: 'Handshake SSL/TLS verificado en puerto 8883', type: 'info' },
    { id: '3', time: '12:00:14', topic: 'pixelpals/node01/power', msg: 'Factor de potencia dentro de rango nominal (PF: 0.98)', type: 'ok' },
  ]);

  // Simulación de oscilación en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Variación controlada de sensores
      const dTemp = (Math.random() - 0.49) * 0.4;
      setTemp((prev) => {
        const next = +(prev + dTemp).toFixed(1);
        setHistory((h) => [...h.slice(1), next]);
        return next;
      });

      setHumidity((prev) => +(prev + (Math.random() - 0.5) * 0.3).toFixed(1));
      setVoltage((prev) => +(220 + (Math.random() - 0.5) * 1.8).toFixed(1));
      setCurrent((prev) => +(3.4 + (Math.random() - 0.5) * 0.15).toFixed(2));
      setPressure((prev) => +(1014 + (Math.random() - 0.5) * 0.6).toFixed(1));
      setLatency(Math.floor(12 + Math.random() * 6));
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const toggleRelay = (key: keyof typeof relays) => {
    const target = relays[key];
    const newState = !target.active;
    
    setRelays(prev => ({
      ...prev,
      [key]: { ...prev[key], active: newState }
    }));

    const now = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [
      {
        id: Math.random().toString(),
        time: now,
        topic: `pixelpals/node01/actuator/${target.pin.toLowerCase()}`,
        msg: `Comando enviado: ${target.name} -> ${newState ? 'ON (HIGH)' : 'OFF (LOW)'}`,
        type: newState ? 'ok' : 'warn'
      },
      ...prev.slice(0, 6)
    ]);
  };

  // Cálculo de puntos de curva Bézier SVG para el gráfico
  const svgW = 600;
  const svgH = 140;
  const minT = 20;
  const maxT = 30;

  const points = history.map((val, idx) => {
    const x = (idx / (history.length - 1)) * svgW;
    const y = svgH - ((val - minT) / (maxT - minT)) * (svgH - 20) - 10;
    return { x, y };
  });

  const pathD = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[idx - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${svgW},${svgH} L 0,${svgH} Z`;

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 font-sans p-3 sm:p-6 lg:p-10 selection:bg-cyan-500 selection:text-black">
      
      {/* Glow de fondo ambiental */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* =========================================================================
            HEADER DE MANDO SCADA
           ========================================================================= */}
        <header className="rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl p-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/50 transition-all text-xs font-semibold"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Volver al Inicio
            </Link>

            <div className="h-8 w-px bg-slate-800 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  PixelPals <span className="text-cyan-400 font-mono text-sm px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/30">IoT Core SCADA</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Centro de Control de Telemetría & Automatización Industrial</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 font-mono text-xs text-slate-300">
              <Wifi size={14} className="text-emerald-400" />
              <span>Ping: <strong className="text-emerald-400">{latency} ms</strong></span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck size={14} /> Broker Online
            </div>
          </div>
        </header>

        {/* =========================================================================
            SELECTOR DE CONTROLADORES / NODOS
           ========================================================================= */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {[
            { id: 'ESP32-NODE-01', name: 'Gateway IoT ESP32', loc: 'Línea de Automatización #1', bus: 'MQTT / Wi-Fi 6', rssi: '-42 dBm', status: 'Activo' },
            { id: 'PLC-MODBUS-02', name: 'PLC Maestro Industrial', loc: 'Tablero de Fuerza Principal', bus: 'RS-485 Modbus RTU', rssi: 'Cableado', status: 'Activo' },
            { id: 'LORA-HUB-03', name: 'Sensor Hub Perimetral', loc: 'Tanques y Presión Externa', bus: 'LoRaWAN 915 MHz', rssi: '-78 dBm', status: 'Standby' }
          ].map((node) => {
            const isSelected = activeNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-slate-900 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.18)]'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                )}
                
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    {node.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${node.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    {node.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">{node.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{node.loc}</p>
                
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex justify-between items-center text-[11px] font-mono text-slate-500">
                  <span>{node.bus}</span>
                  <span className="text-cyan-400 font-semibold">{node.rssi}</span>
                </div>
              </button>
            );
          })}
        </section>

        {/* =========================================================================
            TARJETAS DE MÉTRICAS EN TIEMPO REAL
           ========================================================================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card Temperatura */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Thermometer size={16} className="text-rose-400" /> Temperatura
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">DHT22</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">{temp}</span>
              <span className="text-sm font-bold text-slate-400">°C</span>
            </div>
            <div className="mt-4 w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 h-full transition-all duration-700 rounded-full" 
                style={{ width: `${Math.min(100, Math.max(0, ((temp - 10) / 25) * 100))}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">Umbral óptimo: 18°C ~ 28°C</p>
          </div>

          {/* Card Humedad */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets size={16} className="text-cyan-400" /> Humedad Relativa
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">HR%</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">{humidity}</span>
              <span className="text-sm font-bold text-slate-400">%</span>
            </div>
            <div className="mt-4 w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-700 rounded-full" 
                style={{ width: `${humidity}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">Sin riesgo de condensación</p>
          </div>

          {/* Card Voltaje & Corriente */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap size={16} className="text-amber-400" /> Red Eléctrica AC
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">PZEM-004T</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">{voltage}</span>
              <span className="text-sm font-bold text-slate-400">VAC</span>
            </div>
            <div className="mt-3 flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Carga: <strong className="text-cyan-400">{current} A</strong></span>
              <span>Potencia: <strong className="text-amber-400">{+(voltage * current / 1000).toFixed(2)} kW</strong></span>
            </div>
            <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> 60.0 Hz Estable
            </p>
          </div>

          {/* Card Presión */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gauge size={16} className="text-indigo-400" /> Barómetro
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">BMP280</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">{pressure}</span>
              <span className="text-sm font-bold text-slate-400">hPa</span>
            </div>
            <div className="mt-4 flex justify-between text-xs text-slate-400 font-mono">
              <span>Altitud calc:</span>
              <span className="text-slate-200 font-semibold">1,540 msnm</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">Presión atmosférica normal</p>
          </div>

        </section>

        {/* =========================================================================
            GRÁFICA DE ONDAS & MATRIZ DE RELEVADORES
           ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Gráfico Osciloscopio */}
          <div className="lg:col-span-2 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity size={16} className="text-cyan-400" /> Osciloscopio de Telemetría Dinámica
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Tendencia continua de temperatura (°C) por ciclo de muestreo</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                  {temp} °C en tiempo real
                </span>
              </div>
            </div>

            {/* Lienzo SVG con curva suavizada */}
            <div className="h-48 w-full relative flex items-end pt-4">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Líneas de cuadrícula técnica */}
                <line x1="0" y1="30" x2={svgW} y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="70" x2={svgW} y2="70" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2={svgW} y2="110" stroke="#1e293b" strokeDasharray="3 3" />

                {/* Sombreado de área */}
                <path d={areaD} fill="url(#cyanArea)" />

                {/* Trazo dinámico */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#00f2fe"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Puntos de muestreo */}
                {points.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={i === points.length - 1 ? 5 : 2.5}
                    className={i === points.length - 1 ? 'fill-cyan-300 animate-pulse stroke-2 stroke-cyan-950' : 'fill-cyan-400'}
                  />
                ))}
              </svg>
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-4 pt-3 border-t border-slate-800/80">
              <span>Muestra T-18s</span>
              <span>T-12s</span>
              <span>T-6s</span>
              <span className="text-cyan-400 font-bold">Ahora (Live)</span>
            </div>
          </div>

          {/* Banco de Actuadores / Relés */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-lg space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders size={16} className="text-cyan-400" /> Banco de Actuadores
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Control de potencia por relevador</p>
            </div>

            <div className="space-y-2.5">
              {(Object.keys(relays) as Array<keyof typeof relays>).map((key) => {
                const item = relays[key];
                const Icon = item.icon;
                return (
                  <div
                    key={key}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      item.active
                        ? 'bg-slate-950/80 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                        : 'bg-slate-950/40 border-slate-800/80 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${item.active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{item.name}</h4>
                        <span className="text-[10px] font-mono text-slate-500">{item.pin}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleRelay(key)}
                      className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                        item.active
                          ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <Power size={12} /> {item.active ? 'ON' : 'OFF'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* =========================================================================
            TERMINAL DE BUS MQTT / LOGS
           ========================================================================= */}
        <section className="rounded-3xl bg-slate-950/90 border border-slate-800/80 p-5 sm:p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider">
                Consola Serial & Tramas MQTT (Broker Bus)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">broker://iot.pixelpals.io:8883</span>
          </div>

          <div className="space-y-2 font-mono text-[11px] sm:text-xs max-h-44 overflow-y-auto pr-2">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 p-2 rounded-lg bg-slate-900/60 border border-slate-800/50"
                >
                  <span className="text-slate-500 shrink-0">[{log.time}]</span>
                  <span className="text-cyan-400 shrink-0 font-semibold">{log.topic}</span>
                  <span className="text-slate-300 grow">{log.msg}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase self-start sm:self-auto ${
                    log.type === 'ok' ? 'bg-emerald-500/20 text-emerald-400' :
                    log.type === 'warn' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {log.type}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  );
}