import { NoItems } from './';
import {
        Table, 
        TableBody, 
        TableContainer, 
        TableHead, 
        Tooltip, 
        TableRow, 
        Paper, 
        IconButton,
        Chip} from '@mui/material/';
import variable from '../utils/variable.js'
import IosShareIcon from '@mui/icons-material/IosShare';

function PendingDocumentsTable({ pendingdocuments, handleOpenInfo, handleOpenforward }) {
 
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
          {pendingdocuments.length == 0 ? 
              (<StyledTableRow key={document.id}>
                <StyledTableCell colSpan={6}>
                  <NoItems/>
                </StyledTableCell>
              </StyledTableRow>) :(
            pendingdocuments.map((pendingdocument) => (
              <StyledTableRow key={pendingdocument.id}>
                <StyledTableCell className='cursor-pointer' component="th" scope="row" onClick={() => handleOpenInfo(pendingdocument.id)}>
                  {pendingdocument.documentNumber}
                </StyledTableCell>
                <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(pendingdocument.id)} align="center">{pendingdocument.subject}</StyledTableCell>
                <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(pendingdocument.id)} align="center">{
                  `${new Date(pendingdocument.date.slice(0, 10)).getDate()} 
                  ${variable.months[new Date(pendingdocument.date.slice(0, 10)).getMonth()]} 
                  ${new Date(pendingdocument.date.slice(0, 10)).getFullYear()}`
                }</StyledTableCell>
                <StyledTableCell className='cursor-pointer'  onClick={() => handleOpenInfo(pendingdocument.id)} align="center">{pendingdocument.signatory}</StyledTableCell>
                
                {pendingdocument.confidential && pendingdocument.urgent ? 
                (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(pendingdocument.id)}><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                pendingdocument.urgent ? 
                (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(pendingdocument.id)}><Chip label="urgent" color="error" /></StyledTableCell>) :
                pendingdocument.confidential ? 
                (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(pendingdocument.id)}><Chip label="confidential" color="primary" /></StyledTableCell>)
                : <StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(pendingdocument.id)}></StyledTableCell>}
        
                <StyledTableCell align="center">
                  <Tooltip title="Forward">
                  <IconButton onClick={() => handleOpenforward(pendingdocument.id)}>
                    <IosShareIcon/>                      
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

export default PendingDocumentsTable