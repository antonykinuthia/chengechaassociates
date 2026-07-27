"use client";

import Image from "next/image";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Counter from "./components/Counter";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Lottie from "lottie-react";
import financeAnimation from "../public/graph.json";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_NUMBER = "254729714843";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Chengecha Associates, I'd like to talk about accounting/tax services for my business."
);

function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={`w-9 h-9 ${className}`} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-amber-400 hover:text-amber-500 transition-colors duration-200 ${className}`}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);
    const handleWindowLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleWindowLoad);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const hash = target.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(hash);
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -80 });
        setMenuOpen(false);
      }
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", handleAnchorClick));

    if (heroContentRef.current) {
      gsap.from(heroContentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    if (heroImageRef.current) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(heroImageRef.current, {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }

    gsap.utils.toArray<HTMLElement>(".section-heading").forEach((el) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    gsap.from(".service-card", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: { trigger: "#services", start: "top 75%" },
    });

    gsap.from(".testimonial-card", {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: { trigger: "#testimonials", start: "top 75%" },
    });

    gsap.from("#contact .contact-inner", {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: "#contact", start: "top 75%" },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      anchors.forEach((a) => a.removeEventListener("click", handleAnchorClick));
      window.removeEventListener("load", handleWindowLoad);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`${dmSans.className} w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>

      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="relative h-9 w-36 shrink-0 block">
            <Image
              src="/logo/logo.png"
              alt="Chengecha Associates"
              fill
              priority
              sizes="300px"
              className="object-contain object-left"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="inline-block w-5 h-5 bg-green-600 hover:bg-green-700 transition-colors duration-200"
                style={{
                  maskImage: "url('/logo/whatsapp.svg')",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: "url('/logo/whatsapp.svg')",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
                aria-label="WhatsApp icon"
              />
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="flex flex-col gap-1.5 p-2 relative z-50"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span
                className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-200 block transition-transform duration-200 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-200 block transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-200 block transition-transform duration-200 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-lg">
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 border-b border-gray-50 dark:border-gray-800 last:border-b-0 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-4 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 text-center flex items-center justify-center gap-2"
              >
                <span>💬</span> WhatsApp Us
              </a>
            </nav>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto">

        <section id="home" className="relative h-dvh min-h-150 flex items-center overflow-hidden">
          <div
            ref={heroImageRef}
            className="absolute inset-x-0 top-[-10%] h-[120%] w-full"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/bg.jpg"
              alt="Modern office workspace representing Chengecha Associates accounting services"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          
          <div className="absolute inset-0 bg-black/55 dark:bg-black/65 z-10" />

          <div ref={heroContentRef} className="relative z-20 max-w-7xl mx-auto px-6 w-full flex justify-end">
            <div className="max-w-xl space-y-6 text-white">
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
                Smart Accounting &amp; Tax Solutions
              </p>
              <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold leading-tight`}>
                Built for{" "}
                <span className="italic text-amber-400">Ambitious</span>{" "}
                Businesses
              </h1>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                Less tax. More growth. No guesswork. — expert accounting, audit,
                and tax services built around your business.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-200"
                >
                  Work With Us
                </a>
                <a
                  href="#services"
                  className="px-6 py-3 border border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  Our Services
                </a>
              </div>
            </div>
          </div>
        </section>


        <section id="about" className="min-h-screen flex items-center py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 w-full">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-end mb-16">

              <div className="lg:col-span-3 flex flex-col">
                <p className="section-heading text-amber-500 dark:text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
                  Who We Are
                </p>
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6`}>
                  About Chengecha Associates
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                  At Chengecha &amp; Associates, we understand the unique challenges
                  faced by Kenyan businesses. With over 7 years of experience
                  serving SMEs across Kenya, we&apos;ve built our reputation on
                  delivering exceptional financial services that drive growth and
                  ensure compliance.
                </p>
              </div>


              <div className="lg:col-span-2 bg-gray-950 dark:bg-gray-900 dark:border dark:border-gray-800 rounded-2xl p-8 text-white flex flex-col justify-between gap-6">
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Why Choose Us?</p>
                  <h3 className={`${playfair.className} text-xl font-bold mb-6 leading-snug`}>
                    The clarity your business deserves
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Deep understanding of Kenyan tax laws",
                      "Proactive tax planning & compliance",
                      "Transparent pricing, no hidden fees",
                      "Regular updates & clear communication",
                      "24/7 client support",
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="inline-block text-center w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
                >
                  Get a Free Consultation
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100 dark:border-gray-800">
              {[
                { end: 7, suffix: "+", label: "Years Experience" },
                { end: 150, suffix: "+", label: "Businesses Served" },
                { end: 98, suffix: "%", label: "Client Retention" },
                { end: 100, suffix: "%", label: "Compliance Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <Counter end={stat.end} suffix={stat.suffix} />
                  <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </section>


        <section id="services" className="min-h-screen flex items-center py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <p className="section-heading text-amber-500 dark:text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12`}>
              Our Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Tax Compliance & Advisory",
                  description:
                    "Avoid KES 500,000+ in tax penalties and unlock up to 25% more in legitimate deductions with our expert tax services, fully compliant with Kenyan tax laws.",
                  pricing: "From KES 5,000",
                  badge: "25% More Deductions",
                  image: "/tax.jpg",
                },
                {
                  title: "Profit-Boosting Advisory",
                  description:
                    "Increase profit margins by up to 15% with strategic guidance tailored to Kenyan businesses, optimising operations and driving sustainable growth.",
                  pricing: "From KES 20,000",
                  badge: "15% Margin Growth",
                  image: "/profit.jpg",
                },
                {
                  title: "Audit & Assurance",
                  description:
                    "Eliminate regulatory risks and build stakeholder trust with audits that achieve a 98% compliance rate on accurate, KRA-compliant financials.",
                  pricing: "From KES 60,000",
                  badge: "98% Compliance",
                  image: "/audit.jpg",
                },
                {
                  title: "Bookkeeping & Accountancy",
                  description:
                    "Free up 20+ hours monthly and improve cash flow by 30% with precise bookkeeping and insightful, real-time financial reporting.",
                  pricing: "From KES 10,000",
                  badge: "20+ Hours Saved",
                  image: "/bookkeeping.jpg",
                },
                {
                  title: "Consulting",
                  description:
                    "Solve operational bottlenecks and improve efficiency by up to 20% with targeted solutions for process optimisation and financial forecasting.",
                  pricing: "From KES 15,000",
                  badge: "20% More Efficient",
                  image: "/consulting.jpg",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="service-card group relative h-135 rounded-[28px] overflow-hidden shadow-sm dark:shadow-none dark:ring-1 dark:ring-gray-800 hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/10" />

                  <div className="relative z-10 flex flex-col h-full justify-end p-7 gap-3">
                    <div>
                      <h3 className={`${playfair.className} text-xl font-bold text-white`}>
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-xs font-medium px-3.5 py-2 rounded-full border border-white/10">
                        {service.badge}
                      </span>
                      <span className="bg-white/15 backdrop-blur-md text-white text-xs font-medium px-3.5 py-2 rounded-full border border-white/10">
                        {service.pricing}
                      </span>
                    </div>

                    <button className="mt-2 w-full bg-white text-gray-900 font-semibold text-sm py-3.5 rounded-full hover:bg-amber-50 transition-colors">
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="testimonials" className="min-h-screen flex items-center py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <p className="section-heading text-amber-500 dark:text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Social Proof
            </p>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12`}>
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "Chengecha & Associates are extremely experienced and dedicated when it comes to solving Tax related issues.",
                  name: "Simon Mwangi",
                  role: "Director",
                  company: "Mwangi Traders Ltd",
                },
                {
                  quote:
                    "My company has benefitted greatly from the book keeping and accountancy services that i have received from this team.",
                  name: "Clinton Ouko",
                  role: "Managing Partner",
                  company: "C. Engineers Ltd",
                },
                {
                  quote:
                    "I continue to engage Chengecha and Associates in my Annual Audit work due to their detailed and well organized work…",
                  name: "Mercy Chepkoech",
                },
              ].map((t) => (
                <div key={t.name} className="testimonial-card bg-gray-200/80 dark:bg-gray-800/60 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="contact" className="min-h-screen flex items-center py-24 bg-gray-950 dark:bg-black text-white transition-colors duration-300">
          <div className="contact-inner max-w-7xl mx-auto px-6 w-full">

            <p className="section-heading text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Get In Touch
            </p>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-12`}>
              Let&apos;s Grow Together
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-all duration-300 focus:-translate-y-1"
                />
                <textarea
                  rows={4}
                  placeholder="Tell us about your business..."
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                    Send Message
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full  flex items-center justify-center"
                  >
                    <span
                      className="inline-block w-20 h-10 bg-green-500 hover:bg-green-400 transition-colors duration-200"
                      style={{
                        maskImage: "url('/logo/whatsapp.svg')",
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskImage: "url('/logo/whatsapp.svg')",
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                      }}
                      aria-label="WhatsApp icon"
                    />
                  </a>
                </div>

                <div className="flex flex-wrap gap-6 pt-4">
                  {[
                    { icon: "📍", text: "North Park Hub, Kamakis" },
                    { icon: "🕐", text: "Mon–Fri, 8am–5pm" },
                    { icon: "✉️", text: "info@chengecha.associates" },
                  ].map((item) => (
                    <span key={item.text} className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{item.icon}</span>{item.text}
                    </span>
                  ))}
                </div>
              </div>


              <div className="flex flex-col items-center justify-center gap-6">

                <div className="relative w-full max-w-sm mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-72 h-72 rounded-full bg-amber-500/5 border border-amber-500/10" />
                    <div className="absolute w-56 h-56 rounded-full bg-amber-500/5 border border-amber-500/10" />
                  </div>

                  <Lottie
                    animationData={financeAnimation}
                    loop
                    autoplay
                    style={{ width: "100%", height: "380px" }}
                  />
                </div>

                <p className={`${playfair.className} text-center text-gray-400 text-sm italic max-w-xs leading-relaxed`}>
                  &ldquo;Financial clarity is not a luxury — it&apos;s the foundation every ambitious business deserves.&rdquo;
                </p>
              </div>

            </div>
          </div>
        </section>


        <footer className="bg-gray-950 dark:bg-black border-t border-white/10 dark:border-gray-800 py-8 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <a href="#home" className="relative h-9 w-36 shrink-0 block">
              <Image
                src="/logo/logo.png"
                alt="Chengecha Associates"
                fill
                sizes="(max-width: 768px) 100vw, 50px"
                className="object-contain object-left"
              />
            </a>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Chengecha Associates. All rights reserved.
            </p>
            <nav aria-label="Footer" className="flex gap-6 flex-wrap">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-500 hover:text-amber-400 text-xs transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </div>

    </div>
  );
}