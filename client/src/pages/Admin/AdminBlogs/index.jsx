import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { CgTrashEmpty } from 'react-icons/cg'
import { MdEdit } from 'react-icons/md'
import { BiX } from 'react-icons/bi'
import Loader from '../../../components/Loader'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

export default function AdminBlogs() {
    
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [updatingBlog, setUpdatingBlog] = useState({})
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const imageRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST}/admin/blogs/get`)
            if (res.status === 200) setBlogs(res.data.allBlogs)
        } catch (err) {
            console.error(err)
            window.toastify?.('Failed to load blogs', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async id => {
        if (!window.confirm('Delete this blog?')) return
        setLoading(true)
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_HOST}/admin/blogs/delete/${id}`
            )
            if (res.status === 203) {
                setBlogs(bs => bs.filter(b => b._id !== id))
                window.toastify?.(res.data.message, 'success')
            }
        } catch (err) {
            console.error(err)
            window.toastify?.('Failed to delete blog', 'error')
        } finally {
            setLoading(false)
        }
    }

    const openEditor = blog => {
        setUpdatingBlog(blog)
        setPreview(`${import.meta.env.VITE_ASURA_SUBDOMAIN}${blog.imageURL}`)
        setSelectedFile(null)
        setOpenUpdateModal(true)
    }

    const handleFileChange = e => {
        const file = e.target.files[0]
        if (!file) return
        const allowed = ['image/jpeg', 'image/png', 'image/webp']
        if (!allowed.includes(file.type)) {
            return alert('Only JPG, PNG or WEBP allowed.')
        }
        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleUpdate = async () => {
        const { _id, title, description } = updatingBlog
        if (!title?.trim() || !description?.trim()) {
            return alert('Title & description required.')
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        if (selectedFile) formData.append('image', selectedFile)

        setLoading(true)
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_HOST}/admin/blogs/update/${_id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )
            if (res.status === 202) {
                setBlogs(bs =>
                    bs.map(b => (b._id === _id ? res.data.blog : b))
                )
                window.toastify?.(res.data.message, 'success')
                setOpenUpdateModal(false)
            }
        } catch (err) {
            console.error(err)
            window.toastify?.('Failed to update blog', 'error')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader />

    return (
        <div className='main-container'>
            {/* header */}
            <div className='flex gap-5 justify-between items-center'>
                <div>
                    <h3 className='text-xl font-semibold flex items-center gap-2'>Blogs</h3>
                    <p className='px-2 py-1 bg-[var(--md-light)] rounded-[8px] mt-2 inline-block !text-[var(--dark)]'>
                        Manage your blogs here
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/add-blog')}
                    className='flex gap-2 items-center bg-[var(--dark)] text-[var(--x-light)] px-5 py-2 rounded-[12px] hover:bg-[var(--md-dark)] transition'
                >
                    Add New Blog <FiPlus />
                </button>
            </div>

            {/* table */}
            <div className='w-full overflow-x-auto mt-8 rounded-[12px]'>
                <table className='min-w-[600px] w-full text-sm text-left bg-white'>
                    <thead className='bg-[var(--md-light)] text-[var(--dark)] uppercase text-xs'>
                        <tr>
                            <th className='p-4'>Sr#</th>
                            <th className='p-4'>Image</th>
                            <th className='p-4'>Title</th>
                            {/* <th className='p-4'>Description</th> */}
                            <th className='p-4'>Author</th>
                            <th className='p-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length ? (
                            blogs.map((b, i) => (
                                <tr key={b._id} className='hover:bg-gray-50'>
                                    <td className='p-4'>{i + 1}</td>
                                    <td className='p-4'>
                                        <img
                                            src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${b.imageURL}`}
                                            alt={b.title}
                                            className='w-10 h-10 object-cover rounded'
                                        />
                                    </td>
                                    <td className='p-4'>{b.title}</td>
                                    {/* <td className='p-4 truncate max-w-[200px]'>{b.description}</td> */}
                                    <td className='p-4'>{b.author}</td>
                                    <td className='p-4 align-middle'>
                                        <div className='flex items-center gap-3'>
                                            <MdEdit
                                                size={18}
                                                className='text-blue-500 cursor-pointer hover:text-blue-300'
                                                onClick={() => openEditor(b)}
                                            />
                                            <CgTrashEmpty
                                                size={18}
                                                className='text-red-500 cursor-pointer hover:text-red-300'
                                                onClick={() => handleDelete(b._id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className='text-center py-6 text-gray-500'>
                                    No blogs added yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* edit modal */}
            {openUpdateModal && (
                <div className='fixed top-0 left-0 w-full h-screen bg-black/20 flex items-center justify-center py-10 px-2 md:px-4 z-50'>
                    <div className='bg-white p-6 rounded-lg w-full max-w-4xl shadow-lg relative max-h-[90vh] overflow-auto'>
                        <BiX
                            size={24}
                            className='absolute top-3 right-3 cursor-pointer'
                            onClick={() => setOpenUpdateModal(false)}
                        />

                        <h4 className='text-lg font-semibold mb-4'>Edit Blog</h4>

                        <div className='space-y-4'>
                            <div>
                                <label className='block font-medium mb-1'>Title</label>
                                <input
                                    type='text'
                                    value={updatingBlog.title}
                                    onChange={e =>
                                        setUpdatingBlog(b => ({ ...b, title: e.target.value }))
                                    }
                                    className='w-full border px-3 py-2 rounded'
                                />
                            </div>

                            <div>
                                <label className='block font-medium mb-1'>Description</label>
                                {/* <textarea
                                    rows={6}
                                    value={updatingBlog.description}
                                    onChange={e =>
                                        setUpdatingBlog(b => ({
                                            ...b,
                                            description: e.target.value,
                                        }))
                                    }
                                    className='w-full border px-3 py-2 rounded resize-none'
                                /> */}
                                <div>
                                    <ReactQuill
                                        theme="snow"
                                        value={updatingBlog.description}
                                        onChange={(value) =>
                                            setUpdatingBlog((prev) => ({
                                                ...prev,
                                                description: value,
                                            }))
                                        }
                                        placeholder="Write your blog content..."
                                        className='bg-white h-[300px] rounded-[8px] mb-12'
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block font-medium mb-1'>Feature Image</label>
                                <div
                                    onClick={() => imageRef.current.click()}
                                    className='cursor-pointer border-2 border-gray-300 border-dashed p-4 rounded-[8px] text-center'
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt='preview'
                                            className='mx-auto h-24 object-cover'
                                        />
                                    ) : (
                                        <p>Click to select new image</p>
                                    )}
                                    <input
                                        type='file'
                                        ref={imageRef}
                                        className='hidden'
                                        accept='image/jpeg,image/png,image/webp'
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className='w-full bg-[var(--primary)] text-white py-2 mt-4 rounded-[8px] hover:bg-[var(--secondary)] transition'
                            >
                                {loading ? 'Saving…' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}