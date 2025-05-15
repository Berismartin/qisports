import React from "react";

// Helper function to split text for animation (if needed for headings)
const splitText = (text: string) => {
  // This can be a simpler implementation if complex animation isn't immediately needed
  // or import the one from HomePage if it will be identical.
  return text.split(" ").map((word, wordIndex) => (
    <span key={word + '-' + wordIndex} className="inline-block">
        {word + (wordIndex < text.split(" ").length - 1 ? " " : "")}
    </span>
  ));
};

const sponsorshipProjects = [
    { name: "Startimes Falcon", column: 1 },
    { name: "Masaza Tooro", column: 2 },
    { name: "FNL IX", column: 3 },
    { name: "Mbarara Golf Safari 2017", column: 1 },
    { name: "Mbale Conversion Week", column: 2 }, // As per image, might be typo of Conservation
];

export default function AboutPage() {
  return (
    <main className="pt-32 pb-12 bg-[#2F2B2B] text-gray-300 min-h-screen">
      <section id="about-content" className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          <h2 className="text-4xl font-bold text-center mb-10 text-[#A7C840]">
            {splitText("About QI Sports")}
          </h2>

          <div className="mb-12 space-y-5 text-base md:text-lg leading-relaxed text-center">
            <p>
              Founded in 2011, QI SPORTS is a Ugandan-based sports consulting and development company 
              focused on unlocking opportunities across Africa's sports industry. We help brands, investors, 
              institutions, and sportspeople use sports as a strategic tool for growth, impact, and income generation.
            </p>
            <p className="text-gray-400">
                EST: 2011 | REGISTERED: 2013 | UG. REG NO: 170893
            </p>
            <p>
              Our services span marketing & representation, matchmaking for sponsorships and partnerships, 
              sports project management, market research & advisory, facility development, and social 
              responsibility consulting. We connect the right people, projects, and ideas - creating 
              value both on and off the pitch.
            </p>
          </div>

          <div className="my-16">
            <h3 className="text-3xl font-bold text-center mb-10 text-[#A7C840]">What We Do</h3>
            <ul className="space-y-6 text-gray-300 max-w-2xl mx-auto text-left">
              <li className="bg-[#3A3A3A] p-4 rounded-md shadow">
                <span className="font-semibold text-[#A7C840]">For Brands:</span> We develop strategies, steward campaigns and optimise the 
                value realized from and impact of your sponsorships and partnerships using 
                sports and sports-entertainment properties in African markets.
              </li>
              <li className="bg-[#3A3A3A] p-4 rounded-md shadow">
                <span className="font-semibold text-[#A7C840]">For Organisations/ Companies:</span> We use sports to deliver the highest 
                impact messaging and experiences for internal audiences, external 
                audiences and communities, from ideation to implementation.
              </li>
              <li className="bg-[#3A3A3A] p-4 rounded-md shadow">
                <span className="font-semibold text-[#A7C840]">For Investors:</span> Qi Sports enables you make informed, data-driven and 
                technology-driven decisions about investing in Ugandan and African sport, 
                and proceed to steward and manage the performance of your investments.
              </li>
              <li className="bg-[#3A3A3A] p-4 rounded-md shadow">
                <span className="font-semibold text-[#A7C840]">For Sportspeople/ Teams:</span> We provide guidance to help orient your career 
                and maximize earnings from your talent on and off the pitch/ track/ court.
              </li>
            </ul>
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-[#A7C840] mb-8">
              Sponsorship Management Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-gray-200 text-lg">
              {sponsorshipProjects.map((project) => (
                <p key={project.name} className="mb-1 bg-[#3A3A3A] p-3 rounded shadow">{project.name}</p>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#A7C840]">
              Qi Sports
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
} 