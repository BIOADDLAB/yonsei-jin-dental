import { loginAdmin, logoutAdmin } from './actions';
import { isAdminAuthenticated } from './auth';
import AdminPanel from './AdminPanel';

type Props = {
    searchParams?: Promise<{ error?: string }>;
};

export default async function AdminPage({ searchParams }: Props) {
    const authenticated = await isAdminAuthenticated();
    const params = await searchParams;

    if (!authenticated) {
        return (
            <main className="grid min-h-screen place-items-center bg-neutral-100 px-5 py-16">
                <div className="w-full max-w-[420px] rounded-[32px] bg-white p-8 md:p-10">
                    <p className="text-small font-medium text-primary">Yonsei JIN Admin</p>
                    <h1 className="mt-2 text-subheading font-black text-primary">관리자 로그인</h1>
                    <p className="mt-3 text-small text-basic/70">
                        공지사항을 관리하려면 아이디와 비밀번호를 입력해 주세요.
                    </p>

                    <form action={loginAdmin} className="mt-8 grid gap-3">
                        <label className="grid gap-2 text-caption font-bold text-primary">
                            아이디
                            <input
                                type="text"
                                name="id"
                                autoComplete="username"
                                placeholder="아이디 입력"
                                className="rounded-2xl border border-neutral-300 px-4 py-3 text-small font-medium text-basic outline-none transition-colors focus:border-primary"
                            />
                        </label>

                        <label className="grid gap-2 text-caption font-bold text-primary">
                            비밀번호
                            <input
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                placeholder="비밀번호 입력"
                                className="rounded-2xl border border-neutral-300 px-4 py-3 text-small font-medium text-basic outline-none transition-colors focus:border-primary"
                            />
                        </label>

                        {params?.error === '1' && (
                            <p className="rounded-2xl bg-red-50 px-4 py-3 text-caption font-bold text-red-600">
                                아이디 또는 비밀번호가 올바르지 않습니다.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="mt-2 rounded-full bg-primary px-6 py-3 text-small font-bold text-white transition hover:bg-primary/90 active:scale-[0.98]"
                        >
                            로그인
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-100 py-6 md:py-10">
            <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <div className="min-w-0">
                    <p className="text-caption font-medium text-primary md:text-small">Yonsei JIN Admin</p>
                    <h1 className="mt-1 text-body font-black text-primary md:text-subheading">홈페이지 관리</h1>
                </div>
                <form action={logoutAdmin} className="shrink-0 self-start sm:self-auto">
                    <button
                        type="submit"
                        className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-caption font-bold text-basic/70 transition hover:border-primary hover:text-primary md:px-5"
                    >
                        로그아웃
                    </button>
                </form>
            </div>

            <AdminPanel />
        </main>
    );
}
