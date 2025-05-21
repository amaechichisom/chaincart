import { useAllUserOrderQuery } from '@/api/orderService'
import { Card, CardContent } from '../ui/card'
import HistoryCard from './HistoryCard'
import { IUserOrderHistory } from '@/@types/types';
import Loading from '../shared/Loading';

export default function PendingOrderTab() {
  const status = "pending";
  const { data, error, isLoading,isFetching} = useAllUserOrderQuery(status,{});
  console.log({data, error, isLoading,isFetching})
  return (
      <div className="w-full mx-auto py-4">
        <Card>
          <CardContent>
            {(isLoading && isFetching) ? (
              <Loading/>
            ) : error ? (
              <p className="text-center text-red-500">Failed to load history.</p>
            ) : data?.data?.length > 0 ? (
              <div className="space-y-4">
                {data.data.map((purchase: IUserOrderHistory, index: number) => (
                  <HistoryCard purchase={purchase} key={index} showActions />
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
