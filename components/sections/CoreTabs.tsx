'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CORE_TABS } from '@/data/site';

function usePager(total: number) {
    const [[index, dir], setState] = useState<[number, number]>([0, 1]);
    return {
        index,
        dir,
        prev: () => setState(([v]) => [(v - 1 + total) % total, -1]),
        next: () => setState(([v]) => [(v + 1) % total, 1]),
    };
}

const EASE = [0.22, 1, 0.36, 1] as const;

const IMAGE_MOTION = {
    enter: { opacity: 0, scale: 1.06 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: EASE } },
};

const TITLE_MOTION = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.22, ease: EASE } }),
};

const BODY_MOTION = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.32, ease: EASE, staggerChildren: 0.05, delayChildren: 0.1 },
    },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.22, ease: EASE } }),
};

const STAGGER_ITEM = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
    exit: { opacity: 0 },
};

const FADE_ONLY = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.12 } },
    exit: { opacity: 0, transition: { duration: 0.12 } },
};

const NAVY_CARD =
    'flex flex-col items-center overflow-visible bg-transparent p-0 h-auto rounded-none lg:ml-auto lg:flex lg:h-[474px] lg:w-[1175px] lg:items-center lg:overflow-visible lg:rounded-l-full lg:rounded-r-none lg:bg-primary lg:p-6';
const CARD_INNER = 'flex w-full flex-col items-center gap-8 lg:h-full lg:flex-row lg:items-center lg:gap-13';
const CARD_BODY = 'flex w-full flex-col';
const CIRCLE =
    'relative mx-auto aspect-square w-[min(280px,74vw)] shrink-0 overflow-hidden rounded-full border-[6px] border-primary bg-neutral-300 md:w-[320px] lg:mx-0 lg:w-[418px] lg:border-0';
const EXPERTISE_CIRCLE =
    'relative mx-auto aspect-square w-[min(280px,74vw)] shrink-0 overflow-hidden rounded-full border-[6px] border-primary bg-neutral-300 md:w-[320px] lg:mx-0 lg:w-[418px]';
const CHECK_ICON =
    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-center text-caption text-white lg:bg-white lg:text-primary';
const SHOT_SIZE = {
    wide: 'w-full lg:w-[502px]',
    narrow: 'w-[84px] md:w-[168px]',
    slim: 'w-[84px] md:w-[84px]',
};

function Arrows({
    onPrev,
    onNext,
    index,
    total,
}: {
    onPrev: () => void;
    onNext: () => void;
    index: number;
    total: number;
}) {
    const isFirst = index === 0;
    const isLast = index === total - 1;
    const prevFilled = !isFirst;
    const nextFilled = !isLast;

    const btnBase = 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition active:scale-90';
    const outlineCls = `${btnBase} border-primary bg-transparent lg:border-white`;
    const filledCls = `${btnBase} border-primary bg-primary lg:border-white lg:bg-white lg:hover:bg-accent`;
    const outlineIcon = 'w-4 brightness-0 lg:brightness-0 lg:invert';
    const filledIcon = 'w-4 brightness-0 invert lg:brightness-0 lg:invert-0';

    return (
        <div className="flex shrink-0 gap-2 lg:mr-[118px]">
            <button
                type="button"
                onClick={onPrev}
                aria-label="이전 내용"
                className={prevFilled ? filledCls : outlineCls}
            >
                <img src="/images/i-arr-l-01.svg" alt="" className={prevFilled ? filledIcon : outlineIcon} />
            </button>
            <button
                type="button"
                onClick={onNext}
                aria-label="다음 내용"
                className={nextFilled ? filledCls : outlineCls}
            >
                <img src="/images/i-arr-r-01.svg" alt="" className={nextFilled ? filledIcon : outlineIcon} />
            </button>
        </div>
    );
}

