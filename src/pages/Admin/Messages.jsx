import { deleteMessage, fetchMessages } from '@/store/slices/superAdminSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Messages = () => {
    const { messages, loading,error } = useSelector((state) => state.SuperAdmin);
    const { isAuthenticated } = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    if (!isAuthenticated) {
        navigate('/');
        return null;
    }

    const handleDelete = (messageId) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            dispatch(deleteMessage(messageId))
                .then(() => {
                    toast.success("Message deleted successfully");
                })
                .catch(() => {
                    toast.error("Failed to delete the message");
                });
        }
    };

    return (
        <div className="w-full min-h-screen px-6 py-10 bg-gray-50 lg:pl-[320px]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
                <p className="text-lg text-gray-600">View and manage messages from users.</p>
            </div>

            {/* Messages Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <div className="col-span-full text-center text-gray-500">Loading...</div>
                ) : error ? (
                    <div className="col-span-full text-center text-red-500">Error fetching messages</div>
                ) : messages && messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow relative"
                        >
                            {/* Sender Info */}
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl font-semibold text-blue-600">
                                        {message.sender?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        {message.name || 'Unknown Sender'}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {message.email || 'Unknown Sender'}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(message.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Message Content */}
                            <p className="text-sm text-gray-600 mb-4">
                                {message.message || 'No content available'}
                            </p>

                            {/* Delete Icon */}
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-colors"
                                onClick={() => handleDelete(message._id)}
                                aria-label="Delete message"
                            >
                                <MdDeleteOutline size={24} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No messages available.
                    </div>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};

export default Messages;
