import React from "react";

const reviews = [
  {
    name: "Aditi Sharma",
    role: "Graphic Designer",
    comment:
      "This platform saves me hours every week! The image quality and search tools are top-notch.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Raj Patel",
    role: "Freelancer",
    comment:
      "I love how easy it is to find the perfect images. Their licensing system is transparent and fair.",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    name: "Sneha Verma",
    role: "Marketing Expert",
    comment:
      "The AI tools make a huge difference. Background remover works like magic!",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "Ellie Miller",
    role: "Social Media Manager",
    comment:
      "Their visual assets give my campaigns a serious upgrade. The UI is also super intuitive.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    name: "Emily Chen",
    role: "Web Developer",
    comment:
      "I use this platform daily for prototyping and inspiration. Clean assets and helpful search filters!",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "David Müller",
    role: "App Developer",
    comment:
      "The platform is a goldmine for interface assets. Saved me countless hours of design time!",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Pooja Iyer",
    role: "Visual Designer",
    comment:
      "Super helpful for getting high-res PNGs for my client work. The variety is unmatched!",
    image: "https://randomuser.me/api/portraits/women/61.jpg",
  },
  {
    name: "Karan Mehta",
    role: "Content Creator",
    comment:
      "This site is my go-to for thumbnails and social graphics. Love the modern selection.",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
  },
  {
    name: "Isabelle Dubois",
    role: "SEO Specialist",
    comment:
      "Perfect for enhancing blog visuals and meta content. Speeds up my workflow a lot.",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
  },
];


const features = [
  {
    title: "Millions of PNGs",
    description: "Access a massive collection of high-quality, royalty-free PNG images.",
    icon: "📁",
  },
  {
    title: "AI-Powered Tools",
    description: "Use smart features like background remover and AI image generator.",
    icon: "🤖",
  },
  {
    title: "Commercial Use",
    description: "All images come with clear licensing for commercial projects.",
    icon: "📜",
  },
];

const Reviews = () => {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Section 1: Intro */}
      <section className="text-center py-16 px-4 sm:px-6 lg:px-12">
        <h1 className="text-4xl font-extrabold mb-4">Loved by Thousands</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real stories from real users. See what people say about our platform
          and how it’s transforming their creative workflow.
        </p>
      </section>

      {/* Section 2: Review Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h6 className="font-semibold text-gray-900">
                    {review.name}
                  </h6>
                  <p className="!text-[14px] text-gray-500">{review.role}</p>
                </div>
              </div>
              <p className="!text-[14px] text-gray-700 italic">“{review.comment}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Platform Features */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className=" font-bold mb-4">Why Creators Love Us</h2>
          <p className="text-gray-600 mb-10">
            Built to help designers, marketers, and freelancers save time and do more.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h6 className="font-semibold mb-2">{feature.title}</h6>
                <p className="!text-[14px] text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reviews;
