import PaymentProofCard from '@/custom-components/PaymentProofCard';
import Spinner from '@/custom-components/Spinner';
import { fetchAllPaymentsProofs } from '@/store/slices/superAdminSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PaymentsProofs = () => {
    const { user, isAuthenticated } = useSelector((state) => state.User);
    const { paymentProofs, loading, error } = useSelector((state) => state.SuperAdmin);

    console.log("paymets prood", paymentProofs)

    const dispatch = useDispatch();

    // Fetch all payment proofs when the component mounts
    useEffect(() => {
        dispatch(fetchAllPaymentsProofs());
    }, [dispatch]);

    // Show loading or error message if needed
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }
    if (error) {
        return <div>There was an error fetching payment proofs. Please try again later.</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen lg:pl-[320px]">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Payment Proofs</h2>

            {/* Render payment proof cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentProofs && paymentProofs?.map((paymentProof) => (
                    <div key={paymentProof._id}>
                        <PaymentProofCard
                            receivedAmount={paymentProof.amount}
                            comment={paymentProof.comment}
                            status={paymentProof.status}
                            proof={paymentProof.proof}
                            createdAt={paymentProof.createdAt}
                            userId={paymentProof.userId}
                            id={paymentProof._id}
                        />
                    </div>
                ))}
            </div>
            
            <div className="">
                {paymentProofs.length <= 0 && <>
                    <p>No payment proofs found!</p>
                </> }
            </div>
        </div>
    );
};

export default PaymentsProofs;
