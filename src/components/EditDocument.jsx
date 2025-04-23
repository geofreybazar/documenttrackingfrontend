import { useState } from "react";
import documentService from "../services/documentService";
import variable from "../utils/variable";
import { Button, TextField, InputLabel, Tooltip, IconButton, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function EditDocument({ editDocument, setIsLoading, isLoading, setDraftdocuments, draftdocuments, returnedDocs, setReturnedDocs}) {
  
  const defaultDate = editDocument.date.slice(0,10);
  const [newDocumentNumber, setNewDocumentNumber] = useState(editDocument.documentNumber);
  const [newSubject, setNewSubject] = useState(editDocument.subject);
  const [newDate, setNewDate] = useState(defaultDate);
  const [newSignatory, setNewSignatory] = useState(editDocument.signatory);
  const [newOriginatingOffice, setNewOriginatingOffice] = useState(editDocument.originatingOffice);
  const [oldDocFile, setOldDocFile] = useState(editDocument.documentInfo.name);
  const [newDocFile, setNewDocFile] = useState(null);
  const [newUrgent, newSetUrgent] = useState(editDocument.urgent);
  const [newConfidential, newSetConfidential] = useState(editDocument.confidential);  
  const [newErrorMessage, setNewErrorMessage] = useState("");
  const VisuallyHiddenInput = variable.VisuallyHiddenInput;
  const navigate = useNavigate()

  const handleUrgent = (e) => {
    newSetUrgent(e.target.checked);
  }    
  const handleConfidential = (e) => {
    newSetConfidential(e.target.checked);
  }

  const handleEditDocument = (e, id) => {
    e.preventDefault()
    setIsLoading(true)
    if(newDocFile){
      const updatedDocumentFormData = new FormData();
      updatedDocumentFormData.append("file", newDocFile);
      updatedDocumentFormData.append("name", newDocFile.name);
      updatedDocumentFormData.append("documentNumber", newDocumentNumber);
      updatedDocumentFormData.append("subject", newSubject);
      updatedDocumentFormData.append("date", newDate);
      updatedDocumentFormData.append("signatory", newSignatory);
      updatedDocumentFormData.append("originatingOffice", newOriginatingOffice);
      updatedDocumentFormData.append("documentInfo", editDocument.documentInfo.filename);
      updatedDocumentFormData.append("urgent", newUrgent);
      updatedDocumentFormData.append("confidential", newConfidential);
  
      documentService.updateDocument(id,updatedDocumentFormData)
      .then((res) => {
        setIsLoading(false)
          setDraftdocuments(draftdocuments.map((document) => (document.id !== id ? document : res)))
          setReturnedDocs(returnedDocs.map((document) => (document.id !== id ? document : res)))
          navigate(-1)
      }).catch((error) => {
        console.log(error)
      });
    } else {
      const updatedDocumentFormData = {
        documentNumber: newDocumentNumber,
        subject: newSubject,
        date: newDate,
        signatory: newSignatory,
        originatingOffice: newOriginatingOffice,
        urgent: newUrgent,
        confidential: newConfidential,
      };
      documentService.updateDocument(id,updatedDocumentFormData)
      .then((res) => {
        setIsLoading(false)
          setDraftdocuments(draftdocuments.map((document) => (document.id !== id ? document : res)))
          setReturnedDocs(returnedDocs.map((document) => (document.id !== id ? document : res)))      
          navigate(-1)
      }).catch((error) => {
        console.log(error)
      });
    };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <div className="p-2 my-2 border border-b-linkwater w-2/4 text-center bg-bluelight text-white rounded-t-lg">
        <Typography variant="h4">
                  Edit Document Form
        </Typography>
      </div>
      <div className="w-full flex flex-col justify-center items-center">      
        <div className="w-2/4">
            <form onSubmit={(e) => handleEditDocument(e, editDocument.id)}>
                <div className="my-2">
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload New Document
                <VisuallyHiddenInput
                  type="file"
                  accept="pdf/*"
                  onChange={(e) => setNewDocFile(e.target.files[0])}
                />                
              </Button>

                {newDocFile ? 
                <div className="my-2 border-b-linkwater border rounded-t-lg">
                  <div className="font-bold w-full bg-bluelight p-1 text-white">
                    Attachment:                 
                  </div>
                    <div className="flex p-2 border border-x-linkwater justify-between">
                    <div>
                    <PictureAsPdfIcon/> {newDocFile.name} 
                    </div>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => setNewDocFile(null)}>
                          <DeleteForeverIcon/>                      
                        </IconButton>
                      </Tooltip>
                  </div>
                  </div>
                  : (oldDocFile ? 
                  (<div className="my-2 border-b-linkwater border rounded-t-lg">
                  <div className="font-bold w-full bg-bluelight p-1 text-white">
                    Attachment:                 
                  </div>
                    <div className="flex p-2 border border-x-linkwater justify-between">
                    <div>
                    <PictureAsPdfIcon/> {oldDocFile} 
                    </div>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => setOldDocFile(null)}>
                          <DeleteForeverIcon/>                      
                        </IconButton>
                      </Tooltip>
                  </div>
                  </div>)
                 : null
                 )}  

                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={newUrgent} onChange={handleUrgent} />} label="Urgent" />
                  <FormControlLabel control={<Checkbox checked={newConfidential} onChange={handleConfidential} />} label="Confidential" />
                </FormGroup>             

                    <TextField 
                    required
                    disabled
                    className="m-2 p-2 w-full border-solid border-2 border-slate-500 "     
                    margin="dense"
                    label="Document Number" 
                    variant="outlined"
                    placeholder="Document Number"
                    value={newDocumentNumber}
                    onChange={(e) => setNewDocumentNumber(e.target.value)}/>

                    <TextField 
                    required
                    className="m-2 p-2 w-full border-solid border-2 border-slate-500 "     
                    margin="dense"
                    label="Subject" 
                    variant="outlined"
                    placeholder="Document Subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)} />

                <InputLabel id="demo-simple-select-label">Date(dd/mm/yyyy)</InputLabel>
                <TextField 
                    required
                    className="m-2 p-2 w-full border-solid border-2 border-slate-500 "     
                    margin="dense"
                    variant="outlined"
                    value={newDate}
                    type="date"
                    onChange={(e) => setNewDate(e.target.value)} />

                <TextField 
                    required
                    className="m-2 p-2 w-full border-solid border-2 border-slate-500 "     
                    margin="dense"
                    label="Signatory" 
                    variant="outlined"
                    placeholder="Signatory"
                    value={newSignatory}
                    onChange={(e) => setNewSignatory(e.target.value)} />  

                    {isLoading ?
                        <LoadingButton  loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit">
                        Create Document
                    </LoadingButton>  
                    : <Button variant="contained" type="submit" >
                    Edit Document
                    </Button>} 
                    
                </div>
                
              
            </form>
           
        </div>
      </div>
     
    </div>
  )
}

export default EditDocument