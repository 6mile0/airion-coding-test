"use client";
import { createContext, useContext } from "react";
import { UserResponse } from "../schema/auth/response";
import { useAuthUser } from "../hooks/auth/useAuthUser";
import { LoginRequestBody } from "../schema/auth/request";

type AuthUserContextType = {
    currentUser: UserResponse | null;
    isLoginLoading: boolean;
    setIsLoginLoading: (value: boolean) => void;
    onLogin: (loginRequestBody: LoginRequestBody) => void;
    onLogout: () => void;
    onRegister: (registerRequestBody: LoginRequestBody) => void;
    isLogout: boolean;
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
   const { isLoading, setIsLoading, error, user, onLogin, onLogout, onRegister, isLogout } = useAuthUser();

    return (
        <AuthUserContext.Provider value={{ currentUser: user, isLoginLoading: isLoading, onLogin, onLogout, error, onRegister, setIsLoginLoading: setIsLoading, isLogout }}>
            {children}
        </AuthUserContext.Provider>
    )
}
