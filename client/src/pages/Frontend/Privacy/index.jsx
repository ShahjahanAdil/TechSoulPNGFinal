import React, { useState } from "react";

const sections = [
  {
    id: "terms",
    title: "Terms of Service",
    content: (
      <>
        <h6 className="!text-[16px] font-semibold">
          1. Modifications to Terms
        </h6>
        <p className="!text-[16px] mb-4">
          We reserve the right to modify or update these terms at any time
          without prior notice. Your continued use of our services after any
          changes signifies your acceptance of the updated terms.
        </p>

        <h6 className="!text-[16px] font-semibold">2. User Responsibilities</h6>
        <p className="!text-[16px] mb-4">
          You agree to use our services responsibly and not engage in activities
          that may harm the website, its users, or third parties. Unauthorized
          use of our content or services may result in termination of your
          access.
        </p>

        <h6 className="!text-[16px] font-semibold">3. Content Usage</h6>
        <p className="!text-[16px] mb-4">
          All content provided on this website is for personal, non-commercial
          use unless otherwise stated. We disclaim any liability arising from
          misuse or unauthorized distribution of our materials.
        </p>

        <h6 className="!text-[16px] font-semibold">4. Account Registration</h6>
        <p className="!text-[16px] mb-4">
          Certain features may require registration. You agree to provide
          accurate information during registration and to keep your account
          credentials confidential. You are responsible for all activities
          conducted through your account.
        </p>

        <h6 className="!text-[16px] font-semibold">5. Intellectual Property</h6>
        <p className="!text-[16px] mb-4">
          The content on this website, including images, text, and graphics, is
          protected by intellectual property laws. You may not copy, modify,
          distribute, or use the content for commercial purposes without
          explicit permission or license.
        </p>

        <h6 className="!text-[16px] font-semibold">
          6. Attribution Requirements
        </h6>
        <p className="!text-[16px] mb-4">
          Free users may need to provide attribution when using content from
          this website, as specified on individual content pages. Commercial or
          enterprise users must comply with license terms associated with their
          subscription plan.
        </p>

        <h6 className="!text-[16px] font-semibold">
          7. Disclaimer of Warranties
        </h6>
        <p className="!text-[16px] mb-4">
          We provide the website and content "as is" without warranties. We are
          not liable for any damages resulting from your use of the site or
          content.
        </p>

        <h6 className="!text-[16px] font-semibold">8. Termination of Access</h6>
        <p className="!text-[16px] mb-4">
          We may suspend or terminate access to our services at any time for
          violations of these terms or misuse of the platform.
        </p>

        <h6 className="!text-[16px] font-semibold">9. Contact Us</h6>
        <p className="!text-[16px] mb-4">
          If you have any questions about these terms, please contact us before
          using our website.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    content: (
      <>
        <p>
          Your privacy is extremely important to us at [Your Website Name]. This
          Privacy Policy explains how we collect, use, and protect your personal
          information when you visit our website or use our services.
        </p>
        <p>
          We collect only the information necessary to provide and improve our
          services. This may include your contact information, usage data, and
          preferences. We do not sell your data to third parties.
        </p>
        <p>
          We use industry-standard security measures to protect your information
          from unauthorized access, alteration, or destruction. However, no
          internet transmission can be guaranteed as 100% secure.
        </p>
        <p>
          You have the right to access, correct, or delete your personal data.
          Please contact us if you wish to exercise these rights or have any
          concerns about your privacy.
        </p>
        <p>
          We may update this policy periodically and will notify you of
          significant changes. Continued use of our website after updates
          indicates your acceptance of the new terms.
        </p>
      </>
    ),
  },
  {
    id: "copyrights",
    title: "Copyrights",
    content: (
      <>
        <p>
          All content, including images, text, graphics, and logos, displayed on
          [Your Website Name] is protected by copyright laws and is the property
          of their respective owners.
        </p>
        <p>
          You may download and use images for personal, non-commercial purposes
          only, unless a different license is specified. Redistribution or
          commercial use without explicit permission is prohibited.
        </p>
        <p>
          If you believe your copyrighted work has been used improperly on our
          site, please contact us with appropriate documentation so we can
          promptly address the issue.
        </p>
        <p>
          We respect intellectual property rights and expect our users to do the
          same. Unauthorized use of copyrighted content may result in legal
          action.
        </p>
        <p>
          Always verify the licensing information for each image before using it
          beyond personal use.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies Policy",
    content: (
      <>
        <p>
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience, analyze site traffic, and personalize
          content.
        </p>
        <p>
          Cookies are small text files stored on your device that help us
          remember your preferences and understand how you interact with our
          site.
        </p>
        <p>
          You can control or disable cookies through your browser settings.
          However, disabling cookies may affect the functionality and
          performance of the website.
        </p>
        <p>
          We do not use cookies to collect personally identifiable information
          without your consent. Third-party services used on our site may also
          place cookies following their own policies.
        </p>
        <p>
          By continuing to use our website, you consent to our use of cookies in
          accordance with this policy.
        </p>
      </>
    ),
  },
  {
    id: "license",
    title: "License Terms",
    content: (
      <>
        <p>
          By downloading images from [Your Website Name], you are granted a
          limited, non-exclusive, non-transferable license to use the images as
          specified in the license agreement.
        </p>
        <p>
          The license permits personal, educational, or commercial use depending
          on the terms associated with each image. You must review the specific
          license linked to each download.
        </p>
        <p>
          Redistribution, resale, or sublicensing of the images is strictly
          prohibited unless explicitly allowed in the license terms.
        </p>
        <p>
          You agree not to use the images in any unlawful or harmful manner that
          could damage the reputation of the original creator or this website.
        </p>
        <p>
          For any clarifications about licensing, please contact our support
          team before using the images.
        </p>
      </>
    ),
  },
  {
    id: "refund",
    title: "Refund Policy",
    content: (
      <>
        <p>
          At [Your Website Name], we strive to provide high-quality services and
          digital content. However, due to the nature of digital products,
          refunds are generally not provided once a download is completed.
        </p>
        <p>
          If you encounter technical issues or errors with your purchase or
          download, please contact our support team promptly. We will make
          reasonable efforts to resolve the problem or offer a replacement if
          applicable.
        </p>
        <p>
          Refunds may be considered on a case-by-case basis for subscription
          plans or memberships under exceptional circumstances.
        </p>
        <p>
          We recommend reviewing all product details and licensing information
          carefully before making a purchase to avoid misunderstandings.
        </p>
        <p>
          For questions regarding refunds or cancellations, please reach out to
          us at [support email].
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Policy",
    content: (
      <>
        <p>
          Intellectual property rights are a cornerstone of our website and the
          content we provide. We respect the rights of creators and expect users
          to do the same.
        </p>
        <p>
          All images, designs, trademarks, and related content hosted on [Your
          Website Name] are protected by intellectual property laws and belong
          to their rightful owners.
        </p>
        <p>
          Unauthorized copying, distribution, or modification of our content
          without permission is prohibited and may result in legal consequences.
        </p>
        <p>
          If you believe your intellectual property has been infringed upon
          through our platform, please notify us immediately with the necessary
          documentation.
        </p>
        <p>
          We are committed to promptly investigating and resolving any claims
          related to intellectual property violations.
        </p>
      </>
    ),
  },
];

const Privacy = () => {
  const [active, setActive] = useState("terms");

  return (
    <div className="max-w-6xl mx-auto my-16 px-4 md:px-0">

      <div className="flex flex-col md:flex-row md:space-x-12">
        {/* Sidebar nav */}
        <nav className="mb-10 md:mb-0 md:w-1/4 border-l border-gray-300 pl-6 sticky top-24 max-h-[80vh] overflow-auto">
          <ul className="space-y-4 text-gray-700 text-sm md:text-base font-medium">
            {sections.map(({ id, title }) => (
              <li key={id} className="mb-2">
                <button
                  onClick={() => setActive(id)}
                  className={`w-full text-left border-l-4 pl-3 py-1.5 cursor-pointer transition-colors ${
                    active === id
                      ? "border-green-500 text-green-700 font-semibold bg-green-50"
                      : "border-transparent hover:border-green-400 hover:text-green-600"
                  }`}
                  aria-current={active === id ? "true" : undefined}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <main className="md:w-3/4 prose prose-green max-w-none">
          {sections
            .filter((section) => section.id === active)
            .map(({ id, title, content }) => (
              <section key={id} aria-labelledby={`${id}-heading`}>
                <h4 className="pb-5" id={`${id}-heading`}>{title}</h4>
                {content}
              </section>
            ))}
        </main>
      </div>
    </div>
  );
};

export default Privacy;
