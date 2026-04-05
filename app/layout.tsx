import type {Metadata} from 'next';
import './globals.css'; // Global styles
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'RapihinAI - Professional Editorial Atelier',
  description: 'Converts AI-generated Markdown text into formatted Microsoft Word (.docx) files.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-label selection:bg-primary-container antialiased overflow-hidden" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
