import React from 'react';
import {DocumentView, ConfiPinCode} from './';

function Confidential( {clickeDocument,
  clickedPendingDocument,
  document,
  handlEdit,
  handleSaveSignedCopy ,
  handleChangeSignedCopy, 
  signedCopy,
  changeSignedCopy,
  setChangeSignedCopy,
  setSignedCopy,
  setsignedDocLoading} ) {

  return (
    <div> 
      {document.pinCode ? 
      (
        <ConfiPinCode
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
        />
      ) :
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
    }
    </div>
  )
}

export default Confidential