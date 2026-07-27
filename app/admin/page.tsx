'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isFirebaseReady, login } from '@/lib/firebase';
import { useAdminUser } from '@/lib/notice';

export default function AdminLoginPage() {
    const router = useRouter();
    const { user, checking } = useAdminUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) router.replace('/admin/notice');
    }, [user, router]);

    const submit = async () => {
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            router.replace('/admin/notice');
        } catch {
            setError('이메일 또는 비밀번호를 확인해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    if (!isFirebaseReady) {
        return (
            <main className="flex min-h-screen items-center justify-center px-5">
                <p className="text-center text-small text-foreground/70">
                    lib/firebase.ts 의 firebaseConfig 를 먼저 채워 주세요.
                </p>
            </main>
        );
    }

    if (checking) {
        return (
            <main className="flex min-h-screen items-center justify-center px-5">
                <p className="text-small text-foreground/60">확인 중입니다.</p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-5">
            <div className="w-full max-w-[400px] rounded-3xl bg-white p-8">
                <h1 className="text-subheading font-extrabold text-primary">연세진치과 관리자</h1>
                <p className="mt-2 text-caption text-foreground/60">공지사항을 관리하려면 로그인해 주세요.</p>

                <div className="mt-6 space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="이메일"
                        className="w-full rounded-xl border border-hairline px-4 py-3 text-small outline-none focus:border-primary"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="비밀번호"
                        onKeyDown={(event) => event.key === 'Enter' && submit()}
                        className="w-full rounded-xl border border-hairline px-4 py-3 text-small outline-none focus:border-primary"
                    />
                </div>

                {error && <p className="mt-3 text-caption text-red-600">{error}</p>}

                <button
                    type="button"
                    onClick={submit}
                    disabled={loading}
                    className="mt-5 w-full rounded-xl bg-primary py-3 text-small font-bold text-white transition hover:bg-primary-dark disabled:opacity-50"
                >
                    {loading ? '로그인 중' : '로그인'}
                </button>
            </div>
        </main>
    );
}
