const appName = 'One Big Future | India’s Future as Imagined by Our Leaders';
const appDescription =
  'One Big Future is a platform featuring leaders, innovators, and policymakers sharing bold ideas shaping India in the 21st century through interviews, podcasts, and events.';
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
