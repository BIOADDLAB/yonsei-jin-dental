'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { isFirebaseReady, logout } from '@/lib/firebase';
import { createNotice, removeNotice, updateNotice, uploadNoticeImage, useAdminUser, useNotices } from '@/lib/notice';

const EMPTY = { title: '', date: '', imageUrl: '' };

export default function AdminNoticePage() {
    const router = useRouter();
    const { user, checking } = useAdminUser();
    const { notices, loading, reload } = useNotices();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(EMPTY);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (!checking && !user) router.replace('/admin');
    }, [checking, user, router]);

    const reset = () => {
        setEditingId(null);
        setForm(EMPTY);
    };

    const save = async () => {
        if (!form.title || !form.date) return;
        setBusy(true);
        try {
            if (editingId) await updateNotice(editingId, form);
            else await createNotice(form);
            reset();
            reload();
        } finally {
            setBusy(false);
        }
    };

    const remove = async (id: string) => {
        if (!window.confirm('삭제하시겠습니까?')) return;
        setBusy(true);
        try {
            await removeNotice(id);
            reload();
        } finally {
            setBusy(false);
        }
    };

    const upload = async (file: File) => {
        setBusy(true);
        try {
            const imageUrl = await uploadNoticeImage(file);
            setForm((prev) => ({ ...prev, imageUrl }));
        } finally {
            setBusy(false);
        }
    };

    if (!isFirebaseReady || checking || !user) {
        return (
            <main className="flex min-h-screen items-center justify-center px-5">
                <p className="text-small text-basic/60">확인 중입니다.</p>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-site px-5 py-10 md:px-8">
            <header className="flex items-center justify-between gap-4">
                <h1 className="text-subheading font-extrabold text-primary">공지사항 관리</h1>
                <div className="flex gap-2">
                    <Link href="/" className="rounded-xl border border-neutral-200 px-4 py-2 text-caption text-basic">
                        사이트 보기
                    </Link>
                    <button
                        type="button"
                        onClick={() => logout().then(() => router.replace('/admin'))}
                        className="rounded-xl bg-primary px-4 py-2 text-caption text-white"
                    >
                        로그아웃
                    </button>
                </div>
            </header>

            <section className="mt-8 rounded-3xl bg-white p-6 md:p-8">
                <h2 className="text-body font-extrabold text-primary">{editingId ? '공지 수정' : '공지 등록'}</h2>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_200px]">
                    <input
                        value={form.title}
                        onChange={(event) => setForm({ ...form, title: event.target.value })}
                        placeholder="제목"
                        className="rounded-xl border border-neutral-200 px-4 py-3 text-small outline-none focus:border-primary"
                    />
                    <input
                        type="date"
                        value={form.date}
                        onChange={(event) => setForm({ ...form, date: event.target.value })}
                        className="rounded-xl border border-neutral-200 px-4 py-3 text-small outline-none focus:border-primary"
                    />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) void upload(file);
                        }}
                        className="text-caption"
                    />
                    {form.imageUrl && (
                        <Image
                            src={form.imageUrl}
                            alt="등록한 공지 상세 이미지 미리보기"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                        />
                    )}
                </div>

                <div className="mt-5 flex gap-2">
                    <button
                        type="button"
                        onClick={save}
                        disabled={busy}
                        className="rounded-xl bg-primary px-5 py-2.5 text-caption font-bold text-white disabled:opacity-50"
                    >
                        {editingId ? '수정 저장' : '등록'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={reset}
                            className="rounded-xl border border-neutral-200 px-5 py-2.5 text-caption"
                        >
                            취소
                        </button>
                    )}
                </div>
            </section>

            <section className="mt-6 rounded-3xl bg-white p-6 md:p-8">
                <h2 className="text-body font-extrabold text-primary">공지 목록</h2>

                {loading ? (
                    <p className="py-8 text-center text-caption text-basic/60">불러오는 중입니다.</p>
                ) : notices.length === 0 ? (
                    <p className="py-8 text-center text-caption text-basic/60">등록된 공지사항이 없습니다.</p>
                ) : (
                    <ul className="mt-4 divide-y divide-neutral-200">
                        {notices.map((notice, index) => (
                            <li key={notice.id} className="flex items-center gap-4 py-3">
                                <span className="w-8 shrink-0 text-caption text-basic/50">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="w-28 shrink-0 text-caption text-basic/60">{notice.date}</span>
                                <span className="flex-1 truncate text-small font-bold text-primary">
                                    {notice.title}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(notice.id);
                                        setForm({ title: notice.title, date: notice.date, imageUrl: notice.imageUrl });
                                    }}
                                    className="rounded-lg border border-neutral-200 px-3 py-1.5 text-caption"
                                >
                                    수정
                                </button>
                                <button
                                    type="button"
                                    onClick={() => remove(notice.id)}
                                    className="rounded-lg border border-neutral-200 px-3 py-1.5 text-caption text-red-600"
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
