"use client";

import { useForm } from "react-hook-form";
import { LoginRequestBody } from "../schema/auth/request";
import { useAuthUserContext } from "../providers/AuthUserProvider";

export default function Login() {
    const { onLogin } = useAuthUserContext();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequestBody>();

    const onSubmit = (data: LoginRequestBody) => {
        onLogin(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">ログイン</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "メールアドレスを入力してください" })}
                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { required: "パスワードを入力してください" })}
                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
                        ログイン
                    </button>
                </form>

                <div className="text-sm text-center">
                    <a href="#" className="text-blue-600 hover:underline">パスワードを忘れた場合</a>
                </div>


                <div className="text-sm text-center">
                    <p>アカウントをお持ちでない場合</p>
                    <a href="#" className="text-blue-600 hover:underline">新規登録</a>
                </div>
            </div>
        </div>
    );
}
