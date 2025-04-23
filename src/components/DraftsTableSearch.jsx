import React from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import variable from '../utils/variable';
import {Table, 
    TableBody, 
    TableContainer, 
    TableHead, 
    Tooltip, 
    TableRow, 
    Paper, 
    IconButton,
    Chip } from '@mui/material/';

function DraftsTableSearch({searchDraft, draftdocuments, handleOpenInfo, handleOpenforward, handleOpenDelete}) {

    const StyledTableCell = variable.StyledTableCell;
    const StyledTableRow = variable.StyledTableRow;

  return (
    <div>
        <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow >
              <StyledTableCell style={{ backgroundColor: '#1565C0' }}>Document Number</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="center">Subject</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="center">Date</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="center">Signatory</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="center">Classification</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="center">Action</StyledTableCell>      
            </TableRow>
          </TableHead>
          <TableBody>
            {draftdocuments.filter((document) => document.documentNumber.toLowerCase().includes(searchDraft) || document.subject.toLowerCase().includes(searchDraft)).map((document) =>
                <StyledTableRow key={document.id}>
                <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)}component="th" scope="row">
                    {document.documentNumber}
                </StyledTableCell>
                <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)}align="center">{document.subject}</StyledTableCell>
                <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)}align="center">{
                    `${new Date(document.date.slice(0, 10)).getDate()} 
                    ${variable.months[new Date(document.date.slice(0, 10)).getMonth()]} 
                    ${new Date(document.date.slice(0, 10)).getFullYear()}`
                }</StyledTableCell>
                <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)} align="center">{document.signatory}</StyledTableCell>

                {document.confidential && document.urgent ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                  document.urgent ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="urgent" color="error" /></StyledTableCell>) :
                  document.confidential ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="confidential" color="primary" /></StyledTableCell>)
                  : <StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}></StyledTableCell>
                }

                <StyledTableCell align="center">

                    <Tooltip title="Forward">
                    <IconButton onClick={() => handleOpenforward(document.id)}>
                    <IosShareIcon/>                      
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                    <IconButton onClick={() => handleOpenDelete(document.id)}>
                        <DeleteForeverIcon/>                      
                    </IconButton>
                    </Tooltip>

                </StyledTableCell>
                </StyledTableRow>)}
         </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DraftsTableSearch