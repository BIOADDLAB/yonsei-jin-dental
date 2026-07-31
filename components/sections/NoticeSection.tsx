'use client';

import { useState } from 'react';
import { useNotices, type Notice } from '@/lib/notice';
import NoticeList from '@/components/notice/NoticeList';
import NoticeModal from '@/components/notice/NoticeModal';
import SectionTitle from '@/components/ui/SectionTitle';

export default function NoticeSection() {
    const { notices, loading } = useNotices();
    const [selected, setSelected] = useState<Notice | null>(null);

    return (
        <section id="notice" className="bg-texture-stone py-16 md:py-24 lg:py-28" aria-labelledby="notice-title">
            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <SectionTitle eyebrow="Notice" title="연세진치과 공지사항" />

                <div className="mx-auto mt-10 w-full max-w-[870px] md:mt-14">
                    <NoticeList notices={notices} loading={loading} onSelect={setSelected} />
                </div>
            </div>

            <NoticeModal notice={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
