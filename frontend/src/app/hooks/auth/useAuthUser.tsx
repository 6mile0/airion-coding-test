"use client";
import { LoginRequestBody } from "@/app/schema/auth/request";
import { getCurrentUser, login, logout, register } from "../../api/auth";
import { UserResponse } from "../../schema/auth/response";
import { useEffect, useState } from "react";
import { successToast } from "../../utils/successToast";
import { errorToast } from "../../utils/errorToast";
import { redirect } from "next/navigation";

export const useAuthUser = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLogout, setIsLogout] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        getCurrentUser().then((data) => {
            setUser(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const onLogin = async (loginRequestBody: LoginRequestBody) => {
        setIsLoading(true);
        setError(null);

        login(loginRequestBody).then((data) => {
            setUser(data);
            successToast('ログインしました')
        }).catch((error) => {
            errorToast(error.message);
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
        redirect('/');
    };

    const onLogout = async () => {
        setIsLoading(true);
        setError(null);

        logout().then(() => {
            setUser(null);
            setIsLogout(true);
            successToast('ログアウトしました');
        }).catch((error) => {
            errorToast('ログアウトに失敗しました');
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const onRegister = async (loginRequestBody: LoginRequestBody) => {
        setIsLoading(true);
        setError(null);

        register(loginRequestBody).then(() => {
            successToast('ユーザー登録しました')
            redirect('/login');
        }).catch((error) => {
            errorToast(error.message);
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    
    return { isLoading, isLogout, setIsLoading, error, user, onLogin, onLogout, onRegister};
}
