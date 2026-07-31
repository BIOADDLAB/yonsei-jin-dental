'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, ADMIN_ID, ADMIN_PASSWORD, getAdminAuthToken } from './auth';

const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8;

export const loginAdmin = async (formData: FormData) => {
    const id = String(formData.get('id') ?? '');
    const password = String(formData.get('password') ?? '');

    if (id !== ADMIN_ID || password !== ADMIN_PASSWORD) {
        redirect('/admin?error=1');
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, getAdminAuthToken(), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/admin',
        maxAge: ADMIN_COOKIE_MAX_AGE,
    });

    redirect('/admin');
};

export const logoutAdmin = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);

    redirect('/admin');
};
