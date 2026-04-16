export default function ConditionsContent() {
  const sections = [
    {
      title: "",
      content:
        "By using Lokalads, you agree to these Terms and Conditions. Please read them carefully before using our platform.",
    },
    {
      title: "Use of the Platform",
      content:
        "You must be at least 18 years old to use Lokalads. You agree not to post false, misleading, or fraudulent listings and to comply with all applicable laws.",
    },
    {
      title: "Listings & Content",
      content:
        "You are solely responsible for the content of your listings. Lokalads reserves the right to remove any listing that violates our policies without prior notice.",
    },
    {
      title: "Liability",
      content:
        "Lokalads acts as a platform connecting buyers and sellers and is not a party to any transaction. We are not liable for any loss or damage arising from transactions made through the platform.",
    },
    {
      title: "Account Termination",
      content:
        "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or harm other users.",
    },
    {
      title: "Changes to Terms",
      content:
        "We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.",
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