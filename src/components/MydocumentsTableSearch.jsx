import React from 'react';
import {Table, TableBody, TableContainer, TableHead, Tooltip, TableRow, Paper, IconButton, Chip } from '@mui/material/';
import VisibilityIcon from '@mui/icons-material/Visibility';
import variable from '../utils/variable';

function MydocumentsTableSearch({searchMydocs, documents, handleOpenInfo}) {

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
                    {documents.length == 0 ? 
                    (<StyledTableRow key={document.id}>
                        <StyledTableCell colSpan={5}>
                        <NoItems/>
                            </StyledTableCell>
                    </StyledTableRow>) :
                    (documents.filter((document) => document.documentNumber.toLowerCase().includes(searchMydocs) || document.subject.toLowerCase().includes(searchMydocs)).map((document) => (
                    <StyledTableRow key={document.id}>
                        <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)} component="th" scope="row">
                            {document.documentNumber}
                        </StyledTableCell>
                        <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)} align="center">
                            {document.subject}
                        </StyledTableCell>
                        <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)} align="center">{
                            `${new Date(document.date.slice(0, 10)).getDate()} 
                            ${variable.months[new Date(document.date.slice(0, 10)).getMonth()]} 
                            ${new Date(document.date.slice(0, 10)).getFullYear()}`
                        }</StyledTableCell>
                        <StyledTableCell className='cursor-pointer' onClick={() => handleOpenInfo(document.id)} align="center">
                            {document.signatory}
                        </StyledTableCell>

                        {document.confidential && document.urgent ? 
                        (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                        document.urgent ? 
                        (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="urgent" color="error" /></StyledTableCell>) :
                        document.confidential ? 
                        (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="confidential" color="primary" /></StyledTableCell>)
                        : <StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}></StyledTableCell>}
                        
                        <StyledTableCell align="center">
                            <Tooltip title="View">
                                <IconButton onClick={() => handleOpenInfo(document.id)}>
                                    <VisibilityIcon/>                      
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

export default MydocumentsTableSearch