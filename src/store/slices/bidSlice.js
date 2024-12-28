import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const bidAuctionSlice = createSlice({
    name: "bids",
    initialState: {
        bids: [],
        loading: false,
        error: null,
    },
    reducers: {
        getBidsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getBidsSuccess(state, action) {
            state.loading = false;
            state.bids = action.payload;
        },
        getBidsFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllBidsError(state) {
            state.error = null;
        },
    },
});

// Async action for placing bids
export const placebids = (id, data) => async (dispatch) => {
    dispatch(bidAuctionSlice.actions.getBidsRequest());
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v3/auction/bid/place/bid/${id}`,
            data,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Dispatch success action with the response payload
        dispatch(bidAuctionSlice.actions.getBidsSuccess(response.data));
        toast.success(response.data?.message);
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "Internal Server Error";
        dispatch(bidAuctionSlice.actions.getBidsFailed(errorMessage));
        toast.error(errorMessage);
    }
};

// Action for clearing errors manually
export const clearError = () => (dispatch) => {
    dispatch(bidAuctionSlice.actions.clearAllBidsError());
};

export default bidAuctionSlice.reducer;
