import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    leaderBoard: [],
    error: null,
  },
  reducers: {
    fetchLeaderBoardRequest(state, action) {
      state.loading = true;
      state.leaderBoard = [];
    },
    fetchLeaderBoardSuccess(state, action) {
      state.loading = false;
      state.leaderBoard = action.payload;
      state.error = null;
    },
    fetchLeaderBoardFailed(state, action) {
      state.loading = false;
      state.leaderBoard = [];
      state.error = action.payload.error;
    },
    fetchUserRequest(state) {
      state.login = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload?.error;
    },
    fetchAdminRequest(state) {
      state.login = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchAdminSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchAdminFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload?.error;
    },
    loginRequest(state) {
      state.login = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload?.error;
    },
    adminLogoutRequest(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    adminLogoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    adminLogoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload.error;
    },
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload.user;
    },
    logoutSuccess(state) {
      state.user = {};
      state.isAuthenticated = false;
      state.leaderBoard = [];
      state.error = null;
    },
    logoutFailed(state) {
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },  //multipart/form-data used when we are handeling file here we have image file .
      }
    );
    console.log(response)
    dispatch(userSlice.actions.registerSuccess(response.data));
    console.log("redux response", userSlice.actions.registerSuccess(response.data.user));
    toast.success(response.data?.message)
    dispatch(userSlice.actions.clearAllErrors())
  } catch (error) {
    dispatch(userSlice.actions.registerFailed({ user: error.response?.data?.error }));
    toast.error(
      error?.response?.data?.message || "Error while registering "
    );
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
    console.log("login data", response.data)
    dispatch(userSlice.actions.loginSuccess(response.data?.user))
    // console.log("redux response", userSlice.actions.loginSuccess(response.data));
    toast.success(response.data?.message)
    dispatch(userSlice.actions.clearAllErrors())
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error while logging in")
    dispatch(userSlice.actions.loginFailed())
    dispatch(userSlice.actions.clearAllErrors())
  }
}

export const logout = (user) => async (dispatch) => {
  try {
    // Determine the appropriate API endpoint based on user role
    const apiUrl =
      user?.role === "SuperAdmin"
        ? `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/logout-admin`
        : `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/logout`;

    // Make the API request
    const response = await axios.get(apiUrl, {
      withCredentials: true,
    });

    // Dispatch appropriate action based on user role
    if (user?.role === "SuperAdmin") {
      dispatch(userSlice.actions.adminLogoutSuccess());
    } else {
      dispatch(userSlice.actions.logoutSuccess());

    }

    // Show success message
    toast.success(response?.data?.message || "Logged out successfully");

    // Clear previous errors
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    if (user?.role === "SuperAdmin") {
      dispatch(userSlice.actions.adminLogoutFailed({ error: error.response?.data?.message || error.message }));
    } else {
      dispatch(userSlice.actions.logoutFailed({ error: error.response?.data?.message || error.message }));
    }

    // Clear errors and log out failure message
    dispatch(userSlice.actions.clearAllErrors());
    toast.error(error?.response?.data?.message || error?.message || "Logout failed");
    console.error("Logout error:", error);
  }
};



export const fetchProfile = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest())
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/me`,
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    console.log("redux fetch profile", response.data);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.log("userSlice error:", error);
  }
};

export const fetchAdminProfile = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest())
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v4/superadmin/admin/me`,
      {
        withCredentials: true,
      }
    );
    console.log("yupppp", response?.data?.admin)
    dispatch(userSlice.actions.fetchUserSuccess(response?.data?.admin));
    // toast.success(response?.data?.message || "Fetched successfully"); 
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.log("userSlice error:", error);
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderBoardRequest())
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/leaderboard`, { withCredentials: true })
    dispatch(userSlice.actions.fetchLeaderBoardSuccess(response.data?.leaderBoard))
    console.log("successfully fetched leaderboard", response.data?.leaderBoard)
    dispatch(userSlice.actions.clearAllErrors())

  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderBoardFailed(error))
    console.error("Failed to fetch leaderboard", error)
    dispatch(userSlice.actions.clearAllErrors())
  }
}

export default userSlice.reducer;
