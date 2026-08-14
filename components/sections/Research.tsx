'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { RESEARCH } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

export default function Research() {
    const [active, setActive] = useState(0);
    const reduced = useReducedMotion();
    const current = RESEARCH.tabs[active];
    const total = RESEARCH.tabs.length;

    const move = (direction: number) => {
        setActive((index) => (index + direction + total) % total);
    };

    return (
        <section id="research" className="overflow-hidden bg-texture py-16 md:py-24 lg:py-32" aria-labelledby="research-title">
            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <Reveal>
                    <div className="flex flex-col md:flex-row md:items-end md:gap-4">
                        <h2 id="research-title" className="text-heading font-black text-primary md:text-[32px]">
                            {RESEARCH.title}
                        </h2>
                        <p className="text-[16px] font-bold text-primary md:pb-1 md:text-[18px]">{RESEARCH.eyebrow}</p>
                    </div>
                    <p className="text-wrap-design mt-4 text-body font-semibold leading-[1.7] text-basic md:mt-6">{RESEARCH.desc}</p>
                </Reveal>

                <Reveal kind="scale" className="mt-12 md:mt-16">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.article
                            key={current.label}
                            initial={reduced ? false : { opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
                            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="relative grid md:mb-10 md:min-h-[500px] md:grid-cols-[52%_48%]"
                        >
                            <span className="absolute top-10 left-[52%] z-30 hidden h-[150px] w-[42px] items-center justify-center overflow-hidden bg-primary text-[11px] font-extrabold tracking-[0.22em] text-white md:flex">
                                <span className="whitespace-nowrap" style={{ transform: 'rotate(90deg)' }}>
                                    {current.tagEn}
                                </span>
                            </span>

                            <div className="relative z-20 aspect-[4/3] w-full overflow-hidden bg-neutral-300 shadow-[0_16px_44px_rgb(6_26_66/0.14)] md:h-[500px] md:aspect-auto">
                                <Image
                                    src={current.image}
                                    alt={current.alt}
                                    fill
                                    priority={active === 0}
                                    sizes="(max-width: 767px) 100vw, 52vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative z-10 min-h-[430px] border border-primary/15 bg-white px-7 py-11 md:-ml-[11%] md:min-h-[500px] md:translate-y-10 md:py-14 md:pr-12 md:pl-[22%] lg:pr-16 lg:pl-[22%]">
                                <span className="inline-flex bg-primary px-4 py-2 text-[11px] font-extrabold tracking-[0.18em] text-white md:hidden">
                                    {current.tagEn}
                                </span>

                                <p className="mt-5 text-caption font-bold tracking-[0.18em] text-primary/45 md:mt-0">
                                    YONSEI JIN DENTAL · ACADEMIC ACTIVITY
                                </p>
                                <h3 className="mt-5 text-[30px] leading-[1.3] font-black text-primary md:text-[38px] lg:text-[44px]">
                                    {current.title}
                                </h3>
                                <ul className="mt-7 space-y-4">
                                    {current.items.map((item) => (
                                        <li key={item} className="flex gap-3 text-body leading-[1.75] font-semibold text-[#39445a]">
                                            <span aria-hidden="true" className="font-black text-primary">·</span>
                                            <span className="text-wrap-design">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <span className="mt-9 inline-flex bg-primary px-5 py-3 text-caption font-extrabold text-white">
                                    {current.label}
                                </span>

                                <div className="absolute right-0 bottom-0 flex">
                                    <button
                                        type="button"
                                        onClick={() => move(-1)}
                                        aria-label="이전 학술 활동"
                                        className="flex h-12 w-12 items-center justify-center border border-primary/15 bg-white text-[23px] text-primary transition hover:bg-accent-soft"
                                    >
                                        <span aria-hidden="true">←</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => move(1)}
                                        aria-label="다음 학술 활동"
                                        className="flex h-12 w-12 items-center justify-center border-y border-r border-primary/15 bg-white text-[23px] text-primary transition hover:bg-accent-soft"
                                    >
                                        <span aria-hidden="true">→</span>
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    </AnimatePresence>
                </Reveal>
            </div>
        </section>
    );
}
