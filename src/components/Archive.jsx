import { useState, useEffect } from "react";
import documentService from "../services/documentService";
import variable from "../utils/variable.js";
import {
  ArchiveTable,
  DocumentInfo,
  ArchiveTableSearch,
  LoadingSpinner,
} from "./";

import {
  Typography,
  Snackbar,
  Backdrop,
  Box,
  Modal,
  Fade,
  Pagination,
} from "@mui/material/";

function Archive({
  returnedDocs,
  setReturnedDocs,
  documents,
  setDocuments,
  clickeDocument,
  setClickeDocument,
  isLoading,
  setIsLoading,
}) {
  const [totalFinishedDocs, setTotalFinishedDocs] = useState([]);
  const [totalCountArchievedDocs, setTotalCountArchievedDocs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openUnDoneSnackBar, setOpenUnDoneSnackBar] = useState(false);

  const [searchArchive, setSearchArchive] = useState("");
  const [archiveSearchTerm, setArchiveSearchTerm] = useState("");
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);

  const style = variable.style;

  useEffect(() => {
    setIsLoading(true);
    documentService
      .getArchivedDocument(currentPage)
      .then((res) => {
        console.log(res);
        setTotalFinishedDocs(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });

    documentService
      .getTotalCountFinishDocuments()
      .then((res) => {
        setTotalCountArchievedDocs(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    setIsLoading(true);
    documentService
      .getSearchFinishDocuments(archiveSearchTerm, searchCurrentPage)
      .then((res) => {
        setSearchArchive(res.documents);
        setSearchTotalPages(res.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });
  }, [archiveSearchTerm, searchCurrentPage]);

  const filteredNumberOfPages = Math.ceil(totalCountArchievedDocs / 10);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchPageChange = (e, value) => {
    setSearchCurrentPage(value);
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

  const handleUndone = (id) => {
    documentService.markUnDoneDocument(id).then((res) => {
      setTotalFinishedDocs(
        totalFinishedDocs.filter(
          (totalFinishedDoc) => totalFinishedDoc.id !== id
        )
      );
      setReturnedDocs(returnedDocs.concat(res));
      setDocuments(documents.concat(res));
      setOpenUnDoneSnackBar(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUnDoneSnackBar(false);
  };
  return (
    <div className='p-10'>
      <div className='pb-5'>
        <div>
          <Typography variant='h5'>Archived Documents</Typography>
        </div>
        <div className='flex items-center gap-2'>
          <div>Search:</div>
          <form className='border-2 border-bluelight outline-none flex items-center p-0 shadow-md'>
            <input
              type='search'
              className='outline-none p-2'
              value={archiveSearchTerm}
              onChange={(e) => setArchiveSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* data table to show */}
      {isLoading ? (
        <LoadingSpinner />
      ) : archiveSearchTerm ? (
        <ArchiveTableSearch
          handleOpenInfo={handleOpenInfo}
          searchArchive={searchArchive}
          handleUndone={handleUndone}
        />
      ) : (
        <ArchiveTable
          isLoading={isLoading}
          handleOpenInfo={handleOpenInfo}
          handleUndone={handleUndone}
          totalFinishedDocs={totalFinishedDocs}
        />
      )}

      {/* pagination to show */}
      {archiveSearchTerm ? (
        <Pagination
          count={searchTotalPages}
          page={searchCurrentPage}
          onChange={handleSearchPageChange}
        />
      ) : (
        <Pagination
          count={filteredNumberOfPages}
          page={currentPage}
          onChange={handleChange}
        />
      )}

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
              myDocumentClickedDocument={clickeDocument}
              info={info}
              setInfo={setInfo}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={openUnDoneSnackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        message='Document is Mark Undone'
      />
    </div>
  );
}

export default Archive;
