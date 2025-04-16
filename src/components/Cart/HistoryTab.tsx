import { ICartResponseData } from '@/@types/types';
import { Card, CardContent } from '../ui/card';
import { IUserOrderHistory } from '@/@types/types';
import { useAllUserOrderQuery } from '@/api/orderService';
import HistoryCard from './HistoryCard';
import Loading from '../shared/Loading'; 

export interface CartProps {
  cart?: ICartResponseData;
}

export default function HistoryTab() {
  const status = 'release';
  const { data, error, isLoading ,isFetching} = useAllUserOrderQuery(status, {}); 
console.log({data, error, isLoading ,isFetching})
  return (
    <div className="w-full mx-auto py-4">
      <Card>
        <CardContent>
          {isLoading ? (
            <Loading text="Fetching purchase history..." />
          ) : error ? (
            <p className="text-center text-red-500">Failed to load history.</p>
          ) : data?.data?.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((purchase: IUserOrderHistory, index: number) => (
                <HistoryCard purchase={purchase} key={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No purchase history available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

