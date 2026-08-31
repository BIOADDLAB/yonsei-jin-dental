'use client';

// 학술활동 관리 — 학술·연구 섹션의 4개 버튼에 연결되는 글을 카테고리별로 한 건씩 작성한다.
// 카테고리는 data/site.ts 의 ACADEMIC_CATEGORIES 가 원본이라 여기서는 추가·삭제하지 않는다.

import { useState } from 'react';
import { ACADEMIC_CATEGORIES } from '@/data/site';
import { saveAcademic, uploadAcademicImage, useAcademics, type Academic, type AcademicInput } from '@/lib/academic';
import NoticeModal from '@/components/notice/NoticeModal';
import RichTextEditor from '@/components/admin/RichTextEditor';

const today = () => new Date().toISOString().slice(0, 10);
const TITLE_MAX = 40;

const FIELD =
    'box-border w-full min-w-0 max-w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-small font-medium text-basic outline-none transition-colors focus:border-primary';

const isEmptyHtml = (html: string) => !html.replace(/<[^>]*>/g, '').trim();

export default function AcademicAdmin() {
    const { academics, loading, reload } = useAcademics();
    const [active, setActive] = useState(ACADEMIC_CATEGORIES[0].id);

    const category = ACADEMIC_CATEGORIES.find((item) => item.id === active) ?? ACADEMIC_CATEGORIES[0];

    return (
        <div className="mx-auto mt-5 w-full max-w-[1000px] px-4 pb-10 md:mt-8 md:px-8">
            <section className="min-w-0 overflow-hidden rounded-[24px] bg-white p-4 sm:rounded-[32px] sm:p-6 md:p-8">
                <h2 className="text-small font-black text-primary md:text-body">학술활동 관리</h2>
                <p className="mt-1 text-caption leading-[1.7] text-basic/60">
                    학술·연구 섹션의 버튼과 공지사항 섹션의 바로가기 버튼에서 열리는 글입니다. 카테고리마다 한 건씩
                    저장됩니다.
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                    {ACADEMIC_CATEGORIES.map((item) => (
                        <li key={item.id}>
                            <button
                                type="button"
                                onClick={() => setActive(item.id)}
                                className={`rounded-full px-4 py-2 text-caption font-bold transition ${
                                    active === item.id
                                        ? 'bg-primary text-white'
                                        : 'border border-neutral-300 bg-white text-basic/70 hover:border-primary hover:text-primary'
                                }`}
                            >
                                {item.label}
                                {!loading && !academics[item.id] && ' (미작성)'}
                            </button>
                        </li>
                    ))}
                </ul>

                {loading ? (
                    <p className="mt-6 text-caption text-basic/50">불러오는 중…</p>
                ) : (
                    /* key 로 카테고리를 갈아끼워 폼 상태를 초기화한다 */
                    <AcademicForm
                        key={active}
                        id={active}
                        label={category.label}
                        saved={academics[active]}
                        onSaved={reload}
                    />
                )}
            </section>
        </div>
    );
}

function AcademicForm({
    id,
    label,
    saved,
    onSaved,
}: {
    id: string;
    label: string;
    saved?: Academic;
    onSaved: () => void;
}) {
    const [form, setForm] = useState<AcademicInput>({
        title: saved?.title ?? label,
        date: saved?.date ?? today(),
        imageUrl: saved?.imageUrl ?? '',
        content: saved?.content ?? '',
    });
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState(false);

    const submit = async () => {
        if (!form.title.trim() || isEmptyHtml(form.content)) {
            setMessage('제목과 내용은 필수입니다.');
            return;
        }
        setBusy(true);
        setMessage('');
        try {
            await saveAcademic(id, form);
            onSaved();
            setMessage('저장했습니다.');
        } catch {
            setMessage('저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="mt-6 grid min-w-0 gap-4">
            <div className="grid min-w-0 gap-4 md:grid-cols-[1fr_200px]">
                <label className="grid min-w-0 gap-2 text-caption font-bold text-primary">
                    <span className="flex items-center justify-between gap-2">
                        <span>
                            제목 <span className="text-red-600">*</span>
                        </span>
                        <span className="font-medium text-basic/40">
                            {form.title.length}/{TITLE_MAX}
                        </span>
                    </span>
                    <input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value.slice(0, TITLE_MAX) })}
                        maxLength={TITLE_MAX}
                        placeholder="예: 원내 학술활동 소개"
                        className={FIELD}
                    />
                </label>
                <label className="grid min-w-0 gap-2 text-caption font-bold text-primary">
                    작성일
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className={FIELD}
                    />
                </label>
            </div>

            <div className="grid min-w-0 gap-2 text-caption font-bold text-primary">
                <span>
                    내용 <span className="text-red-600">*</span>
                </span>
                <div className="min-w-0 max-w-full">
                    <RichTextEditor
                        value={form.content}
                        onChange={(v) => setForm({ ...form, content: v })}
                        onUploadImage={uploadAcademicImage}
                    />
                </div>
            </div>

            {message && <p className="text-caption font-bold text-primary">{message}</p>}

            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={submit}
                    disabled={busy}
                    className="rounded-full bg-primary px-6 py-2.5 text-caption font-bold text-white transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                >
                    {busy ? '저장 중…' : '저장'}
                </button>
                <button
                    type="button"
                    onClick={() => setPreview(true)}
                    disabled={busy}
                    className="shrink-0 rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-caption font-bold text-basic/70 transition hover:border-primary hover:text-primary disabled:opacity-50"
                >
                    미리보기
                </button>
            </div>

            <NoticeModal notice={preview ? { id, ...form } : null} onClose={() => setPreview(false)} />
        </div>
    );
}
