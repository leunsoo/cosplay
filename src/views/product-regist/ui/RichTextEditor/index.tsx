'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style/text-style';
import { FontSize } from '@tiptap/extension-text-style/font-size';
import { useEffect, useCallback, useRef, useState } from 'react';
import { DESCRIPTION_PLACEHOLDER } from '../../model/const';
import { ImageCropModal } from './ImageCropModal';
import { CustomImageExtension } from './CustomImageExtension';

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
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>('');
  const [editingImageSrc, setEditingImageSrc] = useState<string | null>(null);
  const [fontSizeMenuOpen, setFontSizeMenuOpen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState<string>('16');

  const handleImageEdit = useCallback((src: string) => {
    setImageToCrop(src);
    setEditingImageSrc(src);
    setCropModalOpen(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontSize,
      CustomImageExtension(handleImageEdit),
      Placeholder.configure({
        placeholder: DESCRIPTION_PLACEHOLDER,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'w-full min-h-84 p-4 border-none focus:ring-0 focus:outline-none resize-none leading-relaxed prose prose-sm max-w-none',
        style: 'font-size: 16px',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // 에디터의 선택 영역이 변경될 때마다 폰트 사이즈 업데이트
  useEffect(() => {
    if (!editor) return;

    const updateFontSize = () => {
      // 공식 FontSize 확장의 getAttributes 사용
      const attributes = editor.getAttributes('textStyle');
      const fontSize = attributes.fontSize
        ? attributes.fontSize.replace('px', '')
        : '16';

      setCurrentFontSize(fontSize);
    };

    // 초기 폰트 사이즈 설정
    updateFontSize();

    // 선택 영역 변경 시 폰트 사이즈 업데이트
    editor.on('selectionUpdate', updateFontSize);
    editor.on('transaction', updateFontSize);

    return () => {
      editor.off('selectionUpdate', updateFontSize);
      editor.off('transaction', updateFontSize);
    };
  }, [editor]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (fontSizeMenuOpen) {
        setFontSizeMenuOpen(false);
      }
    };

    if (fontSizeMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [fontSizeMenuOpen]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          const isMobile = window.innerWidth < 768;
          if (isMobile) {
            // 모바일: 크롭 없이 바로 삽입
            editor?.chain().focus().setImage({ src: base64 }).run();
          } else {
            setImageToCrop(base64);
            setEditingImageSrc(null);
            setCropModalOpen(true);
          }
        };
        reader.readAsDataURL(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [editor]
  );

  const handleCropSave = useCallback(
    (croppedImage: string) => {
      if (editor) {
        if (editingImageSrc) {
          // 기존 이미지를 편집하는 경우 - 이미지를 찾아서 교체
          const { state } = editor;
          const { doc } = state;
          let imagePos: number | null = null;

          doc.descendants((node, pos) => {
            if (
              node.type.name === 'customImage' &&
              node.attrs.src === editingImageSrc
            ) {
              imagePos = pos;
              return false;
            }
          });

          if (imagePos !== null) {
            // 기존 이미지 삭제 후 새 이미지 삽입
            editor
              .chain()
              .focus()
              .deleteRange({ from: imagePos, to: imagePos + 1 })
              .insertContentAt(imagePos, {
                type: 'customImage',
                attrs: { src: croppedImage },
              })
              .run();
          }
          setEditingImageSrc(null);
        } else {
          // 새 이미지를 추가하는 경우
          editor.chain().focus().setImage({ src: croppedImage }).run();
        }
      }
    },
    [editor, editingImageSrc]
  );

  if (!editor) {
    return null;
  }

  return (
    <>
      {cropModalOpen && (
        <ImageCropModal
          imageSrc={imageToCrop}
          onClose={() => setCropModalOpen(false)}
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
            <div className="relative">
              <button
                className="px-2 py-1.5 text-[18px] hover:bg-gray-200  text-gray-600 text-left leading-none"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFontSizeMenuOpen(!fontSizeMenuOpen);
                }}
              >
                {currentFontSize}
              </button>
              {fontSizeMenuOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300  shadow-lg z-20 min-w-20">
                  {[
                    '11px',
                    '13px',
                    '15px',
                    '16px',
                    '19px',
                    '24px',
                    '28px',
                    '30px',
                    '34px',
                    '38px',
                  ].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        editor?.chain().focus().setFontSize(size).run();
                        setFontSizeMenuOpen(false);
                      }}
                      className="block w-full px-3 py-1.5 text-left hover:bg-gray-100 text-sm"
                      type="button"
                    >
                      {size.replace('px', '')}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
