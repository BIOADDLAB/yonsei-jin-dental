'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
type Kind = 'up' | 'bottom' | 'left' | 'right' | 'scale';

const FROM: Record<Kind, { x?: number; y?: number; scale?: number }> = {
    up: { y: 32 },
    bottom: { y: 64 },
    left: { x: -48 },
    right: { x: 48 },
    scale: { scale: 0.94 },
};

type Props = {
    children: ReactNode;
    kind?: Kind;
    delay?: number;
    className?: string;
    // 탭 전환처럼 이미 해당 섹션을 보고 있는 경우. 뷰포트 감지 없이 바로 재생한다.
    instant?: boolean;
};

const SHOWN = { opacity: 1, x: 0, y: 0, scale: 1 };

export default function Reveal({ children, kind = 'up', delay = 0, className, instant = false }: Props) {
    const reduced = useReducedMotion();

    if (reduced) return <div className={className}>{children}</div>;

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...FROM[kind] }}
            {...(instant ? { animate: SHOWN } : { whileInView: SHOWN, viewport: { once: true, amount: 0.2 } })}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
