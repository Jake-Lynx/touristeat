import { useEffect } from "react";
import { useController } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";


interface TipTapEditorProps {
    name: string;
    control: any;
    placeholder?: string;
}

const TipTapEditor = ({ name, control, placeholder }: TipTapEditorProps) => {
    const {
        field: { onChange, value },
    } = useController({ name, control });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Heading.configure({ levels: [3, 4, 5] }),
            BulletList,
            OrderedList,
            ListItem,
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "");
        }
    }, [value, editor]);

    if (!editor) {
        return <div className="border border-gray-300 p-2 rounded-md">Chargement...</div>;
    }

    return (
        <div className="border border-gray-300 rounded-md">
            {/* Toolbar */}
            <div className="flex space-x-2 p-2 border-b bg-gray-100">
                <button
                    type="button"
                    className={`p-1 px-2 rounded ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    className={`p-1 px-2 rounded ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    className={`p-1 px-2 rounded ${editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    h1
                </button>
                <button
                    type="button"
                    className={`p-1 px-2 rounded ${editor.isActive("heading", { level: 4 }) ? "bg-gray-300" : ""}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                >
                    h2
                </button>
                <button
                    type="button"
                    className={`p-1 px-2 rounded ${editor.isActive("heading", { level: 5 }) ? "bg-gray-300" : ""}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                >
                    h3
                </button>
                <button
                    type="button"
                    className={`p-1 px-2 rounded ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    • Liste
                </button>
                <button
                    type="button"
                    className={`p-1 px-2 rounded ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    1. Liste
                </button>
            </div>

            {/* Éditeur */}
            <EditorContent editor={editor} className="p-2 min-h-[50px] bg-white"/>
        </div>
    );
};

export default TipTapEditor;
