export interface BulletPoint {
  text: string;
}

export interface NumberedItem {
  number?: number;
  text: string;
}

export interface PolicySection {
  heading: string;
  content?: string;
  bulletPoints?: BulletPoint[];
  numberedList?: NumberedItem[];
}

export interface PolicyData {
  id: string;
  title: string;
  subtitle?: string;
  lastUpdated: string;
  heroImage?: string;
  introduction?: string;
  sections: PolicySection[];
}

const privacyPolicy: PolicyData = {
  id: "privacy-policy",
  title: "Privacy Policy",
  subtitle:
    "Your personal information is important to us. This policy explains how we collect, use, share, and protect the data you provide on PurpleElegance.com.",
  lastUpdated: "October 7, 2024",
  introduction:
    "Welcome to PurpleElegance.com, an online platform provided by Purple Elegance Retail Limited. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information. By using PurpleElegance.com, you agree to the terms outlined in this policy.",
  sections: [
    {
      heading: "Information We Collect",
      content:
        "We may collect the following personal information when you use PurpleElegance.com:",
      bulletPoints: [
        { text: "Names" },
        { text: "Email addresses" },
        { text: "Phone numbers" },
        { text: "Shipping and billing addresses" },
        { text: "Payment information" },
        { text: "Demographic information" },
      ],
    },
    {
      heading: "Usage Information",
      content:
        "We collect information about how you interact with PurpleElegance.com, including pages visited, products viewed, and actions taken.",
    },
    {
      heading: "Device Information",
      content:
        "We may collect information about the device you use to access PurpleElegance.com, including the device type, operating system, browser type, and IP address.",
    },
    {
      heading: "Cookies and Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to enhance your experience on PurpleElegance.com and for analytics purposes. You can control cookies through your browser settings.",
    },
    {
      heading: "How We Use Your Information",
      content:
        "We use your information for the following purposes:",
      bulletPoints: [
        { text: "To provide and maintain PurpleElegance.com services" },
        { text: "To process and fulfill orders" },
        { text: "To communicate with you about orders, products, promotions, and updates" },
        { text: "To personalize your experience on PurpleElegance.com" },
        { text: "To analyze and improve our services" },
      ],
    },
    {
      heading: "Information Sharing",
      content:
        "We may share your information with third parties in the following circumstances:",
      bulletPoints: [
        { text: "With service providers who assist us in operating PurpleElegance.com and providing services" },
        { text: "With trusted partners for marketing and promotional purposes, but only with your explicit consent" },
        { text: "In response to legal requests, such as a court order or government investigation" },
      ],
    },
    {
      heading: "Your Choices",
      content:
        "We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This Privacy Policy is governed by and construed in accordance with the laws of India.",
    },
    {
      heading: "Governing Law",
      content:
        "Any disputes arising under or in connection with this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, India.",
    },
    {
      heading: "Contact Us",
      content:
        "If you have any questions or concerns about this Privacy Policy, please contact us at info@purpleelegance.com.",
    },
  ],
};

const termsOfUse: PolicyData = {
  id: "terms-of-use",
  title: "Terms of Use",
  subtitle:
    "These Terms govern your access to and use of PurpleElegance.com. Please read them carefully before using the website.",
  lastUpdated: "October 7, 2024",
  introduction:
    "Welcome to PurpleElegance.com, an online platform owned and operated by Purple Elegance Retail Limited. By accessing the Website, you agree to be bound by these Terms. If you do not agree with any aspect of these Terms, please refrain from making purchases on our website.",
  sections: [
    {
      heading: "Acceptance of Terms",
      content:
        "By accessing or using the Website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Website.",
    },
    {
      heading: "Account Registration",
      content:
        "To access certain features of the Website, you may be required to register an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.",
    },
    {
      heading: "Account Security",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
    },
    {
      heading: "Intellectual Property",
      content:
        "All content on the Website, including but not limited to text, graphics, images, videos, and software, is the property of Purple Elegance Retail Limited and is protected by intellectual property laws.",
    },
    {
      heading: "Restrictions on Use",
      content: "You agree to use the Website only for lawful purposes and comply with all applicable laws and regulations.",
      bulletPoints: [
        { text: "Posting or transmitting content that is illegal, offensive, or infringes on the rights of others" },
        { text: "Attempting to gain unauthorized access to the Website or any user accounts" },
        { text: "Interfering with or disrupting the Website or its services" },
        { text: "Impersonating another person or entity" },
      ],
    },
    {
      heading: "Privacy Policy",
      content:
        "Your use of the Website is also governed by our Privacy Policy.",
    },
    {
      heading: "Disclaimer of Warranties",
      content:
        "The Website is provided \"as is\" and \"as available\" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
    },
    {
      heading: "Limitation of Liability",
      content:
        "To the extent permitted by law, Purple Elegance Retail Limited shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Website.",
    },
    {
      heading: "Indemnification",
      content:
        "You agree to indemnify, defend, and hold harmless Purple Elegance Retail Limited, its officers, directors, employees, agents, and affiliates from any claims, liabilities, damages, losses, costs, or expenses arising out of or in connection with your use of the Website or your violation of these Terms.",
    },
    {
      heading: "Suspension and Termination",
      content:
        "We reserve the right to suspend or terminate your access to the Website at our sole discretion, without notice, for any reason, including breach of these Terms.",
    },
    {
      heading: "Third-Party Links",
      content:
        "The Website may contain links to third-party websites or resources. We are not responsible for the availability, accuracy, or content of these external websites.",
    },
    {
      heading: "Changes to Terms",
      content:
        "We reserve the right to modify or update these Terms at any time, and such modifications will be effective immediately upon posting on the Website. It is your responsibility to review these Terms periodically.",
    },
    {
      heading: "Governing Law",
      content:
        "These Terms are governed by and construed in accordance with the laws of Delhi Court, India, and you agree to submit to the exclusive jurisdiction of the courts in Jaipur, India, for the resolution of any dispute arising under these Terms.",
    },
    {
      heading: "Effective Date",
      content:
        "These Terms are effective as of the date of your first use of the Website.",
    },
  ],
};

