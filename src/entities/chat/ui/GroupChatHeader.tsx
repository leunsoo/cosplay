interface GroupChatHeaderProps {
  activeCount: number;
}

export function GroupChatHeader({ activeCount }: GroupChatHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        실시간 그룹 톡
      </h3>
      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
        {activeCount}명 접속 중
      </span>
    </div>
  );
}
