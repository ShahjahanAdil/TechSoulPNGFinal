import React, { useEffect, useState } from "react";
import Search from "../../../components/Search";
import { useNavigate, useParams } from "react-router-dom";

// FAQs grouped by topic
const faqs = {
  "account-and-technical-help": [
    {
      q: "How do I reset my password?",
      a: "Go to the login page, click 'Forgot Password', and follow the instructions to reset your password via email.",
    },
    {
      q: "How do I report a technical issue?",
      a: "Visit our support center and open a ticket with a description of the issue, screenshots if possible, and your system/browser info.",
    },
  ],
  "licensing-and-products": [
    {
      q: "What does the Standard License include?",
      a: "The Standard License includes use for personal and commercial projects with some limitations. Refer to the licensing page for full details.",
    },
    {
      q: "Can I upgrade to an Extended License later?",
      a: "Yes, you can upgrade any time from your account by going to the 'Licenses' section and selecting 'Upgrade'.",
    },
  ],
  "billing-and-payments": [
    {
      q: "What payment methods do you accept?",
      a: "We accept major credit/debit cards (Visa, MasterCard, AMEX), PayPal, and other local payment options depending on your region.",
    },
    {
      q: "How do I upgrade from Basic to Premium?",
      a: "Log into your account, go to the 'Subscription' section, and choose 'Upgrade Plan'. Your new benefits will be active immediately after payment.",
    },
    {
      q: "Will I be charged automatically each month?",
      a: "Yes, subscriptions renew automatically each billing cycle. You can cancel anytime from your account settings to avoid future charges.",
    },
    {
      q: "Can I get a refund if I cancel my plan?",
      a: "We offer refunds only if you cancel within 7 days of purchase and haven’t exceeded your download limit. Please contact support for assistance.",
    },
  ],
};

const sections = [
  { id: "billing-and-payments", title: "Billing and Payments" },
  { id: "licensing-and-products", title: "Licensing & Products" },
  { id: "account-and-technical-help", title: "Account & Technical Help" },
];

export default function FAQs() {
  const { category } = useParams();
  const [activeSection, setActiveSection] = useState("billing-and-payments");
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    if (category) {
      const normalized = category.toLowerCase().replace(/\s+/g, "-");
      if (faqs[normalized]) {
        setActiveSection(normalized);
      }
    }
  }, [category]);

  const sectionTitle = sections.find((s) => s.id === activeSection)?.title;

  return (
    <div className="w-full pb-10">
      {/* Banner */}
      <div className="w-full relative flex justify-center items-center bg-[#ebfbee] h-[30vh] overflow-hidden mb-10">
        <div className="absolute top-0 left-0 w-30 h-30 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-30 h-30 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute -bottom-8 left-20 w-30 h-30 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse [animation-delay:4s]"></div>
        <div className="relative z-10">
          <Search />
        </div>
      </div>

      {/* Content below banner */}
      <div className="flex flex-col md:flex-row w-full px-4 md:px-8 gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4 border-l border-gray-300 pl-6 md:sticky md:top-24 md:max-h-[80vh] md:overflow-auto bg-white z-10">
          <ul className="space-y-4 text-gray-700 text-sm md:text-base font-medium">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    // setActiveSection(id);
                    // setActiveIndex(null);
                    setActiveIndex(null); // Reset expanded FAQ
                    navigate(`/faqs/${id}`); // Navigate to new route
                  }}
                  className={`w-full text-left border-l-4 pl-3 py-1.5 cursor-pointer transition-colors ${
                    activeSection === id
                      ? "border-green-500 text-green-700 font-semibold bg-green-50"
                      : "border-transparent hover:border-green-400 hover:text-green-600"
                  }`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main FAQ content */}
        <main className="md:w-3/4">
          <h5 className="font-bold mb-1">{sectionTitle}</h5>
          <p className="mb-6 text-sm text-gray-600">
            Answers related to {sectionTitle}.
          </p>

          <div className="bg-white rounded-[12px] p-1">
            {faqs[activeSection]?.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  className={`relative cursor-pointer my-3 rounded-[12px] transition-all duration-300 ${
                    isActive
                      ? "bg-[#5fb179] text-white"
                      : "bg-white text-[#5fb179] shadow"
                  }`}
                  onClick={() => toggleIndex(index)}
                >
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[12px] bg-[#5fb179] transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  ></span>

                  <div className="flex justify-between items-center px-6 py-3 select-none">
                    <h6 className="!text-[14px] font-semibold">{item.q}</h6>
                    <span
                      className={`text-2xl font-bold transform transition-transform duration-300 ${
                        isActive ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </div>

                  <div
                    className={`px-6 pb-2 text-base leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${
                      isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
