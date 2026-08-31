'use client';

import { useCallback, useEffect, useState } from 'react';
import { useNotices, type Notice } from '@/lib/notice';
import { useAcademics } from '@/lib/academic';
import { ACADEMIC_EVENT } from '@/lib/academic-event';
import { ACADEMIC_CATEGORIES } from '@/data/site';
import NoticeList from '@/components/notice/NoticeList';
import NoticeModal, { type NoticeView } from '@/components/notice/NoticeModal';
import SectionTitle from '@/components/ui/SectionTitle';

/** 학술활동 글이 아직 없을 때 보여줄 자리표시 */
const placeholder = (id: string, label: string): NoticeView => ({
    id,
    title: label,
    date: '',
    imageUrl: '',
    content: '<p>준비 중입니다. 곧 안내드리겠습니다.</p>',
});

export default function NoticeSection() {
    const { notices, loading } = useNotices();
    const { academics } = useAcademics();
    const [selected, setSelected] = useState<NoticeView | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleSelect = (notice: Notice) => {
        setActiveId(notice.id);
        setSelected(notice);
    };

    const openCategory = useCallback(
        (id: string) => {
            const found = ACADEMIC_CATEGORIES.find((item) => item.id === id);
            if (!found) return;
            setSelected(academics[id] ?? placeholder(id, found.label));
        },
        [academics],
    );

    // 학술·연구 섹션의 버튼에서 넘어온 요청. 스크롤이 끝난 뒤에 모달을 연다
    useEffect(() => {
        const onOpen = (event: Event) => {
            const id = (event as CustomEvent<string>).detail;
            document.getElementById('notice')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.setTimeout(() => openCategory(id), 600);
        };
        window.addEventListener(ACADEMIC_EVENT, onOpen);
        return () => window.removeEventListener(ACADEMIC_EVENT, onOpen);
    }, [openCategory]);

    return (
        <section id="notice" className="bg-texture-stone py-16 md:py-24 lg:py-28" aria-labelledby="notice-title">
            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <SectionTitle eyebrow="Notice" title="연세진치과 공지사항" />

                {/* 학술활동 4종 바로가기 */}
                <ul className="mx-auto mt-8 grid w-full max-w-[870px] grid-cols-2 gap-2.5 md:mt-10 md:flex md:justify-center md:gap-3">
                    {ACADEMIC_CATEGORIES.map((item) => (
                        <li key={item.id} className="min-w-0">
                            <button
                                type="button"
                                onClick={() => openCategory(item.id)}
                                className="relative flex h-full w-full items-center justify-center rounded-[6px] border border-primary/45 bg-white px-4 py-3 text-body font-extrabold text-primary shadow-[0_2px_6px_rgb(6_26_66/0.08)] transition hover:bg-accent-soft active:scale-[0.98] md:min-w-[150px] md:px-7 md:text-[15px]"
                            >
                                <span className="text-wrap-design">{item.label}</span>
                                <img
                                    src="/images/i-link.svg"
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute top-1.5 right-1.5 h-3 w-3"
                                />
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="mx-auto mt-8 w-full max-w-[870px] md:mt-10">
                    <NoticeList notices={notices} loading={loading} onSelect={handleSelect} activeId={activeId} />
                </div>
            </div>

            <NoticeModal notice={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
