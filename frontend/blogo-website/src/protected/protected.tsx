import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";

type ProtectedComponentProp = {
  children: ReactNode;
};

const ProtectedComponent = ({ children }: ProtectedComponentProp) => {
  const isAuthenticated = !!localStorage.getItem('userData');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedComponent;
