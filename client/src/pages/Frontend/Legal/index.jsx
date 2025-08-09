import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        <p className="mb-4">
          Your privacy is extremely important to us at{" "}
          <strong>FlowerPNG</strong>. This Privacy Policy explains how
          we collect, use, and protect your personal information when you visit
          our website or use our services.
        </p>

        <div className="space-y-8">
          <section>
            <h6 className="text-xl font-semibold mb-2">
              1. Definition of Personal Data
            </h6>
            <p>
              Personal Data refers to information that can be used to identify
              you, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name, email address, and contact number</li>
              <li>IP address and device information</li>
              <li>User account credentials (if registered)</li>
              <li>Usage behavior (pages visited, actions taken)</li>
            </ul>
            <p className="mt-3 font-semibold">Exclusions:</p>
            <p>
              We do not intentionally collect or store sensitive categories of
              data such as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Racial or ethnic origin</li>
              <li>Religious or philosophical beliefs</li>
              <li>Political opinions</li>
              <li>Health or genetic data</li>
              <li>Sexual orientation</li>
              <li>Biometric identifiers</li>
              <li>Union membership</li>
            </ul>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              2. Legal Basis for Data Collection
            </h6>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Consent:</strong> You’ve explicitly agreed to the
                collection and use of your data.
              </li>
              <li>
                <strong>Contractual necessity:</strong> Data required to fulfill
                a transaction or provide a service.
              </li>
              <li>
                <strong>Legal obligations:</strong> Compliance with laws and
                regulations.
              </li>
              <li>
                <strong>Legitimate interests:</strong> Improving our platform
                and providing secure, customized experiences.
              </li>
              <li>
                <strong>Vital interests:</strong> Protecting the safety or
                rights of any individual.
              </li>
            </ul>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              3. Types of Data We Collect
            </h6>
            <table className="table-auto border border-collapse w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Triggered Action</th>
                  <th className="border px-4 py-2">Data Collected</th>
                  <th className="border px-4 py-2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Website Visit</td>
                  <td className="border px-4 py-2">
                    IP address, browser type, cookies
                  </td>
                  <td className="border px-4 py-2">
                    To analyze usage and improve performance
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Registration</td>
                  <td className="border px-4 py-2">
                    Name, email, login details
                  </td>
                  <td className="border px-4 py-2">
                    To create your account and offer services
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Premium Membership</td>
                  <td className="border px-4 py-2">
                    Payment details, billing info
                  </td>
                  <td className="border px-4 py-2">
                    To fulfill payment obligations
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Inquiries & Feedback</td>
                  <td className="border px-4 py-2">
                    Contact info, message content
                  </td>
                  <td className="border px-4 py-2">
                    To respond to your requests
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Partnership Requests</td>
                  <td className="border px-4 py-2">
                    Business details, payment data
                  </td>
                  <td className="border px-4 py-2">
                    To manage contributor/partner relationships
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              4. How We Collect Data
            </h6>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Directly:</strong> When you register, contact us, or
                subscribe to services.
              </li>
              <li>
                <strong>Automatically:</strong> Through cookies and similar
                technologies.
              </li>
              <li>
                <strong>Third Parties:</strong> Payment providers or analytics
                platforms.
              </li>
              <li>
                <strong>Optional Add-ons:</strong> Google Docs, extensions, or
                social media widgets.
              </li>
            </ul>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">5. Cookie Policy</h6>
            <p>Cookies help improve your browsing experience and include:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Authentication & Security:</strong> Verifying login
                sessions.
              </li>
              <li>
                <strong>Preferences:</strong> Remembering UI settings.
              </li>
              <li>
                <strong>Analytics:</strong> Monitoring user behavior to improve
                design.
              </li>
              <li>
                <strong>Advertising (if applicable):</strong> Delivering
                relevant ads.
              </li>
              <li>
                <strong>Performance:</strong> Balancing server loads and
                speeding up interactions.
              </li>
            </ul>
            <p className="mt-2">
              <strong>Managing Cookies:</strong> You can disable cookies through
              browser settings. Disabling may limit functionality.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              6. Third-Party Links & Social Media Widgets
            </h6>
            <p>
              Our website may contain links to third-party platforms or include
              share buttons. These external services may collect your data. We
              advise reviewing their privacy policies as we are not responsible
              for their practices.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              7. Data Protection & Security
            </h6>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Encrypted transmissions (SSL)</li>
              <li>Secure password hashing</li>
              <li>Controlled access to stored information</li>
              <li>Regular audits and monitoring</li>
            </ul>
            <p className="mt-2">
              Despite these measures, no system can be 100% secure. Please take
              steps to protect your data (e.g., strong passwords, logging out
              after use).
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">8. Your Rights</h6>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the data we store about you</li>
              <li>Correct or update your information</li>
              <li>Delete your personal data</li>
              <li>Object to or restrict certain data uses</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">
              You can exercise these rights by contacting:
              <br />
              📧 Email:{" "}
              <a
                href="mailto:info@flowerpng.com"
                className="text-blue-600 underline"
              >
                info@flowerpng.com
              </a>
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">9. Policy Updates</h6>
            <p>
              We may revise this Privacy Policy occasionally. When we do, we’ll
              update the “Effective Date” and notify users of major changes.
              Continued use of our services after updates indicates your
              acceptance.
            </p>
          </section>
        </div>
      </>
    ),
  },
  {
    id: "copyrights",
    title: "Copyrights",
    content: (
      <>
        <div className="space-y-8">
          <section>
            <h6 className="text-xl font-semibold mb-2">
              1. Copyright Ownership
            </h6>
            <p>
              All content displayed on <strong>FlowerPNG</strong> —
              including images, text, graphics, and logos — is protected by
              copyright laws and belongs to their respective owners.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              2. Usage Restrictions
            </h6>
            <p>
              You may download and use images for personal, non-commercial
              purposes only, unless a different license is clearly specified.
              Redistribution or use for commercial purposes is prohibited
              without explicit written permission.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              3. Respect for Intellectual Property
            </h6>
            <p>
              We respect the intellectual property rights of others and expect
              our users to do the same. Unauthorized use of copyrighted
              materials may result in legal consequences.
            </p>
            <p>
              Always review licensing details associated with each image before
              using it beyond personal purposes.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              4. Reporting Copyright Infringement
            </h6>
            <p>
              If you believe that any content on our website infringes your
              copyright, please send us a formal notification containing the
              following details:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                A handwritten or electronic signature of the copyright owner or
                an authorized agent.
              </li>
              <li>
                Identification of the copyrighted work claimed to be infringed
                (or a list if multiple works).
              </li>
              <li>
                Clear identification of the infringing content and details to
                help us locate it.
              </li>
              <li>
                Contact details of the complaining party (email, phone number,
                and address).
              </li>
              <li>
                A good faith statement that the use is unauthorized by the
                copyright owner or the law.
              </li>
              <li>
                A declaration that the information in the notice is accurate and
                submitted under penalty of perjury.
              </li>
            </ul>
            <p className="mt-2">
              Once a valid notification is received, we will promptly disable or
              remove access to the infringing material and may take additional
              actions, including disabling the user’s account.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              5. Response from the Content Uploader
            </h6>
            <p>
              The individual who posted the allegedly infringing content may
              submit a counter-statement. This statement must also meet the
              criteria outlined for copyright notifications.
            </p>
            <p>
              Note: If the content is found to violate copyright, the uploader
              may be held legally responsible. If uncertain, legal counsel is
              recommended.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              6. Repeat Infringement
            </h6>
            <p>
              If you believe that a user is a repeat offender, please include
              any supporting evidence in your notification so that we may
              investigate and take appropriate action.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              7. Incomplete Notifications
            </h6>
            <p>
              Notifications that lack the required information may be considered
              invalid and may not result in content removal. Please ensure that
              all points are addressed clearly.
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">
              8. Contact Information
            </h6>
            <p>
              For all copyright-related issues or abuse reports, please contact
              us at:
              <br />
              📧{" "}
              <a
                href="mailto:info@flowerpng.com"
                className="text-blue-600 underline"
              >
                info@flowerpng.com
              </a>
            </p>
          </section>

          <section>
            <h6 className="text-xl font-semibold mb-2">9. Abuse Reporting</h6>
            <p>
              We enforce a zero-tolerance policy against abusive content or
              files. To report abuse, send a clear description or summary of the
              issue to our contact email above.
            </p>
          </section>
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies Policy",
    content: (
      <>
        <p>
          Our website uses cookies to differentiate you from other users, enable
          certain features, and help us improve the site.
        </p>
        <p>
          A cookie is a small file placed on your device by a website. We use
          these types of cookies:
        </p>

        <h6 className="font-semibold mt-4 mb-1">
          1. Strictly Necessary Cookies
        </h6>
        <p>
          These cookies are essential for website functionality, such as logging
          into secure areas, saving images in a lightbox, managing a shopping
          cart, and accessing account info.
        </p>

        <h6 className="font-semibold mt-4 mb-1">2. Functionality Cookies</h6>
        <p>
          These recognize you when you return, allowing personalized content,
          greeting you by name, remembering preferences (language, country), and
          enabling interactive chat with support.
        </p>

        <h6 className="font-semibold mt-4 mb-1">
          3. Analytical/Performance/Testing Cookies
        </h6>
        <p>
          These cookies count visitors and track how they navigate the site to
          improve usability and test different features to provide a consistent
          user experience.
        </p>

        <p>
          You can block cookies in your browser settings, but blocking all
          cookies may limit access to some parts of our website.
        </p>

        <p>
          For questions about our use of cookies or personalization
          technologies, contact us at{" "}
          <a href="mailto:info@flowerpng.com" className="text-blue-600 underline">
            info@flowerpng.com
          </a>
          .
        </p>

        <h6 className="font-semibold mt-6 mb-2">Cookie Details</h6>
        <p>Below is a summary of cookies we use and their purposes:</p>

        <table className="w-full text-left border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-1">Cookie Type</th>
              <th className="border border-gray-300 px-3 py-1">
                Cookie Name or Supplier
              </th>
              <th className="border border-gray-300 px-3 py-1">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-1 align-top">
                Analytics
              </td>
              <td className="border border-gray-300 px-3 py-1 align-top">
                _ga, _gat_pngtree, _gid, pngtree-activity-back, email_ip,
                enter_vip_side, p_btn, pay_ref_page, cfd_, source_referer, s_c*,
                relay_*, Back*, Element*, Illustration*, Premium*,
                Subscriptions*, Template*, User_Center*, q_l_rrenewal_close_*,
                statis_lg*
              </td>
              <td className="border border-gray-300 px-3 py-1">
                Estimate audience size and usage patterns, understand visitor
                interaction, and identify popular parts of the site.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-1 align-top">
                Site Functionality
              </td>
              <td className="border border-gray-300 px-3 py-1 align-top">
                auth_ban, isAlert, auth_ban_c, down_phrase, auth_uid, c_user,
                is_old, auth_genders, s_c*
              </td>
              <td className="border border-gray-300 px-3 py-1">
                Store preferences (e.g., language), customize site content,
                recognize returning users, and improve browsing convenience
                (shopping basket, login persistence).
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-1">Safety</td>
              <td className="border border-gray-300 px-3 py-1">_csrf</td>
              <td className="border border-gray-300 px-3 py-1">
                Prevents cross-site request forgery attacks.
              </td>
            </tr>
          </tbody>
        </table>

        <h6 className="font-semibold mt-6 mb-2">Third Party Cookies</h6>
        <p>We also use cookies from third parties on our website:</p>

        <table className="w-full text-left border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-1">Type</th>
              <th className="border border-gray-300 px-3 py-1">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-1">
                Google Analytics
              </td>
              <td className="border border-gray-300 px-3 py-1">
                Tracks advertisement performance and website usage to compile
                reports. For more info, see Google’s cookie policy and opt-out
                page.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-1">Facebook</td>
              <td className="border border-gray-300 px-3 py-1">
                Enables social network login and sharing features. Cookies
                remember user identity and access on Facebook. We do not control
                data processing by these networks. To prevent data collection,
                do not accept social plugins and log out of social networks
                before visiting.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-1">Google</td>
              <td className="border border-gray-300 px-3 py-1">
                Used for social plugins and ad services.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-1">Twitter</td>
              <td className="border border-gray-300 px-3 py-1">
                Used for social plugins and ad services.
              </td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "license",
    title: "License Terms",
    content: (
      <>
        <h6 className="font-semibold mt-6 mb-2">1. Copyright Ownership</h6>
        <p>
          All content on FlowerPNG, including images, text, graphics,
          and logos, is protected by copyright laws and owned by their
          respective rights holders.
        </p>

        <h6 className="font-semibold mt-6 mb-2">2. Permitted Use</h6>
        <p>
          You may download and use images solely for personal, non-commercial
          purposes unless otherwise specified by a different license.
          Redistribution or commercial use without explicit permission is
          prohibited.
        </p>

        <h6 className="font-semibold mt-6 mb-2">
          3. Reporting Copyright Infringement
        </h6>
        <p>
          If you believe any content on our site infringes your copyright,
          please contact us promptly with the required documentation so we can
          address the issue.
        </p>

        <h6 className="font-semibold mt-6 mb-2">
          4. Respect for Intellectual Property
        </h6>
        <p>
          We respect intellectual property rights and expect our users to do the
          same. Unauthorized use of copyrighted content may result in legal
          action.
        </p>

        <h6 className="font-semibold mt-6 mb-2">5. Verify Licensing</h6>
        <p>
          Always confirm the licensing details for each image before using it
          beyond personal purposes.
        </p>

        <h6 className="font-semibold mt-6 mb-2">
          6. Copyright Infringement Notification Process
        </h6>
        <p>
          If you believe content on our website infringes copyright, you may
          notify us by providing the following information:
        </p>
        <ul className="list-disc pl-6">
          <li>Your handwritten or electronic signature.</li>
          <li>
            Identification of the copyrighted work(s) you claim are infringed.
          </li>
          <li>
            Description and location of the infringing material on our site.
          </li>
          <li>
            Contact information including address, phone number, and email.
          </li>
          <li>
            A statement that you have a good faith belief that the use is
            unauthorized.
          </li>
          <li>
            A statement that the information in the notification is accurate and
            truthful.
          </li>
        </ul>
        <p>
          Once we receive a valid notification, we may remove or disable access
          to the infringing content or take other appropriate action, which may
          include disabling the account of the user who posted it. We may also
          contact that user to allow them to respond.
        </p>

        <h6 className="font-semibold mt-6 mb-2">
          7. Response to Repeat Infringements
        </h6>
        <p>
          If you believe a user is repeatedly infringing copyrights, please
          provide relevant information to help us take appropriate measures.
        </p>

        <h6 className="font-semibold mt-6 mb-2">8. Incomplete Notifications</h6>
        <p>
          Notifications missing any of the above requirements may not be
          considered valid.
        </p>

        <h6 className="font-semibold mt-6 mb-2">
          9. Cooperation and Legal Advice
        </h6>
        <p>
          We appreciate your cooperation in protecting intellectual property. If
          you are unsure about any infringement issues, we recommend seeking
          legal counsel.
        </p>

        <h6 className="font-semibold mt-6 mb-2">
          10. Copyright Contact Information
        </h6>
        <p>
          Please send copyright infringement notifications to:{" "}
          <a href="mailto:info@flowerpng.com" className="text-blue-600 underline">
            info@flowerpng.com
          </a>
        </p>

        <h6 className="font-semibold mt-6 mb-2">11. Reporting Abuse</h6>
        <p>
          We have a zero-tolerance policy for abusive content or files. To
          report abuse, email{" "}
          <a href="mailto:info@flowerpng.com" className="text-blue-600 underline">
            info@flowerpng.com
          </a>{" "}
          with a clear description of the issue.
        </p>
      </>
    ),
  },
  {
    id: "refund",
    title: "Refund Policy",
    content: (
      <>
        <h6 className="font-semibold mt-6 mb-2">1. Overview</h6>
        <p>
          We strive to ensure customer satisfaction with our products and
          services. This Refund Policy outlines the conditions under which
          refunds may be granted.
        </p>

        <h6 className="font-semibold mt-6 mb-2">2. Eligibility for Refund</h6>
        <p>
          Refunds are available only if the product or service purchased is
          defective, damaged, or not as described. Please contact us within 7
          days of your purchase with detailed information.
        </p>

        <h6 className="font-semibold mt-6 mb-2">3. Non-Refundable Items</h6>
        <p>Please note that the following are generally non-refundable:</p>
        <ul className="list-disc pl-6">
          <li>Digital downloads once accessed or downloaded.</li>
          <li>Services that have already been rendered or accessed.</li>
          <li>
            Products or services purchased during promotional sales or with
            discount codes (unless defective).
          </li>
        </ul>

        <h6 className="font-semibold mt-6 mb-2">4. Refund Request Process</h6>
        <p>
          To request a refund, please email us at{" "}
          <a
            href="mailto:info@flowerpng.com"
            className="text-blue-600 underline"
          >
            info@flowerpng.com
          </a>{" "}
          with your order details and reason for the request. We will review
          your case and respond within 5 business days.
        </p>

        <h6 className="font-semibold mt-6 mb-2">5. Refund Method</h6>
        <p>
          Approved refunds will be processed to the original payment method
          within 7-10 business days. Depending on your bank or payment provider,
          it may take additional time for the refund to appear in your account.
        </p>

        <h6 className="font-semibold mt-6 mb-2">6. Partial Refunds</h6>
        <p>
          In some cases, partial refunds may be granted at our discretion
          depending on the nature of the issue.
        </p>

        <h6 className="font-semibold mt-6 mb-2">7. Contact Us</h6>
        <p>
          If you have any questions or concerns about our refund policy, please
          contact us at{" "}
          <a
            href="mailto:support@[yourwebsite].com"
            className="text-blue-600 underline"
          >
            info@flowerpng.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Policy",
    content: (
      <>
        <h6 className="font-semibold mt-6 mb-2">1. Ownership of Content</h6>
        <p>
          All content on FlowerPNG, including but not limited to text,
          images, graphics, logos, and software, is the intellectual property of
          FlowerPNG or its licensors and is protected by copyright,
          trademark, and other intellectual property laws.
        </p>

        <h6 className="font-semibold mt-6 mb-2">2. Permitted Use</h6>
        <p>
          You may view, download, and print content from our website for
          personal, non-commercial use only, provided you keep all copyright and
          other proprietary notices intact.
        </p>

        <h6 className="font-semibold mt-6 mb-2">3. Prohibited Actions</h6>
        <p>
          Unauthorized use, reproduction, distribution, modification, or
          republication of our content for commercial purposes without prior
          written permission is strictly prohibited and may lead to legal
          action.
        </p>

        <h6 className="font-semibold mt-6 mb-2">
          4. Reporting Intellectual Property Infringement
        </h6>
        <p>
          If you believe that your intellectual property rights have been
          infringed by content on our website, please contact us promptly with
          the following information:
        </p>
        <ul className="list-disc pl-6">
          <li>Your name and contact details.</li>
          <li>
            A description of the copyrighted work or intellectual property you
            claim has been infringed.
          </li>
          <li>The specific location (URL) of the infringing material.</li>
          <li>
            A statement that you have a good faith belief that the use is
            unauthorized.
          </li>
          <li>
            A statement that the information provided is accurate and truthful.
          </li>
          <li>Your electronic or physical signature.</li>
        </ul>

        <h6 className="font-semibold mt-6 mb-2">
          5. Our Response to Infringement Claims
        </h6>
        <p>
          Upon receipt of a valid infringement notification, we will promptly
          investigate and may remove or disable access to the infringing
          content. We may also terminate accounts of repeat infringers.
        </p>

        <h6 className="font-semibold mt-6 mb-2">6. Disclaimer</h6>
        <p>
          We respect intellectual property rights and expect our users to do the
          same. Unauthorized use of content may result in legal consequences.
        </p>

        <h6 className="font-semibold mt-6 mb-2">7. Contact Information</h6>
        <p>
          Please send all intellectual property concerns and infringement
          notices to:{" "}
          <a
            href="mailto:info@flowerpng.com"
            className="text-blue-600 underline"
          >
            info@flowerpng.com
          </a>
          .
        </p>
      </>
    ),
  },
];

const Legal = () => {
  const { legalPage } = useParams();
  const [active, setActive] = useState("terms");
  const navigate = useNavigate();

  useEffect(() => {
    setActive(legalPage);
  }, [legalPage]);

  return (
    <div className="max-w-6xl mx-auto my-16 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:space-x-12 relative z-0">
        {/* Sidebar nav */}
        <nav className="mb-10 md:mb-0 md:w-1/4 border-l border-gray-300 pl-6 md:sticky md:top-24 md:max-h-[80vh] md:overflow-auto z-10 bg-white">
          <ul className="space-y-4 text-gray-700 text-sm md:text-base font-medium">
            {sections.map(({ id, title }) => (
              <li key={id} className="mb-2">
                <button
                  onClick={() => navigate(`/legal/${id}`)}
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
        <main className="md:w-3/4 prose prose-green max-w-none relative z-0">
          {sections
            .filter((section) => section.id === active)
            .map(({ id, title, content }) => (
              <section key={id} aria-labelledby={`${id}-heading`}>
                <h4 className="pb-5" id={`${id}-heading`}>
                  {title}
                </h4>
                <div className="overflow-x-auto">
                  <div className="[&>table]:min-w-full">{content}</div>
                </div>
              </section>
            ))}
        </main>
      </div>
    </div>
  );
};

export default Legal;
