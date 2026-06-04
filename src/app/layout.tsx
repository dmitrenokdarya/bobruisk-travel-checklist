import type { Metadata } from 'next';
import '@/assets/scss/globals.scss';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

export const metadata: Metadata = {
  title: 'Bobruisk travel chek-list ✨',
  description: 'Тебе нужно это увидеть',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="bg-secondary">
      <body className="text-primary text-body-s">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
