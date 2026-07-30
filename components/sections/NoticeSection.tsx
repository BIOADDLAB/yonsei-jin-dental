'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useNotices, type Notice } from '@/lib/notice';
import Modal from '@/components/ui/Modal';
import Reveal from '@/components/ui/Reveal';
import SectionTitle from '@/components/ui/SectionTitle';

const formatDate = (value: string) => value.replaceAll('-', '.');

export default function NoticeSection() {
    const { notices, loading } = useNotices();
    const [selected, setSelected] = useState<Notice | null>(null);

    return (
        <section id="notice" className="bg-neutral-100 py-16 md:py-24 lg:py-28" aria-labelledby="notice-title">
            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <SectionTitle eyebrow="Notice" title="연세진치과 공지사항" />

                <div className="mx-auto mt-10 max-w-[840px] md:mt-14">
                    {loading ? (
                        <p className="py-10 text-center text-caption text-basic/60">공지사항을 불러오는 중입니다.</p>
                    ) : notices.length === 0 ? (
                        <p className="py-10 text-center text-caption text-basic/60">등록된 공지사항이 없습니다.</p>
                    ) : (
                        <ul className="space-y-3">
                            {notices.map((notice, index) => (
                                <li key={notice.id}>
                                    <Reveal delay={index * 0.05}>
                                        <button
                                            type="button"
                                            onClick={() => setSelected(notice)}
                                            className={`group flex w-full items-center gap-4 rounded-full px-5 py-4 text-left transition md:px-7 ${
                                                index === 0 ? 'bg-primary' : 'bg-white hover:bg-accent-soft'
                                            }`}
                                        >
                                            <span
                                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-caption ${
                                                    index === 0
                                                        ? 'border-white/60 text-white'
                                                        : 'border-primary text-primary'
                                                }`}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span
                                                className={`flex-1 truncate text-small font-bold ${
                                                    index === 0 ? 'text-white' : 'text-primary'
                                                }`}
                                            >
                                                {notice.title}
                                            </span>
                                            <span
                                                className={`shrink-0 text-caption ${index === 0 ? 'text-white/80' : 'text-basic/60'}`}
                                            >
                                                {formatDate(notice.date)}
                                            </span>
                                        </button>
                                    </Reveal>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.title ?? ''}>
                {selected?.imageUrl ? (
                    <Image
                        src={selected.imageUrl}
                        alt={`${selected.title} 상세 안내 이미지`}
                        width={1200}
                        height={1600}
                        className="h-auto w-full rounded-2xl"
                    />
                ) : (
                    <p className="rounded-2xl bg-neutral-100 px-6 py-12 text-center text-caption text-basic/60">
                        등록된 상세 이미지가 없습니다.
                    </p>
                )}
            </Modal>
        </section>
    );
}
