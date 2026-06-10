interface EventAboutProps {
  description?: string;
}

export function EventAbout({ description }: EventAboutProps) {
  return (
    <div>
      <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-gray-900 flex items-center gap-2">
        개요
      </h3>
      <p className="text-md md:text-lg text-gray-600 leading-relaxed">
        {description || '상세 설명이 없습니다.'}
      </p>
    </div>
  );
}
