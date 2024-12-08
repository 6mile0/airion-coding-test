import { UserResponse } from "@/app/schema/auth/response";
import { LoginRequestBody } from "../../schema/auth/request";

export const login = async (loginRequestBody: LoginRequestBody) : Promise<UserResponse> => {
    const response = await fetch(`http://localhost:8000/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginRequestBody),
    });
    return response.json()
}

export const getCurrentUser = async () : Promise<UserResponse | null> => {
    const response = await fetch(`http://localhost:8000/api/v1/auth/me`, {
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
    await fetch(`http://localhost:8000/api/v1/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
}
