'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RESEARCH } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

// #ISSUE: 태블릿(md) 구간에서 탭 메뉴가 세로로 길게 배치되고 아티클 이미지 높이가 불안정함
// #STYLE: md 구간 탭 메뉴 가로 배치(flex-row) 및 아티클 이미지 최소 높이 지정으로 레이아웃 안정화
export default function Research() {
    const [active, setActive] = useState(0);
    const current = RESEARCH.tabs[active];

    return (
        <section
            id="research"
            className="bg-texture py-16 md:py-24 lg:py-32 overflow-x-hidden"
            aria-labelledby="research-title"
        >
            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <Reveal>
                    <div className="flex flex-col md:flex-row md:items-end md:gap-4.25">
                        <h2 id="research-title" className="text-heading font-bold text-primary md:text-[32px]">
                            {RESEARCH.title}
                        </h2>
                        <p className="text-[18px] font-medium text-primary md:pb-1 md:text-subheading">
                            {RESEARCH.eyebrow}
                        </p>
                    </div>
                    <p className="mt-3 text-[18px] md:text-subheading text-basic md:mt-6 ">{RESEARCH.desc}</p>
                </Reveal>

                <div className="mt-10 flex flex-col-reverse gap-6 md:mt-18.5 lg:flex-row lg:items-start lg:gap-11.5">
                    <Reveal kind="scale" key={current.label} instant className="flex-1 lg:flex-none">
                        <article className="flex flex-col gap-6 rounded-[14px] rounded-tl-[60px] bg-primary p-2 md:flex-row md:gap-[50px] md:p-[18px] lg:h-[557px] lg:w-[928px] lg:rounded-tl-[150px]">
                            {/* #STYLE: md 구간 이미지 붕괴 방지를 위해 min-h 설정 및 aspect 비율 조정 */}
                            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[14px] rounded-tl-[56px] bg-neutral-300 md:w-[45%] md:min-h-[350px] lg:aspect-auto lg:h-[521px] lg:w-[425px] lg:rounded-tl-[136px]">
                                <Image
                                    src={current.image}
                                    alt={current.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 425px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-1 flex-col px-4.5 justify-between py-2 md:py-6 md:pr-1">
                                <div className="mt:6.25 md:mt-10 lg:mt-20">
                                    <h3 className=" font-bold text-white text-subheading">{current.title}</h3>
                                    <ul className="mt-5 space-y-4 md:space-y-6 md:mt-7.5">
                                        {current.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-2.5 text-body font-medium leading-[30px] text-white "
                                            >
                                                <span aria-hidden="true" className="mt-1 text-[12px]">
                                                    •
                                                </span>
                                                <span className="text-wrap-design">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setActive((prev) => (prev + 1) % RESEARCH.tabs.length)}
                                    aria-label="다음 학술 분류 보기"
                                    className="mt-8 flex h-10.5 w-10.5 shrink-0 mb-2 items-center justify-center self-end rounded-full bg-accent text-primary transition hover:bg-[#b0c0e0] md:mt-6 md:h-15 md:w-15 lg:mr-12.5 lg:mb-0 lg:mt-0"
                                >
                                    <img src="/images/i-arr-r-02.svg" alt="" className=" w-6 lg:w-9" />
                                </button>
                            </div>
                        </article>
                    </Reveal>

                    <Reveal kind="right" className="w-full lg:w-[180px] lg:shrink-0">
                        {/* #STYLE: md 구간에서 탭을 가로 배치(flex-row, flex-wrap)로 변경하여 공간 활용도 개선 */}
                        <ul
                            className="flex flex-col md:flex-row md:flex-wrap lg:flex-col gap-2.5 lg:gap-3"
                            role="tablist"
                            aria-label="학술 연구 분류"
                        >
                            {RESEARCH.tabs.map((tab, index) => (
                                <li key={tab.label} className="flex-1 lg:flex-none">
                                    {/* #LINK: TODO 해결 - 활성화 상태일 때 font-bold, 비활성화일 때 font-medium 적용 */}
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={active === index}
                                        onClick={() => setActive(index)}
                                        className={`w-full whitespace-nowrap rounded-full px-5 py-1.5 text-lead transition lg:py-1.25 ${
                                            active === index
                                                ? 'bg-accent text-primary font-bold'
                                                : 'bg-primary text-white hover:bg-primary/90 font-medium'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