function SystemShots({
    shots,
    reduced,
}: {
    shots: { image: string; alt: string; size: 'wide' | 'narrow' | 'slim' }[];
    reduced: boolean;
}) {
    // 모바일은 한 장만 보이므로, 이번 페이지의 메인(wide) 사진을 보여준다
    const main = shots.find((s) => s.size === 'wide') ?? shots[0];

    return (
        <>
            <div className="relative h-[200px] w-full overflow-hidden rounded-[14px] border border-primary lg:hidden">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={main.image}
                        variants={reduced ? FADE_ONLY : IMAGE_MOTION}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                    >
                        <Image src={main.image} alt={main.alt} fill sizes="100vw" className="object-cover" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="hidden gap-3.5 lg:flex">
                {shots.map((s) => (
                    <motion.figure
                        key={s.image}
                        layout={!reduced}
                        transition={{ duration: 0.5, ease: EASE }}
                        className={`relative h-[300px] shrink-0 overflow-hidden rounded-[14px] border border-primary ${SHOT_SIZE[s.size]}`}
                    >
                        <Image src={s.image} alt={s.alt} fill sizes="502px" className="object-cover" />
                    </motion.figure>
                ))}
            </div>
        </>
    );
}

export default function CoreTabs() {
    const [active, setActive] = useState(0);
    const [showSwipeHint, setShowSwipeHint] = useState(true);
    const reducedMotion = useReducedMotion() ?? false;
    const tab = CORE_TABS[active];

    useEffect(() => {
        const onSelect = (event: Event) => {
            const index = (event as CustomEvent<number>).detail;
            if (Number.isInteger(index) && index >= 0 && index < CORE_TABS.length) setActive(index);
        };
        window.addEventListener('select-core-tab', onSelect);
        return () => window.removeEventListener('select-core-tab', onSelect);
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => setShowSwipeHint(false), 2800);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <section id="core" className="bg-texture-stone py-12 md:py-24 lg:py-28" aria-labelledby="core-title">
            <h2 id="core-title" className="sr-only">
                연세진치과 핵심역량
            </h2>

            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <div className="relative">
                    <ul
                        className="-mb-3 flex isolate items-end overflow-x-auto px-3 pt-7 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] lg:overflow-visible lg:px-0"
                        role="tablist"
                        aria-label="핵심역량 진료 분류"
                        onPointerDown={() => setShowSwipeHint(false)}
                        onScroll={() => setShowSwipeHint(false)}
                    >
                        {CORE_TABS.map((item, index) => {
                            const on = active === index;
                            return (
                                <li
                                    key={item.id}
                                    className="relative -ml-3 w-[152px] shrink-0 first:ml-0 md:-ml-4 md:w-auto md:flex-1 md:shrink lg:-ml-[18px]"
                                    style={{ zIndex: on ? 30 : index + 1 }}
                                >
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={on}
                                        aria-controls={`panel-${item.id}`}
                                        onClick={() => setActive(index)}
                                        className={`relative flex h-[88px] w-full items-center justify-center rounded-t-[22px] border border-white/10 px-3 text-center text-lead !leading-[27px] shadow-[inset_-1px_0_rgb(255_255_255/0.12)] transition duration-300 md:h-[96px] md:rounded-t-[24px] md:px-4 lg:h-[110px] lg:rounded-t-[28px] lg:px-3 lg:text-subheading lg:!leading-[32px] lg:whitespace-normal ${
                                            on
                                                ? "z-20 scale-x-[1.035] flex-col gap-1 border-[#9ebde6] bg-accent font-black text-primary shadow-[-10px_-6px_18px_rgb(6_26_66/0.20),10px_-6px_18px_rgb(6_26_66/0.16),0_9px_14px_rgb(6_26_66/0.16)] after:absolute after:right-2 after:-bottom-2 after:left-2 after:-z-10 after:h-2 after:rounded-b-[12px] after:bg-[#a9c7ef] after:shadow-[0_5px_9px_rgb(6_26_66/0.16)] after:content-[''] lg:scale-x-[1.045]"
                                                : 'z-0 bg-primary font-bold text-white hover:brightness-110 lg:font-extrabold'
                                        }`}
                                    >
                                        <span className="block max-w-[5.5em] lg:hidden">{item.label}</span>
                                        <span className="hidden leading-[1.3] lg:block">
                                            {item.label.split(' ').map((word, i) => (
                                                <span key={i} className="block">
                                                    {word}
                                                </span>
                                            ))}
                                        </span>
                                        {on && (
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="14"
                                                height="14"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                aria-hidden="true"
                                                className="mt-0.5 block shrink-0 text-primary"
                                            >
                                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <AnimatePresence>
                        {showSwipeHint && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                className="pointer-events-none absolute top-full left-1/2 z-40 mt-2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-primary/10 bg-white/90 px-4 py-2 text-caption font-bold text-primary shadow-[0_6px_20px_rgb(6_26_66/0.14)] backdrop-blur-md md:hidden"
                            >
                                <motion.span
                                    aria-hidden="true"
                                    animate={reducedMotion ? { x: 0 } : { x: [-3, 3, -3] }}
                                    transition={
                                        reducedMotion
                                            ? { duration: 0 }
                                            : { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
                                    }
                                    className="text-[16px] leading-none"
                                >
                                    ↔
                                </motion.span>
                                <span>옆으로 밀어보세요</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div
                    id={`panel-${tab.id}`}
                    role="tabpanel"
                    className="relative z-0 bg-white/90 px-5 py-12 md:px-10 md:pt-[114px] md:pb-[80px] lg:px-0"
                >
                    <Panel key={tab.id} tab={tab} />
                </div>
            </div>
        </section>
    );
}

function Panel({ tab }: { tab: (typeof CORE_TABS)[number] }) {
    const a = usePager(tab.slides.length);
    const b = usePager(tab.systems?.length ?? 1);
    const reduced = useReducedMotion() ?? false;
    const slide = tab.slides[a.index];
    const system = tab.systems?.[b.index];
    const sysTotal = tab.systems?.length ?? 1;

    return (
        <>
            <div className="text-center">
                <span className="inline-block rounded-full bg-primary px-5 py-1 text-subheading font-medium text-white md:px-6 md:py-px">
                    Overview
                </span>
                <h3 className="mt-6 text-heading leading-[1.5] font-medium text-primary md:mt-6.5 md:leading-[55px]">
                    <span className="text-wrap-design block">{tab.title.top}</span>
                    <span className="mt-2 block md:mt-5 lg:mt-0">
                        {tab.title.lead && <span className="font-medium text-primary">{tab.title.lead} </span>}
                        <span className="font-black">{tab.title.bottom}</span>
                    </span>
                </h3>
                <p className="text-wrap-design mt-5 text-body leading-[30px] font-medium text-basic md:mt-6">
                    {tab.desc.map((part) =>
                        part.strong ? (
                            <strong key={part.text} className="font-bold">
                                {part.text}
                            </strong>
                        ) : (
                            <span key={part.text}>{part.text}</span>
                        ),
                    )}
                </p>
            </div>

            {tab.expertise && (
                <div className="mt-12 bg-transparent p-0 text-primary md:mt-26.75 lg:mr-auto lg:h-[474px] lg:w-[1175px] lg:rounded-l-none lg:rounded-r-full lg:bg-accent lg:p-6 lg:pl-25">
                    <div className="flex flex-col items-center gap-6 md:gap-8 lg:flex-row-reverse lg:gap-13">
                        <div className={EXPERTISE_CIRCLE}>
                            <Image
                                src={tab.expertise.image}
                                alt={tab.expertise.alt}
                                fill
                                sizes="(max-width: 1023px) 320px, 418px"
                                className="object-cover"
                            />
                        </div>
                        <div className="w-full">
                            <h4 className="text-subheading font-medium">
                                {tab.expertise.title.map((part) =>
                                    part.strong ? (
                                        <strong key={part.text} className="font-black">
                                            {part.text}
                                        </strong>
                                    ) : (
                                        <span key={part.text}>{part.text}</span>
                                    ),
                                )}
                            </h4>
                            <p className="text-wrap-design mt-5 text-body leading-[30px] font-medium md:mt-8.25 md:leading-[34px]">
                                {tab.expertise.body}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-10 md:mt-26.75">
                <div className={NAVY_CARD}>
                    <div className={CARD_INNER}>
                        <div className={CIRCLE}>
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={a.index}
                                    variants={reduced ? FADE_ONLY : IMAGE_MOTION}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={slide.image}
                                        alt={slide.alt}
                                        fill
                                        sizes="(max-width: 1023px) 320px, 418px"
                                        className="object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className={CARD_BODY}>
                            <div className="flex w-full items-center justify-between gap-3 md:gap-4">
                                <div className="relative h-[40px] min-w-0 flex-1">
                                    <AnimatePresence mode="wait" initial={false} custom={a.dir}>
                                        <motion.h4
                                            key={a.index}
                                            custom={a.dir}
                                            variants={reduced ? FADE_ONLY : TITLE_MOTION}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="absolute inset-y-0 left-0 flex items-center pr-2 text-subheading font-extrabold text-primary lg:text-white"
                                        >
                                            {slide.title}
                                            {slide.no != null && (
                                                <motion.span
                                                    aria-hidden="true"
                                                    initial={reduced ? false : { opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.35, ease: EASE, delay: 0.1 }}
                                                    className="absolute -top-5 -right-6 text-[40px] font-medium text-primary/20 md:-top-6 md:-right-8 md:text-[50px] lg:text-white/30"
                                                >
                                                    {slide.no}
                                                </motion.span>
                                            )}
                                        </motion.h4>
                                    </AnimatePresence>
                                </div>
                                {tab.slides.length > 1 && (
                                    <Arrows onPrev={a.prev} onNext={a.next} index={a.index} total={tab.slides.length} />
                                )}
                            </div>

                            <div className="overflow-visible">
                                <AnimatePresence mode="wait" initial={false} custom={a.dir}>
                                    <motion.div
                                        key={a.index}
                                        custom={a.dir}
                                        variants={reduced ? FADE_ONLY : BODY_MOTION}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                    >
                                        {slide.items && (
                                            <ul className="mt-6 space-y-3.5 md:mt-[60px] md:space-y-3">
                                                {slide.items.map((item) => (
                                                    <motion.li
                                                        key={item}
                                                        variants={reduced ? undefined : STAGGER_ITEM}
                                                        className="flex items-start gap-2.5 text-body font-medium text-primary lg:text-white"
                                                    >
                                                        <span aria-hidden="true" className={CHECK_ICON}>
                                                            ✓
                                                        </span>
                                                        <span className="min-w-0 leading-[1.45]">{item}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        )}

                                        {slide.head && (
                                            <div className="mt-6 flex items-start gap-2.5 text-body font-medium text-primary md:mt-[60px] md:gap-3.5 lg:text-white">
                                                <span aria-hidden="true" className={CHECK_ICON}>
                                                    ✓
                                                </span>
                                                <div className="min-w-0">
                                                    <strong>{slide.head}</strong>
                                                    <p className="text-wrap-design mt-4 whitespace-pre-line leading-[28px] md:mt-[30px] md:leading-[34px]">
                                                        {slide.body}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {slide.body && !slide.head && (
                                            <p className="text-wrap-design mt-6 whitespace-pre-line text-body leading-[28px] font-medium text-primary md:mt-8.25 md:leading-[34px] lg:text-white">
                                                {slide.body}
                                            </p>
                                        )}

                                        {slide.steps && (
                                            <div className="mt-6 text-primary md:mt-[33px] lg:text-white">
                                                <div className="flex flex-col gap-y-5 md:hidden">
                                                    {Array.from(
                                                        { length: Math.ceil(slide.steps.length / 2) },
                                                        (_, row) => {
                                                            const start = row * 2;
                                                            const rowSteps = slide.steps!.slice(start, start + 2);
                                                            return (
                                                                <ol
                                                                    key={`m-${row}`}
                                                                    className="grid grid-cols-2 items-start gap-x-2"
                                                                >
                                                                    {rowSteps.map((step, i) => {
                                                                        const stepIndex = start + i;
                                                                        const showArrow = i < rowSteps.length - 1;
                                                                        return (
                                                                            <motion.li
                                                                                key={step}
                                                                                variants={
                                                                                    reduced ? undefined : STAGGER_ITEM
                                                                                }
                                                                                className="relative flex flex-col items-center px-1 text-center"
                                                                            >
                                                                                <span className="text-caption leading-[26px] font-medium">
                                                                                    {String(stepIndex + 1).padStart(
                                                                                        2,
                                                                                        '0',
                                                                                    )}
                                                                                </span>
                                                                                <span className="text-wrap-design text-body leading-[26px] font-medium whitespace-pre-line">
                                                                                    {step}
                                                                                </span>
                                                                                {showArrow && (
                                                                                    <span
                                                                                        aria-hidden="true"
                                                                                        className="pointer-events-none absolute -right-1 top-[14px] inline-flex"
                                                                                    >
                                                                                        <img
                                                                                            src="/images/i-arr-r-02.svg"
                                                                                            alt=""
                                                                                            className="h-3 w-3 brightness-0"
                                                                                        />
                                                                                    </span>
                                                                                )}
                                                                            </motion.li>
                                                                        );
                                                                    })}
                                                                </ol>
                                                            );
                                                        },
                                                    )}
                                                </div>

                                                <div className="hidden flex-col gap-y-5 md:flex">
                                                    {Array.from(
                                                        { length: Math.ceil(slide.steps.length / 3) },
                                                        (_, row) => {
                                                            const start = row * 3;
                                                            const rowSteps = slide.steps!.slice(start, start + 3);
                                                            return (
                                                                <ol
                                                                    key={`d-${row}`}
                                                                    className="flex flex-wrap items-center gap-x-[32px] gap-y-3"
                                                                >
                                                                    {rowSteps.map((step, i) => {
                                                                        const stepIndex = start + i;
                                                                        const isLastInRow = i === rowSteps.length - 1;
                                                                        return (
                                                                            <motion.li
                                                                                key={step}
                                                                                variants={
                                                                                    reduced ? undefined : STAGGER_ITEM
                                                                                }
                                                                                className="flex items-center gap-[32px]"
                                                                            >
                                                                                <span className="flex flex-col text-center">
                                                                                    <span className="text-caption leading-[30px] font-medium">
                                                                                        {String(stepIndex + 1).padStart(
                                                                                            2,
                                                                                            '0',
                                                                                        )}
                                                                                    </span>
                                                                                    <span className="text-wrap-design text-body leading-[30px] font-medium whitespace-pre-line">
                                                                                        {step}
                                                                                    </span>
                                                                                </span>
                                                                                {!isLastInRow && (
                                                                                    <span
                                                                                        aria-hidden="true"
                                                                                        className="inline-flex shrink-0"
                                                                                    >
                                                                                        <img
                                                                                            src="/images/i-arr-r-02.svg"
                                                                                            alt=""
                                                                                            className="h-3 w-3 brightness-0 lg:invert"
                                                                                        />
                                                                                    </span>
                                                                                )}
                                                                            </motion.li>
                                                                        );
                                                                    })}
                                                                </ol>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {system && (
                <div className="mx-auto mt-16 max-w-[1035px] md:mt-[140px]">
                    <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-10">
                        <AnimatePresence mode="wait" initial={false} custom={b.dir}>
                            <motion.div
                                key={b.index}
                                custom={b.dir}
                                variants={reduced ? FADE_ONLY : BODY_MOTION}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="min-w-0"
                            >
                                <h4 className="dot dot-on-light inline-block text-subheading font-bold text-primary">
                                    <span className="text-wrap-design block">{system.title}</span>
                                </h4>
                                <p className="text-wrap-design mt-5 text-small leading-relaxed text-basic md:mt-[30px]">
                                    {system.desc}
                                </p>

                                {system.devices && (
                                    <ul className="mt-5 space-y-5 md:mt-[24px] md:space-y-7">
                                        {system.devices.map((device) => (
                                            <motion.li
                                                key={device.name}
                                                variants={reduced ? undefined : STAGGER_ITEM}
                                                className="flex items-baseline gap-2"
                                            >
                                                <span className="mb-1 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
                                                <div className="min-w-0">
                                                    <strong className="text-small font-medium text-primary">
                                                        {device.name}
                                                        {device.sub && (
                                                            <span className="text-caption">{device.sub}</span>
                                                        )}
                                                    </strong>
                                                    <p className="text-small font-light">{device.desc}</p>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="min-w-0">
                            <SystemShots key={b.index} shots={system.shots} reduced={reduced} />

                            {sysTotal > 1 && (
                                <div className="mt-4 flex items-center justify-end gap-2 md:mt-5.5 md:mr-2 md:gap-3">
                                    <button
                                        type="button"
                                        onClick={b.prev}
                                        aria-label="이전 시스템"
                                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-primary transition active:scale-90 md:h-5.5 md:w-5.5 ${
                                            b.index === 0 ? 'bg-transparent' : 'bg-primary'
                                        }`}
                                    >
                                        <img
                                            src="/images/i-arr-r-01.svg"
                                            alt=""
                                            className={`w-4 rotate-180 brightness-0 ${b.index === 0 ? '' : 'invert'}`}
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={b.next}
                                        aria-label="다음 시스템"
                                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-primary transition active:scale-90 md:h-5.5 md:w-5.5 ${
                                            b.index === sysTotal - 1 ? 'bg-transparent' : 'bg-primary'
                                        }`}
                                    >
                                        <img
                                            src="/images/i-arr-l-01.svg"
                                            alt=""
                                            className={`w-4 rotate-180 brightness-0 ${
                                                b.index === sysTotal - 1 ? '' : 'invert'
                                            }`}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
