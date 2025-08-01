import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import dayjs from 'dayjs'
import axios from 'axios'

export default function Blogs() {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true)
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_HOST}/admin/blogs/get`
                )
                if (res.status === 200) {
                    setBlogs(res.data.allBlogs)
                }
            } catch (err) {
                console.error('Failed to load blogs:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="py-16 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        See Our Blogs
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Quick access to our latest articles. Click on any article to get
                        instant help.
                    </p>
                </div>

                {blogs.length === 0 ? (
                    <p className="text-center text-gray-500">No blogs found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map(blog => (
                            <div
                                key={blog._id}
                                className="group bg-white rounded-lg cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                                onClick={() => navigate(`/blog/${blog._id}`)}
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${blog.imageURL}`}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                                </div>

                                <div className="p-4">
                                    <h3 className="!text-xl font-semibold text-gray-900 mb-2 group-hover:text-[var(--primary-color)] transition-colors duration-300">
                                        {blog.title}
                                    </h3>
                                    <p className="!text-sm text-gray-600 mt-4">
                                        {dayjs(blog.createdAt).format('DD-MM-YYYY')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}