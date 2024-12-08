"use client";
import { LoginRequestBody } from "@/app/schema/auth/request";
import { getCurrentUser, login, logout, register } from "../../api/auth";
import { UserResponse } from "../../schema/auth/response";
import { useEffect, useState } from "react";
import { successToast } from "../../utils/successToast";
import { errorToast } from "../../utils/errorToast";
import { redirect, useRouter } from "next/navigation";

export const useAuthUser = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserResponse | null>(null);
    const router = useRouter();

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
            router.push('/');
        }).catch((error) => {
            errorToast(error.message);
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const onLogout = async () => {
        setIsLoading(true);
        setError(null);

        logout().then(() => {
            setUser(null);
            successToast('ログアウトしました');
        }).catch((error) => {
            errorToast('ログアウトに失敗しました');
            setError(error);
        }).finally(() => {
            setIsLoading(false);
            redirect('/login');
        });
    }

    const onRegister = async (loginRequestBody: LoginRequestBody) => {
        setIsLoading(true);
        setError(null);

        register(loginRequestBody).then(() => {
            successToast('ユーザー登録しました')
            router.push('/login');
        }).catch((error) => {
            errorToast(error.message);
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    
    return { isLoading, error, user, onLogin, onLogout, onRegister};
}
