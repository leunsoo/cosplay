import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewProps,
} from '@tiptap/react';
import { useState } from 'react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
    };
  }
}

interface CustomImageNodeViewProps extends NodeViewProps {
  onEdit?: (src: string) => void;
}

function ImageNodeView({
  node,
  deleteNode,
  selected,
  onEdit,
}: CustomImageNodeViewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NodeViewWrapper className="inline-block relative">
      <div
        className="relative inline-block"
        data-drag-handle
        contentEditable={false}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          title={node.attrs.title || ''}
          className={`max-w-full h-auto cursor-grab ${
            selected ? 'ring-2 ring-primary' : ''
          }`}
        />
        {(isHovered || selected) && (
          <div className="absolute top-2 right-2 flex gap-1 bg-white rounded-lg shadow-lg p-1">
            {/* 편집 버튼 — 데스크탑 전용 */}
            <button
              onClick={() => onEdit?.(node.attrs.src)}
              className="hidden md:flex p-1.5 hover:bg-gray-100 rounded text-gray-700"
              type="button"
              title="편집"
            >
              <span className="material-symbols-outlined text-[20px]">
                edit
              </span>
            </button>
            <button
              onClick={deleteNode}
              className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
              type="button"
              title="삭제"
            >
              <span className="material-symbols-outlined text-[20px]">
                delete
              </span>
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}

const dragImagePluginKey = new PluginKey('dragImage');

export const CustomImageExtension = (onEdit?: (src: string) => void) =>
  Node.create({
    name: 'customImage',
    group: 'inline',
    inline: true,
    draggable: true,

    addAttributes() {
      return {
        src: { default: null },
        alt: { default: null },
        title: { default: null },
        width: { default: null },
        height: { default: null },
      };
    },

    parseHTML() {
      return [{ tag: 'img[src]' }];
    },

    renderHTML({ HTMLAttributes }) {
      return ['img', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
      return ReactNodeViewRenderer((props: NodeViewProps) => (
        <ImageNodeView {...props} onEdit={onEdit} />
      ));
    },

    addCommands() {
      return {
        setImage:
          (options: { src: string; alt?: string; title?: string }) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options,
            });
          },
      };
    },

    addProseMirrorPlugins() {
      // dragstart 시점에 원본 위치를 저장
      let dragFromPos: number | null = null;
      let dragToPos: number | null = null;

      return [
        new Plugin({
          key: dragImagePluginKey,
          props: {
            handleDOMEvents: {
              dragstart(view, event) {
                dragFromPos = null;
                dragToPos = null;

                const target = event.target as HTMLElement;
                // data-drag-handle 내부 또는 img 태그에서 드래그 시작 확인
                const wrapper = target.closest('[data-drag-handle]');
                if (!wrapper) return false;

                // 드래그 시작 좌표로 노드 위치 파악
                const pos = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                if (!pos) return false;

                // 해당 위치의 노드가 customImage인지 확인
                const node = view.state.doc.nodeAt(pos.pos);
                const resolvedNode =
                  node?.type.name === 'customImage'
                    ? { node, pos: pos.pos }
                    : (() => {
                        // pos.inside로 부모 노드 확인
                        const $pos = view.state.doc.resolve(pos.pos);
                        for (let d = $pos.depth; d >= 0; d--) {
                          const n = $pos.node(d);
                          if (n.type.name === 'customImage') {
                            return { node: n, pos: $pos.before(d) };
                          }
                        }
                        return null;
                      })();

                if (!resolvedNode) return false;

                dragFromPos = resolvedNode.pos;
                dragToPos = resolvedNode.pos + resolvedNode.node.nodeSize;
                return false; // 기본 dragstart 동작은 유지
              },
            },

            handleDrop(view, event, slice) {
              // customImage 드래그가 아니면 기본 동작
              if (dragFromPos === null || dragToPos === null) return false;

              // 슬라이스에 customImage가 있는지 확인
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              let draggedNode: any = null;
              slice.content.forEach((node) => {
                if (node.type.name === 'customImage') draggedNode = node;
              });
              if (!draggedNode) {
                dragFromPos = null;
                dragToPos = null;
                return false;
              }

              const dropPos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });
              if (!dropPos) {
                dragFromPos = null;
                dragToPos = null;
                return false;
              }

              const { state, dispatch } = view;
              const from = dragFromPos;
              const to = dragToPos;

              let insertPos = dropPos.pos;
              // 원본 이후에 드랍하는 경우 위치 보정
              if (insertPos > to) {
                insertPos -= draggedNode.nodeSize;
              }
              insertPos = Math.max(
                0,
                Math.min(insertPos, state.doc.content.size)
              );

              // 하나의 트랜잭션: 원본 삭제 + 새 위치 삽입
              const tr = state.tr
                .delete(from, to)
                .insert(insertPos, draggedNode);
              dispatch(tr);

              dragFromPos = null;
              dragToPos = null;
              return true;
            },
          },
        }),
      ];
    },
  });
