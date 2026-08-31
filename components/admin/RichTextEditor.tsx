'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import ImageExt from '@tiptap/extension-image';

type Props = {
    value: string;
    onChange: (value: string) => void;
    /** 넘기면 본문에 사진을 여러 장 넣을 수 있다. 업로드 후 주소를 돌려주면 된다 */
    onUploadImage?: (file: File) => Promise<string>;
};

const TOOLS = [
    { label: 'H1', title: '제목 1', mark: 'heading', level: 1 },
    { label: 'H2', title: '제목 2', mark: 'heading', level: 2 },
    { label: '본문', title: '본문', mark: 'paragraph', level: 0 },
    { label: 'B', title: '굵게', mark: 'bold', level: 0 },
    { label: 'I', title: '기울임', mark: 'italic', level: 0 },
    { label: '•', title: '목록', mark: 'bulletList', level: 0 },
    { label: '1.', title: '번호 목록', mark: 'orderedList', level: 0 },
    { label: '❝', title: '인용', mark: 'blockquote', level: 0 },
] as const;

type Tool = (typeof TOOLS)[number];

/** 공지·학술활동 본문 에디터. 본문 사진은 개수 제한 없이 넣을 수 있다 */
export default function RichTextEditor({ value, onChange, onUploadImage }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: '내용을 입력하세요.' }),
            ImageExt.configure({ inline: false, allowBase64: false }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'notice-content min-h-[220px] max-w-full px-3 py-3 text-small leading-[1.9] text-basic outline-none sm:min-h-[280px] sm:px-5 sm:py-4',
            },
        },
        onUpdate: ({ editor: next }) => onChange(next.getHTML()),
    });

    // 수정 버튼으로 다른 글을 불러왔을 때 본문을 갈아끼운다
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, { emitUpdate: false });
        }
    }, [editor, value]);

    if (!editor) return null;

    const run = (tool: Tool) => {
        const chain = editor.chain().focus();
        if (tool.mark === 'heading') chain.toggleHeading({ level: tool.level as 1 | 2 }).run();
        else if (tool.mark === 'paragraph') chain.setParagraph().run();
        else if (tool.mark === 'bold') chain.toggleBold().run();
        else if (tool.mark === 'italic') chain.toggleItalic().run();
        else if (tool.mark === 'bulletList') chain.toggleBulletList().run();
        else if (tool.mark === 'orderedList') chain.toggleOrderedList().run();
        else chain.toggleBlockquote().run();
    };

    const isOn = (tool: Tool) =>
        tool.mark === 'heading' ? editor.isActive('heading', { level: tool.level }) : editor.isActive(tool.mark);

    // 여러 장을 한 번에 골라도 고른 순서대로 커서 위치에 이어서 넣는다
    const insertImages = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        event.target.value = '';
        if (!files.length || !onUploadImage) return;

        setUploading(true);
        setError('');
        try {
            for (const file of files) {
                const src = await onUploadImage(file);
                editor.chain().focus().setImage({ src, alt: file.name }).createParagraphNear().run();
            }
        } catch {
            setError('사진 업로드에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-300 bg-white transition-colors focus-within:border-primary">
            <div className="flex max-w-full flex-wrap items-center gap-1 border-b border-neutral-200 bg-neutral-100 px-2 py-2 sm:px-3">
                {TOOLS.map((tool) => (
                    <button
                        key={tool.label}
                        type="button"
                        title={tool.title}
                        onClick={() => run(tool)}
                        className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2.5 text-caption font-bold transition ${
                            isOn(tool) ? 'bg-primary text-white' : 'text-basic/70 hover:bg-white hover:text-primary'
                        }`}
                    >
                        {tool.label}
                    </button>
                ))}

                {onUploadImage && (
                    <>
                        <span aria-hidden className="mx-1 h-5 w-px bg-neutral-300" />
                        <button
                            type="button"
                            title="본문에 사진 넣기 (여러 장 선택 가능)"
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                            className="flex h-8 items-center justify-center rounded-lg px-2.5 text-caption font-bold text-basic/70 transition hover:bg-white hover:text-primary disabled:opacity-50"
                        >
                            {uploading ? '올리는 중…' : '사진 추가'}
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={insertImages}
                            className="hidden"
                        />
                    </>
                )}
            </div>

            {error && <p className="border-b border-neutral-200 px-3 py-2 text-caption font-bold text-red-600">{error}</p>}

            <div className="max-w-full overflow-x-hidden [&_.tiptap]:max-w-full [&_.ProseMirror]:max-w-full">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