const returnExchangePolicy: PolicyData = {
  id: "return-exchange",
  title: "Return & Exchange Policy",
  subtitle:
    "Learn how to return or exchange eligible products purchased from PurpleElegance, including conditions, timelines, and support details.",
  lastUpdated: "October 7, 2024",
  introduction:
    "Thank you for choosing to shop at PurpleElegance.com. We are dedicated to providing you with a delightful shopping experience. To ensure clarity and transparency, we have outlined our Return and Exchange Policy below.",
  sections: [
    {
      heading: "Return Eligibility",
      content:
        "We gladly accept returns and exchanges for non-personalized products. If you are not entirely satisfied with your purchase, please ensure the following conditions are met:",
      bulletPoints: [
        { text: "The product must be in its original condition, unopened, unused, and in its original packaging." },
        { text: "The product is purchased from PurpleElegance.com only." },
        { text: "The return or exchange request must be initiated within 3 days of receiving the product." },
        { text: "Proof of purchase, such as the order number and purchase receipt, must be provided." },
      ],
    },
    {
      heading: "Personalized Products",
      content:
        "Due to the customized nature of personalized products, we can only accept returns or exchanges for these items if there is a defect or error in the personalization. In each case, please contact our customer support team for assistance.",
    },
    {
      heading: "How to Request a Return or Exchange",
      content:
        "To request a return or exchange for eligible products, please follow these steps:",
      numberedList: [
        { text: "Contact our customer support team at info@purpleelegance.com or call us at 1800 11 0123." },
        { text: "Provide details of your purchase, including the order number and the reason for your return or exchange request." },
        { text: "After receiving your request, we will provide you with detailed instructions on how to return the product." },
        { text: "Please package the product securely and include a copy of the purchase receipt." },
      ],
    },
    {
      heading: "Return Inspection",
      content:
        "Once we receive the returned product, our team will carefully inspect it to ensure it meets the eligibility criteria. If the product is in acceptable condition, we will proceed with the return or exchange process.",
    },
    {
      heading: "Refunds and Exchanges",
      content:
        "You may choose between a refund or an exchange for an eligible product. Refunds will be processed using the original payment method used for the purchase. Please allow 10 business days for the refund to be credited to your account. Exchanges will be shipped to you free of charge.",
    },
    {
      heading: "Non-Returnable Items",
      content:
        "The following items are non-returnable:",
      bulletPoints: [
        { text: "Personalized products (unless there is a defect or error)" },
        { text: "Gift cards or vouchers" },
        { text: "Products that have been used or damaged" },
        { text: "Products returned after the specified return and exchange period" },
      ],
    },
    {
      heading: "Return Shipping Costs",
      content:
        "Return shipping costs are generally the responsibility of the customer, except when the return is due to a defect or error on our part. If you are returning a product due to a defect or error, please contact our customer support team for assistance with return shipping arrangements.",
    },
    {
      heading: "Need Assistance?",
      content:
        "If you have any questions or need further assistance regarding our return and exchange policy, please do not hesitate to contact us at info@purpleelegance.com or call us at 1800 11 0123.",
    },
    {
      heading: "Policy Acknowledgement",
      content:
        "By shopping at PurpleElegance.com, you acknowledge that you have read and understood this Return & Exchange Policy and agree to its terms and conditions. If you do not agree with any aspect of this policy, please refrain from making purchases on our website.",
    },
  ],
};

export const policyDataMap: Record<string, PolicyData> = {
  "privacy-policy": privacyPolicy,
  "terms-of-use": termsOfUse,
  "return-exchange": returnExchangePolicy,
};

export function getPolicyData(policyId: string): PolicyData | null {
  return policyDataMap[policyId] || null;
}
