'use client';

// 메인 팝업 관리 — 노출 on/off + 탭 최대 5개(이미지·이름·링크)
//  · 이미지가 없는 탭은 저장할 때 자동으로 빠진다
//  · 이미지를 교체하거나 탭을 지우면 Storage 의 이전 파일도 저장 성공 후 같이 지운다

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SECTION_ANCHORS } from '@/data/site';
import {
    deletePopupImage,
    getPopupSetting,
    savePopupSetting,
    uploadPopupImage,
    POPUP_IMAGE_HEIGHT,
    POPUP_IMAGE_WIDTH,
    POPUP_MAX_TABS,
    type PopupTab,
} from '@/lib/popup';

const FIELD =
    'box-border w-full min-w-0 max-w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-small font-medium text-basic outline-none transition-colors focus:border-primary';

const emptyTab = (): PopupTab => ({ label: '', imageUrl: '', linkUrl: '' });

export default function PopupAdmin() {
    const [enabled, setEnabled] = useState(false);
    const [tabs, setTabs] = useState<PopupTab[]>([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [uploading, setUploading] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    // 저장 전에 공개 중인 원본 이미지를 지우면 실패 시 팝업이 깨진다. 저장 성공 뒤에 정리한다
    const pendingDeleteUrls = useRef(new Set<string>());

    useEffect(() => {
        let alive = true;
        getPopupSetting().then((setting) => {
            if (!alive) return;
            setEnabled(setting?.enabled ?? false);
            setTabs(setting?.tabs?.length ? setting.tabs : [emptyTab()]);
            setLoading(false);
        });
        return () => {
            alive = false;
        };
    }, []);

    const setTab = (index: number, patch: Partial<PopupTab>) =>
        setTabs((prev) => prev.map((tab, i) => (i === index ? { ...tab, ...patch } : tab)));

    const addTab = () => setTabs((prev) => (prev.length >= POPUP_MAX_TABS ? prev : [...prev, emptyTab()]));

    const removeTab = (index: number) => {
        if (!window.confirm('이 탭을 지울까요?')) return;
        const target = tabs[index];
        if (target.imageUrl) pendingDeleteUrls.current.add(target.imageUrl);
        setTabs((prev) => prev.filter((_, i) => i !== index));
    };

    const pickImage = async (index: number, file: File | undefined) => {
        if (!file) return;
        setUploading(index);
        setMessage('');
        try {
            const previous = tabs[index].imageUrl;
            const url = await uploadPopupImage(file);
            setTab(index, { imageUrl: url });
            if (previous && previous !== url) pendingDeleteUrls.current.add(previous);
        } catch {
            setMessage('이미지 업로드에 실패했습니다.');
        } finally {
            setUploading(null);
        }
    };

    const submit = async () => {
        const usable = tabs.filter((tab) => tab.imageUrl);
        if (enabled && usable.length === 0) {
            setMessage('팝업을 켜려면 이미지가 있는 탭이 최소 1개 필요합니다.');
            return;
        }

        setBusy(true);
        setMessage('');
        try {
            await savePopupSetting({ enabled, tabs: usable });
            const activeUrls = new Set(usable.map((tab) => tab.imageUrl));
            const cleanupUrls = [...pendingDeleteUrls.current].filter((url) => !activeUrls.has(url));
            await Promise.allSettled(cleanupUrls.map((url) => deletePopupImage(url)));
            pendingDeleteUrls.current.clear();
            setTabs(usable.length ? usable : [emptyTab()]);
            setMessage('저장했습니다.');
        } catch {
            setMessage('저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="mx-auto mt-5 w-full max-w-[1000px] px-4 pb-10 md:mt-8 md:px-8">
            <section className="min-w-0 overflow-hidden rounded-[24px] bg-white p-4 sm:rounded-[32px] sm:p-6 md:p-8">
                <h2 className="text-small font-black text-primary md:text-body">팝업 관리</h2>
                <p className="mt-1 text-caption leading-[1.7] text-basic/60">
                    메인 화면에 처음 들어올 때 뜨는 팝업입니다. 탭은 최대 {POPUP_MAX_TABS}개까지 등록할 수 있고, 이미지가
                    없는 탭은 저장할 때 자동으로 빠집니다. 탭이 둘 이상이면 5초마다 자동으로 넘어갑니다.
                    <br />
                    이미지는{' '}
                    <b>
                        {POPUP_IMAGE_WIDTH}×{POPUP_IMAGE_HEIGHT}px (4:5)
                    </b>{' '}
                    를 권장합니다. 다른 비율도 잘리지 않고 통째로 보입니다.
                </p>

                {loading ? (
                    <p className="mt-6 text-caption text-basic/50">불러오는 중…</p>
                ) : (
                    <>
                        <label className="mt-6 flex w-fit items-center gap-2.5 rounded-2xl border border-neutral-300 bg-white px-4 py-3">
                            <input
                                type="checkbox"
                                checked={enabled}
                                onChange={(e) => setEnabled(e.target.checked)}
                                className="h-4 w-4 accent-[#061a42]"
                            />
                            <span className="text-small font-bold text-primary">팝업 노출하기</span>
                        </label>

                        <div className="mt-6 flex flex-col gap-4">
                            {tabs.map((tab, i) => (
                                <div key={i} className="overflow-hidden rounded-2xl border border-neutral-200">
                                    <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3 md:px-6">
                                        <span className="text-caption font-bold text-primary">탭 {i + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeTab(i)}
                                            className="text-caption font-bold text-red-600"
                                        >
                                            삭제
                                        </button>
                                    </div>

                                    <div className="grid gap-5 p-4 md:p-6">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                                            <div className="flex aspect-[4/5] w-[112px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-300 bg-neutral-50">
                                                {tab.imageUrl ? (
                                                    <Image
                                                        src={tab.imageUrl}
                                                        alt=""
                                                        width={POPUP_IMAGE_WIDTH}
                                                        height={POPUP_IMAGE_HEIGHT}
                                                        unoptimized
                                                        className="h-full w-full object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-caption text-basic/40">이미지 없음</span>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <span className="text-caption font-bold text-primary">팝업 이미지</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    disabled={uploading === i || busy}
                                                    onChange={(e) => pickImage(i, e.target.files?.[0])}
                                                    className="mt-2 block max-w-full text-caption disabled:opacity-50"
                                                />
                                                <p className="mt-2 text-caption text-basic/50">
                                                    {uploading === i
                                                        ? '업로드 중…'
                                                        : `${POPUP_IMAGE_WIDTH}×${POPUP_IMAGE_HEIGHT}px (4:5) 이미지를 올려주세요.`}
                                                </p>
                                            </div>
                                        </div>

                                        <label className="grid gap-2 text-caption font-bold text-primary">
                                            탭 이름 (오른쪽 목록 글자)
                                            <textarea
                                                value={tab.label}
                                                onChange={(e) => setTab(i, { label: e.target.value })}
                                                placeholder={'예: 8월\n휴진 안내'}
                                                rows={3}
                                                className={`${FIELD} min-h-[4.75rem] resize-y`}
                                            />
                                            <span className="font-medium text-basic/50">
                                                엔터로 줄바꿈하면 팝업 목록에도 그대로 보입니다.
                                            </span>
                                        </label>

                                        <div className="grid gap-2 text-caption font-bold text-primary">
                                            <label className="grid gap-2">
                                                <span>
                                                    이미지 클릭 시 이동 주소{' '}
                                                    <span className="font-medium text-basic/50">(선택)</span>
                                                </span>
                                                <input
                                                    value={tab.linkUrl ?? ''}
                                                    onChange={(e) => setTab(i, { linkUrl: e.target.value })}
                                                    placeholder="#notice"
                                                    className={FIELD}
                                                />
                                            </label>

                                            {/* 한 페이지 사이트라 페이지 주소가 없다. 섹션 앵커를 눌러 넣게 한다 */}
                                            <span className="font-medium text-basic/50">
                                                아래 섹션을 누르면 주소가 채워집니다. 외부 사이트만 https:// 로
                                                직접 입력하세요(새 탭으로 열립니다).
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {SECTION_ANCHORS.map((anchor) => (
                                                    <button
                                                        key={anchor.href}
                                                        type="button"
                                                        onClick={() => setTab(i, { linkUrl: anchor.href })}
                                                        className={`rounded-full border px-3 py-1 text-caption font-bold transition ${
                                                            tab.linkUrl === anchor.href
                                                                ? 'border-primary bg-primary text-white'
                                                                : 'border-neutral-300 bg-white text-basic/60 hover:border-primary hover:text-primary'
                                                        }`}
                                                    >
                                                        {anchor.label}
                                                        <span className="ml-1 font-medium opacity-60">
                                                            {anchor.href}
                                                        </span>
                                                    </button>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => setTab(i, { linkUrl: '' })}
                                                    className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-caption font-bold text-basic/60 transition hover:border-primary hover:text-primary"
                                                >
                                                    링크 없음
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {message && <p className="mt-4 text-caption font-bold text-primary">{message}</p>}

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={addTab}
                                disabled={tabs.length >= POPUP_MAX_TABS}
                                className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-caption font-bold text-basic/70 transition hover:border-primary hover:text-primary disabled:opacity-40"
                            >
                                탭 추가 ({tabs.length}/{POPUP_MAX_TABS})
                            </button>

                            <button
                                type="button"
                                onClick={submit}
                                disabled={busy || uploading !== null}
                                className="rounded-full bg-primary px-6 py-2.5 text-caption font-bold text-white transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                            >
                                {busy ? '저장 중…' : '저장'}
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
