import ContactForm from '@/components/ContactForm';
import { type Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us - One Big Future',
    description: 'Contact us to share your ideas.',
    openGraph: {
      title: 'Contact Us - One Big Future',
      description: 'Contact us to share your ideas.',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Contact Us - One Big Future',
        },
      ],
      type: 'website',
      siteName: 'One Big Future',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us - One Big Future',
      description: 'Contact us to share your ideas.',
      images: ['/og-image.jpg'],
    },
  };
}

function SectionBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'url(/images/advisors-grid-bg.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute -right-[20%] top-[-10%] z-[1] h-[500px] w-[500px] md:-right-[10%] md:top-[-15%]"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full opacity-[0.1]"
          style={{
            background: 'radial-gradient(circle, #FFA377 0%, #FF671F 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[800px] w-full max-w-[644px]"
        style={{
          background:
            'linear-gradient(240.635deg, rgba(255, 255, 255, 0) 43.35%, rgb(255, 255, 255) 83.086%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-12 bottom-0 z-[1] h-[360px] w-[360px] opacity-20 md:h-[467px] md:w-[467px]"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, #FFA377 0%, #FF671F 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
    </>
  );
}

export default async function ContactUsPage() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-12 md:pb-28 md:pt-20">
      <SectionBackground />
      <div className="tq-container relative z-10">
        <div className="flex flex-col items-center gap-[30px]">
          <h1 className="w-full text-center font-bold leading-[48px] text-[#434343] text-[40px] md:text-[50px]">
            Contact Us
          </h1>
          <p className="w-full text-center font-normal leading-[30px] text-[#333] text-[16px] md:text-[18px]">
            Get in touch to share your ideas or explore collaboration.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:flex-row lg:gap-0">
          <div className="w-full space-y-8 lg:w-[58%] lg:pr-[100px]">
            <div className="flex items-center gap-6">
              <div className="space-y-6">
                <h3 className="text-[20px] font-bold leading-[24px] text-black mb-[10px] mt-0">
                  Be Part of One Big Future
                </h3>
                <p className="text-[16px] font-light leading-[24px] text-black mb-[10px]">
                  One Big Future is a platform for ideas that shape India’s
                  long-term trajectory in the 21st century.
                </p>
                <p className="text-[16px] font-light leading-[24px] text-black mb-[50px]">
                  We bring together voices from across business, science,
                  policy, culture, and civil society to imagine what India can
                  become and to chart the ideas and pathways that will carry it
                  forward.
                </p>
                <h3 className="text-[20px] font-bold leading-[24px] text-black mb-[10px] mt-0">
                  If you are:
                </h3>
                <ol className="list-disc list-outside pl-6 space-y-2">
                  <li className="text-[16px] font-light leading-[24px] text-black">
                    A business leader, entrepreneur, or innovator shaping
                    India’s economic and technological future
                  </li>
                  <li className="text-[16px] font-light leading-[24px] text-black">
                    A global or Indian thought leader, academic, or researcher
                    contributing long-term perspectives
                  </li>
                  <li className="text-[16px] font-light leading-[24px] text-black">
                    A policy leader, public servant, or institution engaged in
                    nation-building
                  </li>
                  <li className="text-[16px] font-light leading-[24px] text-black">
                    A partner or sponsor aligned with ideas-led, public-interest
                    platforms
                  </li>
                  <li className="text-[16px] font-light leading-[24px] text-black">
                    A media professional seeking context, access, or
                    collaboration
                  </li>
                </ol>
                <p className="text-[16px] font-light leading-[24px] text-black mb-[40px]">
                  we would be glad to hear from you.
                </p>
                <p className="text-[16px] font-light leading-[24px] text-black mb-[30px]">
                  Share your ideas, proposals, or collaboration requests with us
                  at{' '}
                  <a
                    href="mailto:editor@onebigfuture.com"
                    className="hover:text-brand font-bold hover:underline underline-offset-4"
                  >
                    editor@onebigfuture.com
                  </a>
                </p>
                <p className="text-[16px] font-light leading-[24px] text-black mb-[30px]">
                  You may also reach us using the contact form.
                </p>
                <p className="text-[16px] font-light leading-[24px] text-black">
                  We look forward to conversations that help imagine and build
                  India’s next horizon.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[42%]">
            <div className="sticky top-[140px] mt-8 space-y-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
