import React from 'react';

const Popular = () => {
  const popularSearches = [
    { id: 1, term: "Food", count: "1.2k searches" },
    { id: 2, term: "Gaming", count: "980 searches" },
    { id: 3, term: "Technology", count: "856 searches" },
    { id: 4, term: "Backgrounds", count: "742 searches" },
    { id: 5, term: "Nature", count: "634 searches" },
    { id: 6, term: "Icons", count: "521 searches" },
    { id: 7, term: "Clothings", count: "498 searches" },
    { id: 8, term: "Mens Ware", count: "387 searches" },
  ];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Searches
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick access to the most searched topics. Click on any item to get instant help.
          </p>
        </div>

        {/* Search Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSearches.map((search, index) => (
            <div
              key={search.id}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#5FB179] to-[#07a44e] rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Search Term */}
                <h6 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#07a44e] transition-colors duration-300">
                  {search.term}
                </h6>
                
                {/* Search Count */}
                <p className="text-sm text-gray-500 mb-4">
                  {search.count}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#07a44e] to-[#5FB179] h-2 rounded-full transition-all duration-1000 group-hover:animate-pulse"
                    style={{ width: `${Math.max(30, 100 - index * 10)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;
