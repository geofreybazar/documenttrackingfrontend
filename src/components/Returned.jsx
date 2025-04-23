import { useEffect, useState } from "react";
import {
  DocumentInfo,
  ForwardDoc,
  ReceiveReturnedDoc,
  Delete,
  ReturnedTable,
  ReturnedTableSearch,
} from "./";
import variable from "../utils/variable.js";
import documentService from "../services/documentService.js";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import {
  Button,
  Badge,
  Snackbar,
  Typography,
  Backdrop,
  Box,
  Modal,
  Fade,
} from "@mui/material/";

function Returned({
  user,
  isLoading,
  setIsLoading,
  returnedDocs,
  setReturnedDocs,
  setDocuments,
  documents,
  setEditDocument,
  clickeDocument,
  setClickeDocument,
  openReceivedSnackBar,
  setOpenReceivedSnackBar,
  openForwardSnackBar,
  setOpenForwardSnackBar,
  toReceiveReturnedDocs,
  setToReceiveReturnedDocs,
  socket,
}) {
  const [searchReturnedDocs, setSearchReturnedDocs] = useState("");
  const [openToReceiveDocs, setOpenToReceiveDocs] = useState(false);
  const [openDoneSnackBar, setOpenDoneSnackBar] = useState(false);
  const handleOpentoReceiveReturnedDocs = () => setOpenToReceiveDocs(true);
  const handleClosetoReceiveReturnedDocs = () => setOpenToReceiveDocs(false);

  const styleReceive = variable.styleReceive;
  const style = variable.style;
  const forwardBoxStyle = variable.forwardBoxStyle;

  const handleDoneDocument = (id) => {
    documentService
      .markDoneDocument(id)
      .then((res) => {
        setReturnedDocs(
          returnedDocs.filter((returnedDoc) => returnedDoc.id !== id)
        );
        setDocuments(documents.filter((document) => document.id !== id));
        setOpenDoneSnackBar(true);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const [info, setInfo] = useState(false);
  const handleOpenInfo = (id) => {
    setClickeDocument(id);
    setInfo(true);
  };
  const handleCloseInfo = () => {
    setClickeDocument("");
    setInfo(false);
  };

  const [returnedDocId, setReturnedDocId] = useState("");
  const [forwardReturnedDocModal, setForwardReturnedDocModal] = useState(false);
  const handleOpenForward = (id) => {
    setReturnedDocId(id);
    setForwardReturnedDocModal(true);
  };
  const closeHandleOpenForward = () => {
    setReturnedDocId("");
    setForwardReturnedDocModal(false);
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const handleOpenDelete = (id) => {
    setReturnedDocId(id);
    setDeleteModal(true);
  };
  const handleCloseDelete = () => {
    setDeleteModal(false);
    setReturnedDocId("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDoneSnackBar(false);
    setOpenReceivedSnackBar(false);
    setOpenForwardSnackBar(false);
  };

  return (
    <div className='p-10'>
      <div className='flex justify-between'>
        <Typography variant='h5'>Returned Documents</Typography>
        <Badge badgeContent={toReceiveReturnedDocs?.length} color='error'>
          <Button
            variant='contained'
            startIcon={<NotificationAddIcon />}
            onClick={handleOpentoReceiveReturnedDocs}
            aria-hidden={false}
          >
            Returned Documents
          </Button>
        </Badge>
      </div>

      <div className='flex items-center gap-2'>
        <div>Search:</div>
        <form className='border-2 border-bluelight outline-none flex items-center p-0 shadow-md'>
          <input
            type='search'
            className='outline-none p-2'
            value={searchReturnedDocs}
            onChange={(e) => setSearchReturnedDocs(e.target.value)}
          />
        </form>
      </div>

      {!searchReturnedDocs ? (
        <ReturnedTable
          returnedDocs={returnedDocs}
          handleOpenInfo={handleOpenInfo}
          handleOpenForward={handleOpenForward}
          handleOpenDelete={handleOpenDelete}
          handleDoneDocument={handleDoneDocument}
        />
      ) : (
        <ReturnedTableSearch
          searchReturnedDocs={searchReturnedDocs}
          returnedDocs={returnedDocs}
          handleOpenInfo={handleOpenInfo}
          handleOpenForward={handleOpenForward}
          handleOpenDelete={handleOpenDelete}
          handleDoneDocument={handleDoneDocument}
        />
      )}

      {/* modal for receiving */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openToReceiveDocs}
        onClose={handleClosetoReceiveReturnedDocs}
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
            <ReceiveReturnedDoc
              setToReceiveReturnedDocs={setToReceiveReturnedDocs}
              toReceiveReturnedDocs={toReceiveReturnedDocs}
              user={user}
              returnedDocs={returnedDocs}
              setReturnedDocs={setReturnedDocs}
              handleClosetoReceiveReturnedDocs={
                handleClosetoReceiveReturnedDocs
              }
              setOpenReceivedSnackBar={setOpenReceivedSnackBar}
            />
          </Box>
        </Fade>
      </Modal>

      {/* modal for forwarding */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={forwardReturnedDocModal}
        onClose={closeHandleOpenForward}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={forwardReturnedDocModal}>
          <Box sx={forwardBoxStyle}>
            <ForwardDoc
              user={user}
              returnedDocId={returnedDocId}
              setReturnedDocId={setReturnedDocId}
              setForwardReturnedDocModal={setForwardReturnedDocModal}
              returnedDocs={returnedDocs}
              setReturnedDocs={setReturnedDocs}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setOpenForwardSnackBar={setOpenForwardSnackBar}
              socket={socket}
            />
          </Box>
        </Fade>
      </Modal>

      {/* modal for Deleting */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={deleteModal}
        onClose={handleCloseDelete}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={deleteModal}>
          <Box sx={styleReceive}>
            <Delete
              returnedDocId={returnedDocId}
              setReturnedDocId={setReturnedDocId}
              setDeleteModal={setDeleteModal}
              returnedDocs={returnedDocs}
              setReturnedDocs={setReturnedDocs}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleCloseDelete={handleCloseDelete}
              setDocuments={setDocuments}
              documents={documents}
            />
          </Box>
        </Fade>
      </Modal>

      {/* modal for View */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
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
              clickeDocument={clickeDocument}
              info={info}
              setInfo={setInfo}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setEditDocument={setEditDocument}
            />
          </Box>
        </Fade>
      </Modal>

      {/* snackbar MarkDone */}
      <Snackbar
        open={openDoneSnackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        message='Document is Mark Done'
      />

      {/* snackbar Received Returned Docs */}
      <Snackbar
        open={openReceivedSnackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        message='Document successfully received'
      />
      {/* snackbar Forward Docs */}
      <Snackbar
        open={openForwardSnackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        message='Document successfully forwarded'
      />
    </div>
  );
}

export default Returned;
