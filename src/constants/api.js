export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/",
  TIMEOUT: 30000,
  VERSION: "v1",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/auth/login",
      GOOGLE_SIGNIN: "/api/google-signin",
      REGISTER: "/api/auth/register",
    },
    PROFILE: {
      UPDATE: "/api/profile/update",
      STATUS: "/api/profile/status",
    },
  },
};
