"use client";
import UserService from "@/services/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startAuthLoadingState } from "@/redux/reducers/authReducer";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAuthLoadingState());
    UserService.getAuthStatus();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
