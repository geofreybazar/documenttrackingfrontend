import { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Tooltip, Modal } from '@mui/material/';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import urgent from "../assets/urgent.svg";
import confidential from "../assets/confidential.svg";
import variable from "../utils/variable";
import PdfGenerator from './PdfGenerator';

function DocumentView({ clickeDocument,
    clickedPendingDocument,
    document,
    handlEdit,
    handleSaveSignedCopy ,
    handleChangeSignedCopy, 
    signedCopy,
    changeSignedCopy,
    setChangeSignedCopy,
    setSignedCopy,
    setsignedDocLoading}) {

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const StyledTableCell = variable.StyledTableCellInfo; 
    const StyledTableRow = variable.StyledTableRow;
    const VisuallyHiddenInput = variable.VisuallyHiddenInput;

    const style = variable.style;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    
    const [tabNumber, setTabNumber] = useState("1");

    const handleTabChange = (event, newValue) => {
        setTabNumber(newValue);
    };

  return (
    <div>
        
        <div>
        <div className="bg-bluelight w-full text-white font-bold p-2 flex items-center justify-between">
        <div>Document Information</div>
        {clickeDocument && (
            <div>      
                <Button onClick={() => handlEdit(clickeDocument)} variant="contained" startIcon={<EditIcon />}>
                    Edit
                </Button>
            </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex">
            <div>
                <div className="flex gap-2">        
                    <div className="font-bold">
                        Document Number: 
                    </div>
                    {document?.documentNumber}
                </div>

                <div className="flex gap-2">
                    <div className="font-bold">
                    Subject: 
                    </div>
                    {document?.subject}
                </div>

                <div className="flex gap-2">
                    <div className="font-bold">
                    Date: 
                    </div>
                    {    `${new Date(document?.date.slice(0, 10)).getDate()} 
                        ${months[new Date(document?.date.slice(0, 10)).getMonth()]} 
                        ${new Date(document?.date.slice(0, 10)).getFullYear()}`
                    }
                </div>

                <div className="flex gap-2 mb-2">
                    <div className="font-bold">  
                    Signatory: 
                    </div>
                    {document?.signatory}
                </div>
                
        <Button onClick={handleOpen} variant="contained">Generate QR code</Button> 
            </div>
            <div className="h-12 flex flex-col">
                {document?.urgent && 
                ( <img className='h-full' src={urgent} alt="" />)}
                {document?.confidential && 
                ( <img className='h-full' src={confidential} alt="" />)}
            </div>
        </div>

            <div className="flex gap-2 flex-col border drop-shadow-2xl mb-2">                          
                <div className="font-bold w-full bg-bluelight p-1 pr-5 rounded-t-lg text-white">
                    Attachment:
                </div>
                <div className="flex p-1">
                    <PictureAsPdfIcon/>
                    <a href={document?.documentInfo.url} target="_blank"> 
                        {document?.documentInfo.name}
                    </a>
                </div>
            </div>
            {changeSignedCopy ? 
                (<div className="my-2 border-b-linkwater border rounded-t-lg">
                    <div className="font-bold w-full bg-bluelight p-1 pr-5 rounded-t-lg text-white">
                    Signed Copy:                 
                    </div>
                    <div className="flex flex-col p-2 border border-x-linkwater justify-between">
                        <div className="flex justify-between">
                            <div>
                            <PictureAsPdfIcon/> {changeSignedCopy.name} 
                            </div>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => setChangeSignedCopy(null)}>
                                    <DeleteForeverIcon/>                      
                                </IconButton>
                            </Tooltip>
                        </div>   
                        <div>
                            {setsignedDocLoading ?
                                <LoadingButton  loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained">
                                Update Signed Copy
                                </LoadingButton>  
                            : 
                                <Button variant="contained" onClick={(e) => handleChangeSignedCopy(document?.id, document?.signedCopy)}>
                                Update Signed Copy
                                </Button>
                            } 
                        </div>        
                    </div>
                </div>) 
                :             
                (document?.signedCopy ?  
                    (<div className="flex gap-2 flex-col border drop-shadow-2xl mb-2">                          
                        <div className="font-bold w-full bg-bluelight p-1 pr-5 rounded-t-lg text-white">
                            Signed Copy:
                        </div>
                        <div className="flex p-1">
                            <PictureAsPdfIcon/> <a href={document?.signedCopy.url} target="_blank"> {document?.signedCopy.name} </a>
                        </div>
                    </div>) : 
                (<div></div>))}

            {signedCopy && (
                <div className="my-2 border-b-linkwater border rounded-t-lg">
                  <div className="font-bold w-full bg-bluelight p-1 pr-5 rounded-t-lg text-white">
                    Signed Copy:                 
                  </div>
                    <div className="flex flex-col p-2 border border-x-linkwater justify-between">
                       <div className="flex justify-between">
                            <div>
                            <PictureAsPdfIcon/> {signedCopy.name} 
                            </div>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => setSignedCopy(null)}>
                                    <DeleteForeverIcon/>                      
                                </IconButton>
                            </Tooltip>
                        </div>   
                        <div>
                            {setsignedDocLoading ?
                                <LoadingButton  loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained">
                                Save Signed Copy
                                </LoadingButton>  
                            : 
                                <Button variant="contained" onClick={(e) => handleSaveSignedCopy(document?.id)}>
                                Save Signed Copy
                                </Button>
                            } 
                        </div>        
                    </div>
                </div>
            )}

            {clickedPendingDocument ?
                (!document?.signedCopy ? 
                    (<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Add Signed Document
                        <VisuallyHiddenInput
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setSignedCopy(e.target.files[0])}
                        />
                    </Button>)
                     :
                    (<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Update Signed Copy
                        <VisuallyHiddenInput
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setChangeSignedCopy(e.target.files[0])}
                        />
                    </Button>)) 
            : 
            (<div></div>)

            }    
            <TabContext value={tabNumber}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                    <Tab label="Remarks" value="1" />
                    <Tab label="History Logs" value="2" />
                </TabList>
                </Box>
                
                <TabPanel value="1">                
                    <TableContainer className="max-h-52" component={Paper}>
                        <Table  sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className='bg-bluelight'>
                                <TableRow> 
                                    <StyledTableCell width={200}>From</StyledTableCell>
                                    <StyledTableCell align="left">Remarks</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {document?.remarks.map((remark, index) => (
                                    <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        {remark.from}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {remark.remark}
                                    </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>                    
                </TabPanel>
                    
                <TabPanel value="2">             
                    <TableContainer className="max-h-52" component={Paper}>
                        <Table  sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className='bg-bluelight'>
                                <TableRow> 
                                    <StyledTableCell width={200}>Date and Time</StyledTableCell>
                                    <StyledTableCell align="left">Logs</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {document?.historylog.map((logs, index) => (
                                    <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        {logs.dateCreated ? (
                                        <>
                                            {`${new Date(logs.dateCreated).getDate()}                                             
                                            ${new Date(logs.dateCreated).getHours()}${String(new Date(logs.dateCreated).getMinutes()).padStart(2, '0')}H
                                            ${months[new Date(logs.dateCreated).getMonth()]} 
                                            ${new Date(logs.dateCreated).getFullYear()}`}
                                        </>
                                        ) : (
                                        <>
                                            {`${new Date(logs.time).getDate()}                                             
                                            ${new Date(logs.time).getHours()}${String(new Date(logs.time).getMinutes()).padStart(2, '0')}H
                                            ${months[new Date(logs.time).getMonth()]} 
                                            ${new Date(logs.time).getFullYear()}`}
                                        </>
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {logs.dateCreated
                                        ? `Document was created from ${logs.office} by ${logs.rank} ${logs.createdBy}`
                                        : logs.status === "done"
                                        ? `The Document was marked done`
                                        : logs.status === "returned"
                                        ? `The Document was marked undone`
                                        : logs.receivedBy 
                                        ? `The Document was received by: ${logs.receivedBy} from ${logs.office}`
                                        : `The Document was forwarded from ${logs.from} by ${logs.by} to ${logs.to}`}
                                    </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </TabContext>
        </div>
        </div>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>

            <PdfGenerator document={document}/>
            
            </Box>
        </Modal>
    </div>
  )
}

export default DocumentView