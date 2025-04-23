import { NoItems } from './';
import variable from '../utils/variable.js';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Table, 
  TableBody, 
  TableContainer, 
  TableHead, 
  Tooltip, 
  TableRow, 
  Paper, 
  IconButton,
  Chip } from '@mui/material/';

function ReturnedTableSearch({ 
  searchReturnedDocs, 
  returnedDocs, 
  handleOpenInfo, 
  handleOpenForward, 
  handleOpenDelete, 
  handleDoneDocument }) {

  const StyledTableCell = variable.StyledTableCell;
  const StyledTableRow = variable.StyledTableRow;

  return (
    <div>
      <TableContainer component={Paper} className='mt-5'>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className='bg-bluelight'>
              <TableRow>
                <StyledTableCell>Document Number</StyledTableCell>
                <StyledTableCell align="center">Subject</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Signatory</StyledTableCell>
                <StyledTableCell align="center">Classification</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              returnedDocs.length == 0 ? 
              (<StyledTableRow key={document.id}>
                <StyledTableCell colSpan={6}>
                  <NoItems/>
                    </StyledTableCell>
              </StyledTableRow>) :              
              
              (returnedDocs.filter((returnedDoc) => returnedDoc.documentNumber.toLowerCase().includes(searchReturnedDocs) || returnedDoc.subject.toLowerCase().includes(searchReturnedDocs)).map((returnedDoc) =>  (
                <StyledTableRow key={returnedDoc.id}>
                  <StyledTableCell className='cursor-pointer' component="th" scope="row" onClick={() => handleOpenInfo(returnedDoc.id)}>
                    {returnedDoc.documentNumber}
                  </StyledTableCell>
                  <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(returnedDoc.id)} align="center">{returnedDoc.subject}</StyledTableCell>
                  <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(returnedDoc.id)} align="center">{
                    `${new Date(returnedDoc.date.slice(0, 10)).getDate()} 
                    ${variable.months[new Date(returnedDoc.date.slice(0, 10)).getMonth()]} 
                    ${new Date(returnedDoc.date.slice(0, 10)).getFullYear()}`
                  }</StyledTableCell>
                  <StyledTableCell className='cursor-pointer'  onClick={() => handleOpenInfo(returnedDoc.id)} align="center">{returnedDoc.signatory}</StyledTableCell>
                  
                  {returnedDoc.confidential && returnedDoc.urgent ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(returnedDoc.id)}><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                  returnedDoc.urgent ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(returnedDoc.id)}><Chip label="urgent" color="error" /></StyledTableCell>) :
                  returnedDoc.confidential ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(returnedDoc.id)}><Chip label="confidential" color="primary" /></StyledTableCell>)
                  : <StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(returnedDoc.id)}></StyledTableCell>}
                  
                  <StyledTableCell align="center">

                    <Tooltip title="Forward">
                      <IconButton onClick={() => handleOpenForward(returnedDoc.id)}>
                        <IosShareIcon/>                      
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Mark as done">
                      <IconButton onClick={() => handleDoneDocument(returnedDoc.id)}>
                        <CheckCircleOutlineIcon/>                      
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleOpenDelete(returnedDoc.id)}>
                        <DeleteForeverIcon/>                      
                      </IconButton>
                    </Tooltip>                    

                  </StyledTableCell>
                </StyledTableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default ReturnedTableSearch