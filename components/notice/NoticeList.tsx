'use client';

import type { Notice } from '@/lib/notice';
import Reveal from '@/components/ui/Reveal';

export const formatDate = (value: string) => value.replaceAll('-', '.');

type Props = {
    notices: Notice[];
    loading: boolean;
    onSelect: (notice: Notice) => void;
    /** 현재 선택된(강조할) 공지 id. 없으면 첫 번째가 primary */
    activeId?: string | null;
    /** 관리자 목록에서는 진입 애니메이션을 끈다 */
    animate?: boolean;
    /** 관리자 목록에 붙는 수정·삭제 버튼 */
    renderActions?: (notice: Notice) => React.ReactNode;
};

/** 공지 목록. 시안 기준 PC 카드 870x82, 간격 20. 선택한 항목이 primary */
export default function NoticeList({
    notices,
    loading,
    onSelect,
    activeId = null,
    animate = true,
    renderActions,
}: Props) {
    if (loading) {
        return <NoticeListSkeleton />;
    }
    if (notices.length === 0) {
        return <p className="py-10 text-center text-small text-basic/60">등록된 공지사항이 없습니다.</p>;
    }

    const highlightId = activeId ?? notices[0]?.id;

    return (
        <ul className="space-y-3 md:space-y-5">
            {notices.map((notice, index) => {
                const on = notice.id === highlightId;
                const row = (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onSelect(notice)}
                            aria-label={`${notice.title} 자세히 보기`}
                            aria-current={on ? 'true' : undefined}
                            className={`group flex min-w-0 flex-1 items-center gap-3 rounded-[28px] px-4 py-3.5 text-left transition md:h-[82px] md:gap-3.5 md:rounded-full md:py-0 md:pr-[39px] md:pl-[43px] ${
                                on ? 'bg-primary hover:bg-primary/90' : 'bg-white hover:bg-accent-soft'
                            } active:scale-[0.995]`}
                        >
                            <span
                                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-caption ${
                                    on
                                        ? 'bg-white text-primary ring-3 ring-white/30'
                                        : 'bg-primary text-white ring-3 ring-primary/15'
                                }`}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            <span className="flex min-w-0 flex-1 flex-col gap-0.5 md:flex-row md:items-center md:justify-between md:gap-4">
                                <span
                                    className={`min-w-0 truncate text-small md:text-body ${
                                        on ? 'font-extrabold text-white' : 'font-bold text-primary'
                                    }`}
                                >
                                    {notice.title}
                                </span>
                                <span
                                    className={`shrink-0 text-caption md:text-body ${
                                        on
                                            ? 'font-extrabold text-white/80 md:text-white'
                                            : 'font-bold text-basic/60 md:text-basic'
                                    }`}
                                >
                                    {formatDate(notice.date)}
                                </span>
                            </span>
                        </button>

                        {renderActions?.(notice)}
                    </div>
                );

                return <li key={notice.id}>{animate ? <Reveal delay={index * 0.05}>{row}</Reveal> : row}</li>;
            })}
        </ul>
    );
}

function NoticeListSkeleton() {
    return (
        <ul className="space-y-3 md:space-y-5" aria-busy="true" aria-label="공지사항 불러오는 중">
            {Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                    <div
                        className={`flex items-center gap-3 rounded-[28px] px-4 py-3.5 md:h-[82px] md:rounded-full md:px-[43px] ${
                            i === 0 ? 'bg-primary/10' : 'bg-white'
                        }`}
                    >
                        <div className="skeleton h-[30px] w-[30px] shrink-0 rounded-full" />
                        <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div className="skeleton h-4 w-[70%] max-w-[280px] md:h-5" />
                            <div className="skeleton h-3.5 w-20 shrink-0 md:h-5" />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
