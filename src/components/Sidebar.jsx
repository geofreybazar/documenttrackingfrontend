import logo from '../assets/logo.svg';
import { useEffect, useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DraftsIcon from '@mui/icons-material/Drafts';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import ArchiveIcon from '@mui/icons-material/Archive';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import userService from '../services/userService';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import SideBar from './AdminSide/SideBar';

function Sidebar( {user, setUser, socket} ) {

    const [logOutLoading, setLogOutLoading] = useState(false);
    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    const isNotActiveStyle = 'relative flex flex-col justify-center h-10 capitalize px-5 transition-all duration-100 ease-in-out';
    const isActiveStyle = 'relative flex flex-col justify-center bg-bluelight px-5 border rounded-md h-10 text-white capitalize transition-all duration-100 ease-in-out';
    
    const navigate = useNavigate();
    const handleLogout = () => {
      setLogOutLoading(true)
      userService.logout(user).then((res)=> {
        window.localStorage.removeItem('loggedUser');
        setUser(null);
        socket.disconnect();
        navigate('/login');  
        setLogOutLoading(false)
        console.log(res);
      }).catch((error) => {
        console.log(error)
        setLogOutLoading(false)
      })          
    };

  return (
    <div className='w-60 h-screen'>
        <div className='h-full flex flex-col justify-between items-center w-full gap-2 text-left py-5 justify-betwwen'>
          <div>
            <div className='h-20 p-1'>
                <img className='h-full w-full' src={logo} alt="" />
            </div>     
            <div className='text-center'>
             <p className='font-semibold'>{user.office}</p>
             <p>{user.rank} {user.name}</p>               
            </div>      
              
            <div>
              {user.role === 'user' ? (
                <div className='py-4 flex flex-col gap-2 w-56'>
                  <div className='flex justify-center w-full'>
                    <Link to="/addcontact" >
                      <Button variant="contained" color="error" size="large" startIcon={<AddIcon/>}>
                        Create Document
                      </Button>       
                    </Link>
                  </div>
                  <NavLink to="/"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                    <div className='flex gap-2'>
                    <DashboardIcon/> Dashboard
                    </div>
                  </NavLink>
                  <NavLink to="/draftdocuments"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                    <div className='flex gap-2'>
                      <DraftsIcon/> Draft
                    </div>
                  </NavLink>  
                  <NavLink to="/mydocuments"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                    <div className='flex gap-2'>
                      <DocumentScannerIcon/> My Documents
                    </div>
                  </NavLink>
                  <NavLink to="/pendingdocuments"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                    <div className='flex gap-2'>
                      <PendingIcon/>Pending Documents
                    </div>
                  </NavLink> 
                  <NavLink to="/returneddocuments"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                    <div className='flex gap-2'>
                      <AssignmentReturnIcon/>Returned Documents
                    </div>
                  </NavLink> 
                  <NavLink to="/archivedocuments"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                    <div className='flex gap-2'>
                      <ArchiveIcon/>Archived Documents
                    </div>
                  </NavLink> 
                  <NavLink to="/historylogs"  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                    <div className='flex gap-2'>
                      <WorkHistoryIcon/>History Logs
                    </div>
                  </NavLink> 
                </div>
              ) : (
                <div className='py-4 flex flex-col gap-2 w-56'>
                  <SideBar 
                    isNotActiveStyle = {isNotActiveStyle}
                    isActiveStyle = {isActiveStyle}
                  />
                </div>
              )}                                      
            </div>
          </div>      
          <div className='flex flex-col items-center justify-center'>
            <div onClick={handleLogout}>
              {logOutLoading ?
                      <LoadingButton  loading
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                      type="submit">
                      Logout
                  </LoadingButton>  
                  : 
                  <Button className='cursor-pointer' variant="contained">
                  <LogoutIcon fontSize="small" />  
                  Logout              
                  </Button> 
              } 
            </div>
          
            <div className='text-center'>
              <Typography variant="caption">
                  Information Technology and Communication Unit, BFP-NCR CY2024
              </Typography>
            </div>
          </div>            
        </div>       
    </div>
  )
}

export default Sidebar