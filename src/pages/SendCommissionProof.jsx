import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCommissionProof } from '@/store/slices/commissionSlice';

const SendCommissionProof = () => {
  const [proof, setProof] = useState("");
  const [proofPreview, setProofPreview] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state => state.Commission));

  const handleProofPreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProofPreview(reader.result);
      setProof(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      console.log("file not found", file);
    }
  };

  const handleProofSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('proof', proof);
    formData.append('amount', amount);
    formData.append('comment', comment);

    dispatch(postCommissionProof(formData));
    setProof("")
    setAmount("")
    setComment("")
  };

  return (
    <section className="bg-gray-200 w-full min-h-screen py-20 lg:pl-[320px] flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Send Commission Proof</h2>
        <form className="flex flex-col gap-6" onSubmit={handleProofSubmit}>
          <div className="flex flex-col">
            <label className="text-lg">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-b-2 outline-none text-lg py-2 transition-all duration-300 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="border-b-2 outline-none text-lg py-2 duration-300 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Upload Proof:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProofPreview}
              className="text-lg py-2"
              required
            />
            {proofPreview && (
              <img src={proofPreview} alt="Proof Preview" className="mt-4 w-32 h-32 object-cover" />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white text-lg py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Submitting...' : 'Submit Proof'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SendCommissionProof;
