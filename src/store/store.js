import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import commissionReducer from "./slices/commissionSlice"
import auctionReducer from "./slices/auctionSlice"
import bidsReducer from "./slices/bidSlice"
import adminReducer from "./slices/superAdminSlice"


export const store = configureStore({
    reducer: {
        User: userReducer,
        Commission: commissionReducer,
        Auction: auctionReducer,
        Bids: bidsReducer,
        SuperAdmin: adminReducer

    }
})