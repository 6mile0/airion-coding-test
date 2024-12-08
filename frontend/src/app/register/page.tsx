"use client";
import React from 'react';
import { useForm } from "react-hook-form";
import { RegisterRequestBody } from '../schema/auth/request';
import { useAuthUserContext } from '../providers/AuthUserProvider';

export default function Register() {
    const { onRegister } = useAuthUserContext();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequestBody>();

    const onSubmit = (data: RegisterRequestBody) => {
        onRegister(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">新規登録</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">ユーザー名</label>
                        <input
                            type="text"
                            {...register('username', { required: 'ユーザー名を入力してください' })}

                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                        <input
                            type="email"
                            {...register('email', { required: 'メールアドレスを入力してください' })}
                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">パスワード</label>
                        <input
                            type="password"
                            {...register('password', { required: 'パスワードを入力してください' })}
                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        登録
                    </button>
                </form>
            </div>
        </div>
    );
};
