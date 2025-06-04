import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader';

const Popular = () => {

    const [searches, setSearches] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/frontend/searches`)
            .then(res => {
                const { status, data } = res;
                if (status === 200) {
                    setSearches(data.searches);
                }
            })
            .catch(err => {
                console.error("Suggestion fetch error:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loader />
    }

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
                    {searches.map((s) => (
                        <div
                            key={s._id}
                            className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden"
                            onClick={() => navigate(`/images/${s.search}`)}
                        >
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#5FB179] to-[#07a44e] rounded-full opacity-75 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>

                            {/* Content */}
                            <div className="flex justify-between items-center relative z-10">
                                {/* Search Term */}
                                <h6 className="!text-[14px] font-semibold !text-gray-700 group-hover:text-[#07a44e] transition-colors duration-300">
                                    {s.search}
                                </h6>

                                {/* Search Count */}
                                <p className="!text-[14px] !text-white">
                                    {s.count}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Popular;
