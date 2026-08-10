interface MeetUpAboutProps {
  description: string;
}

export function MeetUpAbout({ description }: MeetUpAboutProps) {
  return (
    <div>
      <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-gray-900 flex items-center gap-2">
        개요
      </h3>
      <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
}
