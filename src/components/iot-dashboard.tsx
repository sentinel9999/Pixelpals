"use client";

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  HardDrive, 
  RefreshCw, 
  Settings, 
  Wifi, 
  AlertTriangle,
  Zap, 
  Play, 
  Square,
  Radio,
  Thermometer,
  Layers,
  Terminal
} from 'lucide-react';

// Tipado de datos de telemetría
interface NodeData {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  temperature: number;
  energy: number;
  load: number;
  signal: number;
}

interface LogEntry {
  timestamp: string;
  type: 'info' | 'warning' | 'success';
  message: string;
}

export default function IoTDashboardDemo() {
  // Estado para nodo seleccionado
  const [activeNodeId, setActiveNodeId] = useState<string>('node-1');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [samplingRate, setSamplingRate] = useState<number>(2); // en segundos
  const [voltageMultiplier, setVoltageMultiplier] = useState<number>(1);
  
  // Nodos de ejemplo
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 'node-1', name: 'ESP32-Invernadero_A', status: 'online', temperature: 24.5, energy: 320, load: 42, signal: -65 },
    { id: 'node-2', name: 'STM32-Bomba_Presion', status: 'online', temperature: 41.2, energy: 850, load: 78, signal: -58 },
    { id: 'node-3', name: 'Raspberry-Filtro_Principal', status: 'offline', temperature: 0, energy: 0, load: 0, signal: -100 },
    { id: 'node-4', name: 'Arduino-Caldera_Secado', status: 'maintenance', temperature: 18.1, energy: 110, load: 15, signal: -82 },
  ]);

  // Historial de métricas para simular gráficos (SVG sparklines)
  const [tempHistory, setTempHistory] = useState<number[]>([22, 23, 24, 23.8, 24.1, 24.5]);
  const [loadHistory, setLoadHistory] = useState<number[]>([35, 40, 45, 38, 41, 42]);

  // Consola de eventos en tiempo real
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '09:36:12', type: 'info', message: 'Sistema de telemetría IoT inicializado.' },
    { timestamp: '09:37:05', type: 'success', message: 'Conexión exitosa con el servidor MQTT Broker.' },
    { timestamp: '09:38:11', type: 'warning', message: 'Nodo STM32-Bomba_Presion reporta alta temperatura (>40°C).' }
  ]);

  // Simulación de actualización de datos en tiempo real
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // 1. Actualizar los valores del nodo activo aleatoriamente para simular telemetría en vivo
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.status === 'offline') return node;
          if (node.id === activeNodeId) {
            // Variaciones pequeñas
            const tempChange = (Math.random() - 0.5) * 1.5;
            const newTemp = Math.max(10, Math.min(100, +(node.temperature + tempChange).toFixed(1)));
            
            const loadChange = Math.floor((Math.random() - 0.5) * 10);
            const newLoad = Math.max(5, Math.min(100, node.load + loadChange));
            
            // Consumo eléctrico basado en carga y multiplicador manual de voltaje
            const newEnergy = Math.floor(newLoad * 8.5 * voltageMultiplier);

            // Guardar historial para el sparkline
            if (node.id === 'node-1') {
              setTempHistory((prev) => [...prev.slice(-9), newTemp]);
              setLoadHistory((prev) => [...prev.slice(-9), newLoad]);
            }

            // Alerta de umbral crítico
            if (newTemp > 45 && node.temperature <= 45) {
              addLog('warning', `Alerta de temperatura crítica en ${node.name}: ${newTemp}°C`);
            }

            return {
              ...node,
              temperature: newTemp,
              load: newLoad,
              energy: newEnergy,
              signal: Math.min(-40, Math.max(-95, node.signal + Math.floor((Math.random() - 0.5) * 4)))
            };
          }
          return node;
        })
      );
    }, samplingRate * 1000);

    return () => clearInterval(interval);
  }, [isLive, activeNodeId, samplingRate, voltageMultiplier]);

  // Helper para añadir logs en consola
  const addLog = (type: 'info' | 'warning' | 'success', message: string) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];
    setLogs((prev) => [{ timestamp, type, message }, ...prev.slice(0, 15)]);
  };

  const handleToggleNode = (id: string) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const isTurningOff = n.status === 'online';
          const nextStatus = isTurningOff ? 'offline' : 'online';
          addLog(
            isTurningOff ? 'warning' : 'success',
            `Nodo ${n.name} ha sido cambiado de estado a: [${nextStatus.toUpperCase()}]`
          );
          return {
            ...n,
            status: nextStatus,
            temperature: isTurningOff ? 0 : 25,
            load: isTurningOff ? 0 : 30,
            energy: isTurningOff ? 0 : 150
          };
        }
        return n;
      })
    );
  };

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  // Helper para generar el path del SVG sparkline de manera responsiva
  const generateSparklinePath = (data: number[], min: number, max: number): string => {
    if (data.length === 0) return '';
    const width = 160;
    const height = 40;
    const step = width / (data.length - 1);
    const range = max - min || 1;
    
    return data.map((val, index) => {
      const x = index * step;
      const y = height - ((val - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div className="w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl p-6 text-slate-100 font-sans shadow-2xl overflow-hidden relative">
      {/* Luces de fondo Neon Cyberpunk */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00f2fe]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#4facfe]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Cabecera del Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            {isLive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#00f2fe]" /> Panel Industrial de Telemetría IoT
            </h2>
            <p className="text-xs text-slate-400">Monitoreo de telemetría de campo en tiempo real a través de protocolo MQTT/WebSocket</p>
          </div>
        </div>

        {/* Panel de Control de Simulación */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-slate-400">Muestreo:</span>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={samplingRate}
              onChange={(e) => setSamplingRate(Number(e.target.value))}
              className="w-16 accent-[#00f2fe] cursor-pointer"
            />
            <span className="font-mono text-[#00f2fe]">{samplingRate}s</span>
          </div>

          <button
            onClick={() => {
              setIsLive(!isLive);
              addLog('info', isLive ? 'Simulación pausada.' : 'Reanudando lectura en vivo.');
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              isLive 
                ? 'bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300' 
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
            }`}
          >
            {isLive ? <Square className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isLive ? 'Pausar Live' : 'Conectar Live'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LADO IZQUIERDO: Selector de Nodos de Hardware */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Radio className="h-4 w-4 text-[#00f2fe]" /> Nodos de Dispositivos Activos
            </h3>
            
            <div className="flex flex-col gap-2">
              {nodes.map((node) => (
                <div 
                  key={node.id}
                  onClick={() => node.status !== 'offline' && setActiveNodeId(node.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    activeNodeId === node.id && node.status !== 'offline'
                      ? 'bg-gradient-to-r from-slate-900 to-[#00f2fe]/10 border-[#00f2fe]/50 text-white'
                      : node.status === 'offline'
                        ? 'opacity-50 bg-slate-950/20 border-slate-950/40 cursor-not-allowed'
                        : 'bg-slate-900/30 border-slate-800/50 hover:border-slate-700/80 text-slate-300'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold truncate max-w-[170px]">{node.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      Signal: <span className={node.signal > -70 ? 'text-emerald-400' : 'text-amber-400'}>{node.signal} dBm</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Badge de Estado */}
                    <span className={`h-2 w-2 rounded-full ${
                      node.status === 'online' ? 'bg-emerald-500' : 
                      node.status === 'maintenance' ? 'bg-amber-500' : 'bg-slate-600'
                    }`} />
                    
                    {/* Botón de encendido/apagado forzado de la simulación */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleNode(node.id);
                      }}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-tight uppercase ${
                        node.status === 'online' 
                          ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {node.status === 'online' ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ajuste de Voltaje de Entrada Simulado */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Control de Entrada de Energía</span>
              <Zap className="h-3.5 w-3.5 text-amber-400" />
            </h3>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Multiplicador de Carga Eléctrica</span>
                <span className="font-mono text-amber-400">{voltageMultiplier}x</span>
              </label>
              <input 
                type="range" 
                min="0.5" 
                max="2.5" 
                step="0.1"
                value={voltageMultiplier}
                onChange={(e) => setVoltageMultiplier(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 italic mt-1">
                Ajustar el voltaje afecta directamente el consumo calculado (W) de los microcontroladores en campo.
              </p>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Métricas en Tiempo Real del Nodo Seleccionado */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Fila de Tarjetas Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Tarjeta de Temperatura */}
            <div className="bg-[#0f162a]/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-[#00f2fe]/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#00f2fe]/10 rounded-full blur-xl group-hover:bg-[#00f2fe]/20 transition-all" />
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-semibold uppercase tracking-wider">Temperatura</span>
                <Thermometer className="h-4 w-4 text-[#00f2fe]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight font-mono text-white">
                    {activeNode.status === 'online' ? activeNode.temperature : '0.0'}
                  </span>
                  <span className="text-lg font-bold text-slate-400">°C</span>
                </div>
                
                {/* Sparkline de tendencia */}
                {activeNode.id === 'node-1' && activeNode.status === 'online' ? (
                  <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-2">
                    <span className="text-[10px] text-emerald-400 font-medium">Lectura Estable</span>
                    <svg className="w-20 h-6 overflow-visible" viewBox="0 0 160 40">
                      <path 
                        d={generateSparklinePath(tempHistory, 20, 26)} 
                        fill="none" 
                        stroke="#00f2fe" 
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="mt-3 text-[10px] text-slate-500 border-t border-slate-800/60 pt-2 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-slate-600" /> Gráfico estático para {activeNode.name}
                  </div>
                )}
              </div>
            </div>

            {/* Tarjeta de Consumo Eléctrico */}
            <div className="bg-[#0f162a]/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-semibold uppercase tracking-wider">Potencia Inyectada</span>
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight font-mono text-white">
                    {activeNode.status === 'online' ? activeNode.energy : '0'}
                  </span>
                  <span className="text-lg font-bold text-slate-400">W</span>
                </div>
                <div className="mt-3 text-[10px] text-slate-400 border-t border-slate-800/60 pt-2 flex justify-between items-center">
                  <span>Voltaje de Referencia:</span>
                  <span className="font-mono text-amber-400">{(voltageMultiplier * 3.3).toFixed(2)} V</span>
                </div>
              </div>
            </div>

            {/* Tarjeta de Carga de CPU */}
            <div className="bg-[#0f162a]/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-violet-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/10 rounded-full blur-xl group-hover:bg-violet-500/20 transition-all" />
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-semibold uppercase tracking-wider">Carga MCU</span>
                <Cpu className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight font-mono text-white">
                    {activeNode.status === 'online' ? activeNode.load : '0'}
                  </span>
                  <span className="text-lg font-bold text-slate-400">%</span>
                </div>

                {/* Sparkline de Carga */}
                {activeNode.id === 'node-1' && activeNode.status === 'online' ? (
                  <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-2">
                    <span className="text-[10px] text-violet-400 font-medium">Consumo Dinámico</span>
                    <svg className="w-20 h-6 overflow-visible" viewBox="0 0 160 40">
                      <path 
                        d={generateSparklinePath(loadHistory, 30, 50)} 
                        fill="none" 
                        stroke="#a78bfa" 
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="mt-3 text-[10px] text-slate-500 border-t border-slate-800/60 pt-2 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-slate-600" /> Nodo fuera de rango dinámico
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Consola Terminal MQTT en Tiempo Real */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-tight text-slate-300">MQTT Client Terminal (logs)</span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="p-4 font-mono text-[11px] leading-relaxed max-h-[140px] overflow-y-auto flex flex-col gap-1 text-slate-300">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-slate-500 select-none">[{log.timestamp}]</span>
                  <span className={`font-bold ${
                    log.type === 'warning' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400' : 'text-[#00f2fe]'
                  }`}>
                    {log.type.toUpperCase()}:
                  </span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Footer del demo */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <Database className="h-3.5 w-3.5" />
          <span>Local Broker Status: <strong className="text-emerald-400 font-semibold">ONLINE</strong></span>
          <span className="text-slate-700">|</span>
          <Wifi className="h-3.5 w-3.5" />
          <span>IP: <code className="bg-slate-900 px-1 py-0.5 rounded border border-slate-800 text-slate-400">192.168.1.100</code></span>
        </div>
        <span>Diseñado para integración de Sistemas Embebidos & Control Industrial</span>
      </div>
    </div>
  );
}
