const appName = 'One Big Future | India’s Future as Imagined by Global Leaders';
const appDescription =
  'One Big Future is a global platform featuring leaders from business, policy, science, culture, and philanthropy shaping India’s role in the 21st century.';
export const appMetadata = {
  title: appName,
  description: appDescription,
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: appName,
    description: appDescription,
    type: 'website',
    siteName: appName,
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description: appDescription,
    images: ['/og-image.jpg'],
  },
};
