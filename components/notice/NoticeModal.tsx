'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { formatDate } from '@/components/notice/NoticeList';

/** 공지·학술활동 모두 같은 모달을 쓴다. 두 타입에 공통인 필드만 요구한다 */
export type NoticeView = {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    content: string;
};

type Props = {
    notice: NoticeView | null;
    onClose: () => void;
};

/** 공지 상세 모달. 제목 + 대표 이미지(선택) + 본문 */
export default function NoticeModal({ notice, onClose }: Props) {
    return (
        <Modal open={Boolean(notice)} onClose={onClose} title={notice?.title ?? ''}>
            {notice && <NoticeBody key={notice.id} notice={notice} />}
        </Modal>
    );
}

function NoticeBody({ notice }: { notice: NoticeView }) {
    const [ready, setReady] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => setReady(true), 280);
        return () => window.clearTimeout(timer);
    }, []);

    if (!ready) {
        return <NoticeModalSkeleton hasImage={Boolean(notice.imageUrl)} />;
    }

    return (
        <>
            <p className="text-caption text-basic/60">{formatDate(notice.date)}</p>

            {notice.imageUrl && (
                <div className="relative mt-5 w-full overflow-hidden rounded-2xl">
                    {!imageLoaded && <div className="skeleton aspect-[3/2] w-full rounded-2xl" aria-hidden />}
                    <Image
                        src={notice.imageUrl}
                        alt={`${notice.title} 대표 이미지`}
                        width={1200}
                        height={800}
                        unoptimized={notice.imageUrl.startsWith('data:')}
                        onLoad={() => setImageLoaded(true)}
                        className={`h-auto w-full max-w-full rounded-2xl object-contain ${
                            imageLoaded ? 'block' : 'absolute opacity-0'
                        }`}
                    />
                </div>
            )}

            <div
                className="notice-content mt-6 max-w-full overflow-x-hidden text-small leading-[1.9] text-basic break-words"
                dangerouslySetInnerHTML={{ __html: notice.content }}
            />
        </>
    );
}

function NoticeModalSkeleton({ hasImage }: { hasImage: boolean }) {
    return (
        <div className="space-y-4" aria-busy="true" aria-label="공지 불러오는 중">
            <div className="skeleton h-4 w-24" />
            {hasImage && <div className="skeleton aspect-[3/2] w-full rounded-2xl" />}
            <div className="space-y-2.5 pt-2">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-[92%]" />
                <div className="skeleton h-4 w-[85%]" />
                <div className="skeleton h-4 w-[70%]" />
                <div className="skeleton mt-4 h-4 w-full" />
                <div className="skeleton h-4 w-[88%]" />
                <div className="skeleton h-4 w-[60%]" />
            </div>
        </div>
    );
}
