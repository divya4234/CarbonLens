/**
 * Root Layout Component
 * 
 * This is the root layout for the entire Next.js application.
 * It wraps all pages and provides global styles and metadata.
 */

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CarbonLens - Urban Emission Hotspot Mapping',
  description: 'Mapping and analyzing carbon emission hotspots in Bhubaneswar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

