export type Service = {
  slug: string;
  title: string;
  summary: string;
  outcomeBadge: string;
  pricingFrom: string;
  image: string;
  intro: {
    definition: string;
    context: string;
  };
  whoItsFor: string;
  whatsIncluded: string[];
};

export const services: Service[] = [
  {
    slug: "tax-compliance-advisory",
    title: "Tax Compliance & Advisory",
    summary:
      "We prepare and file your VAT, PAYE and income tax returns correctly and on time, and plan ahead so KRA never catches you off guard.",
    outcomeBadge: "25% More Deductions",
    pricingFrom: "From KES 5,000",
    image: "/tax.jpg",
    intro: {
      definition:
        "Tax Compliance & Advisory covers the preparation and filing of your statutory tax returns, along with ongoing planning to keep your business on the right side of KRA.",
      context:
        "Tax in Kenya changes often, and the cost of getting it wrong is the penalties, back-taxes, flagged accounts and legal action is steep. We keep your filings accurate and on schedule, and look ahead for legal ways to lower what you owe.",
    },
    whoItsFor:
      "Registered businesses and sole proprietors who want tax handled without the guesswork and stress from an SME filing its first VAT return to a company overdue for a tax health check.",
    whatsIncluded: [
      "Monthly and annual KRA filings — VAT, PAYE, income tax, withholding tax",
      "Tax health checks that catch issues before KRA does",
      "Advance tax planning to legally reduce your liability",
      "Representation and support during KRA audits or disputes",
    ],
  },
  {
    slug: "profit-boosting-advisory",
    title: "Profit-Boosting Advisory",
    summary:
      "We examine your pricing, costs and operations to find exactly where you're losing money, then help you fix it.",
    outcomeBadge: "15% Margin Growth",
    pricingFrom: "From KES 20,000",
    image: "/profit.jpg",
    intro: {
      definition:
        "Profit-Boosting Advisory is a hands-on review of your pricing, costs and operations, designed to show exactly where margin is slipping and what to do about it.",
      context:
        "Revenue can look healthy while margins quietly shrink. This service is a structured look at where your money actually goes, so decisions about pricing, costs and growth are based on numbers, not guesswork.",
    },
    whoItsFor:
      "Business owners who are turning over revenue but aren't sure why profit feels thinner than it should.",
    whatsIncluded: [
      "Full review of pricing and cost structure",
      "Cash flow and margin analysis by product or service line",
      "Practical, prioritised recommendations — not just a report",
      "Quarterly check-ins to track progress against the plan",
    ],
  },
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    summary:
      "An independent review of your financial statements, prepared to ICPAK and international standards.",
    outcomeBadge: "98% Compliance",
    pricingFrom: "From KES 60,000",
    image: "/audit.jpg",
    intro: {
      definition:
        "Audit & Assurance is an independent examination of your financial statements, tested against recognised accounting standards and backed by a formal report.",
      context:
        "Whether it's a statutory requirement or a funding round, an audit is only useful if it's done properly. We test your financial statements against recognised standards and give you a report you can put in front of a bank, investor or regulator with confidence.",
    },
    whoItsFor:
      "Companies that need a statutory audit, are raising funding, or want independent assurance their financials are accurate before a major decision.",
    whatsIncluded: [
      "Statutory annual audits",
      "Financial statement reviews for funding or due diligence",
      "Internal control assessments",
      "Audit report delivered in KRA / ICPAK-compliant format",
    ],
  },
  {
    slug: "bookkeeping-accountancy",
    title: "Bookkeeping & Accountancy",
    summary:
      "We record every transaction, reconcile your accounts, and hand you clear monthly reports.",
    outcomeBadge: "20+ Hours Saved",
    pricingFrom: "From KES 10,000",
    image: "/bookkeeping.jpg",
    intro: {
      definition:
        "Bookkeeping & Accountancy is the day-to-day recording, reconciliation and reporting of your business's financial transactions.",
      context:
        "Good decisions need current numbers. We handle the day-to-day recording and reconciliation, and deliver reports you can actually read and act on — not just a spreadsheet dump at year-end.",
    },
    whoItsFor:
      "Startups, sole proprietors and businesses that don't have  or don't yet need a full-time in-house accountant, but want accurate, up-to-date books.",
    whatsIncluded: [
      "Daily or weekly transaction recording",
      "Bank and M-Pesa reconciliation",
      "Monthly financial statements P&L, balance sheet, cash flow",
      "Payroll processing on request",
    ],
  },
  {
    slug: "consulting",
    title: "Consulting",
    summary:
      "One-on-one advisory on business structure, systems and financial processes. Built around the specific problem you're facing.",
    outcomeBadge: "20% More Efficient",
    pricingFrom: "From KES 15,000",
    image: "/consulting.jpg",
    intro: {
      definition:
        "Consulting is one-on-one advisory time focused on the specific business, financial or structural problem you're facing, rather than a fixed, packaged service.",
      context:
        "Not every question fits neatly into 'tax' or 'audit.' This is direct, practical advisory time with someone who understands Kenyan business — for the operational and financial questions that need a real answer, not a template.",
    },
    whoItsFor:
      "Founders and operators with a specific bottleneck structuring, systems, forecasting, who want direct expert input.",
    whatsIncluded: [
      "Business structuring and registration advice",
      "Financial systems and process setup",
      "Financial forecasting and budgeting support",
      "Ad-hoc advisory sessions, scheduled as needed",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}