import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    FaArrowLeft, FaUser, FaCalendarAlt,
    FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaLink,
    FaChevronLeft, FaChevronRight
} from 'react-icons/fa'
import { CiUser } from 'react-icons/ci'
import Loader from '../../../../components/Loader'
import dayjs from 'dayjs'
import axios from 'axios'

const initialComment = { name: '', email: '', comment: '' }

export default function Blog() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [allBlogs, setAllBlogs] = useState([])
    const [current, setCurrent] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [commentState, setCommentState] = useState(initialComment)
    const [loading, setLoading] = useState(true)
    const [posting, setPosting] = useState(false)
    const [error, setError] = useState(null)

    // 1. Load all blogs for detail + nav
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_HOST}/frontend/blogs/get`
                )
                setAllBlogs(res.data.allBlogs)
            } catch (err) {
                console.error(err)
                setError('Failed to load articles.')
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [])

    // 2. Pick current by ID
    useEffect(() => {
        if (!allBlogs.length) return
        const idx = allBlogs.findIndex(b => b._id === id)
        const safe = idx >= 0 ? idx : 0
        setCurrentIndex(safe)
        setCurrent(allBlogs[safe])
    }, [allBlogs, id])

    const handleChange = e =>
        setCommentState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handlePostComment = async () => {
        const { name, email, comment } = commentState
        if (!name || !email || !comment) {
            return alert('Please fill all fields.')
        }
        setPosting(true)
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_HOST}/frontend/blog/add-comment/${current._id}`,
                commentState
            )
            if (res.status === 201) {
                setCurrent(res.data.updatedBlog)
                setCommentState(initialComment)
            }
        } catch (err) {
            console.error(err)
            alert('Could not post comment.')
        } finally {
            setPosting(false)
        }
    }

    const goPrev = () => {
        if (currentIndex > 0) {
            navigate(`/blog/${allBlogs[currentIndex - 1]._id}`)
        }
    }
    const goNext = () => {
        if (currentIndex < allBlogs.length - 1) {
            navigate(`/blog/${allBlogs[currentIndex + 1]._id}`)
        }
    }

    if (loading) return <Loader />
    if (error)
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        )
    if (!current)
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Article not found.</p>
            </div>
        )

    // pick 3 for sidebar
    const more = allBlogs.filter((_, i) => i !== currentIndex).slice(0, 3)

    return (
        <div className="w-full min-h-screen bg-white pt-12 pb-20">
            <div className="main-container">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-[#2277a7] mb-8 hover:text-[#2276a7a8] transition-colors"
                >
                    <FaArrowLeft /> Back to Home
                </button>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left */}
                    <div className="w-full lg:w-2/3">
                        <article className="mb-16">
                            <h1 className="!text-xl sm:!text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                                {current.title}
                            </h1>

                            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 text-gray-600 mb-8">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-[#2277a7]" />
                                    <span className="capitalize">{current.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-[#2277a7]" />
                                    <span>{dayjs(current.createdAt).format('MMMM D, YYYY')}</span>
                                </div>
                            </div>

                            <img
                                src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${current.imageURL}`}
                                alt={current.title}
                                className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-8"
                                onError={e => {
                                    e.target.onerror = null
                                    e.target.src =
                                        'https://via.placeholder.com/900x500?text=Image+Unavailable'
                                }}
                            />

                            <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                                <p dangerouslySetInnerHTML={{ __html: current.description }}></p>
                            </div>

                            {/* Comments */}
                            <div className="w-full p-4 sm:p-6 border border-gray-200 rounded-[8px] mt-12">
                                <p className="!text-[20px] font-semibold mb-6">Comments</p>
                                <div className="flex flex-col gap-8">
                                    {current.comments.length ? (
                                        current.comments.map(c => (
                                            <div key={c._id}>
                                                <div className="flex gap-3">
                                                    <div className="p-3 bg-[#efefef] rounded-full">
                                                        <CiUser className="text-[18px]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="!text-[14px] font-semibold text-[#333] capitalize">
                                                            {c.name}
                                                        </p>
                                                        <p className="!text-[13px] text-[#666]">
                                                            {c.email}
                                                        </p>
                                                    </div>
                                                    <p className="!text-[12px] text-[#666]">
                                                        {dayjs(c.createdAt).format('MMMM D, YYYY')}
                                                    </p>
                                                </div>
                                                <p className="!text-[16px] text-[#333] mt-4">
                                                    {c.comment}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No comments yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Leave a Comment */}
                            <div className="w-full p-4 sm:p-6 border border-gray-200 rounded-[8px] mt-12">
                                <p className="!text-[24px] font-semibold mb-6">Leave a Comment</p>
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <input
                                        name="name"
                                        placeholder="*Name"
                                        className="flex-1 p-2 sm:p-4 text-[#666] border rounded-[8px] focus:border-[var(--primary-color)]"
                                        value={commentState.name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="email"
                                        placeholder="*Email"
                                        className="flex-1 p-2 sm:p-4 text-[#666] border rounded-[8px] focus:border-[var(--primary-color)]"
                                        value={commentState.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <textarea
                                    name="comment"
                                    rows={6}
                                    placeholder="*Comment (max 300)"
                                    maxLength={300}
                                    className="w-full p-2 sm:p-4 text-[#666] border resize-none rounded-[8px] focus:border-[var(--primary-color)]"
                                    value={commentState.comment}
                                    onChange={handleChange}
                                />
                                <button
                                    onClick={handlePostComment}
                                    disabled={posting}
                                    className="px-[24px] py-[8px] bg-[var(--dark)] text-white rounded-[12px] mt-6 hover:bg-[var(--secondary)] transition"
                                >
                                    {posting ? 'Posting...' : 'Post Comment'}
                                </button>
                            </div>

                            {/* Prev/Next */}
                            <div className="flex justify-between mt-12 border-y border-gray-200 py-6">
                                <button
                                    onClick={goPrev}
                                    disabled={currentIndex <= 0}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${currentIndex <= 0
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-[#2277a7] hover:bg-gray-100'
                                        }`}
                                >
                                    <FaChevronLeft /> Previous Post
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={currentIndex >= allBlogs.length - 1}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${currentIndex >= allBlogs.length - 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-[#2277a7] hover:bg-gray-100'
                                        }`}
                                >
                                    Next Post <FaChevronRight />
                                </button>
                            </div>
                        </article>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full lg:max-w-[320px] lg:sticky lg:top-0 space-y-6">
                        {/* Share */}
                        <div className="p-6 bg-gray-50 rounded-2xl">
                            <h2 className="!text-xl mb-4">Share</h2>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    {
                                        icon: <FaFacebookF />,
                                        bg: 'bg-blue-700',
                                        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                            window.location.href
                                        )}`
                                    },
                                    {
                                        icon: <FaTwitter />,
                                        bg: 'bg-blue-400',
                                        url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                            window.location.href
                                        )}`
                                    },
                                    {
                                        icon: <FaLinkedinIn />,
                                        bg: 'bg-blue-600',
                                        url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                                            window.location.href
                                        )}`
                                    },
                                    {
                                        icon: <FaWhatsapp />,
                                        bg: 'bg-green-500',
                                        url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
                                            window.location.href
                                        )}`
                                    }
                                ].map(({ icon, bg, url }, i) => (
                                    <button
                                        key={i}
                                        onClick={() => window.open(url, '_blank', 'width=600,height=400')}
                                        className={`${bg
                                            } text-white px-4 py-2 rounded-md flex flex-1 items-center justify-center gap-2 text-xs hover:opacity-90 transition`}
                                    >
                                        {icon} Share
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href)
                                        alert('Link copied!')
                                    }}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-md flex flex-1 justify-center items-center gap-2 text-xs hover:opacity-90 transition"
                                >
                                    <FaLink /> Copy Link
                                </button>
                            </div>
                        </div>

                        {/* More Articles */}
                        {more.length > 0 && (
                            <div className="p-6 bg-gray-50 rounded-2xl">
                                <h2 className="!text-xl mb-4">More Articles</h2>
                                <div className="space-y-4">
                                    {more.map(b => (
                                        <div
                                            key={b._id}
                                            className="flex gap-4 cursor-pointer"
                                            onClick={() => navigate(`/blog/${b._id}`)}
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${b.imageURL}`}
                                                alt={b.title}
                                                className="w-20 h-14 object-cover rounded-lg"
                                            />
                                            <div>
                                                <p className="font-semibold line-clamp-2">{b.title}</p>
                                                <p className="text-xs text-gray-500">
                                                    {dayjs(b.createdAt).format('MMM D, YYYY')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}