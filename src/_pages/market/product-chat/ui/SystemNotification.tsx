interface SystemNotificationProps {
  message: string;
  subMessage?: string;
}

export function SystemNotification({
  message,
  subMessage,
}: SystemNotificationProps) {
  return (
    <div className="w-full bg-[#F5F7FA] rounded-lg px-10 py-4 text-center">
      <p className="text-[15px] text-[#2C3E50] font-semibold mb-2">{message}</p>
      {subMessage && (
        <p className="text-[13px] text-[#5A6C7D] leading-relaxed whitespace-pre-line">
          {subMessage}
        </p>
      )}
    </div>
  );
}
