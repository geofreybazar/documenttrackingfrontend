import { useState } from "react";
import DocumentView from "./DocumentView";
import { Button, TextField } from "@mui/material";

function ConfiPinCode({ document,
  clickeDocument,
  clickedPendingDocument,
  handlEdit,
  handleSaveSignedCopy,
  handleChangeSignedCopy,
  signedCopy,
  changeSignedCopy, 
  setChangeSignedCopy,
  setSignedCopy,
  setsignedDocLoading}) {

    const [pinCode, setPinCode] = useState("");
    const [pinErrorMessage, setPinErrorMessage] = useState("");
    const [setshowDoc, setSetshowDoc] = useState(false);

    const handleEnterPinCode = (e) => {
      e.preventDefault()
      if(pinCode === document.pinCode) {
        setPinErrorMessage('');
        setSetshowDoc(true);
      }else {
        setPinErrorMessage('Invalid Pin Code');
      }
    }

  return (
    <div>
        {setshowDoc ? 
        (<DocumentView
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
          setsignedDocLoading={setsignedDocLoading}
          />)
        :
        (<form onSubmit={handleEnterPinCode}>
          <div className="flex flex-col items-center justify-center p-4 gap-2">
             <p> Confidential Document</p> 
             <p> Enter Document's Pin Code</p>
              <TextField type="password" size="small"  value={pinCode} onChange={(e) => setPinCode(e.target.value)}/>
              <Button  variant="contained" type="submit">
                  Submit
              </Button>
              <div className="text-red-900 font-bold">
              {pinErrorMessage}
              </div>
          </div>
          </form>    )      
      }        

    </div>
  )
}

export default ConfiPinCode