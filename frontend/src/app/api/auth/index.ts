import { CreatedUserResponse, UserResponse } from "@/app/schema/auth/response";
import { LoginRequestBody } from "../../schema/auth/request";

if(process.env.NEXT_PUBLIC_API_BASE_URL === undefined) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

export const login = async (loginRequestBody: LoginRequestBody) : Promise<UserResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginRequestBody),
    });

    const data = await response.json()

    if(response.status === 401) {
        throw new Error("メールアドレスまたはパスワードが間違っています")
    }

    return data
}

export const getCurrentUser = async () : Promise<UserResponse | null> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/me`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if(response.status === 401) {
        return null;
    }

    return response.json()
}

export const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
}

export const register = async (loginRequestBody: LoginRequestBody) : Promise<CreatedUserResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginRequestBody),
    });

    if(response.status === 400) {
        throw new Error("そのメールアドレスは既に登録されています")
    }

    return response.json()
}
