import { useAppSelector } from '../../../hooks/redux';
import BoardCard from '../../BoardCards/BoardCard';

function RecentlyViewed() {
    return ( 
        <div className="w-full p-6">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h1 className="text-md font-semibold">Recently Viewed</h1>
            </div>

            <div className="flex gap-10 mt-4">
                <div className="flex gap-10 mt-4 flex-wrap">
                {useAppSelector(s => s.board.boards).map(board => (
                  <div key={board.id} className="w-60 h-32 rounded-lg">
                    <BoardCard board={board} />
                  </div>
                ))}
            </div>
            </div>
            
        </div>
     );
}

export default RecentlyViewed;