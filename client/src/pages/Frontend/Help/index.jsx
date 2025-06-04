import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import Search from "../../../components/Search";
import { IoMdArrowForward } from "react-icons/io";
// import helpBg from "../../../assets/images/help-center.jpg";

const Help = () => {
  const navigate = useNavigate();
  const helpTopics = [
    {
      title: "Billing and Payments",
      icon: "🧾",
      items: ["Payments", "Refunds", "Receipts & Invoice", "Premium plan"],
    },
    {
      title: "Licensing and Products",
      icon: "📄",
      items: [
        "Copyright and License Scope",
        "Download Issue",
        "File Issue",
        "Content classification introduction",
      ],
    },
    {
      title: "Account and Technical Help",
      icon: "🛠️",
      items: [
        "Account Issue",
        "Activity Consulting",
        "Functional Issue",
        "Mail related",
      ],
    },
  ];

  return (
    <>
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-6 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Vector Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="animate-float">
              <svg
                width="200"
                height="160"
                viewBox="0 0 200 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                {/* Main circular background */}
                <circle
                  cx="100"
                  cy="80"
                  r="70"
                  fill="url(#gradient1)"
                  className="animate-pulse"
                />

                {/* Question mark icon */}
                <circle cx="100" cy="60" r="8" fill="white" />
                <path
                  d="M100 75 C100 75, 100 80, 100 85 C100 90, 105 95, 110 95"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="100" cy="105" r="4" fill="white" />

                {/* Floating help icons */}
                <circle
                  cx="60"
                  cy="40"
                  r="12"
                  fill="url(#gradient2)"
                  className="animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                />
                <path
                  d="M55 35 L65 35 M60 30 L60 45"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <circle
                  cx="140"
                  cy="45"
                  r="10"
                  fill="url(#gradient3)"
                  className="animate-bounce"
                  style={{ animationDelay: "1s" }}
                />
                <circle cx="140" cy="42" r="2" fill="white" />
                <circle cx="140" cy="48" r="1.5" fill="white" />

                <circle
                  cx="65"
                  cy="115"
                  r="8"
                  fill="url(#gradient4)"
                  className="animate-bounce"
                  style={{ animationDelay: "1.5s" }}
                />
                <path
                  d="M61 112 L69 112 M65 108 L65 116"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <circle
                  cx="135"
                  cy="120"
                  r="6"
                  fill="url(#gradient5)"
                  className="animate-bounce"
                  style={{ animationDelay: "2s" }}
                />
                <circle cx="135" cy="118" r="1.5" fill="white" />
                <circle cx="135" cy="122" r="1" fill="white" />

                {/* Unified green gradient definitions */}
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#5BBC84" />
                    <stop offset="100%" stopColor="#4AAE77" />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#5BBC84" />
                    <stop offset="100%" stopColor="#469E6F" />
                  </linearGradient>
                  <linearGradient
                    id="gradient3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#5BBC84" />
                    <stop offset="100%" stopColor="#3F8D64" />
                  </linearGradient>
                  <linearGradient
                    id="gradient4"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#5BBC84" />
                    <stop offset="100%" stopColor="#377D59" />
                  </linearGradient>
                  <linearGradient
                    id="gradient5"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#5BBC84" />
                    <stop offset="100%" stopColor="#2F6D4E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Heading and Content */}
          <div className="space-y-6">
            <h1 className=" md:text-6xl font-bold text-gray-900 leading-tight">
              How can we{" "}
              <span className="!text-[40px] bg-gradient-to-r from-[#07A44E] to-[#5BBC84] bg-clip-text text-transparent">
                help you?
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to your questions, browse our documentation, or get
              in touch with our support team. We're here to help you succeed.
            </p>

            {/* <Search /> */}
          </div>
        </div>
      </div>

      <div className="px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col">
          <h5 className="font-semibold text-xl mb-6">Browse our help topics</h5>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {helpTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-[12px] shadow-sm text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-[#5BBC84] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl">
                    {topic.icon}
                  </div>
                </div>
                <h6 className="font-bold mb-5">{topic.title}</h6>
                <ul className="text-left text-sm list-disc list-inside space-y-3">
                  {topic.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="flex justify-end">
                  <Link
                    to={`/faqs/${topic.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex gap-1 items-center text-[14px] text-[#139449] transition-all duration-150 mt-3 hover:text-[#5BBC84]"
                  >
                    See details <IoMdArrowForward />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex py-10 gap-7 items-center">
            <span className="text-gray-600 max-w-2xl">
              Can’t find what you’re looking for?
            </span>
            <button
              className="px-6 py-2 w-[150px] bg-[#5BBC84] text-white rounded-[12px] hover:bg-[#4aa76f] transition"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
