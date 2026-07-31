'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import { createNotice, deleteNotice, updateNotice, useNotices, type Notice, type NoticeInput } from '@/lib/notice';
import NoticeList from '@/components/notice/NoticeList';
import NoticeModal from '@/components/notice/NoticeModal';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { uploadNoticeImage } from '@/lib/notice';

const today = () => new Date().toISOString().slice(0, 10);
const EMPTY: NoticeInput = { title: '', date: today(), imageUrl: '', content: '' };

const FIELD =
    'w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-small font-medium text-basic outline-none transition-colors focus:border-primary';
const ACTION_BTN =
    'shrink-0 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-caption font-bold transition md:px-4';

/** 태그를 벗겨 내용이 실제로 비었는지 본다 */
const isEmptyHtml = (html: string) => !html.replace(/<[^>]*>/g, '').trim();

export default function NoticeAdmin() {
    const { notices, loading, reload } = useNotices();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<NoticeInput>(EMPTY);
    const [preview, setPreview] = useState<Notice | null>(null);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState('');

    const reset = () => {
        setEditingId(null);
        setForm(EMPTY);
    };

    const startEdit = (notice: Notice) => {
        setEditingId(notice.id);
        setForm({
            title: notice.title,
            date: notice.date,
            imageUrl: notice.imageUrl,
            content: notice.content,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const pickImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const imageUrl = await uploadNoticeImage(file);
            setForm((prev) => ({ ...prev, imageUrl }));
        } catch {
            setMessage('이미지 업로드에 실패했습니다.');
        }
    };
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!form.title.trim() || isEmptyHtml(form.content)) {
            setMessage('제목과 내용은 필수입니다.');
            return;
        }

        setBusy(true);
        setMessage('');
        try {
            if (editingId) await updateNotice(editingId, form);
            else await createNotice(form);
            reset();
            reload();
            setMessage(editingId ? '수정했습니다.' : '등록했습니다.');
        } finally {
            setBusy(false);
        }
    };

    const remove = async (notice: Notice) => {
        if (!window.confirm(`"${notice.title}" 공지를 삭제하시겠습니까?`)) return;
        setBusy(true);
        try {
            await deleteNotice(notice.id);
            if (editingId === notice.id) reset();
            reload();
            setMessage('삭제했습니다.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="mx-auto mt-8 w-full max-w-[1000px] px-5 md:px-8">
            {/* 등록 / 수정 */}
            <section className="rounded-[32px] bg-white p-6 md:p-8">
                <h2 className="text-small font-black text-primary md:text-body">
                    {editingId ? '공지 수정' : '공지 등록'}
                </h2>

                <form onSubmit={submit} className="mt-6 grid gap-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                        <label className="grid gap-2 text-caption font-bold text-primary">
                            제목 <span className="text-red-600">*</span>
                            <input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="공지 제목을 입력하세요"
                                className={FIELD}
                            />
                        </label>
                        <label className="grid gap-2 text-caption font-bold text-primary">
                            작성일
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                className={FIELD}
                            />
                        </label>
                    </div>

                    <div className="grid gap-2 text-caption font-bold text-primary">
                        대표 이미지 <span className="font-medium text-basic/50">(선택 · 1장)</span>
                        <div className="flex flex-wrap items-center gap-4">
                            <input type="file" accept="image/*" onChange={pickImage} className="text-caption" />
                            {form.imageUrl && (
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={form.imageUrl}
                                        alt="대표 이미지 미리보기"
                                        width={72}
                                        height={72}
                                        unoptimized
                                        className="h-[72px] w-[72px] rounded-xl object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, imageUrl: '' })}
                                        className={`${ACTION_BTN} text-basic/70 hover:border-primary hover:text-primary`}
                                    >
                                        이미지 삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-2 text-caption font-bold text-primary">
                        내용 <span className="text-red-600">*</span>
                        <RichTextEditor value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
                    </div>

                    {message && <p className="text-caption font-bold text-primary">{message}</p>}

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="submit"
                            disabled={busy}
                            className="rounded-full bg-primary px-6 py-2.5 text-caption font-bold text-white transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                        >
                            {editingId ? '수정 저장' : '등록'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreview({ id: 'preview', ...form })}
                            className={`${ACTION_BTN} px-6 py-2.5 text-basic/70 hover:border-primary hover:text-primary`}
                        >
                            미리보기
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={reset}
                                className={`${ACTION_BTN} px-6 py-2.5 text-basic/70 hover:border-primary hover:text-primary`}
                            >
                                취소
                            </button>
                        )}
                    </div>
                </form>
            </section>

            {/* 목록. 홈페이지와 같은 디자인이라 원장님이 결과를 바로 알아본다 */}
            <section className="mt-6 rounded-[32px] bg-neutral-100 p-6 md:p-8">
                <h2 className="text-small font-black text-primary md:text-body">
                    공지 목록 <span className="font-medium text-basic/50">({notices.length})</span>
                </h2>
                <p className="mt-1 text-caption text-basic/60">공지를 누르면 홈페이지에 보이는 모달 그대로 열립니다.</p>

                <div className="mt-6">
                    <NoticeList
                        notices={notices}
                        loading={loading}
                        onSelect={setPreview}
                        animate={false}
                        renderActions={(notice) => (
                            <>
                                <button
                                    type="button"
                                    onClick={() => startEdit(notice)}
                                    className={`${ACTION_BTN} text-basic/70 hover:border-primary hover:text-primary`}
                                >
                                    수정
                                </button>
                                <button
                                    type="button"
                                    onClick={() => remove(notice)}
                                    className={`${ACTION_BTN} text-red-600 hover:border-red-600`}
                                >
                                    삭제
                                </button>
                            </>
                        )}
                    />
                </div>
            </section>

            <NoticeModal notice={preview} onClose={() => setPreview(null)} />
        </div>
    );
}
