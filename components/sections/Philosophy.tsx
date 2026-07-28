// #ISSUE: 모바일에서 이미지가 우측에서 튀어나와 부자연스럽고(덜렁거림), 슬라이드 컨테이너의 곡률과 패딩이 답답한 문제 수정
// #STYLE: 이미지 등장 애니메이션을 상향(bottom)으로 변경 및 모바일 반경(radius) 제거. 슬라이드는 좌측 텍스트 라인에 정렬하고 우측 여백 확보.

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PHILOSOPHY } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

const INTERVAL = 4500;

const TEXT_INSET = 'lg:pl-[20vw]';

export default function Philosophy() {
    const [index, setIndex] = useState(0);
    const reduced = useReducedMotion();
    const total = PHILOSOPHY.slides.length;

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
                                className="text-wrap-design text-body leading-8  text-white/90 md:leading-[38px]"
                            >
                                {line}
                            </p>
                        ))}
                    </div>
                </Reveal>

                <div className="mt-10 lg:mt-11">
                    <div
                        className={`relative flex h-[204px] w-[92%] items-center overflow-hidden rounded-r-[32px] bg-accent-soft py-7 pr-6 pl-14 md:h-[220px] md:w-[94%] md:rounded-r-[110px] md:py-10 md:pr-10 md:pl-20 lg:h-[236px] lg:w-[46.93vw] lg:rounded-r-full lg:py-0 lg:pr-16 ${TEXT_INSET}`}
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
                                <p className="text-wrap-design mt-1 text-body leading-relaxed font-medium text-primary">
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

            {/* 변경점: 모바일에서는 부드럽게 아래에서 위로(bottom) 나타나도록 애니메이션 방향 수정 */}
            <Reveal kind="bottom" className="order-1 lg:order-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none md:aspect-[16/9] md:rounded-bl-[140px] lg:aspect-auto lg:h-full lg:rounded-bl-none lg:rounded-tl-[240px]">
                    <Image
                        src={PHILOSOPHY.image}
                        alt={PHILOSOPHY.alt}
                        fill
                        sizes="(max-width: 1280px) 100vw, 51vw"
                        className="object-cover"
                    />
                </div>
            </Reveal>
        </section>
    );
}
