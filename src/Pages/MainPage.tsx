// import type { FC } from "react"
import Header from '../Components/Main/Header/Header';
import SideMenu from '../Components/Main/SideMenu/SideMenu';
// import RecentlyViewed from '../Components/Main/BoardList/RecentlyViewed';
import UserWorkspaces from '../Components/Main/BoardList/UserWorkspaces';

function MainPage() {
    return (
        <div className='flex-1'>
            <Header />
            <div className="flex">
                <SideMenu />
                <div className="flex-col w-full">
                    {/* <RecentlyViewed /> */}
                    <UserWorkspaces />    
                </div>
            </div>
        </div>
    )
}

export default MainPage