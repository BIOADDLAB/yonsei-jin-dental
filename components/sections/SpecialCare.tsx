'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SPECIAL_CARE } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

export default function SpecialCare() {
    const [active, setActive] = useState(0);
    const reduced = useReducedMotion();
    const item = SPECIAL_CARE.items[active];
    const total = SPECIAL_CARE.items.length;

    const move = (direction: number) => {
        setActive((current) => (current + direction + total) % total);
    };

    return (
        <section id="special" className="bg-texture py-16 md:py-24 lg:py-32" aria-labelledby="special-title">
            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <Reveal>
                    <p className="text-subheading font-semibold text-primary">{SPECIAL_CARE.eyebrow}</p>
                    <h2 id="special-title" className="dot mt-2.5 inline-block text-heading font-black text-primary">
                        {SPECIAL_CARE.title}
                    </h2>
                </Reveal>

                <Reveal kind="scale" className="mt-10 md:mt-14">
                    <div className="relative overflow-hidden rounded-[18px] border-2 border-primary/25 bg-white shadow-[0_20px_50px_rgb(6_26_66/0.08)] lg:h-[440px]">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.article
                                key={item.no}
                                initial={reduced ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: reduced ? 0 : 0.25 }}
                                className="grid min-h-[520px] lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_420px]"
                            >
                                <div className="flex flex-col justify-center px-7 py-10 md:px-12 lg:px-10 lg:py-7 xl:px-14">
                                    <p className="text-[64px] leading-none font-black text-primary/20 md:text-[82px] lg:text-[64px]">{item.no}</p>
                                    <h3 className="text-wrap-design mt-3 text-[28px] leading-[1.3] font-black text-basic md:text-[38px] lg:text-[34px]">
                                        {item.title.join('\n')}
                                    </h3>

                                    {item.highlight && (
                                        <p className="text-wrap-design mt-6 text-lead font-extrabold text-primary/55 lg:mt-4 lg:text-[17px]">
                                            {item.highlight}
                                        </p>
                                    )}

                                    <p className="text-wrap-design mt-6 text-body leading-[1.75] font-semibold text-basic lg:mt-4 lg:text-[16px] lg:leading-[1.65]">
                                        {item.body.map((part) =>
                                            part.strong ? (
                                                <strong key={part.text} className="font-black text-primary">
                                                    {part.text}
                                                </strong>
                                            ) : (
                                                <span key={part.text}>{part.text}</span>
                                            ),
                                        )}
                                    </p>
                                </div>

                                <div className="flex min-h-[300px] items-center justify-center border-t border-primary/10 p-5 lg:min-h-0 lg:border-t-0 lg:p-6 lg:pl-0">
                                    <div className="relative aspect-[376/250] w-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.alt}
                                            fill
                                            sizes="(max-width: 1279px) 100vw, 376px"
                                            className="object-cover"
                                            style={{ objectPosition: item.imagePosition }}
                                        />
                                    </div>
                                </div>
                            </motion.article>
                        </AnimatePresence>

                        <div className="absolute right-4 bottom-4 flex items-center gap-2 lg:right-8 lg:bottom-8">
                            <span className="mr-2 rounded-full bg-white/95 px-3 py-1 text-caption font-black text-primary shadow-sm">
                                {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                            </span>
                            <button
                                type="button"
                                onClick={() => move(-1)}
                                aria-label="이전 진료철학"
                                className="flex h-11 w-11 items-center justify-center border border-primary/20 bg-white text-primary transition hover:bg-accent-soft"
                            >
                                <span aria-hidden="true" className="text-[24px] leading-none">←</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => move(1)}
                                aria-label="다음 진료철학"
                                className="flex h-11 w-11 items-center justify-center bg-primary text-white transition hover:brightness-110"
                            >
                                <span aria-hidden="true" className="text-[24px] leading-none">→</span>
                            </button>
                        </div>
                    </div>

                </Reveal>
            </div>
        </section>
    );
}
