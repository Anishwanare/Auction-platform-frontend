import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: false,
  leaderBoard: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    requestFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload?.message || "Something went wrong!";
    },
    logoutSuccess(state) {
      return initialState;
    },
    fetchLeaderboardStart(state) {
      state.loading = true;
      state.leaderBoard = [];
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderBoard = action.payload;
    },
    fetchLeaderboardFailed(state, action) {
      state.loading = false;
      state.leaderBoard = [];
      state.error = action.payload?.message || "Failed to fetch leaderboard";
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Exporting actions
export const {
  requestStart,
  requestSuccess,
  requestFailed,
  logoutSuccess,
  fetchLeaderboardStart,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailed,
  clearAllErrors,
} = userSlice.actions;

// Thunks

export const register = (data) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`,
      data,
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
    );
    dispatch(requestSuccess(response.data.user));
    toast.success(response.data?.message);
  } catch (error) {
    dispatch(requestFailed({ message: error.response?.data?.error }));
    toast.error(error.response?.data?.message || "Error while registering");
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(requestSuccess(response.data.user));
    toast.success(response.data?.message);
  } catch (error) {
    dispatch(requestFailed({ message: error.response?.data?.message }));
    toast.error(error.response?.data?.message || "Error while logging in");
  }
};

export const logout = (user) => async (dispatch) => {
  try {
    const apiUrl =
      user?.role === "SuperAdmin"
        ? `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/logout-admin`
        : `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/logout`;

    await axios.get(apiUrl, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch(logoutSuccess());
    toast.success("Logged out successfully");
  } catch (error) {
    dispatch(requestFailed({ message: error.response?.data?.message }));
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

export const fetchProfile = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/me`,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(requestSuccess(response.data.user));
  } catch (error) {
    dispatch(requestFailed({ message: error.response?.data?.message }));
  }
};

export const fetchAdminProfile = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/admin/me`,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(requestSuccess(response.data.admin));
  } catch (error) {
    dispatch(requestFailed({ message: error.response?.data?.message }));
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(fetchLeaderboardStart());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/leaderboard`,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(fetchLeaderboardSuccess(response.data.leaderBoard));
  } catch (error) {
    dispatch(fetchLeaderboardFailed({ message: error.response?.data?.message }));
  }
};

export default userSlice.reducer;
