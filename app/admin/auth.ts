import { createHash } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'yonseijin_admin_auth';

/** 관리자 계정. 운영 전환 시 이 두 값만 교체한다 */
export const ADMIN_ID = 'admin';
export const ADMIN_PASSWORD = 'ysjin1234!@';

export const getAdminAuthToken = () => {
    return createHash('sha256').update(`${ADMIN_ID}:${ADMIN_PASSWORD}`).digest('hex');
};

export const isAdminAuthenticated = async () => {
    const cookieStore = await cookies();
    return cookieStore.get(ADMIN_COOKIE_NAME)?.value === getAdminAuthToken();
};
