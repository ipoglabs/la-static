export default function PrivacyPolicyContent() {
  const sections = [
    {
      title: "",
      content:
        "At Lokalads, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.",
    },
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly, such as your name, email address, and any listings you post. We also collect usage data automatically, including IP address, browser type, and pages visited.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to provide and improve our services, communicate with you about your account, and ensure the safety and security of our platform.",
    },
    {
      title: "Data Sharing",
      content:
        "We do not sell your personal data to third parties. We may share information with trusted service providers who assist us in operating our platform, subject to strict confidentiality agreements.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@lokalads.com for any requests.",
    },
    {
      title: "Contact",
      content:
        "For privacy-related inquiries, please contact us at privacy@lokalads.com or write to our registered address.",
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <div key={index} className="space-y-2">
          {section.title && (
            <h3 className="font-semibold text-slate-800">
              {section.title}
            </h3>
          )}
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
}