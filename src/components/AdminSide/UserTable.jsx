import { useEffect, useState } from 'react';
import variable from '../../utils/variable';
import userService from '../../services/userService';
import NoItems from '../NoItems';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Pop from './Pop';
import EditUser from './EditUser';
import Delete from './Delete';
import LoadingSpinner from '../LoadingSpinner';
import {Table, 
    TableBody, 
    TableContainer, 
    TableHead, 
    Tooltip, 
    TableRow, 
    Paper, 
    IconButton} from '@mui/material/';

function UserTable({users,setUsers,listOfffices, isLoading}) {  
  const [openEditUser, setOpenEditUser] = useState(false);
  const handleClose = () => setOpenEditUser(false);
  const [userInfo, setuserInfo] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleOpenEditUser = (userInformation) => {
    setuserInfo(userInformation)
    setOpenEditUser(true)
  };  
  
  const handleOpenDeleteModal = (userInfo) => {    
    setDeleteUserId(userInfo);
    setOpenDeleteModal(true);
  };

  const StyledTableCell = variable.StyledTableCell;
  const StyledTableRow = variable.StyledTableRow;
  const style = variable.style;

  const heads = [
    "Rank",
    "Name",
    "Account Number",
    "Email",
    "Assignment",
    "Role",
    "action",
  ]
  return (
    <div className='max-h-screen overflow-y-scroll'>
      {isLoading ? (
      <div className='w-full h-96 flex items-center justify-center'> 
        <LoadingSpinner/> 
      </div>
      ) : (
        <div>
          <TableContainer component={Paper}>          
            <Table stickyHeader aria-label="sticky table" >
              <TableHead >
                <TableRow >
                  {heads.map((head,index) => (
                      <StyledTableCell key={index} style={{ backgroundColor: '#1565C0' }} align="center">{head}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
            
              <TableBody>
                {users?.length == 0 ? 
                  (<StyledTableRow key={users?.id}>
                    <StyledTableCell colSpan={6}>
                      <NoItems/>
                        </StyledTableCell>
                  </StyledTableRow>) : 
                (users?.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell className='cursor-pointer' component="th" scope="row">
                      {user.rank}
                    </StyledTableCell>   
                    <StyledTableCell align="center">{user.name}</StyledTableCell>           
                    <StyledTableCell align="center">{user.accountNumber}</StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell align="center">{user.office}</StyledTableCell>
                    <StyledTableCell align="center">{user.role}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleOpenEditUser(user)} >
                          <EditIcon/>                      
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleOpenDeleteModal(user)}>
                          <DeleteForeverIcon/>                      
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                )))}
              
              </TableBody>
            </Table>
          </TableContainer>
          <Pop openAddUser={openEditUser} handleClose={handleClose}>
              <EditUser 
              userInfo={userInfo}
              setUsers={setUsers}
              listOfffices={listOfffices}
              handleClose={handleClose}
              users={users}
              />
          </Pop>

          <Pop openAddUser={openDeleteModal} handleClose={handleCloseDeleteModal}>
              <Delete 
                deleteUserId={deleteUserId} 
                users={users}
                setUsers={setUsers} 
                handleCloseDeleteModal={handleCloseDeleteModal}                 
              />
          </Pop>
        </div>
      )}        
    </div>
  )
}
export default UserTable