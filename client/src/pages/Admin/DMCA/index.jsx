import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaX } from 'react-icons/fa6'
import Loader from '../../../components/Loader'
import { GoEye } from 'react-icons/go'
import { MdEdit } from 'react-icons/md'
import { CgTrashEmpty } from 'react-icons/cg'
import dayjs from 'dayjs'
import axios from 'axios'

export default function DMCA() {

    const [reports, setReports] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [openViewModel, setOpenViewModel] = useState(false)
    const [clickedReport, setClickedReport] = useState({})
    const [openUpdateModel, setOpenUpdateModel] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/fetch-dmca?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setReports(data.reports)
                    setTotalPages(Math.ceil(data.totalReports / 20))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleView = (report) => {
        setOpenViewModel(true)
        setClickedReport(report)
    }

    const handleUpdate = (report) => {
        setOpenUpdateModel(true)
        setClickedReport(report)
    }

    const handleUpdateFn = async () => {
        setLoading(true);
        try {
            const statusSelect = document.getElementById('status');
            const status = statusSelect.value;

            const res = await axios.patch(`${import.meta.env.VITE_HOST}/admin/dmca/update/${clickedReport._id}`, { status });

            if (res.status === 202) {
                setReports(prev => prev.map(r => r._id === clickedReport._id ? { ...r, status } : r));
                setOpenUpdateModel(false);
                window.toastify?.("Status updated successfully!", "success");
            }
        } catch (err) {
            console.error("Update failed:", err);
            window.toastify?.("Failed to update status", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async id => {
        if (!window.confirm('Delete this report?')) return
        setLoading(true)
        try {
            const res = await axios.delete(`${import.meta.env.VITE_HOST}/admin/dmca/delete/${id}`)
            if (res.status === 203) {
                setReports(prev => prev.filter(r => r._id !== id))
                window.toastify?.(res.data.message, 'success')
            }
        } catch (err) {
            console.error(err)
            window.toastify?.('Failed to delete blog', 'error')
        } finally {
            setLoading(false)
        }
    }

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-[5px] cursor-pointer hover:!bg-[#666] hover:!text-white ${page === i ? 'bg-[var(--dark)] text-white' : 'bg-[#e8e8e8] !text-[#666]'}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    if (loading) return <Loader />

    return (
        <div className='relative main-container'>
            <h3 className='flex gap-2 items-center'><FaAddressCard /> DMCA Reports</h3>
            <p className='px-2 py-1 bg-[var(--md-light)] inline-block rounded-[8px] !text-[var(--dark)] mt-2'>Manage dmca reports of your content</p>

            <div className='w-full overflow-x-auto mt-8 rounded-[12px]'>
                <table className='min-w-[600px] w-full text-sm text-left bg-white'>
                    <thead className='bg-[var(--md-light)] text-[var(--dark)] uppercase text-xs'>
                        <tr>
                            <th className='p-4'>Sr#</th>
                            <th className='p-4'>Subject</th>
                            <th className='p-4'>Message</th>
                            <th className='p-4'>Reported At</th>
                            <th className='p-4'>Status</th>
                            <th className='p-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((report, i) => (
                                <tr key={report._id} className='hover:bg-gray-50'>
                                    <td className='p-4'>{i + 1}</td>
                                    <td className='p-4'>{report.subject}</td>
                                    <td className='p-4 line-clamp-2'>{report.message}</td>
                                    <td className='p-4'>{dayjs(report.createdAt).format('DD-MM-YYYY HH:MM')}</td>
                                    <td className='p-4 capitalize'>
                                        <span className={`px-2 !text-[14px] rounded-full ${report.status === 'completed' ? 'bg-[#24da24] text-white' : report.status === 'rejected' ? 'bg-[#db3030] text-white' : 'bg-[#eaff05] text-[#333]'}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className='p-4 align-middle'>
                                        <div className='flex items-center gap-3'>
                                            <GoEye
                                                size={18}
                                                className='text-blue-500 cursor-pointer hover:text-blue-300'
                                                onClick={() => handleView(report)}
                                            />
                                            <MdEdit
                                                size={18}
                                                className='text-blue-500 cursor-pointer hover:text-blue-300'
                                                onClick={() => handleUpdate(report)}
                                            />
                                            <CgTrashEmpty
                                                size={18}
                                                className='text-red-500 cursor-pointer hover:text-red-300'
                                                onClick={() => handleDelete(report._id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className='text-center py-6 text-gray-500'>
                                    No dcma report received yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {
                !loading &&
                (
                    totalPages > 1 &&
                    <div className='flex flex-wrap my-10 items-center justify-center gap-1'>
                        {renderPageNumbers()}
                    </div>
                )
            }

            {/* Update Model */}
            <div className={`absolute top-0 left-0 w-full min-h-screen flex justify-center items-center p-6 overflow-y-auto transition-all duration-300 ease-linear 
                ${openUpdateModel ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-90'}`}
            >
                <div className='w-full max-w-[600px] bg-white rounded-[12px] shadow-lg p-6'>
                    <div className='flex justify-between mb-3'>
                        <h6 className='!text-[var(--md-dark)]'>Report Details</h6>
                        <FaX className='text-red-500 cursor-pointer hover:text-red-400' onClick={() => setOpenUpdateModel(false)} />
                    </div>
                    <div className='bg-[var(--x-light)] p-2 rounded-[8px]'>
                        <p className='!text-[#000] font-semibold'>Status:</p>
                        <select name="status" id="status" defaultValue={clickedReport.status} className='w-full p-2 mt-2'>
                            <option value="pending">pending</option>
                            <option value="completed">completed</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </div>
                    <div className='flex justify-end mt-5'>
                        <button className='bg-[var(--dark)] text-white p-2 rounded-[8px]' onClick={handleUpdateFn}>
                            Update
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Model */}
            <div className={`absolute top-0 left-0 w-full min-h-screen flex justify-center items-center p-6 overflow-y-auto transition-all duration-300 ease-linear 
                ${openViewModel ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-90'}`}
            >
                <div className='w-full max-w-[600px] bg-white rounded-[12px] shadow-lg p-6'>
                    <div className='flex justify-between mb-3'>
                        <h6 className='!text-[var(--md-dark)]'>Report Details</h6>
                        <FaX className='text-red-500 cursor-pointer hover:text-red-400' onClick={() => setOpenViewModel(false)} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='bg-[var(--x-light)] p-2 rounded-[8px]'>
                            <p className='!text-[#000] font-semibold'>Subject:</p>
                            <p className='!text-[#000]'>{clickedReport.subject}</p>
                        </div>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div className='flex-1 bg-[var(--x-light)] p-2 rounded-[8px]'>
                                <p className='!text-[#000] font-semibold'>Fullname:</p>
                                <p className='!text-[#000]'>{clickedReport.fullname}</p>
                            </div>
                            <div className='flex-1 bg-[var(--x-light)] p-2 rounded-[8px]'>
                                <p className='!text-[#000] font-semibold'>Email:</p>
                                <p className='!text-[#000]'>{clickedReport.email}</p>
                            </div>
                        </div>
                        <div className='bg-[var(--x-light)] p-2 rounded-[8px]'>
                            <p className='!text-[#000] font-semibold'>Message:</p>
                            <p className='!text-[#000]'>{clickedReport.message}</p>
                        </div>
                        <div className='bg-[var(--x-light)] p-2 rounded-[8px]'>
                            <p className='!text-[#000] font-semibold'>Copyright URL:</p>
                            <a href={clickedReport.copyrightURL} target='_blank' className='!text-[#000] cursor-pointer hover:underline'>{clickedReport.copyrightURL}</a>
                        </div>
                        <div className='bg-[var(--x-light)] p-2 rounded-[8px]'>
                            <p className='!text-[#000] font-semibold'>Reported URL:</p>
                            <a href={clickedReport.reportedURL} target='_blank' className='!text-[#000] cursor-pointer hover:underline'>{clickedReport.reportedURL}</a>
                        </div>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div className='flex-1 bg-[var(--x-light)] p-2 rounded-[8px]'>
                                <p className='!text-[#000] font-semibold'>Original Code:</p>
                                <p className='!text-[#000]'>{clickedReport.originalCode}</p>
                            </div>
                            <div className='flex-1 bg-[var(--x-light)] p-2 rounded-[8px]'>
                                <p className='!text-[#000] font-semibold'>Entered Code:</p>
                                <p className='!text-[#000]'>{clickedReport.enteredCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}