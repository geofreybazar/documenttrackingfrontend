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
import variable from '../utils/variable.js';
import IosShareIcon from '@mui/icons-material/IosShare';

function PendingDocumentsTableSearch({searchPendingDocs, pendingdocuments, handleOpenInfo, handleOpenforward}) {
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
            pendingdocuments.filter((document) => document.documentNumber.toLowerCase().includes(searchPendingDocs) || document.subject.toLowerCase().includes(searchPendingDocs)).map((document) => (
              <StyledTableRow key={document.id}>
                <StyledTableCell className='cursor-pointer' component="th" scope="row" onClick={() => handleOpenInfo(document.id)}>
                  {document.documentNumber}
                </StyledTableCell>
                <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)} align="center">{document.subject}</StyledTableCell>
                <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)} align="center">{
                  `${new Date(document.date.slice(0, 10)).getDate()} 
                  ${variable.months[new Date(document.date.slice(0, 10)).getMonth()]} 
                  ${new Date(document.date.slice(0, 10)).getFullYear()}`
                }</StyledTableCell>
                <StyledTableCell className='cursor-pointer'  onClick={() => handleOpenInfo(document.id)} align="center">{document.signatory}</StyledTableCell>
                
                {document.confidential && document.urgent ? 
                        (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                        document.urgent ? 
                        (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="urgent" color="error" /></StyledTableCell>) :
                        document.confidential ? 
                        (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="confidential" color="primary" /></StyledTableCell>)
                        : <StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}></StyledTableCell>}
                
                <StyledTableCell align="center">
                  <Tooltip title="Forward">
                  <IconButton onClick={() => handleOpenforward(document.id)}>
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

export default PendingDocumentsTableSearch