import Spinner from '@/custom-components/Spinner'
import { fetchAllUsers } from '@/store/slices/superAdminSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Auctioneers = () => {
    const [auctioneers, setAuctioneers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(6) // Show 6 auctioneers per page

    const { allUsers, loading, error } = useSelector((state) => state.SuperAdmin)
    const dispatch = useDispatch()

    // Filter the users to get only "Auctioneer" role
    const filterAuctioneers = allUsers.filter((user) => user?.role === "Auctioneer")

    useEffect(() => {
        setAuctioneers(filterAuctioneers)
    }, [filterAuctioneers])

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    // Handle pagination and slice the array based on current page
    const indexOfLastAuctioneer = currentPage * itemsPerPage
    const indexOfFirstAuctioneer = indexOfLastAuctioneer - itemsPerPage
    const currentAuctioneers = auctioneers.slice(indexOfFirstAuctioneer, indexOfLastAuctioneer)

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleUpdate = (id) => {
        console.log(`Update auctioneer with id: ${id}`)
    }

    const handleDelete = (id) => {
        console.log(`Delete auctioneer with id: ${id}`)
    }

    const handleViewAuction = (id) => {
        console.log(`View auctions for auctioneer with id: ${id}`)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                <p>There was an error fetching auctioneers. Please try again later.</p>
            </div>
        )
    }

    const totalPages = Math.ceil(auctioneers.length / itemsPerPage)

    return (
        <div className="p-6 bg-gray-50 min-h-screen lg:pl-[320px]">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Auctioneers List</h2>

            {/* Display a message if no auctioneers are found */}
            {auctioneers.length === 0 ? (
                <p className="text-lg text-gray-500">No auctioneers found.</p>
            ) : (
                <div className="space-y-4">
                    {/* Render each auctioneer's details in a clean list */}
                    {currentAuctioneers.map((auctioneer) => (
                        <div
                            key={auctioneer.id}
                            className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-medium text-gray-800">{auctioneer.userName}</h3>
                                    <p className="text-gray-600">{auctioneer.email}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleUpdate(auctioneer.id)}
                                        className="text-yellow-600 hover:text-yellow-700 font-semibold py-2 px-4 rounded-md"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(auctioneer.id)}
                                        className="text-red-600 hover:text-red-700 font-semibold py-2 px-4 rounded-md"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleViewAuction(auctioneer.id)}
                                        className="text-blue-600 hover:text-blue-700 font-semibold py-2 px-4 rounded-md"
                                    >
                                        View Auction
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-md mx-1`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Auctioneers
