'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

type Props = {
    value: string;
    onChange: (value: string) => void;
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

/** 공지 본문 에디터. 이미지는 대표 이미지 한 장만 쓰므로 서식만 다룬다 */
export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [StarterKit, Placeholder.configure({ placeholder: '공지 내용을 입력하세요.' })],
        content: value,
        editorProps: {
            attributes: {
                class: 'notice-content min-h-[280px] px-5 py-4 text-small leading-[1.9] text-basic outline-none',
            },
        },
        onUpdate: ({ editor: next }) => onChange(next.getHTML()),
    });

    // 수정 버튼으로 다른 공지를 불러왔을 때 본문을 갈아끼운다
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

    return (
        <div className="overflow-hidden rounded-2xl border border-neutral-300 bg-white transition-colors focus-within:border-primary">
            <div className="flex flex-wrap gap-1 border-b border-neutral-200 bg-neutral-100 px-3 py-2">
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
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}
