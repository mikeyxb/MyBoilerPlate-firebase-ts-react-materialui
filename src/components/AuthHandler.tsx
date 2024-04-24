import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { Context } from "../context/AuthContext";

export function Protected({ children }: { children: ReactNode }) {
    const { user } = useContext(Context) as { user: unknown }; // Add type assertion here

    if (!user) {
        return <Navigate to="/signin" replace/>;
    } else {
        return children;
    }
}