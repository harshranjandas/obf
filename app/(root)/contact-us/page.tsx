import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us - One Big Future',
    description: 'Contact us to share your ideas.',
    openGraph: {
      title: 'Contact Us - One Big Future',
      description: 'Contact us to share your ideas.',
      images: [
        {
          url: '/images/og-image.png',
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
      images: ['/images/og-image.png'],
    },
  };
}

export default async function ContactUsPage() {
  return (
    <div className="bg-white shadow-[0px_0px_30px_0px_#00000014]">
      <div className="px-[20px] pb-[50px] pt-[40px] md:px-[110px] md:pb-[100px] md:pt-[84px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-0">
          <div className="w-full space-y-8 lg:w-[58%] lg:pr-[100px]">
            <div className="flex items-center gap-6">
              <div className="space-y-6">
                <h1 className="mb-[60px] pt-6 text-[32px] font-bold leading-[38px] text-black md:text-[40px] md:leading-[46px]">
                  Contact Us
                </h1>
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
              <div className="bg-[#F3F1F0] p-6 md:p-12">
                <h3 className="mb-[30px] text-[20px] font-medium uppercase leading-[28px] text-black">
                  Reach Out to Us
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
