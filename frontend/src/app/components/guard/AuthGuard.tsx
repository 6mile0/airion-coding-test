"use client";
import { redirect } from 'next/navigation';
import { useAuthUserContext } from '../../providers/AuthUserProvider';
import React from 'react';
import { LoadingPage } from '../LoadingPage';


export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { currentUser, isLoginLoading } = useAuthUserContext();
    
    if (isLoginLoading) {
        return <LoadingPage />;
    }

    if (!currentUser) {
        redirect('/login');
    }

    return <>{children}</>;
}
