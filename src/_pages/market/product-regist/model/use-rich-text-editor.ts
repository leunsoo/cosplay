'use client';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style/text-style';
import { FontSize } from '@tiptap/extension-text-style/font-size';
import { useEffect, useCallback, useRef, useState } from 'react';
import { DESCRIPTION_PLACEHOLDER } from './product-form';
import { CustomImageExtension } from '../ui/RichTextEditor/CustomImageExtension';

interface UseRichTextEditorParams {
  value: string;
  onChange: (value: string) => void;
}

// tiptap 에디터 인스턴스 + 이미지 업로드/크롭 + 폰트 사이즈 추적
export function useRichTextEditor({
  value,
  onChange,
}: UseRichTextEditorParams) {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>('');
  const [editingImageSrc, setEditingImageSrc] = useState<string | null>(null);
  const [currentFontSize, setCurrentFontSize] = useState<string>('16');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (!editor) return;

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
    },
    [editor, editingImageSrc]
  );

  const setFontSize = useCallback(
    (size: string) => {
      editor?.chain().focus().setFontSize(size).run();
    },
    [editor]
  );

  return {
    editor,
    fileInputRef,
    cropModalOpen,
    imageToCrop,
    currentFontSize,
    handleImageUpload,
    handleCropSave,
    setFontSize,
    closeCropModal: () => setCropModalOpen(false),
  };
}
