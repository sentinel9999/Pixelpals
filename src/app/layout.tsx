import { Montserrat, Outfit } from 'next/font/google';
import Script from 'next/script';

// 1. Importamos los estilos físicos de Bootstrap instalados vía NPM
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 2. Importamos TU archivo de estilos AL FINAL para que sobrescriba a Bootstrap
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-primary' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-accent' });

export const metadata = {
  title: 'PixelPals | Ecosistema de Automatización',
  description: 'Expertos en automatización, redes, domótica y desarrollo de soluciones tecnológicas adaptadas a tus necesidades.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${outfit.variable}`}>
      <body>
        {children}
        
        {/* Cargamos el JS de Bootstrap para los modales interactivos */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}