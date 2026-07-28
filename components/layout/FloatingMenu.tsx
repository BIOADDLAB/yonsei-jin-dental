'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FLOATING } from '@/data/site';

// #TODO: + - 버튼 추가하기
export default function FloatingMenu() {
    return (
        <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-2 md:bottom-8 md:right-6 md:gap-3">
            {FLOATING.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex h-17.5 w-17.5 flex-col items-center justify-center gap-1 rounded-full bg-white text-basic font-extrabold shadow-[0_4px_16px_rgb(0_0_0/0.18)] transition hover:bg-accent hover:text-basic md:h-[70px] md:w-[70px]"
                >
                    <Image src={item.icon} alt="" width={34} height={34} className="md:h-8.5 md:w-8.5" />
                    <span className="text-[10px] leading-none">{item.label}</span>
                </Link>
            ))}

            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="맨 위로 이동"
                className="flex h-17.5 w-17.5 items-center justify-center rounded-full bg-white text-basic shadow-[0_4px_16px_rgb(0_0_0/0.18)] transition hover:bg-accent-soft md:h-[70px] md:w-[70px]"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="25"
                    height="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                >
                    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}
