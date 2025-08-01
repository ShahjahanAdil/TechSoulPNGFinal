import React, { useState, useRef } from 'react'
import { FaSheetPlastic } from 'react-icons/fa6'
import axios from 'axios'
import { useAuthContext } from '../../../../contexts/AuthContext'
import Loader from '../../../../components/Loader'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

export default function AddBlog() {

    const { userData } = useAuthContext()
    const imageRef = useRef()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [fileName, setFileName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleFileChange = e => {
        const file = e.target.files[0]
        if (!file) return

        const allowed = ['image/jpeg', 'image/png', 'image/webp']
        if (!allowed.includes(file.type)) {
            return alert('Only JPG, PNG or WEBP allowed.')
        }

        setFileName(file.name)
        setPreview(URL.createObjectURL(file))
        setSelectedFile(file)
    }

    const handleCreateBlog = async () => {
        if (!title.trim() || !description.trim()) return alert('Title & description required.')
        if (!selectedFile) return alert('Please select an image.')

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', selectedFile)
        formData.append('author', userData.username)

        try {
            setLoading(true)
            const { status, data } = await axios.post(`${import.meta.env.VITE_HOST}/admin/blogs/add`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )

            if (status === 201) {
                alert(data.message)
                setTitle('')
                setDescription('')
                setSelectedFile(null)
                setPreview(null)
                setFileName('')
            }
        } catch (err) {
            console.error(err)
            alert('Something went wrong. Try again.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='main-container !py-8'>
            <div className='border border-gray-200 p-8 rounded-[12px] bg-white'>
                <h3 className='flex items-center gap-2 text-[24px] text-[var(--primary-color)] font-semibold'>
                    <FaSheetPlastic /> Add Blog
                </h3>
                <p className='mt-2 mb-6 px-2 py-1 bg-[var(--md-light)] rounded-[8px] !text-[var(--dark)] inline-block'>
                    Add a new blog article to your platform
                </p>

                <div className='flex flex-col gap-6'>
                    {/* Title */}
                    <div>
                        <label htmlFor='title' className='block font-semibold text-[#333] mb-2'>
                            Title
                        </label>
                        <input
                            id='title'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder='Enter blog title'
                            className='w-full border border-gray-200 rounded-[8px] px-4 py-2 focus:ring focus:border-[var(--primary-color)]'
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className='block font-semibold text-[#333] mb-2'>Feature Image</label>
                        <div
                            onClick={() => imageRef.current.click()}
                            className='flex flex-col items-center justify-center px-5 py-16 bg-[#e5f0f9] border-2 border-dashed border-[#c5e2f2] rounded-[12px] cursor-pointer hover:bg-[#c5e2f2] transition'
                        >
                            <p className='!text-[16px] text-[#666]'>
                                {fileName || 'Click to select an image (JPG, PNG, WEBP)'}
                            </p>
                            <input
                                type='file'
                                ref={imageRef}
                                className='hidden'
                                accept='image/jpeg,image/png,image/webp'
                                onChange={handleFileChange}
                            />
                        </div>
                        {preview && (
                            <img
                                src={preview}
                                alt='Preview'
                                className='mt-4 max-h-[200px] rounded border border-gray-200 object-cover'
                            />
                        )}
                    </div>

                    {/* Description */}
                    {/* <div>
                        <label htmlFor='description' className='block font-semibold text-[#333] mb-2'>
                            Description
                        </label>
                        <textarea
                            id='description'
                            rows={6}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder='Write your blog content...'
                            className='w-full border border-gray-200 rounded-[8px] px-4 py-2 resize-none focus:ring focus:border-[var(--primary-color)]'
                        />
                    </div> */}
                    {/* Description */}
                    <div>
                        <label htmlFor='description' className='block font-semibold text-[#333] mb-2'>
                            Description
                        </label>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            placeholder="Write your blog content..."
                            className='bg-white h-[300px] rounded-[8px] mb-12'
                        />
                    </div>
                </div>

                <button
                    onClick={handleCreateBlog}
                    disabled={loading}
                    className={`mt-6 px-6 py-2 rounded-[8px] transition ${loading
                        ? '!bg-gray-400 cursor-not-allowed text-white'
                        : '!bg-[var(--primary)] hover:!bg-[var(--secondary)] text-white'
                        }`}
                >
                    {loading ? 'Creating...' : 'Create Blog'}
                </button>
            </div>
        </div>
    )
}
