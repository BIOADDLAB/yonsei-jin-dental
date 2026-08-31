'use client';

// 메인 진입 팝업 (관리자 > 팝업 관리에서 켜고 끈다)
//  · 왼쪽 = 팝업 이미지(4:5 통짜, 잘리지 않음) / 오른쪽 = 탭 목록 / 아래 = 오늘 하루 그만 보기 · 닫기
//  · 탭이 둘 이상이면 5초마다 자동으로 넘어간다(탭을 직접 누르면 타이머 재시작)
//  · 640px 미만에서는 탭 목록 대신 이미지 아래 점 인디케이터를 쓴다

import { useEffect, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { getPopupSetting, POPUP_IMAGE_HEIGHT, POPUP_IMAGE_WIDTH, type PopupTab } from '@/lib/popup';

/** '오늘 하루 그만 보기' 를 누른 날짜를 담아둔다. 날이 바뀌면 다시 뜬다 */
const HIDE_KEY = 'yonseijin_popup_hidden_until';

/** 탭이 둘 이상이면 이 간격으로 자동으로 넘어간다 */
const AUTO_MS = 5000;

const EASE = [0.22, 1, 0.36, 1] as const;

const todayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function hiddenToday() {
    try {
        return window.localStorage.getItem(HIDE_KEY) === todayKey();
    } catch {
        return false;
    }
}

export default function PopupModal() {
    const reduced = useReducedMotion();
    const [tabs, setTabs] = useState<PopupTab[]>([]);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (hiddenToday()) return;

        let alive = true;
        getPopupSetting().then((setting) => {
            if (!alive || !setting?.enabled) return;
            const usable = setting.tabs.filter((tab) => tab.imageUrl);
            if (usable.length === 0) return;
            setTabs(usable);
            setOpen(true);
        });

        return () => {
            alive = false;
        };
    }, []);

    // 배너처럼 5초마다 다음 탭으로. 탭을 직접 누르면 index 가 바뀌며 타이머도 다시 시작된다
    useEffect(() => {
        if (!open || reduced || tabs.length < 2) return;
        const timer = window.setTimeout(() => setIndex((i) => (i + 1) % tabs.length), AUTO_MS);
        return () => window.clearTimeout(timer);
    }, [open, reduced, tabs.length, index]);

    // 팝업이 떠 있는 동안에는 뒤 배경이 스크롤되지 않게 한다
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [open]);

    const close = () => setOpen(false);

    const hideToday = () => {
        try {
            window.localStorage.setItem(HIDE_KEY, todayKey());
        } catch {}
        setOpen(false);
    };

    const current = tabs[index];

    return (
        <AnimatePresence>
            {open && current && (
                <motion.div
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="연세진치과 안내 팝업"
                    className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-basic/60 px-5 py-10 backdrop-blur-[2px]"
                >
                    <button type="button" tabIndex={-1} aria-hidden onClick={close} className="absolute inset-0" />

                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="relative flex max-h-[calc(100dvh-5rem)] w-full max-w-[720px] flex-col overflow-hidden rounded-[16px] shadow-[0_28px_70px_rgb(6_26_66/0.45)]"
                    >
                        <div className="grid min-h-0 grid-cols-1 items-stretch sm:grid-cols-[minmax(0,1.55fr)_minmax(7.5rem,0.7fr)]">
                            {/* 인스타 4:5. 비율이 달라도 자르지 않고 통째로 보여준다 */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-white">
                                <PopupImage key={current.imageUrl} tab={current} onInternalNavigate={close} />
                            </div>

                            {/* 모바일 전용 점 인디케이터 */}
                            {tabs.length > 1 && (
                                <div className="flex items-center justify-center border-t border-primary/10 bg-white py-1 sm:hidden">
                                    {tabs.map((tab, i) => (
                                        <button
                                            key={`dot-${tab.imageUrl}-${i}`}
                                            type="button"
                                            onClick={() => setIndex(i)}
                                            aria-current={i === index ? 'true' : undefined}
                                            aria-label={tab.label || `팝업 ${i + 1}`}
                                            className="flex h-6 w-6 items-center justify-center"
                                        >
                                            <span
                                                aria-hidden
                                                className={`block rounded-full transition-all duration-300 ${
                                                    i === index ? 'h-2 w-2 bg-primary' : 'h-1.5 w-1.5 bg-primary/25'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* 탭 목록. 긴 이름도 줄바꿈해서 통째로 보여준다 (640px 이상에서만 노출) */}
                            <nav
                                aria-label="팝업 목록"
                                className="hidden min-h-0 flex-col overflow-y-auto border-l border-primary/10 bg-white sm:flex sm:[scrollbar-width:thin]"
                            >
                                {tabs.map((tab, i) => (
                                    <button
                                        key={`${tab.imageUrl}-${i}`}
                                        type="button"
                                        onClick={() => setIndex(i)}
                                        aria-current={i === index ? 'true' : undefined}
                                        className={`w-full px-3 py-3.5 text-center text-caption leading-snug whitespace-pre-line transition-colors duration-300 sm:px-5 ${
                                            i === index
                                                ? 'bg-accent-soft font-extrabold text-primary'
                                                : 'text-basic/45 hover:bg-accent-soft/60 hover:text-primary'
                                        } ${i < tabs.length - 1 ? 'border-b border-primary/10' : ''}`}
                                    >
                                        {tab.label || `팝업 ${i + 1}`}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="flex shrink-0 border-t border-primary/10 bg-white">
                            <button
                                type="button"
                                onClick={hideToday}
                                className="flex flex-1 items-center justify-center border-r border-primary/10 py-4 text-center text-caption leading-none font-bold text-basic/55 transition-colors duration-300 hover:text-primary"
                            >
                                오늘 하루 그만 보기
                            </button>
                            <button
                                type="button"
                                onClick={close}
                                className="flex flex-1 items-center justify-center py-4 text-center text-caption leading-none font-bold tracking-[0.08em] text-basic/70 transition-colors duration-300 hover:text-primary"
                            >
                                닫기
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/** 4:5 박스 안에 통째로 넣는다. 받아오는 동안에는 스켈레톤을 덮어둔다 */
function PopupImage({ tab, onInternalNavigate }: { tab: PopupTab; onInternalNavigate: () => void }) {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const href = tab.linkUrl ? internalHref(tab.linkUrl) : null;

    const img = (
        <Image
            src={tab.imageUrl}
            alt={tab.label || '연세진치과 안내'}
            width={POPUP_IMAGE_WIDTH}
            height={POPUP_IMAGE_HEIGHT}
            unoptimized
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className="h-full w-full object-contain"
        />
    );

    const goInternal = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!href || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onInternalNavigate();

        // 한 페이지 사이트라 대부분 섹션 앵커다. 팝업을 닫고 그 자리로 굴려준다
        if (href.startsWith('#')) {
            window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 60);
            return;
        }
        router.push(href);
    };

    return (
        <>
            {tab.linkUrl ? (
                href ? (
                    <a href={href} onClick={goInternal} className="block h-full w-full">
                        {img}
                    </a>
                ) : (
                    <a href={tab.linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                        {img}
                    </a>
                )
            ) : (
                img
            )}

            {!loaded && <span aria-hidden className="skeleton absolute inset-0" />}
        </>
    );
}

/** 같은 사이트 주소면 경로만 돌려준다(= 라우터 이동). 외부 주소면 null → 새 탭 */
function internalHref(linkUrl: string) {
    const raw = linkUrl.trim();
    if (!raw) return null;
    if (raw.startsWith('/') || raw.startsWith('#')) return raw;

    try {
        const url = new URL(raw);
        return typeof window !== 'undefined' && url.origin === window.location.origin
            ? `${url.pathname}${url.search}${url.hash}`
            : null;
    } catch {
        return null;
    }
}
