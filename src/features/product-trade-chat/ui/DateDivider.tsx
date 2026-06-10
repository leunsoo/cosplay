interface DateDividerProps {
  date: string;
}

export function DateDivider({ date }: DateDividerProps) {
  return (
    <div className="flex justify-center my-2">
      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
        {date}
      </span>
    </div>
  );
}
