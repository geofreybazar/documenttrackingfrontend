import {useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import variable from "../utils/variable";
import documentService from "../services/documentService";
import { Button, TextField, InputLabel, Tooltip, IconButton, Typography} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InputAdornment from '@mui/material/InputAdornment';
import prefixOfUsers from "../services/prefixOfUsers";
import LoadingSpinner from "./LoadingSpinner";

function AddDocumentForm({isLoading, setIsLoading, setOpenCreateDocumentSuccess, draftdocuments, setDraftdocuments, user}) {

    const [documentNumber, setDocumentNumber] = useState("");
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState("");
    const [signatory, setSignatory] = useState("");
    const [newDocFile, setNewDocFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [urgent, setUrgent] = useState(false);
    const [confidential, setConfidential] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {    
      setLoading(true)
      documentService.getNewDocNumber().then((res) => {
        console.log(res)
        setDocumentNumber(res)
        setLoading(false)
      }).catch((error) => {
        console.log(error)
        setLoading(false)
      })
    }, [])

    if(loading){
      return <div className="w-full h-full flex justify-center items-center"> <LoadingSpinner/></div>
    }
    
    const handleUrgent = (e) => {
      setUrgent(e.target.checked);
    }    
    const handleConfidential = (e) => {
      setConfidential(e.target.checked);
    }
    
    const prefixed = prefixOfUsers.find((entry) => entry.name === user.office)
    const prefix = prefixed.prefix
    const currentYear = new Date().getFullYear();
    const finalDocNumber = `${prefix}-${currentYear}-${documentNumber}`

    const handleCreateDocument = (e) => {
        e.preventDefault();
         setIsLoading(true);
         const newDocumentFormData = new FormData();
         newDocumentFormData.append("file", newDocFile);
         newDocumentFormData.append("name", newDocFile.name);
         newDocumentFormData.append("documentNumber", finalDocNumber);
         newDocumentFormData.append("subject", subject);
         newDocumentFormData.append("date", date);
         newDocumentFormData.append("signatory", signatory);
         newDocumentFormData.append("urgent", urgent);
         newDocumentFormData.append("confidential", confidential);         
         newDocumentFormData.append("originatingOffice", user.name);
         documentService.createDocument(newDocumentFormData).then((res) => {
            setDocumentNumber("");
            setSubject("");
            setDate("");
            setSignatory("");
            setNewDocFile(null);
            setIsLoading(false);
            navigate('/draftdocuments');
            setOpenCreateDocumentSuccess(true);
            setDraftdocuments(draftdocuments.concat(res));          
         }).catch((error) => {
            setErrorMessage(error.response.data.error);
            setIsLoading(false);
            });   
    };

    const VisuallyHiddenInput = variable.VisuallyHiddenInput;
    
  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <div className="p-2 my-2 border border-b-linkwater w-2/4 text-center bg-bluelight text-white rounded-t-lg">
        <Typography variant="h4">
                  Create New Document Form
        </Typography>
      </div>
      <div className="w-full flex flex-col justify-center items-center">      
        <div className="w-2/4">
            <form onSubmit={handleCreateDocument} className="mb-2">
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload New Document
                <VisuallyHiddenInput
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setNewDocFile(e.target.files[0])}
                  required
                />
              </Button>
              
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={urgent} onChange={handleUrgent} />} label="Urgent" />
                <FormControlLabel control={<Checkbox checked={confidential} onChange={handleConfidential} />} label="Confidential" />
              </FormGroup>
              {newDocFile && (
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
                )}
                <TextField 
                    required
                    disabled
                    className="m-2 p-2 w-full border-solid border-2 border-slate-500 "     
                    margin="dense"
                    label="Document Number" 
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {prefixed.prefix}-{currentYear}-{documentNumber}
                        </InputAdornment>
                      ),
                    }}
                    />
                
                <TextField 
                    required
                    className="m-2 p-2 w-full border-solid border-2 border-slate-500 "     
                    margin="dense"
                    label="Subject" 
                    variant="outlined"
                    placeholder="Document Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)} />

                <InputLabel id="demo-simple-select-label">Date(dd/mm/yyyy)</InputLabel>
                <TextField 
                    required
                    className="m-2 p-2 w-full border-solid border-2 border-slate-500 "     
                    margin="dense"
                    variant="outlined"
                    value={date}
                    type="date"
                    onChange={(e) => setDate(e.target.value)} />

                <TextField 
                    required
                    className="m-2 p-2 w-full border-solid border-2 border-slate-500 "     
                    margin="dense"
                    label="Signatory" 
                    variant="outlined"
                    placeholder="Signatory"
                    value={signatory}
                    onChange={(e) => setSignatory(e.target.value)} />   

                    {isLoading ?
                        <LoadingButton  loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit">
                        Create Document
                    </LoadingButton>  
                    : <Button variant="contained" type="submit" >
                    Create Document
                    </Button>}
            </form>
            {errorMessage && (
            <Typography className="text-white text-center border p-2 bg-red-600 rounded-b-2xl">
            {errorMessage}
            </Typography>  )}         
        </div>
      </div>
     
    </div>
  )
}

export default AddDocumentForm