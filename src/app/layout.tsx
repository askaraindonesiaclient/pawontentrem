import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pawon Tentrem | Rumah Makan Prasmanan Jawa',
  description:
    'Rasa rumahan, suasana yang menentramkan. Sajian prasmanan lauk dan sayur segar khas Jawa yang diperbarui setiap hari.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pawontentrem.workers.dev'),
  openGraph: {
    title: 'Pawon Tentrem | Rumah Makan Prasmanan Jawa',
    description:
      'Pilih lauk dan sayur sesuai selera. Sajian prasmanan segar rumahan dengan suasana hangat menentramkan.',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/assets/photos/prasmanan-lauk.jpg',
        width: 1200,
        height: 900,
        alt: 'Sajian Prasmanan Pawon Tentrem',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${lora.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased selection:bg-turmeric selection:text-ink">
        {children}
      </body>
    </html>
  );
}

