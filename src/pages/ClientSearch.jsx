import { useState,useEffect } from 'react';
import { Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Backdrop, Fade, Box, Chip, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeIcon from '@mui/icons-material/QrCode';
import variable from '../utils/variable';
import documentService from '../services/documentService';
import officeService from '../services/officeService';
import logo from '../assets/logo.svg';
import { Scanner } from '@yudiel/react-qr-scanner';

function ClientSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState(null);
    const [offices, setOffices] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "full",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
      officeService.getAllOfficesForClients().then((res) => {
        setOffices(res)
      }).catch((error) => {
        console.log(error)
      })   
    }, []);    

    const handleSearch = (e) => {
        e.preventDefault();
        documentService.getSearchClientDocument(searchTerm).then((res) => {
            setResults(res)
            console.log(res)
        }).catch((error) => {
            setErrorMessage("Document Not Found")
            setResults(null)            
        })
    };

    const handleScan = (result) => {
        // setSearchTerm(result[0].rawValue)
        console.log(searchTerm)

        documentService.getSearchClientDocument(result[0].rawValue).then((res) => {
            setResults(res)
            setOpen(false)
            console.log(res)
        }).catch((error) => {
            setErrorMessage("Document Not Found")
            setResults(null)
            setOpen(false)
        })
    }

    const findOffice = (officeId) => {
        const office = offices.find((office) => office.id === officeId);
        return office ? office.name : '';
    };
  return (
    <div className='h-screen w-screen bg-offwhite flex flex-col justify-center items-center gap-2'>
        <img className='w-1/5' src={logo} alt="" />        
        <div className='flex flex-col items-center font-semibold text-xl pb-5'>
            <p>Bureau of Fire Protection - National Capital Region</p>
            <p>Document Trackting System</p>              
        </div>
        <div className='flex flex-col gap-2 pb-5 items-center'> 
            <div className='text-lg'>Enter your tracking number or scan your qrcode:</div>
            <form onSubmit={handleSearch} className='flex gap-2'>
                <TextField
                required
                label="Tracking Number"
                variant="outlined"
                value={searchTerm}
                size="small"
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="contained" ><SearchIcon/></Button>
                <Button onClick={handleOpen} variant="contained"><QrCodeIcon/></Button>
            </form>
        </div>
        <div className='flex flex-col gap-2 pb-5 items-center'>
            {
                !results ? (
                    <div className='font-bold text text-red-700'> {errorMessage} </div>
                ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table"> 
                    <TableHead>
                        <TableRow>
                        <TableCell>Document Number</TableCell>
                        <TableCell align="left">Subject</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Originating Office</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Where at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {results.documentNumber}
                                </TableCell>
                                <TableCell align="left">
                                    {results.subject}
                                </TableCell>
                                <TableCell className='cursor-pointer' align="left">{
                                `${new Date(results.date.slice(0, 10)).getDate()} 
                                ${variable.months[new Date(results.date.slice(0, 10)).getMonth()]} 
                                ${new Date(results.date.slice(0, 10)).getFullYear()}`}
                                </TableCell>
                                <TableCell align="left">{results.originatingOffice}</TableCell>
                                <TableCell align="left">{results.status === "unfinished" ? "processing" : "completed" }</TableCell> 
                                <TableCell align="left">{findOffice(results.forwardedTo)}</TableCell>
                            </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
                )
            }
            Information Technology and Communication Unit, BFP-NCR CY2024    
        </div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
            timeout: 500,
            },
            }}
            >
            <Fade in={open}>
                <Box sx={style}>
                     <div className='w-96'>
                        <Scanner onScan={(result) => handleScan(result)} />
                    </div>
                </Box>
            </Fade>
        </Modal>  

    </div>
  )
}

export default ClientSearch