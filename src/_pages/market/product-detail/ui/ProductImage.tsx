interface ProductImageProps {
  mainImage: string;
}

export function ProductImage({ mainImage }: ProductImageProps) {
  return (
    <div className="w-full max-w-120 shrink-0 flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-square w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative group">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${mainImage}')`,
          }}
        ></div>
      </div>
    </div>
  );
}
