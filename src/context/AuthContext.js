import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api/client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return setLoading(false);

      try {
        const res = await client.post("/api/v1/auth/token/validate");
        if (res.data?.isValid) setUserId(res.data.userId);
        else await AsyncStorage.clear();
      } catch {
        await AsyncStorage.clear();
      }
      setLoading(false);
    };
    validateToken();
  }, []);

  const loginWithEmail = async ({ email, password }) => {
    const res = await client.post("/api/v2/auth/login-email", { email, password });
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
    setUserId(res.data.userId);
  };

  const loginWithDocument = async ({ document, password }) => {
    const res = await client.post("/api/v1/auth/login-document", { document, password });
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
    setUserId(res.data.userId);
  };

  const loginWithOtp = async ({ otpCode }) => {
    const res = await client.post("/api/v3/auth/login-otp", { otpCode });
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
    setUserId(res.data.userId);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, loading, loginWithEmail, loginWithDocument, loginWithOtp, logout }}>
    <AuthContext.Provider value={{ userId, loading, loginWithEmail, loginWithDocument, loginWithOtp, logout }}></AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  );
};
