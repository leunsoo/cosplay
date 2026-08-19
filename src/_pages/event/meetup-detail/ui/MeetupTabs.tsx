export type MeetupTabType = 'details' | 'community';

interface MeetupTabsProps {
  activeTab: MeetupTabType;
  onTabChange: (tab: MeetupTabType) => void;
}

export function MeetupTabs({ activeTab, onTabChange }: MeetupTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav aria-label="Tabs" className="-mb-px flex md:gap-12">
        <button
          onClick={() => onTabChange('details')}
          className={`flex-1 md:flex-none border-b-2 py-4 px-1 text-sm font-bold transition-colors ${
            activeTab === 'details'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Meetup Details
        </button>
        <button
          onClick={() => onTabChange('community')}
          className={`flex-1 md:flex-none border-b-2 py-4 px-1 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'community'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Community
        </button>
      </nav>
    </div>
  );
}
