import { useState } from 'react';
import variable from '../../utils/variable';
import NoItems from '../NoItems';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Pop from './Pop';
import EditOFfice from './EditOFfice';
import DeleteOFfice from './DeleteOFfice';
import LoadingSpinner from '../LoadingSpinner';
import {Table, 
    TableBody, 
    TableContainer, 
    TableHead, 
    Tooltip, 
    TableRow, 
    Paper, 
    IconButton} from '@mui/material/';

function OfficeTable({listOfffices, setListOfffices}) {  
  const [isLoading, setIsLoading] = useState(false);
  const [openEditOffice, setOpenEditOffice] = useState(false)
  const handleClose = () => setOpenEditOffice(false);
  const [officeInfo, setOfficeInfo] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)
  const [deleteOfficeId, setDeleteOfficeId] = useState(null);

  const handleOpenEditOffice = (userInformation) => {
    setOfficeInfo(userInformation)
    setOpenEditOffice(true)
  };  
  
  const handleOpenDeleteModal = (userInfo) => {    
    setDeleteOfficeId(userInfo);
    setOpenDeleteModal(true);
  };

  const StyledTableCell = variable.StyledTableCell;
  const StyledTableRow = variable.StyledTableRow;
  const style = variable.style;

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
                      <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="center">Name of office</StyledTableCell>
                      <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="center">Email Address</StyledTableCell>
                      <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
                          
              <TableBody>
                {listOfffices?.length == 0 ? 
                  (<listOfffices key={office?.id}>
                    <StyledTableCell colSpan={6}>
                      <NoItems/>
                        </StyledTableCell>
                  </listOfffices>) : 
                (listOfffices?.map((office) => (
                  <StyledTableRow key={office.id}>
                    <StyledTableCell align="left">{office.name}</StyledTableCell> 
                    <StyledTableCell align="left">{office.email}</StyledTableCell> 
                    <StyledTableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleOpenEditOffice(office)}>
                          <EditIcon/>                      
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleOpenDeleteModal(office)}>
                          <DeleteForeverIcon/>                      
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                )))}              
              </TableBody>
            </Table>
          </TableContainer>
          <Pop openAddUser={openEditOffice} handleClose={handleClose}>
              <EditOFfice 
              officeInfo={officeInfo}
              setListOfffices={setListOfffices}
              listOfffices={listOfffices}
              handleClose={handleClose}
              />
          </Pop> 

          <Pop openAddUser={openDeleteModal} handleClose={handleCloseDeleteModal}>
              <DeleteOFfice 
                setListOfffices={setListOfffices}
                listOfffices={listOfffices}
                deleteOfficeId={deleteOfficeId} 
                handleCloseDeleteModal={handleCloseDeleteModal}                 
              />
          </Pop>
        </div>
      )}        
    </div>
  )
}

export default OfficeTable