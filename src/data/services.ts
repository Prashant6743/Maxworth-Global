export interface ServiceProcessStep {
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  process: ServiceProcessStep[];
  documents: string[];
  faqs: ServiceFAQ[];
}

// A helper function to generate default rich content for services
// so the 3D design template looks perfectly populated for every page immediately.
const generateDefaultService = (slug: string, category: string, title: string): ServiceData => ({
  slug,
  category,
  title,
  tagline: `Professional ${title} Services tailored for your business needs.`,
  description: `Get end-to-end support and expert guidance for ${title}. We streamline the entire process, ensuring full compliance and complete peace of mind so you can focus on scaling your business.`,
  features: [
    "Dedicated Account Manager",
    "100% Online Process",
    "Expert Document Drafting",
    "Timely Follow-ups & Updates",
    "Post-Registration Support",
    "Transparent Pricing"
  ],
  benefits: [
    "Legally secure your business assets and operations",
    "Build trust with clients and stakeholders",
    "Access government schemes and funding easier",
    "Minimize compliance risks and penalties"
  ],
  process: [
    { title: "Consultation & Strategy", desc: "We understand your specific requirements and propose the best legal framework." },
    { title: "Document Collection", desc: "Securely upload required documents through our portal." },
    { title: "Application Drafting", desc: "Our experts meticulously draft all necessary forms and applications." },
    { title: "Filing & Registration", desc: "We submit the application to the respective government authorities." },
    { title: "Approval & Handover", desc: "Receive your final certification and post-registration compliance kit." }
  ],
  documents: [
    "PAN Card & Aadhar Card of Directors/Partners",
    "Passport size photographs",
    "Latest Bank Statement / Utility Bill",
    "Registered Office Address Proof (NOC / Rent Agreement)"
  ],
  faqs: [
    { question: `How long does the ${title} process take?`, answer: "Timelines vary by authority, but we expedite every step. Usually, it ranges from 7 to 15 working days once all documents are verified." },
    { question: "Do I need to be physically present?", answer: "No, our entire process is 100% online. You can sign documents digitally." },
    { question: "Are there any hidden charges?", answer: "Absolutely not. We believe in 100% transparent pricing shared upfront before we begin." }
  ]
});

// The master list of all 35+ services
export const servicesData: ServiceData[] = [
  // STARTUP
  generateDefaultService("microfinance", "startup", "Microfinance Company"),
  generateDefaultService("public-ltd", "startup", "Public Limited Company"),
  generateDefaultService("startup-india", "startup", "Startup India Registration"),
  generateDefaultService("opc", "startup", "One Person Company"),
  generateDefaultService("nidhi", "startup", "Nidhi Company Registration"),
  generateDefaultService("producer-co", "startup", "Farmer Producer Company"),
  generateDefaultService("partnership", "startup", "Partnership Firm Registration"),
  // Fully customized example for Pvt Ltd
  {
    ...generateDefaultService("pvt-ltd", "startup", "Private Ltd. Company Registration"),
    tagline: "The most popular business structure for fast-growing startups in India.",
    description: "Incorporate your Private Limited Company with ease. Ideal for startups looking for venture capital funding, ESOP issuances, and limited liability protection. We handle name approval, DIN, DSC, MoA, and AoA drafting.",
    benefits: [
      "Limited Liability Protection for Directors",
      "Easier to raise VC and Angel funding",
      "Separate Legal Entity status",
      "Continuous existence and easy transferability"
    ]
  },
  generateDefaultService("sole-prop", "startup", "Sole Proprietorship"),
  generateDefaultService("llp", "startup", "LLP Registration"),

  // LICENCE
  generateDefaultService("iec", "licence", "Import Export Code Registration"),
  generateDefaultService("fcra", "licence", "FCRA Licence"),
  generateDefaultService("msme", "licence", "MSME Licence"),
  generateDefaultService("fssai", "licence", "FSSAI Registration and Licence"),
  generateDefaultService("trademark", "licence", "Trademark"),

  // ROC
  generateDefaultService("share-valuation", "roc", "Share Valuation"),
  generateDefaultService("roc-search", "roc", "ROC Search Report"),
  generateDefaultService("roc-mca", "roc", "All Compliance Related to ROC & MCA"),
  generateDefaultService("secretarial", "roc", "Companies Secretarial Work"),
  generateDefaultService("restructuring", "roc", "Corporate Restructuring"),

  // TAX & PAYROLL
  generateDefaultService("vat", "tax-payroll", "VAT"),
  generateDefaultService("custom-tax", "tax-payroll", "Custom Tax"),
  generateDefaultService("gst", "tax-payroll", "GST Registration"),
  generateDefaultService("domestic-tax", "tax-payroll", "Domestic Tax Compliances"),
  generateDefaultService("80g-12a", "tax-payroll", "80G / 12A"),
  generateDefaultService("income-tax", "tax-payroll", "Income Tax"),
  generateDefaultService("indirect-tax", "tax-payroll", "Indirect Tax"),
  generateDefaultService("direct-tax", "tax-payroll", "Direct Tax"),
  generateDefaultService("tax-consultancy", "tax-payroll", "Tax Consultancy"),

  // MISCELLANEOUS REGISTRATION
  generateDefaultService("section-8", "misc-reg", "Section 8 Company Registration"),
  generateDefaultService("partnership-deed", "misc-reg", "Partnership Deed Registration"),
  generateDefaultService("ngo-trust", "misc-reg", "NGO & Trust"),
  generateDefaultService("society", "misc-reg", "Society"),

  // OTHER SERVICES
  generateDefaultService("international-trade", "other", "International Trade"),
  generateDefaultService("csr-complains", "other", "CSR Complains"),
  generateDefaultService("fema-complaines", "other", "FEMA Complaines"),
  generateDefaultService("business-consulting", "other", "Business Consulting"),
];

// Utility functions
export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(s => s.slug === slug);
};

export const getServicesByCategory = (category: string): ServiceData[] => {
  return servicesData.filter(s => s.category === category);
};
