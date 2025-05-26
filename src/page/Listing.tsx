import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import EmptyCard from '@/components/Seller/Listing/EmptyCard';
import ListCard from '@/components/Seller/Listing/ListCard';
import { ApartmentOne, ApartmentTwo} from '@/assets';
import { emptyStates } from '@/CONSTANT/data';

type TabType = 'active' | 'paused' | 'under review' | 'sold' | 'bought';
const filterTabs:TabType[] = ['active', 'paused', 'under review', 'sold', 'bought'];

const dummyData = {
  active: [
    {
      id: 1,
      title: '3 Acres In Lekki',
      price: 120000,
      discountPrice: 135000,
      src: ApartmentOne,
    },
    {
      id: 2,
      title: '5 Hectares in Magodo',
      price: 85000,
      discountPrice: 95000,
      src: ApartmentTwo,
    },
  ],
  paused: [],
  'under review': [],
  sold: [],
  bought: [],
};

export default function MainDashboard() {
  const [selectedTab, setSelectedTab] = useState<TabType>('active');

  const handleTabChange = (tab: TabType) => setSelectedTab(tab);

  const data = dummyData[selectedTab] ?? [];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Properties</h1>
        <Button className="bg-primary text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add New listing
        </Button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium mb-8">
        {filterTabs.map((tab, i) => (
          <React.Fragment key={tab}>
            {tab === 'sold' && (
              <span className="mx-1 text-neutral-400 select-none">|</span>
            )}
            <button
              onClick={() => handleTabChange(tab)}
              className={cn(
                'px-3 py-1 rounded-full text-gray-500 transition ',
                selectedTab === tab
                  ? 'bg-primary/20 text-primary'
                  : ' bg-neutral-100 hover:bg-neutral-200'
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Content Area */}
      {data.length === 0 ? (
        <EmptyCard 
          image={emptyStates[selectedTab].image}
          title={emptyStates[selectedTab].title}
          text={emptyStates[selectedTab].text}
          buttonHref={emptyStates[selectedTab].buttonHref}
          buttonText={emptyStates[selectedTab].buttonText}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item:any) => (
            <ListCard
              key={item.id}
              src={item.src}
              title={item.title}
              price={item.price}
              discountPrice={item.discountPrice}
            />
          ))}
        </div>
      )}

     
    </div>
  );
}
