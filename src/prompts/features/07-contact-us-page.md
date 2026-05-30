# Overview
This specification details the structural implementation of the public-facing Contact Us route (`app/(public)/contact/page.tsx`) derived from the layout wireframe in `screenshots/image_6a0ca0.png`. It modernizes the side-by-side informational grid by integrating rich metadata optimization schemas, beautiful vector icons, and semantic action triggers wrapped inside a clean layout matrix.

---

## 1. Search Engine Optimization (SEO) Specification
To maximize corporate query positioning, index discoverability, and OpenGraph visualization, the page route must export a static Next.js `Metadata` layout configuration block:

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Our Medical Support Team | DoctorTap',
  description: 'Connect with our office in Kathmandu, Nepal. Reach out for telehealth support, technical platform assistance, or explore healthcare career opportunities with DoctorTap.',
  keywords: ['DoctorTap contact', 'medical support Nepal', 'telehealth career support', 'Kathmandu healthcare support'],
  openGraph: {
    title: 'Contact Our Medical Support Team | DoctorTap',
    description: 'Get in touch with the DoctorTap office or explore clinical open roles.',
    url: '[https://doctortap.com/contact](https://doctortap.com/contact)',
    type: 'website',
    images: [
      {
        url: '/og-contact-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'DoctorTap Help & Support Center Portal',
      },
    ],
  },
};