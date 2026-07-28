'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CLINIC, NAV } from '@/data/site';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const solid = scrolled || hovered || menuOpen;

    return (
        <header
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
                solid
                    ? 'border-b border-transparent bg-primary [box-shadow:0_4px_20px_rgb(0_0_0/0.08)]'
                    : 'border-b border-white/60 bg-transparent'
            }`}
        >
            <div className="mx-auto flex h-[80px] w-full max-w-site items-center justify-between px-5 md:h-[100px] md:px-8">
                <Link
                    href="/"
                    className={`flex items-center gap-2.5  text-white`}
                    aria-label={`${CLINIC.name} 홈으로 이동`}
                >
                    <Image
                        src="/images/logo.svg"
                        alt="여주 연세진치과"
                        width={46}
                        height={46}
                        className="h-auto w-[34px] md:w-[46px]"
                    />
                    <span className="text-[22px] md:text-[26px] font-bold">{CLINIC.name}</span>
                </Link>

                <nav className="hidden items-center gap-14.5 lg:flex" aria-label="주요 메뉴">
                    {NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-lead font-medium text-white transition-colors hover:text-accent hover:[text-shadow:0_2px_10px_rgb(0_0_0/0.35)] active:text-accent`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
                    aria-expanded={menuOpen}
                    aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    {[0, 1, 2].map((line) => (
                        <span
                            key={line}
                            className={`h-0.5 w-6 transition-transform duration-300 ${
                                solid ? 'bg-white/88' : 'bg-white/88'
                            } ${menuOpen && line === 0 ? 'translate-y-2 rotate-45' : ''} ${
                                menuOpen && line === 1 ? 'opacity-0' : ''
                            } ${menuOpen && line === 2 ? '-translate-y-2 -rotate-45' : ''}`}
                        />
                    ))}
                </button>
            </div>

            {menuOpen && (
                <nav
                    className="absolute left-0 top-[80px] flex h-[calc(100dvh-80px)] w-full flex-col bg-primary md:top-[100px] md:h-[calc(100dvh-100px)] lg:hidden"
                    aria-label="모바일 메뉴"
                >
                    <ul className="flex-1 overflow-y-auto px-6 py-2">
                        {NAV.map((item) => (
                            <li key={item.href} className="border-b border-white/10 last:border-none">
                                <Link
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-5 text-lg font-medium text-white transition-colors active:text-accent"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
