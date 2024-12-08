"use client";
import { createContext, useContext } from "react";
import { UserResponse } from "../schema/auth/response";
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { LoginRequestBody } from "../schema/auth/request";

type AuthUserContextType = {
    currentUser: UserResponse | null;
    isLoginLoading: boolean;
    onLogin: (loginRequestBody: LoginRequestBody) => void;
    onLogout: () => void;
    error: string | null;
};

const AuthUserContext = createContext<AuthUserContextType | null>(null);

export const useAuthUserContext = () => {
    const context = useContext(AuthUserContext);
    if (!context) {
        throw new Error('useAuthUserContext must be used within a AuthUserProvider');
    }

    return context;
}

export const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
   const { isLoading, error, user, onLogin, onLogout } = useAuthUser();

    return (
        <AuthUserContext.Provider value={{ currentUser: user, isLoginLoading: isLoading, onLogin, onLogout, error }}>
            {children}
        </AuthUserContext.Provider>
    )
}
