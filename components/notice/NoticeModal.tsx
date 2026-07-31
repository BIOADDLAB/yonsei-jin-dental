'use client';

import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { formatDate } from '@/components/notice/NoticeList';
import type { Notice } from '@/lib/notice';

type Props = {
    notice: Notice | null;
    onClose: () => void;
};

/** 공지 상세 모달. 제목 + 대표 이미지(선택) + 본문 */
export default function NoticeModal({ notice, onClose }: Props) {
    return (
        <Modal open={Boolean(notice)} onClose={onClose} title={notice?.title ?? ''}>
            {notice && (
                <>
                    <p className="text-caption text-basic/60">{formatDate(notice.date)}</p>

                    {/* 대표 이미지는 선택 항목이라 없으면 표시하지 않는다 */}
                    {notice.imageUrl && (
                        <Image
                            src={notice.imageUrl}
                            alt={`${notice.title} 대표 이미지`}
                            width={1200}
                            height={800}
                            unoptimized={notice.imageUrl.startsWith('data:')}
                            className="mt-5 h-auto w-full rounded-2xl"
                        />
                    )}

                    {/* 본문은 에디터가 만든 HTML. 관리자만 작성하므로 그대로 렌더한다 */}
                    <div
                        className="notice-content mt-6 text-small leading-[1.9] text-basic"
                        dangerouslySetInnerHTML={{ __html: notice.content }}
                    />
                </>
            )}
        </Modal>
    );
}
