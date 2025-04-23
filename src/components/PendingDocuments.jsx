import { useEffect, useState } from 'react';
import { DocumentInfo, ForwardDoc, RecieveDocument, NoItems, PendingDocumentsTable, PendingDocumentsTableSearch } from './';
import {Button, 
        Badge, 
        Typography, 
        Backdrop, 
        Box, 
        Modal, 
        Fade, 
        Snackbar } from '@mui/material/';
import variable from '../utils/variable.js'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

function PendingDocuments({user,
  pendingdocuments, 
  setPendingdocuments, 
  isLoading, 
  setIsLoading, 
  openReceivedSnackBar, 
  setOpenReceivedSnackBar, 
  openForwardSnackBar, 
  setOpenForwardSnackBar,
  toBeReceiveDocs,
  setToBeReceiveDocs,
  socket}) {

  const [searchPendingDocs, setSearchPendingDocs] = useState("");
  const [clickedPendingDocument, setClickedPendingDocument] = useState("");
  const [openToReceiveDocs, setOpenToReceiveDocs] = useState(false);
  const handleOpenToReceiveDocs = () => setOpenToReceiveDocs(true);
  const handleCloseToReceiveDocs = () => setOpenToReceiveDocs(false);

  const styleReceive = variable.styleReceive
  const forwardBoxStyle = variable.forwardBoxStyle
  const style = variable.style;

  const [forwardPendingDocument, setForwardPendingDocument] = useState(false);
  const handleOpenforward = (id) => {
    setClickedPendingDocument(id);
    setForwardPendingDocument(true);
  };
  const handleCloseforward = () => {
    setForwardPendingDocument(false);
    setClickedPendingDocument("");
  };

  const [info, setInfo] = useState(false);
  const handleOpenInfo = (id) => {
    setClickedPendingDocument(id);
    setInfo(true);
  };
  const handleCloseInfo = () => {
    setClickedPendingDocument("");
    setInfo(false)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenReceivedSnackBar(false);
    setOpenForwardSnackBar(false);
  };

  return (
    <div className='p-10'>      
    <div className="flex justify-between">        
      <Typography variant="h5">
        Pending Documents Forwarded to {user?.office}
      </Typography>  
        <Badge badgeContent={toBeReceiveDocs?.length} color="error">
          <Button variant="contained" startIcon={<NotificationAddIcon/>} onClick={handleOpenToReceiveDocs} aria-hidden={false}>
            Documents to receive
          </Button>  
        </Badge>
    </div>

    <div className="flex items-center gap-2">          
          <div>
            Search: 
          </div>
          <form className="border-2 border-bluelight outline-none flex items-center p-0 shadow-md">
            <input 
            type="search" 
            className="outline-none p-2"
            value={searchPendingDocs}
            onChange={(e) => setSearchPendingDocs(e.target.value)}            
            />
          </form>
      </div> 
      
    {searchPendingDocs ? (
      <PendingDocumentsTableSearch
      searchPendingDocs={searchPendingDocs}
      pendingdocuments={pendingdocuments}
      handleOpenInfo={handleOpenInfo}
      handleOpenforward={handleOpenforward}/>
      )
      :
      (<PendingDocumentsTable
        pendingdocuments={pendingdocuments}
        handleOpenInfo={handleOpenInfo}
        handleOpenforward={handleOpenforward}
      />)}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openToReceiveDocs}
        onClose={handleCloseToReceiveDocs}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
          timeout: 500,
        },
        }}
        >
        <Fade in={openToReceiveDocs}>
          <Box sx={styleReceive}>
            <RecieveDocument 
              toBeReceiveDocs={toBeReceiveDocs} 
              setToBeReceiveDocs={setToBeReceiveDocs} 
              user={user} 
              pendingdocuments={pendingdocuments} 
              setPendingdocuments={setPendingdocuments}
              handleCloseToReceiveDocs={handleCloseToReceiveDocs}
              setOpenReceivedSnackBar={setOpenReceivedSnackBar}
              isLoading={isLoading}
              setIsLoading={setIsLoading}/>              
          </Box>
        </Fade>
      </Modal>  

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={forwardPendingDocument}
        onClose={handleCloseforward}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
          timeout: 500,
        },
        }}>
        <Fade in={forwardPendingDocument}>
          <Box sx={forwardBoxStyle}>
            <ForwardDoc 
              clickedPendingDocument={clickedPendingDocument}
              setClickedPendingDocument={setClickedPendingDocument}
              setForwardPendingDocument={setForwardPendingDocument}
              user={user} 
              pendingdocuments={pendingdocuments}
              setPendingdocuments={setPendingdocuments}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setOpenForwardSnackBar={setOpenForwardSnackBar}
              socket={socket}
              />
          </Box>
        </Fade>
      </Modal> 

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={info}
        onClose={handleCloseInfo}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
          timeout: 500,
        },
        }}
        >
        <Fade in={info}>
          <Box sx={style}>
            <DocumentInfo 
              clickedPendingDocument={clickedPendingDocument}
              info={info} 
              setInfo={setInfo} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} />
          </Box>
        </Fade>
      </Modal>  

      <Snackbar
            open={openReceivedSnackBar}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Document successfully received"
      />

      <Snackbar
            open={openForwardSnackBar}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Document successfully forwarded"
      />

    </div>
  )
};

export default PendingDocuments