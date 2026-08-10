interface ProductDescriptionProps {
  description: string | null;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  if (!description) {
    return (
      <div className="px-6 lg:px-8 pb-6 lg:pb-8">
        <div className="text-gray-500 text-center py-8">
          상품 설명이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-6 lg:px-8 pb-6 lg:pb-8">
        <div
          className="prose max-w-none text-gray-800 leading-relaxed mb-8 text-sm lg:text-base"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </>
  );
}
