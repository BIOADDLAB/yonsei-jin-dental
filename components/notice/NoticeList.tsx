'use client';

import type { Notice } from '@/lib/notice';
import Reveal from '@/components/ui/Reveal';

export const formatDate = (value: string) => value.replaceAll('-', '.');

type Props = {
    notices: Notice[];
    loading: boolean;
    onSelect: (notice: Notice) => void;
    /** 관리자 목록에서는 진입 애니메이션을 끈다 */
    animate?: boolean;
    /** 관리자 목록에 붙는 수정·삭제 버튼 */
    renderActions?: (notice: Notice) => React.ReactNode;
};

/** 공지 목록. 시안 기준 PC 카드 870x82, 간격 20, 첫 줄만 네이비 */
export default function NoticeList({ notices, loading, onSelect, animate = true, renderActions }: Props) {
    if (loading) {
        return <p className="py-10 text-center text-small text-basic/60">공지사항을 불러오는 중입니다.</p>;
    }
    if (notices.length === 0) {
        return <p className="py-10 text-center text-small text-basic/60">등록된 공지사항이 없습니다.</p>;
    }

    return (
        <ul className="space-y-3 md:space-y-5">
            {notices.map((notice, index) => {
                const on = index === 0;
                const row = (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onSelect(notice)}
                            aria-label={`${notice.title} 자세히 보기`}
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

                            {/* 좁은 화면에서는 제목이 잘리지 않도록 날짜를 아래로 내린다 */}
                            <span className="flex min-w-0 flex-1 flex-col gap-0.5 md:flex-row md:items-center md:justify-between md:gap-4">
                                <span
                                    className={`min-w-0 text-small md:truncate md:text-body ${
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
