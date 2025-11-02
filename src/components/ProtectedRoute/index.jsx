import React from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const { userInfo, role } = useContext(AuthContext);
  if (!userInfo) {
    toast.error("Vui lòng đăng nhập");
    return <Navigate to="/login" />;
  }
  if (role !== requiredRole) {
    toast.error("Bạn không có quyền truy cập");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
