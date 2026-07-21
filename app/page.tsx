"use client";

import Image from "next/image";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Counter from "./components/Counter";
import { useEffect, useRef } from "react";
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

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

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

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const hash = target.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(hash);
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", handleAnchorClick));

    // Hero content entrance
    if (heroContentRef.current) {
      gsap.from(heroContentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // ← Smooth parallax on the background image
    if (heroImageRef.current) {
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
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`${dmSans.className} w-full bg-white text-gray-900`}>
      
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`${playfair.className} text-xl font-bold text-amber-500 italic tracking-tight`}>
            Chengecha Associates
          </span>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Open menu">
            <span className="w-6 h-0.5 bg-gray-700 block" />
            <span className="w-6 h-0.5 bg-gray-700 block" />
            <span className="w-6 h-0.5 bg-gray-700 block" />
          </button>
        </div>
      </header>
      <div  className="max-w-7xl mx-auto">

      <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div ref={heroImageRef}
            className="absolute inset-x-0 -top-[10%] h-[120%] w-full"
            style={{ willChange: "transform" }} >

          <Image
            src="/bg.jpg"
              alt="Modern professional office"
              fill
              priority
              className="object-cover object-center"
          />
        </div>

        
        <div className="absolute inset-0 bg-black/55 z-10" />

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

      
        <section id="about" className="min-h-screen flex items-center py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 w-full">
 
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-end mb-16">
 
    
            <div className="lg:col-span-3 flex flex-col">
              <p className="section-heading text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Who We Are
              </p>
              <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-6`}>
                About Chengecha Associates
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                At Chengecha &amp; Associates, we understand the unique challenges
                faced by Kenyan businesses. With over 7 years of experience
                serving SMEs across Kenya, we&apos;ve built our reputation on
                delivering exceptional financial services that drive growth and
                ensure compliance.
              </p>
            </div>
 
           
            <div className="lg:col-span-2 bg-gray-950 rounded-2xl p-8 text-white flex flex-col justify-between gap-6">
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
 
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100">
            {[
              { end: 7,   suffix: "+", label: "Years Experience" },
              { end: 150, suffix: "+", label: "Businesses Served" },
              { end: 98,  suffix: "%", label: "Client Retention" },
              { end: 100, suffix: "%", label: "Compliance Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <Counter end={stat.end} suffix={stat.suffix} />
                <p className="mt-3 text-gray-500 text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
 
        </div>
      </section>

      
       <section id="services" className="min-h-screen flex items-center py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-heading text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-12`}>
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📋",
                title: "Tax Compliance & Advisory",
                tagline: "Save Thousands, Stay Penalty-Free",
                description:
                  "Avoid KES 500,000+ in tax penalties and unlock up to 25% more in legitimate deductions with our expert tax services. We ensure full compliance with Kenyan tax laws while optimising your tax strategy for maximum savings.",
                caseStudy:
                  "A Nairobi tech company (KES 8M turnover) recovered KES 4.2 million in overpaid VAT and avoided KES 1.6 million in penalties after we streamlined their PAYE and VAT filings.",
                pricing: "Starting from KES 5,000",
              },
              {
                icon: "📈",
                title: "Profit-Boosting Advisory",
                tagline: "Grow Margins by 15%+",
                description:
                  "Increase profit margins by up to 15% with strategic guidance tailored to Kenyan businesses. Our advisory services optimise operations, reduce risks, and drive sustainable growth.",
                caseStudy:
                  "A Mombasa retail chain (KES 6.5M turnover) boosted profits by 17% (KES 1.1 million annually) and improved cash flow by KES 3.2 million after our cost optimisation and market expansion strategies.",
                pricing: "Starting from KES 20,000",
              },
              {
                icon: "🧮",
                title: "Audit & Assurance",
                tagline: "98% Compliance for Trusted Financials",
                description:
                  "Eliminate regulatory risks and build stakeholder trust with audits that achieve a 98% compliance rate. Our thorough reviews ensure your financials are accurate, reliable, and KRA-compliant.",
                caseStudy:
                  "A Kenyan logistics firm (KES 9.2M turnover) passed a KRA audit with zero penalties, saving KES 2.4 million in potential fines, after our comprehensive financial statement audit.",
                pricing: "Starting from KES 60,000",
              },
              {
                icon: "💼",
                title: "Fund Management",
                tagline: "10%+ Higher Returns, Fully Compliant",
                description:
                  "Maximise your investment returns by up to 10% while staying compliant with Kenyan regulations. Our expert fund management optimises asset performance and minimises risks.",
                caseStudy:
                  "A Nairobi-based investment group (KES 7.8M portfolio) increased portfolio returns by 11% (KES 850,000 annually) and reduced compliance costs by KES 320,000 through our tailored asset management strategy.",
                pricing: "Starting from KES 25,000",
              },
              {
                icon: "📊",
                title: "Bookkeeping & Accountancy",
                tagline: "Save 20+ Hours Monthly",
                description:
                  "Free up 20+ hours monthly and improve cash flow by 30% with our precise bookkeeping and insightful financial reporting. Stay investor-ready with real-time, accurate records.",
                caseStudy:
                  "A Kisumu e-commerce business (KES 5.4M turnover) reduced payment delays by 35% and improved cash flow by KES 1.6 million annually with our automated bookkeeping and cash flow management.",
                pricing: "Starting from KES 10,000",
              },
              {
                icon: "🤝",
                title: "Consulting",
                tagline: "Boost Efficiency by 20%+",
                description:
                  "Solve operational bottlenecks and improve efficiency by up to 20% with our expert consulting. We deliver targeted solutions for process optimisation and financial forecasting.",
                caseStudy:
                  "A Kenyan service firm (KES 7.5M turnover) cut overhead costs by 22% (KES 1.65 million annually) and increased operational efficiency by 28% after our 90-day process optimisation engagement.",
                pricing: "Starting from KES 15,000",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="service-card bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-1">
                  <span className="text-xl">{service.icon}</span>
                </div>
                <div>
                  <h3 className={`${playfair.className} text-xl font-bold text-gray-900`}>{service.title}</h3>
                  <p className="text-amber-500 text-xs font-semibold mt-0.5">{service.tagline}</p>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed border border-gray-100">
                  <span className="font-semibold text-gray-700">Case Study: </span>{service.caseStudy}
                </div>
                <p className="text-xs font-semibold text-amber-500 mt-auto pt-1">✓ Pricing: {service.pricing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="testimonials" className="min-h-screen flex items-center py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-heading text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Social Proof
          </p>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-12`}>
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { quote: "Chengecha Associates transformed how we manage our finances. We saved significantly on taxes.", name: "Jane M.", role: "CEO, TechStart Kenya" },
              { quote: "Professional, thorough, and always one step ahead. Exactly what a growing business needs.", name: "David K.", role: "Founder, Apex Traders" },
            ].map((t) => (
             
              <div key={t.name} className="testimonial-card bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <p className="text-gray-700 text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="contact" className="min-h-screen flex items-center py-24 bg-gray-950 text-white">
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
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                Send Message
              </button>
 
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

     
      <footer className="bg-gray-950 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className={`${playfair.className} text-amber-400 italic font-bold`}>
            Chengecha Associates
          </span>
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Chengecha Associates. All rights reserved.
          </p>
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-500 hover:text-amber-400 text-xs transition-colors">
                {link.label}
              </a>
            ))}
          </div>
            <a className="text-gray-500 hover:text-amber-400 text-xs transition-colors" href="https://www.linkedin.com/in/cpa-joseph-kimani-840625bb/" target="blank">Joseph Kimani</a>
        </div>
      </footer>
      </div>

     
    </div>
  );
}



