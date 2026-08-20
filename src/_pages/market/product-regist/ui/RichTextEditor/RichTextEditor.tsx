'use client';

import { EditorContent } from '@tiptap/react';
import { useRichTextEditor } from '../../model/use-rich-text-editor';
import { ImageCropModal } from './ImageCropModal';
import { FontSizeMenu } from './FontSizeMenu';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function RichTextEditor({
  value,
  onChange,
  error,
}: RichTextEditorProps) {
  const {
    editor,
    fileInputRef,
    cropModalOpen,
    imageToCrop,
    currentFontSize,
    handleImageUpload,
    handleCropSave,
    setFontSize,
    closeCropModal,
  } = useRichTextEditor({ value, onChange });

  if (!editor) {
    return null;
  }

  return (
    <>
      {cropModalOpen && (
        <ImageCropModal
          imageSrc={imageToCrop}
          onClose={closeCropModal}
          onSave={handleCropSave}
        />
      )}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">
            상세 설명 <span className="text-red-400">*</span>
          </h3>
        </div>
        <div className="w-full">
          <div className="bg-gray-50 border border-gray-300 px-2 py-1 flex gap-1 items-center sticky top-16 z-10">
            {/* Image */}
            <button
              className="p-1 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="material-symbols-outlined text-[20px] leading-none">
                image
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {/* Division */}
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            {/* Font Size */}
            <FontSizeMenu
              currentFontSize={currentFontSize}
              onSelect={setFontSize}
            />
            {/* Division */}
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            {/* Bold */}
            <button
              className={`p-1 hover:bg-gray-200 text-gray-600 flex items-center justify-center ${
                editor.isActive('bold') ? 'bg-gray-200' : ''
              }`}
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <span className="material-symbols-outlined text-[20px] leading-none">
                format_bold
              </span>
            </button>
            {/* Italic */}
            <button
              className={`p-1 hover:bg-gray-200 text-gray-600 flex items-center justify-center ${
                editor.isActive('italic') ? 'bg-gray-200' : ''
              }`}
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <span className="material-symbols-outlined text-[20px] leading-none">
                format_italic
              </span>
            </button>
            {/* Under Line */}
            <button
              className={`p-1 hover:bg-gray-200 text-gray-600 flex items-center justify-center ${
                editor.isActive('underline') ? 'bg-gray-200' : ''
              }`}
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <span className="material-symbols-outlined text-[20px] leading-none">
                format_underlined
              </span>
            </button>
          </div>
          <div className="border border-t-0 border-gray-300">
            <EditorContent editor={editor} />
          </div>
        </div>
        {error && <p className="mt-1 ml-1 text-sm text-red-400">{error}</p>}
      </section>
    </>
  );
}
