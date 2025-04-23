import { useState } from "react";
import { Delete, DocumentInfo, ForwardDoc, DraftsTable, DraftsTableSearch } from './';
import variable from '../utils/variable.js';
import {Backdrop, 
        Box, 
        Modal, 
        Fade, 
        Paper, 
        Typography, 
        Snackbar } from '@mui/material/';

function Draft ({isLoading, 
                setIsLoading, 
                user, 
                openCreateDocumentSuccess, 
                setOpenCreateDocumentSuccess, 
                setClickeDocument, 
                clickeDocument,
                draftdocuments,
                setDraftdocuments,
                setDocuments,
                documents,
                setEditDocument,
                socket}) {
                  
  const [searchDraft, setSearchDraft] = useState("")
  const [openDeleteSnackBar, setOpenDeleteSnackBar] = useState(false);
  const [openForwardSnackBar, setOpenForwardSnackBar] = useState(false);
  const forwardBoxStyle = variable.forwardBoxStyle;
  const style = variable.style;



  const [info, setInfo] = useState(false);
  const handleOpenInfo = (id) => {
    setClickeDocument(id);
    setInfo(true);
  };

  const handleCloseInfo = () => {
    setInfo(false)
    setClickeDocument("");
    setOpenForwardSnackBar(false);
  };

  const [forward, setForward] = useState(false);
  const handleOpenforward = (id) => {
    setClickeDocument(id);
    setForward(true)
  };
  const handleCloseforward = () => {
    setForward(false);
    setClickeDocument("");
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const handleOpenDelete = (id) => {
    setClickeDocument(id);
    setDeleteModal(true)
  };
  const handleCloseDelete = () => {
    setDeleteModal(false);
    setClickeDocument("");
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenCreateDocumentSuccess(false);
  };

  const handleCloseDeleteSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDeleteSnackBar(false);
  };

  return (
    <div className="p-10">

      <div className="flex justify-between pb-2">        
        <Typography variant="h5">
          List of {user?.office}'s Draft Documents
        </Typography>  

        <div className="flex items-center gap-2">          
          <div>
            Search: 
          </div>
          <form className="border-2 border-bluelight outline-none flex items-center p-0 shadow-md">
            <input 
            type="search"  
            className="outline-none p-2"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}            
            />
          </form>
        </div>
      </div>     
      <Paper sx={{ width: '100%', overflow: 'hidden'}}>

      { searchDraft ? 
      (<div>
        <DraftsTableSearch 
        draftdocuments={draftdocuments}
        searchDraft ={searchDraft}
        setSearchDraft ={setSearchDraft}        
        handleOpenInfo={handleOpenInfo}
        handleOpenforward={handleOpenforward}
        handleOpenDelete={handleOpenDelete}
        />
      </div>)
        :
      (<DraftsTable 
          draftdocuments={draftdocuments}
          handleOpenInfo={handleOpenInfo}
          handleOpenforward={handleOpenforward}
          handleOpenDelete={handleOpenDelete}
      />)}

      </Paper>
      
      {/* modal for show info */}
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
              clickeDocument= {clickeDocument}
              info={info} 
              setInfo={setInfo} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
              setEditDocument={setEditDocument} />
          </Box>
        </Fade>
      </Modal>  
      
      {/* modal for forward */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={forward}
        onClose={handleCloseforward}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
          timeout: 500,  
        },
        }}>
        <Fade in={forward}>
          <Box sx={forwardBoxStyle}>
            <ForwardDoc clickeDocument={clickeDocument} 
              setClickeDocument={setClickeDocument}
              setForward={setForward} 
              user={user} 
              setOpenForwardSnackBar={setOpenForwardSnackBar}
              setDraftdocuments={setDraftdocuments}
              draftdocuments={draftdocuments}
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
              setDocuments={setDocuments}
              documents={documents}
              socket={socket}
              />
          </Box>
        </Fade>
      </Modal> 

      {/* modal for delete */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={deleteModal}
        onClose={handleCloseDelete}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
          timeout: 500,  
        },
        }}>
        <Fade in={deleteModal}>
          <Box sx={forwardBoxStyle}>
            <Delete 
              clickeDocument={clickeDocument} 
              setClickeDocument={setClickeDocument}
              setOpenDeleteSnackBar={setOpenDeleteSnackBar}
              setDraftdocuments={setDraftdocuments}
              draftdocuments={draftdocuments}
              handleCloseDelete={handleCloseDelete}
              setDeleteModal={setDeleteModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              />
          </Box>
        </Fade>
      </Modal> 
     
      <Snackbar
            open={openForwardSnackBar}
            autoHideDuration={5000}
            onClose={handleClose}
            message="Document forwarded successfully"
        />

        <Snackbar
            open={openCreateDocumentSuccess}
            autoHideDuration={5000}
            onClose={handleClose}
            message="Document created successfully"
        />
        
        <Snackbar
        open={openDeleteSnackBar}
        autoHideDuration={5000}
        onClose={handleCloseDeleteSnackBar}
        message="Document deleted successfully"
      />

    </div>
  )
}

export default Draft 