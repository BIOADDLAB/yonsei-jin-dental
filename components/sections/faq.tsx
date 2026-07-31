'use client';

import { useState } from 'react';
import { FAQ } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

export default function Faq() {
    const [category, setCategory] = useState(0);
    const [open, setOpen] = useState(0);

    const items = FAQ[category].items;

    const selectCategory = (index: number) => {
        setCategory(index);
        setOpen(0);
    };

    return (
        <section id="faq" className="mt-[100px]" aria-labelledby="faq-title">
            <div className="grid grid-cols-1 items-end lg:grid-cols-2">
                <div className="rounded-tr-[100px] md:rounded-tr-[200px] bg-primary px-5 py-20 md:px-16 md:py-24 lg:rounded-tr-[120px] lg:pb-[120px] lg:pt-[140px]">
                    <Reveal className="lg:ml-auto lg:w-[420px]">
                        <p className="text-display -ml-2 font-bold leading-[20px]! text-white/25 md:-ml-4 md:text-[80px] md:font-medium md:leading-[45px]">
                            FAQ
                        </p>
                        <h2 id="faq-title" className="text-display font-extrabold text-white md:text-[40px]">
                            자주 묻는 질문
                        </h2>

                        <ul className="mt-8 space-y-3 md:mt-16" role="tablist" aria-label="FAQ 진료 분류">
                            {FAQ.map((item, index) => (
                                <li key={item.category}>
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={category === index}
                                        onClick={() => selectCategory(index)}
                                        className={`relative text-lead font-black transition ${
                                            category === index ? 'text-white' : 'text-white/60 hover:text-white'
                                        }`}
                                    >
                                        {category === index && (
                                            <span
                                                aria-hidden
                                                className="pointer-events-none absolute -left-3.5 top-1/2 z-0 block h-[31px] w-[31px] -translate-y-[75%] rounded-full bg-accent/40"
                                            />
                                        )}
                                        <span className="relative z-10">{item.category}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>

                <div className="bg-accent-soft px-5 py-14 md:px-10 md:py-16 lg:py-17">
                    <div className="flex flex-col min-h-[350px] md:min-h-[420px] lg:w-full">
                        {items.length === 0 ? (
                            <p className="m-auto w-full rounded-2xl bg-white px-6 py-8 text-center text-small text-basic/60">
                                준비 중입니다. 곧 안내드리겠습니다.
                            </p>
                        ) : (
                            <ul className="m-auto flex w-full flex-col space-y-3 md:space-y-4 lg:py-2">
                                {items.map((item, index) => (
                                    <li key={item.q}>
                                        <Reveal delay={index * 0.06}>
                                            <article className="rounded-2xl bg-white px-6 py-5 md:px-8 md:py-6 lg:px-10">
                                                <h3>
                                                    <button
                                                        type="button"
                                                        aria-expanded={open === index}
                                                        onClick={() => setOpen(open === index ? -1 : index)}
                                                        className="flex w-full items-center justify-between gap-4 text-left"
                                                    >
                                                        <span className="text-body font-black text-primary md:text-[18px] lg:text-[20px]">
                                                            Q. {item.q}
                                                        </span>
                                                        <span
                                                            aria-hidden="true"
                                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary md:h-9 md:w-9 lg:h-11 lg:w-11"
                                                        >
                                                            <img
                                                                src={
                                                                    open === index
                                                                        ? '/images/i-m-w.svg'
                                                                        : '/images/i-p-w.svg'
                                                                }
                                                                alt=""
                                                                className="h-5 w-5 md:h-6 md:w-6"
                                                            />
                                                        </span>
                                                    </button>
                                                </h3>
                                                {open === index && (
                                                    <p className="text-wrap-design mt-4 text-small leading-relaxed text-basic/80 md:mt-5 md:text-[16px]">
                                                        {item.a ? `A. ${item.a}` : '답변을 준비하고 있습니다.'}
                                                    </p>
                                                )}
                                            </article>
                                        </Reveal>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
