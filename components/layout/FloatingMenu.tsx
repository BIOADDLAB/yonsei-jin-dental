'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FLOATING } from '@/data/site';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FloatingMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const reduced = useReducedMotion();
    const total = FLOATING.length;

    return (
        <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-2 md:bottom-8 md:right-6 md:gap-3 ">
            <AnimatePresence>
                {isOpen &&
                    FLOATING.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.5 }}
                            transition={{
                                duration: reduced ? 0.15 : 0.42,
                                ease: EASE,
                                delay: reduced ? 0 : (isOpen ? total - 1 - index : index) * 0.06,
                            }}
                            whileHover={reduced ? undefined : { scale: 1.06 }}
                            whileTap={reduced ? undefined : { scale: 0.94 }}
                        >
                            <Link
                                href={item.href}
                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                                className="flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full bg-white text-primary font-extrabold shadow-[0_4px_16px_rgb(0_0_0/0.18)] transition-colors hover:bg-gray-100 hover:text-primary md:h-[70px] md:w-[70px] md:gap-1"
                            >
                                <Image
                                    src={item.icon}
                                    alt=""
                                    width={34}
                                    height={34}
                                    className="h-5 w-5 md:h-[34px] md:w-[34px]"
                                />
                                <span className="whitespace-pre-line text-center text-[9px] leading-[1.1] tracking-tight md:whitespace-nowrap md:text-[10px] md:leading-none">
                                    {item.label}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? '상담 메뉴 닫기' : '상담 메뉴 열기'}
                aria-expanded={isOpen}
                // 화면 오른쪽 밖에서 안쪽으로 미끄러져 들어온다
                initial={reduced ? false : { x: 90, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
                whileHover={reduced ? undefined : { scale: 1.06 }}
                whileTap={reduced ? undefined : { scale: 0.9 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-[0_4px_16px_rgb(0_0_0/0.18)] transition-colors hover:bg-gray-100 md:h-[70px] md:w-[70px]"
            >
                <motion.span
                    key={isOpen ? 'close' : 'open'}
                    initial={reduced ? false : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="flex"
                >
                    <svg viewBox="0 0 26 26" fill="none" aria-hidden="true" className="h-4 w-4 md:h-[22px] md:w-[22px]">
                        <path d="M2 13H24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                        {!isOpen && <path d="M13 24V2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />}
                    </svg>
                </motion.span>
            </motion.button>

            <motion.button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="맨 위로 이동"
                initial={reduced ? false : { x: 90, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.25 }}
                whileHover={reduced ? undefined : { scale: 1.06, y: -2 }}
                whileTap={reduced ? undefined : { scale: 0.9 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-[0_4px_16px_rgb(0_0_0/0.18)] transition-colors hover:bg-gray-100 md:h-[70px] md:w-[70px]"
            >
                <span className="text-body font-medium lg:font-bold">Top</span>
            </motion.button>
        </div>
    );
}
