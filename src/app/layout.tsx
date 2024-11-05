import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Manrope, DM_Sans } from 'next/font/google';

import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme';
import ReactQueryProvider from '@/react-query';

const manrope = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'saas',
  description: 'saas description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${manrope.className} bg-[#171717] overflow-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
