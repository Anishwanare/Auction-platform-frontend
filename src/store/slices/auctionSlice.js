import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

const auctionSlice = createSlice({
    name: "upcommingAuction",
    initialState: {
        loading: false,
        itemDetails: {},
        auctionDetails: {},
        auctionBidders: [],
        myAuctions: [],
        allAuctions: [],
    },
    reducers: {
        createAuctionRequest(state, action) {
            state.loading = true;
        },
        createAuctionSuccess(state, action) {
            state.loading = false;
        },
        createAuctionFailed(state, action) {
            state.loading = false;
        },
        getAuctionDetailsRequest(state) {
            state.loading = true;
            state.auctionDetails = {};
        },
        getAuctionDetailsSuccess(state, action) {
            state.loading = false;
            state.auctionDetails = action.payload.auctionItem;
            state.auctionBidders = action.payload.bidders
        },
        getAuctionDetailsFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getAllAuctionItemRequest(state) {
            state.loading = true;
            state.allAuctions = [];
        },
        getAllAuctionItemSuccess(state, action) {
            state.loading = false;
            state.allAuctions = action.payload;
        },
        getAllAuctionItemFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getMyAuctionsRequest(state) {
            state.loading = true;
            state.myAuctions = [];
        },
        getMyAuctionsSuccess(state, action) {
            state.loading = false;
            state.myAuctions = Array.isArray(action.payload) ? action.payload : [];
        },
        getMyAuctionsFailed(state) {
            state.loading = false;
            state.error = [];
        },
        deleteMyAuctionRequest(state) {
            state.loading = true;
        },
        deleteMyAuctionSuccess(state) {
            state.loading = false;
        },
        deleteMyAuctionFailed(state) {
            state.loading = false;
        },
        republishAuctionRequest(state, action) {
            state.loading = true;
        },
        republishAuctionSuccess(state) {
            state.loading = false;
        },
        republishAuctionFailed(state) {
            state.loading = false
        },
        AdminAuctionItemDeleteRequest(state) {
            state.loading = true
        },
        AdminAuctionItemDeleteSuccess(state) {
            state.loading = false
        },
        AdminAuctionItemDeleteFailed(state) {
            state.loading = false
        },
        resetSlice(state) {
            state.loading = false;
            state.auctionDetails = state.auctionDetails;
            state.itemDetails = state.itemDetails;
            state.myAuctions = state.myAuctions;
            state.allAuctions = state.allAuctions;
            state.auctionBidders = state.auctionBidders
        }
    }
})

export const getAllAuctionItems = () => async (dispatch) => {
    dispatch(auctionSlice.actions.getAllAuctionItemRequest())
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/auction/all-items`, { withCredentials: true });
        dispatch(auctionSlice.actions.getAllAuctionItemSuccess(response.data?.auctionItems))
        console.log("auction Item data", response.data.auctionItems)
        dispatch(auctionSlice.actions.resetSlice())
    } catch (error) {
        dispatch(auctionSlice.actions.getAllAuctionItemFailed(error.message))
        console.error(error.message || error.respose.data.message)
        dispatch(auctionSlice.actions.resetSlice())
    }
}

export const getAuctionDetails = (id) => async (dispatch) => {
    dispatch(auctionSlice.actions.getAuctionDetailsRequest())
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/auction/details/${id}}`)
        dispatch(auctionSlice.actions.getAllAuctionItemSuccess({
            auctionDetails: response.data.auctionItem,
            auctionBidders: response.data.bidders,
        }))
        console.log("auctionDetail by id", response.data)
        toast.success(response.data.message)
        dispatch(auctionSlice.actions.resetSlice())
    } catch (error) {
        dispatch(auctionSlice.actions.getAuctionDetailsFailed(error.message))
        toast.error(error.response.data.message)
        dispatch(auctionSlice.actions.resetSlice())
    }
}

export const createAuction = (data) => async (dispatch) => {
    dispatch(auctionSlice.actions.createAuctionRequest())
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v2/auction/create-item`, data, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
        dispatch(auctionSlice.actions.createAuctionSuccess())
        toast.success(response.data?.message)
        dispatch(auctionSlice.actions.resetSlice())
        dispatch(getAllAuctionItems())
        dispatch(getMyAuctionItems())
    } catch (error) {
        dispatch(auctionSlice.actions.createAuctionFailed(error.message))
        toast.error(error.response.data.message)
        dispatch(auctionSlice.actions.resetSlice())
    }
}

export const getMyAuctionItems = () => async (dispatch) => {
    dispatch(auctionSlice.actions.getMyAuctionsRequest())
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/auction/get-my-auction-item`, {
            withCredentials: true, headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(auctionSlice.actions.getMyAuctionsSuccess(response.data?.myAuctionItems || []))
        console.log(response.data.message)
        dispatch(auctionSlice.actions.resetSlice())
    } catch (error) {
        dispatch(auctionSlice.actions.getMyAuctionsFailed(error.message))
        console.error(error.message || error.respose.data.message)
        dispatch(auctionSlice.actions.resetSlice())
    }

}

export const deleteMyAuction = (id) => async (dispatch) => {
    dispatch(auctionSlice.actions.deleteMyAuctionRequest())
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v2/auction/delete/${id}`, { withCredentials: true })
        dispatch(auctionSlice.actions.deleteMyAuctionSuccess())
        toast.success(response.data.message)
        dispatch(auctionSlice.actions.resetSlice())
        dispatch(getAllAuctionItems())
        dispatch(getMyAuctionItems())
    } catch (error) {
        dispatch(auctionSlice.actions.deleteMyAuctionFailed(error.message))
        toast.error(error.response.data.message)
        dispatch(auctionSlice.actions.resetSlice())
    }
}

export const republishMyAuction = (id, data) => async (dispatch) => {
    dispatch(auctionSlice.actions.republishAuctionRequest())
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v2/auction/republish/${id}`, data, {
            withCredentials: true, headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(auctionSlice.actions.republishAuctionSuccess())
        toast.success(response.data?.message)
        dispatch(getAllAuctionItems())
        dispatch(getMyAuctionItems())
        dispatch(auctionSlice.actions.resetSlice())
    } catch (error) {
        dispatch(auctionSlice.actions.republishAuctionFailed())
        toast.error(error.response.data?.message)
        dispatch(auctionSlice.actions.resetSlice())

    }
}

//superadmin: auction item delete
export const AdminDeleteAuctionItem = (id) => async (dispatch) => {
    dispatch(auctionSlice.actions.AdminAuctionItemDeleteRequest())
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin//auction-items/${id}`, { withCredentials: true })
        dispatch(auctionSlice.actions.AdminAuctionItemDeleteSuccess())
        toast.success(response.data?.message)
        dispatch(getAllAuctionItems())
    } catch (error) {
        toast.error(error.response?.data?.message)
        console.error(error.response?.data?.message)
    }
}






export default auctionSlice.reducer