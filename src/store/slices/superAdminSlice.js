import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const SuperAdminSlice = createSlice({
    name: "superAdmin",
    initialState: {
        loading: true,
        monthlyRevenue: [],
        allUsers: [],
        paymentProofs: [],
        singlePaymentProof: {},
        auctionItems: [],
        messages: [],
    },
    reducers: {
        monthlyRevenueRequest(state, action) {
            state.loading = true;
            state.monthlyRevenue = []
        },
        monthlyRevenueSuccess(state, action) {
            state.loading = false;
            state.monthlyRevenue = action.payload;
        },
        monthlyRevenueFailed(state, action) {
            state.loading = false;
            state.monthlyRevenue = [];
        },
        fetchAllUsersRequest(state, action) {
            state.loading = true,
                state.totalAuctioneers = []
            state.totalBidders = []
        },
        fetchAllUsersSuccess(state, action) {
            state.loading = false;
            state.allUsers = action.payload;
        },
        fetchAllUsersFailed(state, action) {
            state.loading = false;
            state.totalAuctioneers = [];
            state.totalBidders = []
        },
        fetchAllPaymentProofRequest(state, action) {
            state.loading = true;
            state.paymentProofs = []
        },
        fetchAllPaymentProofSuccess(state, action) {
            state.loading = false;
            state.paymentProofs = action.payload.getAllPaymentsProof
        },
        fetchAllPaymentProofFailed(state, action) {
            state.loading = false;
            state.paymentProofs = []
        },
        fetchSinglePaymentProofRequest(state) {
            state.loading = true;
            state.singlePaymentProof = {};
        },
        fetchSinglePaymentProofSuccess(state, action) {
            state.loading = false;
            state.singlePaymentProof = action.payload.paymentProofDetails;
        },
        fetchSinglePaymentProofFailed(state) {
            state.loading = false;
            state.singlePaymentProof = {};
        },
        deletePaymentProofRequest(state) {
            state.loading = true;
        },
        deletePaymentProofSuccess(state) {
            state.loading = false;
        },
        deletePaymentProofFailed(state) {
            state.loading = false;
        },
        updatePaymentProofRequest(state) {
            state.loading = true;
        },
        updatePaymentProofSuccess(state) {
            state.loading = false;
        },
        updatePaymentProofFailed(state) {
            state.loading = false;
        },
        fetchAuctionItemsRequest(state) {
            state.loading = true;
            state.auctionItems = [];
        },
        fetchAuctionItemsSuccess(state, action) {
            state.loading = false;
            state.auctionItems = action.payload;
        },
        fetchAuctionItemsFailed(state) {
            state.loading = false;
            state.auctionItems = [];
        },
        fetchMessagesRequest(state) {
            state.loading = true;
            state.messages = [];
        },
        fetchMessagesSuccess(state, action) {
            state.loading = false;
            state.messages = action.payload;
        },
        fetchMessagesFailed(state) {
            state.loading = false;
            state.messages = [];
        },
        deleteMessagesRequest(state) {
            state.loading = true
        },
        deleteMessagesSuccess(state) {
            state.loading = false
        },
        deleteMessagesFailed(state) {
            state.loading = false
        },
        deleteBidderRequest(state) {
            state.loading = true
        },
        deleteBidderSuccess(state) {
            state.loading = false
        },
        deleteBidderFailed(state) {
            state.loading = false
        },
        clearAllSuperAdminError(state, action) {
            state.loading = false;
            state.monthlyRevenue = state.monthlyRevenue;
            state.allUsers = state.allUsers;
            state.auctionItems = state.auctionItems;
            state.messages = state.messages;
            state.paymentProofs = state.paymentProofs;
            state.singlePaymentProof = {}
        }

    },
});

