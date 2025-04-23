import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, FormControl, Typography, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import userService from '../services/userService';
import documentService from '../services/documentService';
import officeService from '../services/officeService';
import SaveIcon from '@mui/icons-material/Save';
import '@fontsource/roboto/500.css';

function ForwardDoc({clickeDocument, 
  setClickeDocument, 
  setForward, 
  user, 
  setOpenForwardSnackBar, 
  setDraftdocuments, 
  draftdocuments,
  clickedPendingDocument,
  setClickedPendingDocument,
  setForwardPendingDocument,
  pendingdocuments,
  setPendingdocuments,
  isLoading,
  setIsLoading,
  setDocuments,
  documents,
  returnedDocId,
  setReturnedDocId,
  setForwardReturnedDocModal,
  returnedDocs,
  setReturnedDocs,
  socket
}) {

  const [forwardTo, setForwardTo] = useState("");
  const [users, setUsers] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    officeService.getAllOffices()
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  const usersNames = users?.map((user) => user.name) || [];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
};
  
  const handleCloseModal = () => {
  if(clickeDocument){
    setForward(false);
  } else if (setForwardPendingDocument){
    setForwardPendingDocument(false);
  }else{
    setForwardReturnedDocModal(false);
  }};

  const handleForwardDocument = (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    const forwardedDocument = {
      remarks: remarks,
      user: user.name,
      from: user.office,
      to: forwardTo,
    };   

    const forwardUser = users.find((user) => user.name === forwardTo);
    console.log(forwardUser)
    const forwardUserId = forwardUser.id
    console.log(forwardUserId)
    
    if(clickeDocument){
    documentService.forwardDocument(clickeDocument,forwardedDocument).then((res) => {
      setForwardTo("");
      setOpenForwardSnackBar(true);
      setForward(false);
      setDraftdocuments(draftdocuments.filter((draftdocument) => draftdocument.id !== clickeDocument));
      setClickeDocument("");
      setDocuments(documents.concat(res));
      setIsLoading(false);
      socket.emit("forwardDraftDocs", {...res, forwardUserId} )
    }).catch((error)=>{
      setErrorMessage(error.response.data.error);
      setIsLoading(false);
    });
  } else if(clickedPendingDocument){
      documentService.forwardDocument(clickedPendingDocument,forwardedDocument).then((res) => {
        setForwardTo("");
        setOpenForwardSnackBar(true);
        setForwardPendingDocument(false);
        setPendingdocuments(pendingdocuments.filter((pendingdocument) => pendingdocument.id !== clickedPendingDocument));
        setClickedPendingDocument("");
        setIsLoading(false);
        socket.emit("forwardPendingDocs", {...res, forwardUserId} )
      }).catch((error)=>{
        setErrorMessage(error.response.data.error);
        setIsLoading(false);
      });
    } else if(returnedDocId){
      documentService.forwardDocument(returnedDocId,forwardedDocument).then((res) => {  
        setForwardTo("")
        setOpenForwardSnackBar(true);
        setForwardReturnedDocModal(false)
        setReturnedDocs(returnedDocs.filter((returnedDoc) => returnedDoc.id !== returnedDocId))
        setReturnedDocId("")
        setIsLoading(false);
        console.log(socket)              
        socket.emit("forwardReturnedDocs", {...res, forwardUserId})
      }).catch((error)=>{
        setErrorMessage(error.response);
        setIsLoading(false);
      });
    };
  };

  console.log(forwardTo)
  return (
    <div className='flex flex-col gap-6'>
      <Typography  variant="h6">
      Forward Document
      </Typography>

      <form onSubmit={handleForwardDocument} className='w-full'>
        <FormControl fullWidth>
          <Autocomplete
            disablePortal
            options={usersNames}
            inputValue={forwardTo}
            onInputChange={(event, newInputValue) => {
              setForwardTo(newInputValue);
            }}
            renderInput={(params) => <TextField 
              {...params} 
              label="Select Office" />}
          />

          <div className='mt-2'>
            <TextField
              fullWidth
              id="filled-multiline-static"
              label="Remarks"
              multiline
              rows={4}
              variant="outlined"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
          <div className='flex justify-evenly my-3'>
            <Button variant="contained" onClick={() => handleCloseModal()}>Cancel</Button>

            {isLoading ?
                <LoadingButton  loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit">
                Forward
            </LoadingButton>  
            : <Button variant="contained" type="submit" >
            Forward
            </Button>}
                      
          </div>
          {errorMessage && (
            <Typography className="text-white text-center border p-2 bg-red-600 rounded-b-2xl">
            {errorMessage}
            </Typography>  )} 
          </FormControl>
      </form>

      
      
    </div>
  );
}

export default ForwardDoc
