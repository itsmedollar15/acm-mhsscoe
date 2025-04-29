"use client";
import UserService from "@/services/user";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  useEffect(() => {
    UserService.getAuthStatus();
  }, []);

  return children;
};

export default AuthProvider;
