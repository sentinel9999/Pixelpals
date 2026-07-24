import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'PixelPals | Ecosistema de Automatización',
  description: 'Expertos en automatización, redes, domótica e interfaces de telemetría.',
  openGraph: {
    title: 'PixelPals | Ecosistema de Automatización',
    description: 'Expertos en automatización, redes, domótica e interfaces de telemetría.',
    url: 'https://pixelpalz.netlify.app',
    siteName: 'PixelPals',
    images: [
      {
        url: '/IMG/preview.png', // <--- Asegúrate que sea la ruta exacta de tu imagen en la carpeta public
        width: 1200,
        height: 630,
        alt: 'PixelPals Preview',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelPals | Ecosistema de Automatización',
    description: 'Expertos en automatización, redes, domótica e interfaces de telemetría.',
    images: ['/IMG/preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}