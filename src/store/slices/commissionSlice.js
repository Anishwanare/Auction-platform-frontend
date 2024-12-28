import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { fetchAllPaymentsProofs } from "./superAdminSlice";

const commissionSlice = createSlice({
    name: "commission",
    initialState: {
        loading: false,
    },
    reducers: {
        postCommissionProofRequest(state, action) {
            state.loading = true;
        },
        postCommissionProofSuccess(state, action) {
            state.loading = false;
        },
        postCommissionProofFailed(state, action) {
            state.loading = false;
        }
    }
})

export const postCommissionProof = (data) => async (dispatch) => {
    dispatch(commissionSlice.actions.postCommissionProofRequest())
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v4/auction/commission/proof`, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        dispatch(commissionSlice.actions.postCommissionProofSuccess(response.data))
        dispatch(fetchAllPaymentsProofs())
        toast.success(response.data?.message)

    } catch (error) {
        dispatch(commissionSlice.actions.postCommissionProofFailed(error.message))
        toast.error(error?.response?.data?.message)
    }
}


export default commissionSlice.reducer;