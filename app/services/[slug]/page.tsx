import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { services, getServiceBySlug } from "@/app/lib/Services";
import ThemeToggle from "@/app/components/ThemeToggle";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const WHATSAPP_NUMBER = "254729714843";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Chengecha & Associates`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const whatsappMessage = encodeURIComponent(
    `Hi Chengecha Associates, I'd like to talk about your "${service.title}" service.`
  );

  return (
    <div className={`${dmSans.className} w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300`}>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-row gap-2 items-center">
            <span className="relative h-9 w-20 shrink-0 block">
              <Image src="/logo/logo.png" alt="Chengecha Associates" fill priority sizes="300px" className="object-contain object-left" />
            </span>
            <span className={`${playfair.className} hidden md:block text-xl font-bold text-gray-900 dark:text-white`}>
              Chengecha &amp; Associates
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/#services"
            //   scroll={false}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              ← All Services
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative h-72 md:h-96 w-full overflow-hidden">
        <Image src={service.image} alt={service.title} fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-10 w-full">
            <p className="text-[#277DCF] text-sm font-semibold uppercase tracking-widest mb-3">Our Services</p>
            <h1 className={`${playfair.className} text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl`}>
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <span className="inline-block bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
                {service.outcomeBadge}
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{service.intro}</p>
            </div>

            <div>
              <h2 className={`${playfair.className} text-2xl font-bold text-gray-900 dark:text-white mb-4`}>
                Who this is for
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.whoItsFor}</p>
            </div>

            <div>
              <h2 className={`${playfair.className} text-2xl font-bold text-gray-900 dark:text-white mb-5`}>
                What&apos;s included
              </h2>
              <ul className="space-y-3">
                {service.whatsIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="mt-1 w-4 h-4 shrink-0 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Starting at</p>
                <p className={`${playfair.className} text-2xl font-bold text-gray-900 dark:text-white`}>{service.pricingFrom}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Final pricing depends on business size and scope.</p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/#contact"
                // scroll={false}
                className="block text-center w-full py-3 border border-gray-200 dark:border-gray-700 hover:border-blue-400 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                Send an Enquiry
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
          <Link href="/#services"
        //    scroll={false}
            className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
            ← Back to all services
          </Link>
        </div>
      </main>
    </div>
  );
}