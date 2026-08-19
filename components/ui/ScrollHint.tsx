'use client';

import { useEffect, useState, type RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/** 가로 스크롤 영역이 화면에 들어오면 힌트를 띄우고, 사용자가 밀면 없앰 */
function useScrollHint(targetRef: RefObject<HTMLElement | null>) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = targetRef.current;
        if (!el) return;

        let observer: IntersectionObserver | null = null;
        let done = false;

        const dismiss = () => {
            if (done) return;
            done = true;
            observer?.disconnect();
            el.removeEventListener('scroll', dismiss);
            el.removeEventListener('pointerdown', dismiss);
            setVisible(false);
        };

        observer = new IntersectionObserver(
            ([entry]) => {
                if (done || !entry.isIntersecting) return;
                // 실제로 잘려 있을 때만 띄운다 (PC 처럼 다 보이면 무시)
                if (el.scrollWidth - el.clientWidth < 8) {
                    done = true;
                    observer?.disconnect();
                    return;
                }
                setVisible(true);
            },
            { threshold: 0.6 },
        );

        observer.observe(el);
        el.addEventListener('scroll', dismiss, { passive: true });
        el.addEventListener('pointerdown', dismiss);

        return () => {
            observer?.disconnect();
            el.removeEventListener('scroll', dismiss);
            el.removeEventListener('pointerdown', dismiss);
        };
    }, [targetRef]);

    return visible;
}

function Chevron({ className }: { className: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M15 18 9 12l6-6" />
        </svg>
    );
}

function SwipeIcon({ moving }: { moving: boolean }) {
    return (
        <span className="flex items-center gap-px">
            <Chevron className="h-3 w-3 text-primary/40" />
            <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[18px] w-[18px]"
                animate={moving ? { x: [-2.5, 2.5, -2.5] } : { x: 0 }}
                transition={moving ? { duration: 1.3, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
            >
                <path d="M22 14a8 8 0 0 1-8 8" />
                <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
                <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
                <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </motion.svg>
            <Chevron className="h-3 w-3 rotate-180 text-primary/40" />
        </span>
    );
}

export default function ScrollHint({
    targetRef,
    label = '옆으로 밀어보세요',
}: {
    targetRef: RefObject<HTMLElement | null>;
    label?: string;
}) {
    const visible = useScrollHint(targetRef);
    const reduced = useReducedMotion() ?? false;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="pointer-events-none absolute top-full left-1/2 z-30 mt-2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/10 bg-white px-3.5 py-1.5 text-caption font-bold text-primary shadow-[0_8px_22px_rgb(6_26_66/0.22)]"
                >
                    <SwipeIcon moving={!reduced} />
                    {label}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
