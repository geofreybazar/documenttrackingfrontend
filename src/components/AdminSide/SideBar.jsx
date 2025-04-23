import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';

function SideBar({isNotActiveStyle, isActiveStyle}) {
  return (
    <div className='py-4 flex flex-col gap-2 w-56'>
        <NavLink to="/"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <div className='flex gap-2'>
            <DashboardIcon/>  Dashboard
            </div>
        </NavLink>
        <NavLink to="/officecatalog"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
        <div className='flex gap-2'>
           <BusinessIcon/> Offices
        </div>
        </NavLink>
        <NavLink to="/user"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
        <div className='flex gap-2'>
            <PeopleIcon/> Users
        </div>
        </NavLink>
        <NavLink to="/documents"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
        <div className='flex gap-2'>
            <ArticleIcon/> Documents
        </div>
        </NavLink>
    </div>
  )
}

export default SideBar