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
    IconButton,
    Chip} from '@mui/material/';

function DocumentsTable({documents, isLoading}) {
    const StyledTableCell = variable.StyledTableCell;
    const StyledTableRow = variable.StyledTableRow;
    const style = variable.style;
    const heads = [
        "Document Number",
        "Subject",
        "Date",
        "Signatory",
        "Classification",
      ];


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
                {documents?.length == 0 ? 
                  (<documents key={document?.id}>
                    <StyledTableCell colSpan={6}>
                      <NoItems/>
                        </StyledTableCell>
                  </documents>) : 
                (documents?.map((document) => (
                  <StyledTableRow key={document.id}>
                    <StyledTableCell align="left">{document.documentNumber}</StyledTableCell> 
                    <StyledTableCell align="left">{document.subject}</StyledTableCell> 
                    <StyledTableCell align="left">{document.date}</StyledTableCell> 
                    <StyledTableCell align="left">{document.signatory}</StyledTableCell> 
                 
                    {document.confidential && document.urgent ? 
                        (<StyledTableCell className='cursor-pointer' align="center" ><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                        document.urgent ? 
                        (<StyledTableCell className='cursor-pointer' align="center" ><Chip label="urgent" color="error" /></StyledTableCell>) :
                        document.confidential ? 
                        (<StyledTableCell className='cursor-pointer' align="center"><Chip label="confidential" color="primary" /></StyledTableCell>)
                        : <StyledTableCell className='cursor-pointer' align="center" ></StyledTableCell>}
               
                  </StyledTableRow>
                )))}              
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}        
    </div>
  )
}

export default DocumentsTable