import AppTabs from '../shared/AppTabs';
import ProfileSection from '../shared/ProfileSection';
// import BuyerCartTab from './BuyerCartTab';
import HistoryTab from './HistoryTab';
import PendingOrderTab from './PendingOrderTab';

export default function BuyerDashboard() {
 

  const tabsData = [
    // { label: "All User Cart", value: "User Cart", content: <BuyerCartTab  /> },
    { label: "All Pending Order", value: "Pending Order", content: <PendingOrderTab  /> },
    { label: "All Order History", value: "History of Order", content: <HistoryTab  /> },
  ];

  return (
    <div className="container mx-auto  py-10 w-full">
      <h1 className="text-2xl font-bold mb-6">Buyer Account</h1>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <ProfileSection />
        <AppTabs tabs={tabsData} defaultValue={tabsData[0]?.value} />
      </div>
    </div>
  );
}

