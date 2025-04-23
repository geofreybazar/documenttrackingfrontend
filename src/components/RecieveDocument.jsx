import documentService from "../services/documentService";
import { Typography, Table, TableBody, TableContainer, TableHead, Tooltip, TableRow, Paper, Button, Chip } from '@mui/material/';
import variable from '../utils/variable.js';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

function RecieveDocument({user, 
        pendingdocuments, 
        setPendingdocuments, 
        toBeReceiveDocs, 
        setToBeReceiveDocs, 
        handleCloseToReceiveDocs,
        setOpenReceivedSnackBar,
        isLoading,
        setIsLoading}) {

const StyledTableCell = variable.StyledTableCell;
const StyledTableRow = variable.StyledTableRow;

const handleReceiveDocument = (id) => {
    setIsLoading(true)
    const newLog= {
        receivedBy: user.name,
        userId: user.id,
    };
    documentService.receiveDocument(id,newLog).then((res) => {
        setToBeReceiveDocs(toBeReceiveDocs.filter((toBeReceiveDoc) => toBeReceiveDoc.id !==id))
        setPendingdocuments(pendingdocuments.concat(res));
        setOpenReceivedSnackBar(true);
        setIsLoading(false)
    }).catch((error)=>{
        console.log(error)
        setIsLoading(false)
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
                <TableRow >
                <StyledTableCell>Document Number</StyledTableCell>
                <StyledTableCell align="center">Subject</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Signatory</StyledTableCell> 
                <StyledTableCell align="center">Classification</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {toBeReceiveDocs.map((toBeReceiveDoc) => (
                <StyledTableRow key={toBeReceiveDoc.id}>
                    <StyledTableCell className='cursor-pointer' component="th" scope="row">
                    {toBeReceiveDoc.documentNumber}
                    </StyledTableCell>
                    <StyledTableCell className='cursor-pointer' align="center">{toBeReceiveDoc.subject}</StyledTableCell>
                    <StyledTableCell className='cursor-pointer' align="center">{
                    `${new Date(toBeReceiveDoc.date.slice(0, 10)).getDate()} 
                    ${variable.months[new Date(toBeReceiveDoc.date.slice(0, 10)).getMonth()]} 
                    ${new Date(toBeReceiveDoc.date.slice(0, 10)).getFullYear()}`
                    }</StyledTableCell>
                    <StyledTableCell className='cursor-pointer'  align="center">{toBeReceiveDoc.signatory}</StyledTableCell>                                        
                    {toBeReceiveDoc.confidential && toBeReceiveDoc.urgent ? 
                    (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(toBeReceiveDoc.id)}><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                    toBeReceiveDoc.urgent ? 
                    (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(toBeReceiveDoc.id)}><Chip label="urgent" color="error" /></StyledTableCell>) :
                    toBeReceiveDoc.confidential ? 
                    (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(toBeReceiveDoc.id)}><Chip label="confidential" color="primary" /></StyledTableCell>)
                    : <StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(toBeReceiveDoc.id)}></StyledTableCell>}
                    <StyledTableCell align="center">
                    {isLoading ?
                        <LoadingButton  loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        onClick={() => handleReceiveDocument(toBeReceiveDoc.id)}>
                        Receive
                    </LoadingButton>  
                    : <Button variant="contained" onClick={() => handleReceiveDocument(toBeReceiveDoc.id)} >
                    Receive
                    </Button>}
                    </StyledTableCell>
                </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <center className="mt-2">
        <Button onClick={()=>handleCloseToReceiveDocs()} variant="contained">Close</Button>
        </center>
    </div>
  )
}

export default RecieveDocument