

export interface ServiceProcessStep {
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceOverview {
  content: string[];
  highlights: { label: string; value: string }[];
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
  overview?: ServiceOverview;
}

// A helper function to generate default rich content for services
const generateDefaultService = (slug: string, category: string, title: string, overview?: ServiceOverview): ServiceData => ({
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
  ],
  overview: overview || {
    content: [
      `Our ${title} service is designed to help you navigate the complex regulatory landscape in India with ease. We provide comprehensive support from documentation to final approval.`,
      `Whether you are a growing business or an established enterprise, maintaining compliance and securing the right registrations is crucial for uninterrupted operations and building trust with your stakeholders.`
    ],
    highlights: [
      { label: "Governing Body", value: "Applicable Government Authority" },
      { label: "Timeline", value: "7-15 Working Days" },
      { label: "Process", value: "100% Online" }
    ]
  }
});

// The master list of all 35+ services
export const servicesData: ServiceData[] = [
  // STARTUP
  generateDefaultService("microfinance", "startup", "Microfinance Company", {
    content: [
      "Microfinance companies in India play a pivotal role in providing financial assistance to low-income groups and individuals who lack access to traditional banking facilities. They offer small loans without collateral to promote entrepreneurship and self-reliance among the underprivileged.",
      "A Microfinance Company can be registered either as a Non-Banking Financial Company (NBFC-MFI) regulated directly by the Reserve Bank of India (RBI), or as a Section 8 Company (Not-for-Profit) under the Companies Act, 2013. The Section 8 route is highly popular for startups as it does not require the massive ₹5 Crore Minimum Net Owned Fund (NOF) mandated by the RBI for NBFC-MFIs, making it an accessible entry point to the microfinance sector.",
      "We provide end-to-end consulting for registering your Microfinance Company, guiding you through the intricate documentation, RBI compliance (if applicable), and software integration requirements to ensure your lending operations are legally sound and scalable."
    ],
    highlights: [
      { label: "Governing Act", value: "Companies Act, 2013 / RBI Act, 1934" },
      { label: "Authority", value: "MCA & RBI" },
      { label: "Popular Route", value: "Section 8 Company" },
      { label: "Timeline", value: "30-45 Days" }
    ]
  }),
  
  generateDefaultService("public-ltd", "startup", "Public Limited Company", {
    content: [
      "A Public Limited Company is a corporate structure that offers limited liability to its owners and the unique ability to raise capital from the general public through Initial Public Offerings (IPOs). It is the ideal vehicle for large-scale businesses planning massive expansion and heavy capital infusion.",
      "Incorporating a Public Limited Company requires a minimum of 7 members (shareholders) and 3 directors. Unlike Private Limited Companies, there is no cap on the maximum number of shareholders, allowing for vast public ownership. It must adhere to stringent compliance, disclosure, and transparency norms set forth by the Ministry of Corporate Affairs (MCA) and the Securities and Exchange Board of India (SEBI).",
      "Our team assists in the complex incorporation process, from Name Approval (SPICe+ Part A) to drafting extensive Memorandum & Articles of Association (MoA & AoA), ensuring you meet all statutory requirements for a smooth launch."
    ],
    highlights: [
      { label: "Governing Act", value: "Companies Act, 2013" },
      { label: "Min. Directors", value: "3 Directors" },
      { label: "Min. Members", value: "7 Members (No max limit)" },
      { label: "Fundraising", value: "Public Issue / IPO Eligible" }
    ]
  }),

  generateDefaultService("startup-india", "startup", "Startup India Registration", {
    content: [
      "Startup India is a flagship initiative launched by the Government of India to build a strong ecosystem that nurtures innovation and startups in the country. Registration under this scheme (DPIIT Recognition) unlocks a plethora of benefits designed to accelerate growth and reduce the compliance burden.",
      "Recognized startups enjoy massive benefits including a 3-year Income Tax exemption (under Section 80IAC), an 80% rebate on patent filing fees, 50% on trademark filings, easy access to government public procurement tenders without prior experience criteria, and fast-track winding-up under the Insolvency and Bankruptcy Code.",
      "To be eligible, the entity must be a Private Limited Company, LLP, or Registered Partnership Firm incorporated within the last 10 years, with an annual turnover not exceeding ₹100 Crores. It must also be working towards innovation, development, or commercialization of new products or services."
    ],
    highlights: [
      { label: "Authority", value: "DPIIT (Ministry of Commerce)" },
      { label: "Tax Benefit", value: "3 Years Income Tax Exemption" },
      { label: "IPR Benefit", value: "80% Rebate on Patent Fees" },
      { label: "Eligibility", value: "Pvt Ltd, LLP, or Partnership" }
    ]
  }),

  generateDefaultService("opc", "startup", "One Person Company", {
    content: [
      "Introduced in the Companies Act, 2013, the One Person Company (OPC) is a revolutionary concept in India that allows a single entrepreneur to operate a corporate entity with limited liability protection. It blends the simplicity of a sole proprietorship with the legal protections and corporate status of a Private Limited Company.",
      "An OPC completely isolates your personal assets from business liabilities. It requires only 1 Director and 1 Shareholder (who can be the same person), but you must appoint a Nominee who will take over the company in the event of the promoter's death or incapacity.",
      "This structure is perfect for solo founders, freelancers, and consultants who want to establish a recognized corporate brand, secure bank loans easily, and protect their personal wealth without needing to find a co-founder."
    ],
    highlights: [
      { label: "Governing Act", value: "Companies Act, 2013" },
      { label: "Members", value: "Only 1 Shareholder needed" },
      { label: "Nominee", value: "Mandatory requirement" },
      { label: "Liability", value: "Limited to share capital" }
    ]
  }),

  generateDefaultService("nidhi", "startup", "Nidhi Company Registration", {
    content: [
      "A Nidhi Company is a type of Non-Banking Financial Company (NBFC) that is recognized under Section 406 of the Companies Act, 2013. Its core business is borrowing and lending money exclusively between its members. They are known by various names such as Permanent Fund, Benefit Funds, Mutual Benefit Funds, and Mutual Benefit Company.",
      "Unlike standard NBFCs, Nidhi Companies do not require a massive Minimum Net Owned Fund or a license from the Reserve Bank of India (RBI). They are regulated entirely by the Ministry of Corporate Affairs (MCA). To maintain Nidhi status, the company must acquire at least 200 members and a Net Owned Fund of ₹10 Lakhs within one year of incorporation.",
      "It is one of the easiest and most cost-effective ways to start a finance business in India, primarily focused on cultivating the habit of thrift and savings among its localized membership base."
    ],
    highlights: [
      { label: "Governing Act", value: "Companies Act, 2013" },
      { label: "Authority", value: "Ministry of Corporate Affairs" },
      { label: "RBI License", value: "Not Required" },
      { label: "Capital Requirement", value: "₹5 Lakh to Incorporate" }
    ]
  }),

  generateDefaultService("producer-co", "startup", "Farmer Producer Company", {
    content: [
      "A Farmer Producer Company (FPC) is a specialized corporate entity designed to uplift agriculturists and farmers by organizing them into a corporate structure. It operates on the principles of a cooperative society but is registered as a Private Limited Company under the Companies Act, 2013.",
      "The primary objective of an FPC is the production, harvesting, procurement, grading, pooling, handling, marketing, selling, or exporting of primary produce of the members or import of goods or services for their benefit. It requires a minimum of 10 individual farmers, or 2 producer institutions, to incorporate.",
      "FPCs enjoy several government subsidies, tax exemptions on agricultural income, and easier access to institutional credit (via NABARD and other banks), empowering small-scale farmers to achieve economies of scale and better bargaining power."
    ],
    highlights: [
      { label: "Governing Act", value: "Companies Act, 2013" },
      { label: "Min. Members", value: "10 Farmers / Producers" },
      { label: "Min. Directors", value: "5 Directors" },
      { label: "Tax Benefit", value: "Exemptions on Agri-Income" }
    ]
  }),

  generateDefaultService("partnership", "startup", "Partnership Firm Registration", {
    content: [
      "A Partnership Firm is a traditional and highly prevalent business structure in India where two or more individuals manage and operate a business according to the terms and objectives set out in a Partnership Deed. It is heavily favored by small businesses and local traders due to its simplicity and minimal compliance requirements.",
      "Registration of a Partnership Firm is governed by the Indian Partnership Act, 1932. While registration is not strictly mandatory, an unregistered firm faces severe legal disabilities, such as the inability to file a lawsuit against third parties or co-partners to enforce rights.",
      "We assist in drafting a robust Partnership Deed that clearly outlines profit-sharing ratios, capital contributions, and operational responsibilities, followed by registration with the local Registrar of Firms (RoF) and PAN/TAN acquisition."
    ],
    highlights: [
      { label: "Governing Act", value: "Indian Partnership Act, 1932" },
      { label: "Authority", value: "Registrar of Firms (RoF)" },
      { label: "Min. Partners", value: "2 Partners" },
      { label: "Compliance", value: "Low Maintenance" }
    ]
  }),

  {
    ...generateDefaultService("pvt-ltd", "startup", "Private Ltd. Company Registration", {
      content: [
        "A Private Limited Company (Pvt. Ltd.) is the most popular, trusted, and scalable corporate structure for businesses in India. It creates a separate legal entity distinct from its founders, offering limited liability protection—meaning the personal assets of the directors and shareholders are completely secure in the event of business losses.",
        "Governed by the Companies Act, 2013, a Private Limited Company requires a minimum of 2 Directors and 2 Shareholders to incorporate. It restricts the public trading of shares, making it the preferred vehicle for startups raising venture capital, angel investment, or issuing Employee Stock Ownership Plans (ESOPs).",
        "Our comprehensive registration package covers name approval via SPICe+ Part A, drafting of the Memorandum and Articles of Association (MoA & AoA), obtaining Digital Signature Certificates (DSC) and Director Identification Numbers (DIN), and issuing the final Certificate of Incorporation along with PAN & TAN."
      ],
      highlights: [
        { label: "Governing Act", value: "Companies Act, 2013" },
        { label: "Min. Directors", value: "2 Directors" },
        { label: "Min. Shareholders", value: "2 Shareholders" },
        { label: "Fundraising", value: "VC & Angel Investor Friendly" }
      ]
    }),
    tagline: "The most popular business structure for fast-growing startups in India.",
    description: "Incorporate your Private Limited Company with ease. Ideal for startups looking for venture capital funding, ESOP issuances, and limited liability protection. We handle name approval, DIN, DSC, MoA, and AoA drafting.",
    benefits: [
      "Limited Liability Protection for Directors",
      "Easier to raise VC and Angel funding",
      "Separate Legal Entity status",
      "Continuous existence and easy transferability"
    ]
  },

  generateDefaultService("sole-prop", "startup", "Sole Proprietorship", {
    content: [
      "A Sole Proprietorship is the simplest, oldest, and most common form of business organization in India. It is a business that is owned, managed, and controlled by a single individual. From a legal standpoint, the business and the owner are one and the same.",
      "Because there is no separate legal entity, there is no centralized 'Proprietorship Registration' under a specific act. Instead, the business is legally recognized through secondary registrations like MSME (Udyam Registration), GST Registration, or the local Shop and Establishment Act license.",
      "This structure is highly recommended for low-risk micro-businesses, local retailers, and solo freelancers who want to start operating immediately with minimal setup costs and virtually zero annual statutory compliance filings."
    ],
    highlights: [
      { label: "Ownership", value: "100% Single Owner" },
      { label: "Registration Via", value: "MSME, GST, or Shop Act" },
      { label: "Compliance", value: "Extremely Low" },
      { label: "Liability", value: "Unlimited Liability" }
    ]
  }),

  generateDefaultService("llp", "startup", "LLP Registration", {
    content: [
      "A Limited Liability Partnership (LLP) is a modern corporate structure introduced in India via the LLP Act, 2008. It successfully bridges the gap between a traditional Partnership Firm and a Private Limited Company by offering the operational flexibility of a partnership with the limited liability protection of a corporation.",
      "In an LLP, partners are not liable for the unauthorized actions or negligence of other partners, offering a significant safety net. Furthermore, unlike a Private Limited Company, an LLP faces far fewer regulatory compliances; for instance, a statutory audit is only mandatory if turnover exceeds ₹40 Lakhs or capital contribution exceeds ₹25 Lakhs.",
      "LLPs are incredibly popular among professional service providers (like lawyers, architects, and consultants), real estate firms, and small businesses that do not intend to raise venture capital but want corporate status and risk protection."
    ],
    highlights: [
      { label: "Governing Act", value: "LLP Act, 2008" },
      { label: "Min. Partners", value: "2 Designated Partners" },
      { label: "Audit Requirement", value: "Above ₹40L Turnover" },
      { label: "Liability", value: "Limited to contribution" }
    ]
  }),

  // LICENCE
  generateDefaultService("iec", "licence", "Import Export Code Registration", {
    content: [
      "An Import Export Code (IEC) is a 10-digit primary business identification number required for anyone looking to import or export goods and services from India. Issued by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce, no commercial export or import can be made without an active IEC.",
      "Once issued, an IEC is valid for the lifetime of the entity, meaning there is no need for renewal. However, the DGFT mandates that IEC details must be updated electronically every year between April to June. If there are no changes, a simple confirmation is still required.",
      "An IEC is tied to your PAN (Permanent Account Number). Having an IEC allows your business to tap into the global market, avail customs clearance, and send or receive money in foreign currency through recognized banking channels without legal hurdles."
    ],
    highlights: [
      { label: "Governing Body", value: "DGFT (Ministry of Commerce)" },
      { label: "Validity", value: "Lifetime (with annual update)" },
      { label: "Requirement", value: "Mandatory for Export/Import" },
      { label: "Timeline", value: "1-3 Working Days" }
    ]
  }),
  
  generateDefaultService("fcra", "licence", "FCRA Licence", {
    content: [
      "The Foreign Contribution (Regulation) Act, 2010 (FCRA) regulates the acceptance and utilization of foreign contributions by individuals, associations, and NGOs in India. The law ensures that foreign funds are not used for activities detrimental to national interest.",
      "For an NGO, Trust, or Section 8 Company to legally receive grants or donations from foreign sources, obtaining an FCRA Registration or Prior Permission from the Ministry of Home Affairs (MHA) is strictly mandatory. To be eligible for standard registration, the NGO must have been in existence for at least 3 years and must have spent a minimum of ₹15 Lakhs on its core activities (excluding administrative expenses) over the last 3 years.",
      "FCRA compliance is extremely rigorous. Funds must be received in a designated 'FCRA Account' specifically opened in the State Bank of India (SBI), New Delhi Main Branch, and annual returns must be filed meticulously to maintain the licence validity, which is generally 5 years."
    ],
    highlights: [
      { label: "Governing Act", value: "FCRA, 2010" },
      { label: "Authority", value: "Ministry of Home Affairs (MHA)" },
      { label: "Eligibility", value: "3+ Years of active existence" },
      { label: "Validity", value: "5 Years (Renewable)" }
    ]
  }),
  
  generateDefaultService("msme", "licence", "MSME Licence", {
    content: [
      "The MSME (Micro, Small, and Medium Enterprises) Registration, officially known as Udyam Registration, is an essential government certification for businesses in India. It is provided by the Ministry of Micro, Small and Medium Enterprises to promote and nurture small businesses.",
      "Having an MSME/Udyam certificate unlocks a vast array of benefits. Registered entities enjoy protection against delayed payments from buyers, collateral-free bank loans (under CGTMSE), reduced interest rates from banks, 50% subsidy on trademark and patent registrations, and massive concessions on electricity bills.",
      "The registration is entirely paperless and based on self-declaration. Eligibility classification (Micro, Small, or Medium) is dynamically calculated based on your investment in plant and machinery and your annual turnover linked to your GST and Income Tax filings."
    ],
    highlights: [
      { label: "Govt Portal", value: "Udyam Registration" },
      { label: "Benefit", value: "Protection vs Delayed Payments" },
      { label: "Financial Aid", value: "Collateral-free Bank Loans" },
      { label: "Validity", value: "Lifetime" }
    ]
  }),
  
  generateDefaultService("fssai", "licence", "FSSAI Registration and Licence", {
    content: [
      "The Food Safety and Standards Authority of India (FSSAI) operates under the Ministry of Health & Family Welfare. Securing an FSSAI License or Registration is a legal requirement for any business involved in the manufacturing, processing, storage, distribution, or sale of food products in India.",
      "The type of license required depends purely on your business scale and turnover. A Basic Registration is for petty food business operators with a turnover up to ₹12 Lakhs/year. A State License is for mid-sized businesses (₹12 Lakhs to ₹20 Crores/year), while a Central License is required for large manufacturers, importers, and businesses operating across multiple states (turnover exceeding ₹20 Crores/year).",
      "Displaying the 14-digit FSSAI license number on food packages ensures consumer trust regarding the safety and quality of the food product. Non-compliance can lead to heavy penalties and the immediate closure of the business."
    ],
    highlights: [
      { label: "Authority", value: "Food Safety Standards Authority" },
      { label: "Basic Reg.", value: "Turnover up to ₹12 Lakhs" },
      { label: "State License", value: "Turnover ₹12L to ₹20Cr" },
      { label: "Central License", value: "Turnover above ₹20Cr" }
    ]
  }),
  
  generateDefaultService("trademark", "licence", "Trademark", {
    content: [
      "A Trademark is a recognizable insignia, phrase, word, or symbol that denotes a specific product or service and legally differentiates it from all other products. Administered by the Controller General of Patents, Designs and Trade Marks, trademarking your brand is the ultimate defense against counterfeiting and brand theft.",
      "Once your trademark application is filed, you can legally use the 'TM' symbol next to your brand name. After the registry examines the application, publishes it in the Trade Marks Journal, and clears it of any public oppositions, the trademark is formally registered, allowing you to use the '®' symbol.",
      "A registered trademark is an intangible corporate asset. It is valid for 10 years from the date of filing and can be renewed indefinitely. Startups and MSMEs get a 50% concession on government filing fees, making intellectual property protection highly affordable."
    ],
    highlights: [
      { label: "Governing Act", value: "Trade Marks Act, 1999" },
      { label: "Immediate Use", value: "'TM' symbol upon filing" },
      { label: "Validity", value: "10 Years (Renewable)" },
      { label: "Benefit", value: "Exclusive Brand Ownership" }
    ]
  }),

  // ROC
  generateDefaultService("share-valuation", "roc", "Share Valuation", {
    content: [
      "Share Valuation is the intricate process of determining the fair market value of a company's equity shares. It is a critical requirement under multiple Indian statutes, including the Companies Act, 2013, the Income Tax Act, 1961, and FEMA guidelines for cross-border transactions.",
      "Valuation is mandatory during significant corporate events such as issuing new shares (Right Issue, Private Placement, or ESOPs), mergers and acquisitions (M&A), transfer of shares between residents and non-residents, and for calculating capital gains tax.",
      "Our valuation reports are prepared by highly qualified professionals, including Registered Valuers (under IBBI), Chartered Accountants, and Merchant Bankers. We utilize internationally accepted methodologies like Discounted Cash Flow (DCF) and Net Asset Value (NAV) to ensure your valuation is legally defensible and compliant with all regulatory authorities."
    ],
    highlights: [
      { label: "Regulatory Bodies", value: "MCA, Income Tax & RBI" },
      { label: "Required By", value: "Registered Valuer / CA" },
      { label: "Methods Used", value: "DCF, NAV, Market Multiples" },
      { label: "Key Use Case", value: "Fundraising & Share Transfers" }
    ]
  }),
  
  generateDefaultService("roc-search", "roc", "ROC Search Report", {
    content: [
      "An ROC Search Report is an exhaustive, independent verification document prepared by a professional (typically a Company Secretary or CA) after inspecting the official records of a company maintained by the Registrar of Companies (ROC) on the MCA portal.",
      "This report is a critical due-diligence tool. It outlines the complete history of the company, detailing its authorized and paid-up capital, list of past and present directors, shareholder patterns, and most importantly, a complete log of all registered charges (loans/mortgages) created, modified, or satisfied against the company's assets.",
      "Banks and financial institutions make an ROC Search Report strictly mandatory before sanctioning corporate loans. It is also highly recommended for investors, venture capitalists, and partner companies before entering into any major financial agreements, mergers, or acquisitions to ensure there are no hidden liabilities."
    ],
    highlights: [
      { label: "Prepared By", value: "CA, CS or CMA" },
      { label: "Data Source", value: "MCA Portal Public Records" },
      { label: "Key Component", value: "Details of Charges (Loans)" },
      { label: "Used For", value: "Bank Loans & Due Diligence" }
    ]
  }),
  
  generateDefaultService("roc-mca", "roc", "All Compliance Related to ROC & MCA", {
    content: [
      "Under the Companies Act, 2013, every incorporated company and Limited Liability Partnership (LLP) in India is legally obligated to file various annual and event-based returns with the Registrar of Companies (ROC) via the Ministry of Corporate Affairs (MCA) portal.",
      "Annual compliances form the bedrock of corporate governance. This includes the mandatory filing of financial statements (Form AOC-4), the Annual Return (Form MGT-7), and the auditor's appointment reports. Non-compliance results in heavy daily penalties, disqualification of directors, and potentially the striking-off of the company name from the ROC register.",
      "Our team provides an end-to-end compliance safety net. We track your statutory deadlines, draft the required resolutions, prepare the financial returns, and file them promptly with digital signatures, ensuring your company remains in 'Active and Compliant' status without you having to worry about deadlines."
    ],
    highlights: [
      { label: "Governing Act", value: "Companies Act, 2013" },
      { label: "Key Annual Forms", value: "AOC-4 & MGT-7" },
      { label: "Authority", value: "Registrar of Companies" },
      { label: "Penalty Profile", value: "Per-Day Late Fees Applicable" }
    ]
  }),
  
  generateDefaultService("secretarial", "roc", "Companies Secretarial Work", {
    content: [
      "Companies Secretarial Work encompasses the administration of a company's legal and corporate governance framework. It goes beyond simple form filing, involving the meticulous drafting of minutes, registers, and corporate policies to ensure strict adherence to the Companies Act, 2013.",
      "Event-based secretarial compliances are triggered by structural changes in the company. This includes altering the authorized share capital, changing the registered office address across states, appointing or resigning directors, transferring shares, and managing the legalities of board and general meetings.",
      "Maintaining accurate statutory registers (Register of Members, Register of Directors, etc.) and flawless minute books is legally mandatory. Our secretarial experts act as your outsourced compliance department, ensuring every corporate decision is backed by the correct legal documentation and promptly reported to the MCA."
    ],
    highlights: [
      { label: "Core Activity", value: "Drafting Minutes & Resolutions" },
      { label: "Maintenance", value: "Statutory Registers" },
      { label: "Event Compliance", value: "Director Changes, Address Shifts" },
      { label: "Objective", value: "Flawless Corporate Governance" }
    ]
  }),
  
  generateDefaultService("restructuring", "roc", "Corporate Restructuring", {
    content: [
      "Corporate Restructuring is a complex, strategic process of reorganizing a company's legal, ownership, operational, or financial structures. This is typically undertaken to make the business more profitable, survive a financial crisis, or accommodate a major buyout or merger.",
      "This process encompasses Mergers and Amalgamations (M&A), Demergers (spinning off a business unit into a separate entity), Capital Reduction, Fast Track Mergers (specifically for startups and small companies), and conversion of entity types (e.g., converting an LLP into a Private Limited Company).",
      "Restructuring requires multi-disciplinary expertise. It involves drafting schemes of arrangement, obtaining approvals from the National Company Law Tribunal (NCLT), Regional Directors, and the ROC, as well as managing the taxation and stamp duty implications. We provide holistic advisory and execution services to seamlessly transition your corporate structure."
    ],
    highlights: [
      { label: "Key Transactions", value: "Mergers, Demergers, Conversions" },
      { label: "Approving Body", value: "NCLT / Regional Director / ROC" },
      { label: "Governing Act", value: "Companies Act, 2013" },
      { label: "Objective", value: "Business Synergy & Optimization" }
    ]
  }),

  // TAX & PAYROLL
  generateDefaultService("vat", "tax-payroll", "VAT", {
    content: [
      "Value Added Tax (VAT) was a major indirect tax mechanism in India before the rollout of the Goods and Services Tax (GST) in 2017. While GST has largely subsumed VAT, it still strictly applies to specific non-GST commodities.",
      "Today, State VAT continues to be levied exclusively on the sale of petroleum products (like petrol, diesel, aviation turbine fuel, and natural gas) and alcoholic liquor for human consumption. Businesses dealing in these specific sectors must maintain their VAT registrations, file periodic VAT returns, and undergo specific state-level VAT assessments.",
      "We provide specialized compliance services for petrol pumps, distilleries, and wholesale liquor distributors, ensuring accurate calculation of state-specific VAT, timely return filing, and representation before the state commercial tax departments."
    ],
    highlights: [
      { label: "Current Scope", value: "Alcohol & Petroleum Only" },
      { label: "Authority", value: "State Commercial Tax Dept." },
      { label: "Filing Frequency", value: "State-specific (Monthly/Quarterly)" },
      { label: "Nature of Tax", value: "Indirect Tax" }
    ]
  }),
  
  generateDefaultService("custom-tax", "tax-payroll", "Custom Tax", {
    content: [
      "Customs Duty is an indirect tax levied by the Central Board of Indirect Taxes and Customs (CBIC) under the Customs Act, 1962, on goods imported into India, and occasionally on goods exported from India. It serves to protect domestic industries and regulate international trade.",
      "The calculation of customs duty is highly complex, relying on the Harmonized System of Nomenclature (HSN) codes to determine the exact tariff rate. It involves Basic Customs Duty (BCD), Social Welfare Surcharge (SWS), and the Integrated Goods and Services Tax (IGST) applied on imports.",
      "Our customs advisory team helps importers and exporters navigate the intricate classification of goods, claim legitimate exemptions and export incentives (like RoDTEP), and ensures smooth customs clearance with zero penal liabilities."
    ],
    highlights: [
      { label: "Governing Act", value: "Customs Act, 1962" },
      { label: "Authority", value: "CBIC" },
      { label: "Key Metric", value: "HSN Code Classification" },
      { label: "Applies To", value: "Cross-Border Goods Trade" }
    ]
  }),
  
  generateDefaultService("gst", "tax-payroll", "GST Registration", {
    content: [
      "The Goods and Services Tax (GST) is India's comprehensive, multi-stage, destination-based indirect tax system. It has revolutionized the taxation landscape by replacing a web of central and state taxes (like Excise, VAT, and Service Tax) into a single, unified system.",
      "GST Registration is legally mandatory for businesses whose aggregate annual turnover exceeds ₹40 Lakhs for goods (₹20 Lakhs in special category states) or ₹20 Lakhs for services. Furthermore, businesses engaged in inter-state supply, e-commerce operators, and non-resident taxable persons must register regardless of their turnover.",
      "We handle the complete GST lifecycle: from obtaining the 15-digit GSTIN, configuring your invoicing systems to be GST-compliant, to the flawless monthly/quarterly filing of GSTR-1, GSTR-3B, and the mandatory Annual Return (GSTR-9)."
    ],
    highlights: [
      { label: "Threshold (Goods)", value: "₹40 Lakhs Turnover" },
      { label: "Threshold (Services)", value: "₹20 Lakhs Turnover" },
      { label: "Filing", value: "Monthly / Quarterly (QRMP)" },
      { label: "Tax System", value: "CGST, SGST, IGST" }
    ]
  }),
  
  generateDefaultService("domestic-tax", "tax-payroll", "Domestic Tax Compliances", {
    content: [
      "Domestic Tax Compliance refers to the routine, rigorous adherence to India's direct and indirect tax laws required by businesses operating within the country. Staying compliant is not just a legal obligation but a necessity to avoid punitive audits and freezing of bank accounts.",
      "This broad umbrella covers Tax Deducted at Source (TDS) and Tax Collected at Source (TCS) compliances. Businesses must accurately deduct TDS on salaries, professional fees, rent, and contractor payments, deposit these funds via challans, and file quarterly TDS returns (Form 24Q, 26Q) to issue Form 16/16A to deductees.",
      "Our firm provides managed services for your entire domestic tax calendar. We reconcile your books with Form 26AS/AIS, ensure advance tax payments are calculated and deposited on time, and handle all routine notices from the income tax and GST departments."
    ],
    highlights: [
      { label: "Key Components", value: "TDS, TCS, Advance Tax" },
      { label: "Filing Frequency", value: "Quarterly Returns" },
      { label: "Critical Forms", value: "Form 24Q, 26Q, Form 16" },
      { label: "Goal", value: "Zero-Penalty Tax Operations" }
    ]
  }),
  
  generateDefaultService("80g-12a", "tax-payroll", "80G / 12A", {
    content: [
      "Registrations under Section 12A and Section 80G of the Income Tax Act, 1961, are the most crucial tax exemptions for NGOs, Charitable Trusts, and Section 8 Companies in India. Without these, an NGO's income is taxable at normal corporate rates, and donors receive no tax incentives.",
      "Section 12A Registration makes the NGO's own income (from donations, grants, and operational activities) entirely exempt from income tax, provided the funds are utilized for charitable purposes. Section 80G Registration provides an incredible benefit to the donors, allowing them to deduct 50% of their donation amount from their taxable income.",
      "Securing these registrations requires rigorous scrutiny by the Commissioner of Income Tax (Exemptions). We assist NGOs in compiling the extensive documentation, framing the deed objects correctly, and representing the organization before the tax authorities to secure the provisional and final certificates."
    ],
    highlights: [
      { label: "12A Benefit", value: "Tax Exemption for NGO Income" },
      { label: "80G Benefit", value: "Tax Deduction for Donors" },
      { label: "Authority", value: "CIT (Exemptions)" },
      { label: "Eligibility", value: "Registered Trusts/NGOs/Sec 8" }
    ]
  }),
  
  generateDefaultService("income-tax", "tax-payroll", "Income Tax", {
    content: [
      "Income Tax in India is a direct tax levied by the Central Government on the income of individuals, Hindu Undivided Families (HUFs), companies, firms, and other localized entities. The Income Tax Act of 1961 governs the computation, assessment, and collection of this tax.",
      "For businesses and high-net-worth individuals, income tax planning and filing (ITR) is a highly strategic exercise. Companies are subject to corporate tax rates (which vary based on manufacturing status and turnover), while individuals navigate a complex slab system with numerous deduction chapters (like 80C, 80D).",
      "We provide comprehensive income tax services, including intelligent tax planning to minimize liabilities legally, meticulous preparation and filing of ITR-3, ITR-5, or ITR-6, handling of complex assessments, and aggressive representation during tax scrutiny or appellate proceedings."
    ],
    highlights: [
      { label: "Governing Act", value: "Income Tax Act, 1961" },
      { label: "Entities Covered", value: "Individuals & Corporates" },
      { label: "Core Service", value: "Filing ITR & Tax Planning" },
      { label: "Key Deadline", value: "July 31 / Oct 31 Annually" }
    ]
  }),
  
  generateDefaultService("indirect-tax", "tax-payroll", "Indirect Tax", {
    content: [
      "Indirect Taxes are levies collected by an intermediary (like a retail store or service provider) from the person who bears the ultimate economic burden of the tax (the consumer). In India, the indirect tax regime is dominated by GST and Customs Duty.",
      "The complexity of indirect taxation lies in its transactional nature. Every single invoice, supply chain movement, and import/export transaction carries an indirect tax implication. Misclassification or failing to claim Input Tax Credit (ITC) can severely drain a company's working capital.",
      "Our indirect tax advisory focuses on optimizing your supply chain. We conduct detailed GST health checks, advise on correct HSN/SAC classifications, assist in ITC reconciliations (GSTR-2B vs Books), and represent your business in departmental audits and litigation."
    ],
    highlights: [
      { label: "Primary Taxes", value: "GST & Customs Duty" },
      { label: "Key Challenge", value: "Input Tax Credit (ITC) Matching" },
      { label: "Focus Area", value: "Supply Chain Optimization" },
      { label: "Burden", value: "Borne by End Consumer" }
    ]
  }),
  
  generateDefaultService("direct-tax", "tax-payroll", "Direct Tax", {
    content: [
      "Direct Taxes are paid directly to the government by the individual or organization on whom it is imposed. The primary direct tax in India is Income Tax, alongside specialized levies like Capital Gains Tax, Corporate Tax, and Securities Transaction Tax (STT).",
      "Direct tax legislation in India undergoes significant changes every year through the Union Budget. Keeping pace with new compliances, shifting tax slabs, and evolving case laws is critical for corporate entities to avoid punitive actions from the Central Board of Direct Taxes (CBDT).",
      "We offer specialized direct tax consulting. This includes structuring cross-border transactions to mitigate double taxation (DTAA advisory), transfer pricing audits for multinational corporations, calculating complex capital gains on real estate or equity sales, and managing expatriate taxation."
    ],
    highlights: [
      { label: "Primary Taxes", value: "Income Tax & Corporate Tax" },
      { label: "Authority", value: "CBDT" },
      { label: "Advanced Areas", value: "Transfer Pricing & DTAA" },
      { label: "Focus", value: "Strategic Corporate Tax Planning" }
    ]
  }),
  
  generateDefaultService("tax-consultancy", "tax-payroll", "Tax Consultancy", {
    content: [
      "Tax Consultancy is a high-level advisory service designed for businesses facing complex transactions, undergoing restructuring, or planning international expansion. It goes far beyond routine compliance and return filing.",
      "Our consultancy approach is holistic, blending deep knowledge of both Direct and Indirect tax laws. Whether you are structuring a merger, establishing a subsidiary in a foreign jurisdiction, or dealing with a massive search and seizure operation by tax authorities, expert guidance is paramount.",
      "We act as your dedicated tax counsels. We provide written tax opinions on ambiguous transactions, assist in obtaining advance rulings from the tax department to secure tax certainty, and represent you forcefully in high-stakes litigation before the ITAT and High Courts."
    ],
    highlights: [
      { label: "Service Nature", value: "Strategic & Advisory" },
      { label: "Key Offerings", value: "Tax Opinions & Structuring" },
      { label: "Dispute Resolution", value: "ITAT & High Court Representation" },
      { label: "Target Audience", value: "Large Corporates & MNCs" }
    ]
  }),

  // MISCELLANEOUS REGISTRATION
  generateDefaultService("section-8", "misc-reg", "Section 8 Company Registration", {
    content: [
      "A Section 8 Company is the most robust, credible, and scalable legal structure for Non-Profit Organizations (NGOs) in India. Registered under the Companies Act, 2013, its primary objective is to promote arts, commerce, science, sports, education, research, social welfare, religion, charity, or environmental protection.",
      "Unlike Trusts or Societies, a Section 8 Company is a centralized corporate entity recognized uniformly across India. It enjoys the privileges of limited liability for its members but is strictly prohibited from paying dividends. Any profit generated must be reinvested entirely into promoting its stated objectives.",
      "Because it operates under the stringent regulatory framework of the MCA, a Section 8 Company commands significantly higher trust from corporate CSR donors, foreign grant agencies, and government bodies compared to traditional trusts or societies."
    ],
    highlights: [
      { label: "Governing Act", value: "Companies Act, 2013" },
      { label: "Profit Sharing", value: "Strictly Prohibited" },
      { label: "Credibility", value: "Highest among NGOs" },
      { label: "Funding Access", value: "Highly CSR & FCRA Friendly" }
    ]
  }),
  
  generateDefaultService("partnership-deed", "misc-reg", "Partnership Deed Registration", {
    content: [
      "A Partnership Deed is the foundational legal document that dictates how a partnership firm operates. It is a written agreement between two or more partners outlining their mutual rights, duties, profit-sharing ratios, capital contributions, and dispute resolution mechanisms.",
      "While an oral partnership is legally valid, it is practically impossible to open a bank account, secure loans, or enforce legal rights without a written, notarized, and registered deed. The deed is drafted according to the provisions of the Indian Partnership Act, 1932.",
      "Our legal experts draft watertight partnership deeds tailored to your specific business arrangements. We handle the crucial step of registering the deed with the local Sub-Registrar/Registrar of Firms (RoF), ensuring your business structure is legally sound and immune to internal conflicts."
    ],
    highlights: [
      { label: "Governing Act", value: "Indian Partnership Act, 1932" },
      { label: "Key Component", value: "Profit Sharing & Capital Clauses" },
      { label: "Authority", value: "Registrar of Firms (RoF)" },
      { label: "Legal Weight", value: "Prevents Partner Disputes" }
    ]
  }),
  
  generateDefaultService("ngo-trust", "misc-reg", "NGO & Trust", {
    content: [
      "A Charitable Trust is the oldest and simplest form of a Non-Governmental Organization in India. It is formed when the creator (Settlor) transfers property or funds to a Trustee for the benefit of the public or a specific charitable purpose, such as education, poverty relief, or medical aid.",
      "Trusts are governed by the Indian Trusts Act, 1882, and are registered with the local Sub-Registrar of Assurances by executing a formal Trust Deed. Because registration occurs at the state level, the regulatory oversight and compliance burden for Trusts are relatively lower compared to Section 8 Companies.",
      "A Trust is the ideal legal vehicle when a family or a small group of close associates wishes to dedicate inherited property or personal wealth to a permanent charitable cause with minimal ongoing statutory interference."
    ],
    highlights: [
      { label: "Governing Act", value: "Indian Trusts Act, 1882" },
      { label: "Founding Document", value: "Registered Trust Deed" },
      { label: "Authority", value: "Local Sub-Registrar" },
      { label: "Compliance Burden", value: "Low" }
    ]
  }),
  
  generateDefaultService("society", "misc-reg", "Society", {
    content: [
      "A Society is an association of persons who come together by mutual consent to deliberate, determine, and act jointly for a charitable purpose. It is a highly democratic form of NGO, requiring a minimum of 7 members (from the same state) or 8 members (from different states for national-level societies).",
      "Societies are registered under the Societies Registration Act, 1860, by submitting a Memorandum of Association (MoA) and detailed Rules & Regulations to the State Registrar of Societies. They are governed by an elected managing committee.",
      "This structure is highly popular for educational institutions, housing associations, sports clubs, and cultural organizations where democratic decision-making, membership voting rights, and community participation are central to the organization's ethos."
    ],
    highlights: [
      { label: "Governing Act", value: "Societies Registration Act, 1860" },
      { label: "Min. Members", value: "7 (State) / 8 (National)" },
      { label: "Governance", value: "Democratic / Elected Committee" },
      { label: "Ideal For", value: "Schools, Clubs & Housing" }
    ]
  }),

  // OTHER SERVICES
  generateDefaultService("international-trade", "other", "International Trade", {
    content: [
      "International Trade consultancy equips Indian businesses with the legal, financial, and strategic framework required to expand across borders. Navigating foreign exchange laws, export incentives, and international taxation is critical for global success.",
      "We assist businesses in optimizing their supply chains through Free Trade Agreements (FTAs), Special Economic Zones (SEZs), and Export Oriented Units (EOUs). We also help you legally claim lucrative export incentives like RoDTEP, SEIS, and EPCG to make your pricing globally competitive.",
      "Beyond incentives, we structure your cross-border contracts, manage customs valuations, and ensure full compliance with the Directorate General of Foreign Trade (DGFT) regulations, ensuring your global expansion is both profitable and legally secure."
    ],
    highlights: [
      { label: "Key Authority", value: "DGFT & Customs" },
      { label: "Incentives Covered", value: "RoDTEP, EPCG, Duty Drawback" },
      { label: "Strategic Focus", value: "SEZ/EOU Setup & FTA Usage" },
      { label: "Goal", value: "Global Expansion & Tax Mitigation" }
    ]
  }),
  
  generateDefaultService("csr-compliance", "other", "CSR Compliance", {
    content: [
      "Corporate Social Responsibility (CSR) in India is not merely philanthropy; it is a strict statutory mandate under Section 135 of the Companies Act, 2013. Qualifying companies must spend at least 2% of their average net profits over the preceding three years on designated social initiatives.",
      "CSR compliance requires the formation of a CSR Committee, drafting a formal CSR policy, identifying eligible implementing agencies (which must be registered with the MCA via Form CSR-1), and filing the detailed annual report on CSR activities.",
      "We provide end-to-end CSR advisory. For corporates, we ensure your funds are channeled into legally valid projects without compliance breaches. For NGOs, we secure your CSR-1 registration and help structure your projects to attract corporate funding."
    ],
    highlights: [
      { label: "Statutory Mandate", value: "Section 135, Companies Act" },
      { label: "Spend Requirement", value: "2% of Average Net Profit" },
      { label: "NGO Prerequisite", value: "CSR-1 Registration" },
      { label: "Key Deliverable", value: "Annual CSR Report Filing" }
    ]
  }),
  
  generateDefaultService("fema-compliance", "other", "FEMA Compliance", {
    content: [
      "The Foreign Exchange Management Act, 1999 (FEMA) regulates all cross-border financial transactions in India. Administered aggressively by the Reserve Bank of India (RBI) and the Enforcement Directorate (ED), FEMA violations can result in massive penalties and asset confiscation.",
      "FEMA compliance is triggered anytime a business receives Foreign Direct Investment (FDI), makes Overseas Direct Investment (ODI), raises External Commercial Borrowings (ECB), or executes significant import/export remittances.",
      "Our FEMA experts navigate you through the RBI's complex master directions. We handle the mandatory filings on the FIRMS portal (like FC-GPR for incoming FDI and FC-TRS for share transfers), ensure timely submission of Annual Return on Foreign Liabilities and Assets (FLA), and manage compounding of minor offenses with the RBI."
    ],
    highlights: [
      { label: "Governing Act", value: "FEMA, 1999" },
      { label: "Authority", value: "Reserve Bank of India (RBI)" },
      { label: "Key Trigger", value: "FDI, ODI & Cross-Border Loans" },
      { label: "Critical Filings", value: "FC-GPR, FC-TRS, FLA Return" }
    ]
  }),
  
  generateDefaultService("business-consulting", "other", "Business Consulting", {
    content: [
      "Business Consulting is our apex advisory service, tailored for entrepreneurs facing pivotal growth stages, operational bottlenecks, or complex legal hurdles. We act as your outsourced brain-trust, combining legal, financial, and strategic acumen.",
      "Our engagements span a wide spectrum: advising on capital restructuring ahead of a Series-A fundraise, conducting extensive legal due diligence for mergers, designing tax-efficient ESOP pools for startups, and streamlining internal financial controls to prepare for statutory audits.",
      "We don't just point out problems; we execute solutions. Our consulting guarantees that your business architecture is legally bulletproof, tax-optimized, and fundamentally aligned with your long-term commercial objectives."
    ],
    highlights: [
      { label: "Nature of Engagement", value: "Strategic & Solution-Oriented" },
      { label: "Focus Areas", value: "Fundraising, M&A, Restructuring" },
      { label: "Key Tool", value: "Legal & Financial Due Diligence" },
      { label: "Value Proposition", value: "Holistic Corporate Strategy" }
    ]
  })
];

// Utility functions
export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(s => s.slug === slug);
};

export const getServicesByCategory = (category: string): ServiceData[] => {
  return servicesData.filter(s => s.category === category);
};
