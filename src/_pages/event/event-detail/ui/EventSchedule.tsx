import type { ScheduleItem } from '@/shared/api/endpoints/event';

interface EventScheduleProps {
  schedules: ScheduleItem[];
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDateHeader(dateStr: string) {
  const date = new Date(dateStr);
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    dayOfWeek: DAYS[date.getDay()],
  };
}

export function EventSchedule({ schedules }: EventScheduleProps) {
  const grouped = schedules.reduce<Record<string, ScheduleItem[]>>(
    (acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    },
    {}
  );

  const dates = Object.keys(grouped).sort();

  return (
    <div>
      <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-gray-900 flex items-center gap-2">
        일정
      </h3>

      <div className="flex flex-col gap-10">
        {dates.map((date, dayIndex) => {
          const { month, day, dayOfWeek } = formatDateHeader(date);
          const items = grouped[date];

          return (
            <div
              key={date}
              className="flex flex-col md:flex-row gap-3 md:gap-6"
            >
              {/* 날짜 헤더 */}
              {/* 모바일: 가로 배치 (Day배지 + 날짜 + 요일) / 데스크탑: 세로 배치 + 세로선 */}
              <div className="flex md:flex-col md:items-center items-center gap-2 md:gap-0 shrink-0 md:w-20">
                <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full md:mb-2">
                  Day {dayIndex + 1}
                </span>
                <div className="flex items-baseline gap-1 md:flex-col md:items-center md:text-center md:mb-3">
                  <p className="text-lg md:text-2xl font-black text-gray-900 leading-none">
                    {month}/{day}
                  </p>
                  <p className="text-sm text-gray-400 font-medium md:mt-0.5">
                    ({dayOfWeek})
                  </p>
                </div>
                {/* 세로 연결선: 데스크탑만 */}
                <div className="hidden md:flex flex-1 w-px bg-gray-200" />
              </div>

              {/* 스케줄 카드 목록 */}
              <div className="flex-1 flex flex-col gap-2 pb-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 md:px-5 py-3 md:py-4 border border-gray-100"
                  >
                    <span className="text-sm md:text-base font-black text-primary shrink-0 w-12 md:w-14">
                      {item.time}
                    </span>
                    <div className="hidden md:block w-px h-8 bg-gray-200 shrink-0" />
                    <p className="text-gray-800 font-medium text-sm md:text-base">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