export const getMonthlyRevenue = () => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.monthlyRevenueRequest());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL
            }/api/v4/superadmin/fetchmonthly/revenue`,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(
            SuperAdminSlice.actions.monthlyRevenueSuccess(
                response?.data?.totalMonthlyRevenue
            )
        );
        // toast.success(response?.data?.message);
    } catch (error) {
        dispatch(SuperAdminSlice.actions.monthlyRevenueFailed());
        toast.error(error.response?.data?.message);
    }
};

export const fetchAllUsers = () => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.fetchAllUsersRequest())
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL
            }/api/v4/superadmin/fetchall/users`, { withCredentials: true })
        dispatch(SuperAdminSlice.actions.fetchAllUsersSuccess(response.data?.users));
        console.log("users", response?.data?.users)
        // toast.success(response?.data?.message);
    } catch (error) {
        dispatch(SuperAdminSlice.actions.fetchAllUsersFailed());
        toast.error(error.response?.data?.message);
    }
}

// payment prooof

export const fetchAllPaymentsProofs = () => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.fetchAllPaymentProofRequest())
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/paymentproof/details`,
            { withCredentials: true })
        dispatch(SuperAdminSlice.actions.fetchAllPaymentProofSuccess(response.data)
        );
        console.log("payments proofs:", response.data?.getAllPaymentsProof)
        // toast.success(response?.data?.message);
    } catch (error) {
        dispatch(SuperAdminSlice.actions.fetchAllPaymentProofFailed());
        toast.error(error.response?.data?.message);
    }
}

export const fetchSinglePaymentProof = (id) => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.fetchSinglePaymentProofRequest());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/paymentproof/details/${id}`,
            { withCredentials: true }
        );
        dispatch(SuperAdminSlice.actions.fetchSinglePaymentProofSuccess(response.data));
        // toast.success(response?.data?.message);
    } catch (error) {
        dispatch(SuperAdminSlice.actions.fetchSinglePaymentProofFailed());
        toast.error(error.response?.data?.message);
    }
};

export const deletePaymentProof = (id) => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.deletePaymentProofRequest());
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/delete-payment/proof/${id}`,
            { withCredentials: true }
        );
        dispatch(SuperAdminSlice.actions.deletePaymentProofSuccess());
        dispatch(fetchAllPaymentsProofs())
        toast.success(response?.data?.message);
    } catch (error) {
        dispatch(SuperAdminSlice.actions.deletePaymentProofFailed());
        toast.error(error.response?.data?.message);
        console.error(error.response?.data?.message);
    }
};

export const updatePaymentProof = (id, formData) => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.updatePaymentProofRequest());
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/paymentproof/update/${id}`,
            formData,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        dispatch(SuperAdminSlice.actions.updatePaymentProofSuccess());
        toast.success(response?.data?.message);
        dispatch(fetchAllPaymentsProofs())
    } catch (error) {
        dispatch(SuperAdminSlice.actions.updatePaymentProofFailed());
        toast.error(error.response?.data?.message);
        console.error(error.response?.data?.message);

    }
};

// messages
export const fetchMessages = () => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.fetchMessagesRequest());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/fetch-messages`,
            { withCredentials: true }
        );
        dispatch(SuperAdminSlice.actions.fetchMessagesSuccess(response?.data?.messages));
        console.log(response.data?.messages)
        // toast.success(response?.data?.message);
    } catch (error) {
        dispatch(SuperAdminSlice.actions.fetchMessagesFailed());
        toast.error(error.response?.data?.message);
    }
};

export const deleteMessage = (id) => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.deleteMessagesRequest());
    try {
        await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/message/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(SuperAdminSlice.actions.deleteMessagesSuccess());
        dispatch(SuperAdminSlice.actions.fetchMessagesSuccess())

        // toast.success(response?.data?.message);
    } catch (error) {
        dispatch(SuperAdminSlice.actions.deleteMessagesFailed());
        toast.error(error.response?.data?.message);
    }
};


// bidders
export const deleteBidders = (id) => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.deleteBidderRequest())
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/delete/${id}`, { withCredentials: true })
        dispatch(SuperAdminSlice.actions.deleteBidderSuccess())
        toast.success(response.data?.message)
        dispatch(fetchAllUsers())
    } catch (error) {
        dispatch(SuperAdminSlice.actions.deleteMessagesFailed())
        toast.error(error)
    }
}

export const clearSuperAdminError = () => async (dispatch) => {
    dispatch(SuperAdminSlice.actions.clearAllSuperAdminError)
}



export default SuperAdminSlice.reducer;
