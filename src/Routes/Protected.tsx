import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { Context } from "../context/AuthContext";

interface ProtectedProps {
  children: ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Protected must be used within a Provider");
  }

  const { user } = context;

  if (!user) {
    return <Navigate to="/signin" replace />;
  } else {
    return <>{children}</>;
  }
};