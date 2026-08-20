export interface Tab {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
}

export function TabNavigation({ tabs }: TabNavigationProps) {
  return (
    <div className="mb-1">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={
              tab.isActive
                ? 'flex-1 py-3 text-sm font-bold text-primary'
                : 'flex-1 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors'
            }
          >
            {tab.label}
            <span
              className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${
                tab.isActive ? 'bg-primary/10' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
