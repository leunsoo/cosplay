interface SummaryCardInfoRowProps {
  icon: string;
  text: string;
}

export function SummaryCardInfoRow({ icon, text }: SummaryCardInfoRowProps) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="material-symbols-outlined text-gray-400 text-[18px] shrink-0">
        {icon}
      </span>
      <span className="truncate">{text}</span>
    </div>
  );
}
