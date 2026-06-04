import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'دیزاین استیشن — اتلیه‌ی معمارانه‌ی شما',
  description:
    'دیزاین استیشن — اتلیه‌ای برای معماران، در دلِ پالادیومِ تهران. شیرآلاتِ لاکچری، خانه‌ی هوشمند، نورِ معماری.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
