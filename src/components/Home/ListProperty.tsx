import { ChevronRight } from 'lucide-react';
import {Link} from 'react-router-dom';
import PropertyItem from './PropertyItem';

function ListProperty({title, data, link}: {title?: string, data?: any, link?: string}) {
    return (
        <div className='container mx-auto'>
            <div className="flex items-center justify-between mb-6 ">
                <h1 className="text-lg font-semibold">{title || "Title"}</h1>
                <Link to={link|| "/"} className="text-neutral-700 hover:underline flex items-center gap-1 text-sm">
                    View all
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {(data || [...Array(5)]).map((item:any, idx:number) => (
                    <PropertyItem key={idx} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ListProperty