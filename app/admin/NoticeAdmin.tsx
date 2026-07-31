'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    createNotice,
    deleteNotice,
    reorderNotices,
    updateNotice,
    uploadNoticeImage,
    useNotices,
    type Notice,
    type NoticeInput,
} from '@/lib/notice';
import NoticeModal from '@/components/notice/NoticeModal';
import RichTextEditor from '@/components/admin/RichTextEditor';

const today = () => new Date().toISOString().slice(0, 10);
const EMPTY: NoticeInput = { title: '', date: today(), imageUrl: '', content: '' };
const TITLE_MAX = 40;

const FIELD =
    'box-border w-full min-w-0 max-w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-small font-medium text-basic outline-none transition-colors focus:border-primary';
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
    const [uploading, setUploading] = useState(false);
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
        setUploading(true);
        setMessage('');
        try {
            const imageUrl = await uploadNoticeImage(file);
            setForm((prev) => ({ ...prev, imageUrl }));
        } catch {
            setMessage('이미지 업로드에 실패했습니다.');
        } finally {
            setUploading(false);
            event.target.value = '';
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
        } catch (e) {
            setMessage(e instanceof Error ? e.message : '저장에 실패했습니다.');
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

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

    const onDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = notices.findIndex((n) => n.id === active.id);
        const newIndex = notices.findIndex((n) => n.id === over.id);
        if (oldIndex < 0 || newIndex < 0) return;

        const next = arrayMove(notices, oldIndex, newIndex);
        try {
            setBusy(true);
            await reorderNotices(next.map((n) => n.id));
            reload();
            setMessage('순서를 저장했습니다.');
        } catch {
            setMessage('순서 저장에 실패했습니다.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="mx-auto mt-5 w-full max-w-[1000px] px-4 pb-10 md:mt-8 md:px-8">
            {/* 등록 / 수정 */}
            <section className="relative min-w-0 overflow-hidden rounded-[24px] bg-white p-4 sm:rounded-[32px] sm:p-6 md:p-8">
                {busy && (
                    <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[32px] bg-white/80 backdrop-blur-[2px]"
                        aria-busy="true"
                        aria-label="저장 중"
                    >
                        <Spinner className="h-9 w-9 text-primary" />
                        <p className="text-caption font-bold text-primary">
                            {editingId ? '수정 저장 중…' : '등록 중…'}
                        </p>
                    </div>
                )}

                <h2 className="text-small font-black text-primary md:text-body">
                    {editingId ? '공지 수정' : '공지 등록'}
                </h2>

                <form onSubmit={submit} className="mt-6 grid min-w-0 gap-4">
                    <div className="grid min-w-0 gap-4 md:grid-cols-[1fr_200px]">
                        <label className="grid min-w-0 gap-2 text-caption font-bold text-primary">
                            <span className="flex items-center justify-between gap-2">
                                <span>
                                    제목 <span className="text-red-600">*</span>
                                </span>
                                <span
                                    className={`font-medium ${
                                        form.title.length >= TITLE_MAX ? 'text-red-600' : 'text-basic/40'
                                    }`}
                                >
                                    {form.title.length}/{TITLE_MAX}
                                </span>
                            </span>
                            <input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value.slice(0, TITLE_MAX) })}
                                maxLength={TITLE_MAX}
                                placeholder="공지 제목을 입력하세요"
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
                            대표 이미지 <span className="font-medium text-basic/50">(선택 · 1장)</span>
                        </span>
                        <div className="flex min-w-0 max-w-full flex-wrap items-center gap-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={pickImage}
                                disabled={uploading || busy}
                                className="max-w-full text-caption disabled:opacity-50"
                            />
                            {uploading && (
                                <span className="inline-flex items-center gap-2 text-caption font-medium text-primary">
                                    <Spinner className="h-4 w-4" />
                                    업로드 중…
                                </span>
                            )}
                            {form.imageUrl && !uploading && (
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

                    <div className="grid min-w-0 gap-2 text-caption font-bold text-primary">
                        <span>
                            내용 <span className="text-red-600">*</span>
                        </span>
                        <div className="min-w-0 max-w-full">
                            <RichTextEditor value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
                        </div>
                    </div>

                    {message && <p className="text-caption font-bold text-primary">{message}</p>}

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="submit"
                            disabled={busy || uploading}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-caption font-bold text-white transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                        >
                            {busy && <Spinner className="h-4 w-4 text-white" />}
                            {busy ? (editingId ? '저장 중…' : '등록 중…') : editingId ? '수정 저장' : '등록'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreview({ id: 'preview', order: 0, ...form })}
                            disabled={busy}
                            className={`${ACTION_BTN} px-6 py-2.5 text-basic/70 hover:border-primary hover:text-primary disabled:opacity-50`}
                        >
                            미리보기
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={reset}
                                disabled={busy}
                                className={`${ACTION_BTN} px-6 py-2.5 text-basic/70 hover:border-primary hover:text-primary disabled:opacity-50`}
                            >
                                취소
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="mt-4 min-w-0 overflow-hidden rounded-[24px] bg-neutral-100 p-4 sm:mt-6 sm:rounded-[32px] sm:p-6 md:p-8">
                <h2 className="text-small font-black text-primary md:text-body">
                    공지 목록 <span className="font-medium text-basic/50">({notices.length}/15)</span>
                </h2>
                <p className="mt-1 text-caption text-basic/60">
                    드래그해서 순서를 바꿀 수 있습니다. 위쪽이 홈페이지에서 먼저 보입니다.
                </p>

                <div className="mt-6">
                    {loading ? (
                        <AdminListSkeleton />
                    ) : notices.length === 0 ? (
                        <p className="py-8 text-center text-caption text-basic/50">등록된 공지가 없습니다.</p>
                    ) : (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                            <SortableContext items={notices.map((n) => n.id)} strategy={verticalListSortingStrategy}>
                                <ul className="space-y-2">
                                    {notices.map((notice, index) => (
                                        <SortableNoticeRow
                                            key={notice.id}
                                            notice={notice}
                                            index={index}
                                            busy={busy}
                                            onEdit={() => startEdit(notice)}
                                            onRemove={() => remove(notice)}
                                            onPreview={() => setPreview(notice)}
                                        />
                                    ))}
                                </ul>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </section>
            <NoticeModal notice={preview} onClose={() => setPreview(null)} />
        </div>
    );
}

function Spinner({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

function AdminListSkeleton() {
    return (
        <ul className="space-y-2" aria-busy="true" aria-label="공지 목록 불러오는 중">
            {Array.from({ length: 4 }).map((_, i) => (
                <li
                    key={i}
                    className="flex flex-col gap-2 rounded-2xl bg-white px-3 py-3 shadow-sm sm:flex-row sm:items-center sm:gap-3 sm:px-4"
                >
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                        <div className="skeleton h-5 w-4 rounded" />
                        <div className="skeleton h-4 w-6 rounded" />
                        <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="skeleton h-4 w-[55%] max-w-[240px]" />
                            <div className="skeleton h-3 w-20" />
                        </div>
                    </div>
                    <div className="flex gap-2 pl-8 sm:pl-0">
                        <div className="skeleton h-8 w-12 flex-1 rounded-full sm:flex-none" />
                        <div className="skeleton h-8 w-12 flex-1 rounded-full sm:flex-none" />
                    </div>
                </li>
            ))}
        </ul>
    );
}

function SortableNoticeRow({
    notice,
    index,
    busy,
    onEdit,
    onRemove,
    onPreview,
}: {
    notice: Notice;
    index: number;
    busy: boolean;
    onEdit: () => void;
    onRemove: () => void;
    onPreview: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: notice.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            className="flex flex-col gap-2 rounded-2xl bg-white px-3 py-3 shadow-sm sm:flex-row sm:items-center sm:gap-3 sm:px-4"
        >
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                <button
                    type="button"
                    className="cursor-grab touch-none px-1 text-basic/40 active:cursor-grabbing"
                    aria-label="순서 변경"
                    {...attributes}
                    {...listeners}
                >
                    ⋮⋮
                </button>

                <span className="w-6 shrink-0 text-caption text-basic/40">{String(index + 1).padStart(2, '0')}</span>

                <button type="button" onClick={onPreview} className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-small font-bold text-primary">{notice.title}</span>
                    <span className="text-caption text-basic/50">{notice.date}</span>
                </button>
            </div>

            <div className="flex shrink-0 gap-2 pl-8 sm:pl-0">
                <button
                    type="button"
                    onClick={onEdit}
                    disabled={busy}
                    className="flex-1 rounded-full border border-neutral-300 px-3 py-1.5 text-caption font-bold text-basic/70 hover:border-primary hover:text-primary sm:flex-none"
                >
                    수정
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    disabled={busy}
                    className="flex-1 rounded-full border border-neutral-300 px-3 py-1.5 text-caption font-bold text-red-600 hover:border-red-600 sm:flex-none"
                >
                    삭제
                </button>
            </div>
        </li>
    );
}
