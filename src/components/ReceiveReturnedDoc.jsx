import { useState } from "react";
import documentService from "../services/documentService";
import { Typography, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material/';
import variable from '../utils/variable.js'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

function ReceiveReturnedDoc({user, 
        setToReceiveReturnedDocs,
        toReceiveReturnedDocs,
        returnedDocs,
        setReturnedDocs,
        handleClosetoReceiveReturnedDocs,
        setOpenReceivedSnackBar}) {

const StyledTableCell = variable.StyledTableCell;
const StyledTableRow = variable.StyledTableRow;
const [loading, setLoading] = useState(false)

const handleReceiveDocument = (id) => {
    setLoading(true)
    const newLog= {
        receivedBy: user.name,
        userId: user.id,
    };
    documentService.receiveDocument(id,newLog).then((res) => {
      setToReceiveReturnedDocs(toReceiveReturnedDocs.filter((toBeReceiveDoc) => toBeReceiveDoc.id !==id))
      setReturnedDocs(returnedDocs.concat(res));
      setOpenReceivedSnackBar(true);
      setLoading(false);
    }).catch((error)=>{
        console.log(error);
        setLoading(false);
    });
};

  return (
    <div>
        <Typography variant="h5">
        To Receive Documents
        </Typography> 
        
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
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
                {toReceiveReturnedDocs.map((toReceiveReturnedDoc) => (
                <StyledTableRow key={toReceiveReturnedDoc.id}>
                    <StyledTableCell className='cursor-pointer' component="th" scope="row">
                    {toReceiveReturnedDoc.documentNumber}
                    </StyledTableCell>
                    <StyledTableCell className='cursor-pointer' align="center">{toReceiveReturnedDoc.subject}</StyledTableCell>
                    <StyledTableCell className='cursor-pointer' align="center">{
                    `${new Date(toReceiveReturnedDoc.date.slice(0, 10)).getDate()} 
                    ${variable.months[new Date(toReceiveReturnedDoc.date.slice(0, 10)).getMonth()]} 
                    ${new Date(toReceiveReturnedDoc.date.slice(0, 10)).getFullYear()}`
                    }</StyledTableCell>
                    <StyledTableCell className='cursor-pointer'  align="center">{toReceiveReturnedDoc.signatory}</StyledTableCell>
                    
                    {toReceiveReturnedDoc.confidential && toReceiveReturnedDoc.urgent ? 
                    (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(toReceiveReturnedDoc.id)}><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                    toReceiveReturnedDoc.urgent ? 
                    (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(toReceiveReturnedDoc.id)}><Chip label="urgent" color="error" /></StyledTableCell>) :
                    toReceiveReturnedDoc.confidential ? 
                    (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(toReceiveReturnedDoc.id)}><Chip label="confidential" color="primary" /></StyledTableCell>)
                    : <StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(toReceiveReturnedDoc.id)}></StyledTableCell>}
                    
                    <StyledTableCell align="center">
                        {loading ?
                            <LoadingButton  loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            onClick={() => handleReceiveDocument(toReceiveReturnedDoc.id)}>
                            Receive
                            </LoadingButton>  
                            : <Button variant="contained" onClick={() => handleReceiveDocument(toReceiveReturnedDoc.id)} >
                            Receive
                            </Button>}
                    </StyledTableCell>
                </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <center className="mt-2">
            <Button onClick={()=>handleClosetoReceiveReturnedDocs()} variant="contained">Close</Button>
        </center>
    </div>
  )
}

export default ReceiveReturnedDoc