import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import documentService from "../services/documentService";
import { Confidential, DocumentView, LoadingSpinner } from '.';

function DocumentInfo({clickeDocument, 
    clickedPendingDocument, 
    setEditDocument, 
    isLoading,
    setIsLoading, 
    myDocumentClickedDocument, 
    setInfo }) {
const [document, setDocument] = useState(null);
const [signedCopy, setSignedCopy] = useState(null);
const [changeSignedCopy, setChangeSignedCopy] = useState(null);
const [setsignedDocLoading, setSetsignedDocLoading] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    setIsLoading(true);
    if (clickeDocument) {
    documentService.getDocument(clickeDocument).then((res) => {
        setDocument(res);
        setEditDocument(res);
        setIsLoading(false);
    });
    } else if (clickedPendingDocument) {
        documentService.getDocument(clickedPendingDocument).then((res) => {
            setDocument(res);
            setIsLoading(false);
        });   
    } else if (myDocumentClickedDocument) {
        documentService.getDocument(myDocumentClickedDocument).then((res) => {
            setDocument(res);
            setIsLoading(false);
        });   
    }
}, []);

const handlEdit = (id) =>  {
    navigate('/editDocument'); 
};

const handleSaveSignedCopy = (id) => {
    setSetsignedDocLoading(true);
    const newDocumentFormData = new FormData();
    newDocumentFormData.append("file", signedCopy);    
    newDocumentFormData.append("name", signedCopy.name);
    documentService.addSignedCopy(id, newDocumentFormData).then((res) => {
        setSignedCopy(null); 
        setSetsignedDocLoading(false);
    }).catch((error) => {
        console.log(error.response.data.error);
        setSetsignedDocLoading(false);
    });   
};

const handleChangeSignedCopy = (id, oldDOc) => {
    setSetsignedDocLoading(true);
    const newDocumentFormData = new FormData();
    newDocumentFormData.append("file", changeSignedCopy);
    newDocumentFormData.append("name", changeSignedCopy.name);
    newDocumentFormData.append("oldSignedCopy", oldDOc.filename);
    documentService.changeAddSignedCopy(id, newDocumentFormData).then((res) => {
        setChangeSignedCopy(null); 
        setSetsignedDocLoading(false);
    }).catch((error) => {
        console.log(error.response.data.error);
        setSetsignedDocLoading(false);
    });   
};

useEffect(() => {
    if (clickeDocument) {
    documentService.getDocument(clickeDocument).then((res) => {
        setDocument(res);
        setEditDocument(res);
    });
    } else if (clickedPendingDocument) {
        documentService.getDocument(clickedPendingDocument).then((res) => {
            setDocument(res);
        });   
    }else if (myDocumentClickedDocument) {
        documentService.getDocument(myDocumentClickedDocument).then((res) => {
            setDocument(res);
        });   
    }
}, [signedCopy, changeSignedCopy]);

return (
    <div> 
       { isLoading ? 
       (<div className="flex items-center justify-center">
            <LoadingSpinner/>
        </div>)
       : 
       (document?.confidential === true ?
            <Confidential
            document = {document}
            clickeDocument = {clickeDocument}
            clickedPendingDocument = {clickedPendingDocument}
            isLoading = {isLoading}
            handlEdit = {handlEdit}
            handleSaveSignedCopy = {handleSaveSignedCopy}
            handleChangeSignedCopy = {handleChangeSignedCopy}
            signedCopy = {signedCopy}
            changeSignedCopy = {changeSignedCopy}
            setInfo = {setInfo}
            setChangeSignedCopy = {setChangeSignedCopy}
            setSignedCopy = {setSignedCopy}
            setsignedDocLoading={setsignedDocLoading}
             />
       :
        ( <DocumentView
            document = {document}
            clickeDocument = {clickeDocument}
            clickedPendingDocument = {clickedPendingDocument}
            handlEdit = {handlEdit}
            handleSaveSignedCopy = {handleSaveSignedCopy}
            handleChangeSignedCopy = {handleChangeSignedCopy}
            signedCopy = {signedCopy}
            changeSignedCopy = {changeSignedCopy}
            setChangeSignedCopy = {setChangeSignedCopy}
            setSignedCopy = {setSignedCopy}
            setsignedDocLoading={setsignedDocLoading}/>)
        )}
    </div>
  ) 
};

export default DocumentInfo