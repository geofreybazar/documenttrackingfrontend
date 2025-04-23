import documentService from "../services/documentService";
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

function Delete({clickeDocument, 
  setDeleteModal, 
  setClickeDocument, 
  setOpenDeleteSnackBar, 
  setDraftdocuments, 
  draftdocuments, 
  handleCloseDelete,
  returnedDocId,
  setReturnedDocId ,
  returnedDocs,
  setReturnedDocs,
  isLoading,
  setIsLoading,
  setDocuments,
  documents
}) {
  
  const handleDelete = (id) => {    
   
    if (clickeDocument) {
      setIsLoading(true);
      documentService.deleteDocument(id).then((res) => {
      if (res.status === 204) {
        setOpenDeleteSnackBar(true);
        setDraftdocuments(draftdocuments.filter((draftdocument) => draftdocument.id !== id));
        setClickeDocument("");
        setDeleteModal(false);
        setIsLoading(false);
      };
    })} else {
      setIsLoading(true);
      documentService.deleteDocument(id).then((res) => {
        if (res.status === 204) {
          // setOpenDeleteSnackBar(true);
          setReturnedDocs(returnedDocs.filter((returnedDoc) => returnedDoc.id !== id))
          setDocuments(documents.filter((document) => document.id !== id))
          setReturnedDocId("");
          setDeleteModal(false);
          setIsLoading(false);
        };
      })};
  };

  return (
    <div className="flex flex-col justify-center items-center">
         <div className="">
            <div className='font-bold text-2xl'>Delete Document?</div>
            <div>This document will be permanently deleted</div>
         </div>
         <div className="mt-5 flex flex-row gap-5 text-blue-500">
             {/* <button className="hover:bg-blue-100 p-2 rounded-full" onClick={handleCloseDelete}>Cancel</button>
             <button className="hover:bg-blue-100 p-2 rounded-full" onClick={() => clickeDocument ? handleDelete(clickeDocument) : handleDelete(returnedDocId) }>Move to trash</button> */}
          
          <div className='flex justify-evenly my-3 gap-5'>
            <Button variant="contained" onClick={handleCloseDelete}>Cancel</Button>

            {isLoading ?
                <LoadingButton 
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit">
                Move to trash
            </LoadingButton>  
            :
            <Button variant="contained" onClick={() => clickeDocument ? handleDelete(clickeDocument) : handleDelete(returnedDocId) } >
            Move to trash
            </Button>}

          </div>

        </div>
     </div>   
  )
}

export default Delete