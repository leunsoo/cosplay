interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-flex items-center px-1 py-0.5 rounded-xs bg-black/50 text-white text-[11px] font-medium">
      {label}
    </span>
  );
}
