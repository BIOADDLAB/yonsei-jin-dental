'use client';

import { useEffect, type ReactNode } from 'react';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-basic/60 p-5"
            role="dialog"
            aria-modal="true"
        >
            <button type="button" className="absolute inset-0 cursor-default" aria-label="닫기" onClick={onClose} />
            <div className="relative max-h-[85vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-6 md:p-8">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <h3 className="text-subheading font-bold text-primary">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-caption text-basic transition hover:bg-neutral-300"
                    >
                        닫기
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
