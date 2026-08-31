'use client';

import { useState } from 'react';
import NoticeAdmin from './NoticeAdmin';
import AcademicAdmin from '@/components/admin/AcademicAdmin';
import PopupAdmin from '@/components/admin/PopupAdmin';

const TABS = [
    { id: 'notice', label: '공지사항' },
    { id: 'academic', label: '학술활동' },
    { id: 'popup', label: '팝업' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function AdminPanel() {
    const [active, setActive] = useState<TabId>('notice');

    return (
        <>
            <nav className="mx-auto mt-5 w-full max-w-[1000px] px-4 md:mt-8 md:px-8" aria-label="관리 메뉴">
                <ul className="flex flex-wrap gap-2">
                    {TABS.map((tab) => (
                        <li key={tab.id}>
                            <button
                                type="button"
                                onClick={() => setActive(tab.id)}
                                aria-current={active === tab.id ? 'page' : undefined}
                                className={`rounded-full px-5 py-2.5 text-caption font-bold transition ${
                                    active === tab.id
                                        ? 'bg-primary text-white'
                                        : 'border border-neutral-300 bg-white text-basic/70 hover:border-primary hover:text-primary'
                                }`}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {active === 'notice' && <NoticeAdmin />}
            {active === 'academic' && <AcademicAdmin />}
            {active === 'popup' && <PopupAdmin />}
        </>
    );
}
