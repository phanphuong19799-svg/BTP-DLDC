import { useState } from 'react';
import { MasterDataUpdateTab } from './MasterDataUpdateTab';

type TabType = 'review' | 'history' | 'version' | 'publish';

export function MasterDataUpdatePage() {
  const [activeTab, setActiveTab] = useState<TabType>('review');

  return (
    <div className="space-y-6">
      {/* Tab Content */}
      <MasterDataUpdateTab initialTab={activeTab} />
    </div>
  );
}