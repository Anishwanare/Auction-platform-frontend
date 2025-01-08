import { deletePaymentProof, updatePaymentProof } from '@/store/slices/superAdminSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdOutlineDelete } from "react-icons/md";

const PaymentProofCard = ({ receivedAmount, comment, status, proof, createdAt, userId, id }) => {
  const [amount, setAmount] = useState('');
  const [updateStatus, setUpdateStatus] = useState(status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    setUpdateStatus(e.target.value);
  };

  const updateProofStatus = (e) => {
    e.preventDefault();
    if (!amount || !updateStatus) {
      return toast.warn('Select amount and status to save...');
    }
    const formData = new FormData();
    formData.append('status', updateStatus);
    formData.append('amount', amount);
    if (updateStatus !== status || amount) {
      dispatch(updatePaymentProof(id, formData));
    }
  };

  const handleDeleteProof = ()=>{
    const wannaDelete = window.confirm('Are you sure want to delete payment proof?')
    if(wannaDelete){
      dispatch(deletePaymentProof(id))
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden max-w-md mx-auto border border-gray-300">
      <div className="relative">
        {/* Payment Proof Image */}
        <img
          src={proof?.url || 'https://via.placeholder.com/400'}
          alt="Payment Proof"
          className="w-full h-60 object-cover cursor-pointer hover:opacity-90 transition-opacity"
          onClick={toggleModal}
        />

        <p className={`absolute top-4 left-4 px-3 py-1 rounded-full text-black text-xl font-bold shadow-md bg-red-500 hover:bg-red-700`} onClick={handleDeleteProof}><MdOutlineDelete /></p>

        {/* Status Badge */}
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md ${status === 'Settled' ? 'bg-green-500' : status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
        >
          {status}
        </span>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">₹{receivedAmount}</h2>
          <p className="text-sm text-gray-500">Paid on {new Date(createdAt).toLocaleDateString()}</p>
        </div>

        {comment && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md mb-4">
            <p className="text-sm text-gray-700 italic">{comment}</p>
          </div>
        )}

        <form onSubmit={updateProofStatus} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Received Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter received amount"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Update Status</label>
            <select
              value={updateStatus}
              onChange={handleStatusChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            >
              <option value="update status" disabled>
                Select status
              </option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg text-sm transition-all duration-200 ${updateStatus === status && !amount
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              } ${status === "Settled" ? "cursor-not-allowed bg-gray-400" : " "}`}
            disabled={status === "Settled"}
          >
            Save Changes
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-right">
          <p>User ID: {userId}</p>
        </div>
      </div>

      {/* Modal for Full Image */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-3xl mx-auto w-full p-6">
            <img
              src={proof?.url}
              alt="Full Payment Proof"
              className="w-full max-h-screen object-contain rounded-lg shadow-lg"
            />
            <button
              className="absolute top-10 right-32 bg-white text-black rounded-full px-3 py-2 text-sm font-bold shadow-lg hover:bg-gray-200"
              onClick={toggleModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProofCard;
