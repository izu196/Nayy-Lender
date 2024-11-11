import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api";
import { AUTH_STEPS } from "../constants/auth";
import { tokenManager } from "../utils/tokenManager";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();
const USER_STORAGE_KEY = "app_user_data";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = () => {
    if (!tokenManager.isAuthenticated()) {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
      setIsLoading(false);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && checkAuthStatus()) {
        const isVerified = firebaseUser.emailVerified;
        const cachedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (cachedUser) {
          setUser({
            ...JSON.parse(cachedUser),
            isAuthenticated: true,
            isVerified,
            email: firebaseUser.email,
          });
        }
      } else {
        setUser({ isAuthenticated: false });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthResponse = (response) => {
    const {
      message,
      token,
      profileComplete,
      requiredStep,
      requiredFields,
      userData,
    } = response.data;

    if (token) {
      tokenManager.setToken(token);
    }

    if (userData) {
      const updatedUser = {
        ...userData,
        isAuthenticated: true,
        nextStep: !userData?.role ? AUTH_STEPS.ROLE_SELECTION : requiredStep,
        formData: { ...userData.formData, ...requiredFields },
      };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    }

    return {
      success: true,
      message,
      profileComplete,
      nextStep: !userData?.role ? AUTH_STEPS.ROLE_SELECTION : requiredStep,
      requiredFields,
      role: userData?.role,
    };
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return handleAuthResponse(response);
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message,
      };
    }
  };

  const login = async (idToken) => {
    try {
      const response = await authService.login(idToken);
      return handleAuthResponse(response);
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message,
      };
    }
  };

  const googleSignIn = async (data) => {
    try {
      const response = await authService.googleSignIn(data);
      return handleAuthResponse(response);
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  const completeProfileStep = async (stepId, stepData) => {
    try {
      const response = await authService.completeProfileStep(stepId, stepData);
      return handleAuthResponse(response);
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    user,
    isLoading,
    login,
    register,
    googleSignIn,
    completeProfileStep,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
