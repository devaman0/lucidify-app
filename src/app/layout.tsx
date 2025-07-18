import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import { FloatingControls } from '@/components/floating-controls';
import MicrosoftClarity from '@/lib/microsoft-clarity';
import PostHogScript from '@/lib/posthog-script';
import RootProvider from '@/provider/root-provider';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lucidify - AI Journaling & Mental Health Companion',
  description:
    'Lucidify empowers your mental wellness journey with explainable AI, guided journaling, and actionable insights. Reflect, grow, and understand yourself with clarity.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' }],
    apple: '/images/favicon.svg',
  },
  // manifest: "/manifest.json",
  // themeColor: "#0C4A6E",
  // openGraph: {
  //   title: "Lucidify - AI Journaling & Mental Health Companion",
  //   description:
  //     "Empower your mental health with explainable AI, guided journaling, and actionable insights.",
  //   images: ["/images/lucidify-logo.svg"],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Lucidify - AI Journaling & Mental Health Companion",
  //   description:
  //     "Empower your mental health with explainable AI, guided journaling, and actionable insights.",
  //   images: ["/images/lucidify-logo.svg"],
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="hsl(var(--primary))" />
        <RootProvider>
          <div className="relative flex min-h-screen flex-col">
            <FloatingControls />
            <MicrosoftClarity />
            <PostHogScript />
            <Analytics />
            <div className="flex-1">{children}</div>
          </div>
          <Toaster richColors />
        </RootProvider>
      </body>
    </html>
  );
}
