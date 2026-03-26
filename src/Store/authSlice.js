import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
    };
  }

  const savedAuth = window.localStorage.getItem("auth");

  if (!savedAuth) {
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
    };
  }

  try {
    const parsedAuth = JSON.parse(savedAuth);

    return {
      user: parsedAuth.user ?? null,
      accessToken: parsedAuth.accessToken ?? null,
      isAuthenticated: Boolean(parsedAuth.accessToken),
    };
  } catch {
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
    };
  }
};

const persistAuthState = (state) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!state.accessToken) {
    window.localStorage.removeItem("auth");
    return;
  }

  window.localStorage.setItem(
    "auth",
    JSON.stringify({
      user: state.user,
      accessToken: state.accessToken,
    }),
  );
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      persistAuthState(state);
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      persistAuthState(state);
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;
