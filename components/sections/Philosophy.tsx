'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PHILOSOPHY } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

const INTERVAL = 4500;

// 리드문과 슬라이드 본문이 같은 세로 라인에서 시작하도록 좌측 여백을 하나로 통일한다
const TEXT_INSET = 'lg:pl-[20vw]';

export default function Philosophy() {
    const [index, setIndex] = useState(0);
    const reduced = useReducedMotion();
    const total = PHILOSOPHY.slides.length;

    // 1 → 2 → 3 → 1 무한 반복
    useEffect(() => {
        const timer = window.setInterval(() => setIndex((prev) => (prev + 1) % total), INTERVAL);
        return () => window.clearInterval(timer);
    }, [total]);

    const slide = PHILOSOPHY.slides[index];

    return (
        <section
            id="philosophy"
            className="relative bg-primary lg:grid lg:grid-cols-[49%_51%]"
            aria-labelledby="philosophy-title"
        >
            <div className="order-2 py-12 md:py-20 lg:order-1 lg:py-37.5">
                <Reveal kind="left" className={`px-5 md:px-8 lg:pr-8 ${TEXT_INSET}`}>
                    <p className="text-subheading font-medium text-accent">{PHILOSOPHY.eyebrow}</p>
                    <h2 id="philosophy-title" className="mt-2.5 text-heading font-bold text-white">
                        {PHILOSOPHY.title}
                    </h2>

                    <div className="mt-6 space-y-3 md:mt-10 md:space-y-4">
                        {PHILOSOPHY.desc.map((line) => (
                            <p
                                key={line}
                                className="text-wrap-design text-body leading-8 text-white/90 md:leading-[38px]"
                            >
                                {line}
                            </p>
                        ))}
                    </div>
                </Reveal>

                {/* 진료철학 3가지 자동 슬라이드. 배경은 화면 왼쪽 끝에서 시작한다. PC 기준 901x236 */}
                <div className="mt-10 lg:mt-11">
                    <div
                        className={`relative flex min-h-[250px] w-[94%] items-center overflow-hidden rounded-r-[32px] bg-accent-soft py-8 pr-7 pl-14 md:min-h-[240px] md:rounded-r-[110px] md:py-9 md:pr-12 md:pl-20 lg:min-h-[250px] lg:w-[47.5vw] lg:rounded-r-full lg:pr-16 ${TEXT_INSET}`}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={reduced ? false : { opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
                                transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full"
                            >
                                {/* 숫자는 흐름에서 빼서 본문 왼쪽 라인이 리드문과 정확히 맞도록 한다 */}
                                <span
                                    aria-hidden="true"
                                    className="absolute -top-2 -left-9 text-[40px] leading-none font-bold text-primary/30"
                                >
                                    {index + 1}
                                </span>

                                {slide.lead && <p className="text-body font-medium text-primary">{slide.lead}</p>}
                                <p
                                    className={`text-lead font-extrabold text-primary ${slide.lead ? 'mt-1.5 md:mt-3' : ''}`}
                                >
                                    {slide.title}
                                </p>
                                <p className="text-wrap-design mt-2 text-small leading-[1.75] font-semibold text-primary md:text-body">
                                    {slide.body}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <span className="sr-only" aria-live="polite">
                            진료철학 {index + 1} / {total}
                        </span>
                    </div>
                </div>
            </div>

            {/* 세로 정렬로 바뀌는 구간에서는 사진을 숨긴다 */}
            <Reveal kind="bottom" className="order-1 hidden lg:order-2 lg:block">
                {/* TODO: 실제 병원 내부 사진으로 교체 */}
                <div className="relative h-full w-full overflow-hidden rounded-tl-[240px]">
                    <Image src={PHILOSOPHY.image} alt={PHILOSOPHY.alt} fill sizes="51vw" className="object-cover" />
                </div>
            </Reveal>
        </section>
    );
}
