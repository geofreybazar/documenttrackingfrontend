import { useState } from "react";
import variable from "../utils/variable.js";
import { DocumentInfo, MydocumentsTable, MydocumentsTableSearch } from './';
import {Backdrop, Box, Modal, Fade, Paper, Typography } from '@mui/material/';


function MyDocuments ({documents, isLoading, setIsLoading, user, clickeDocument, setClickeDocument}) {

const [searchMydocs, setSearchMydocs] = useState("")

const [info, setInfo] = useState(false);
const handleOpenInfo = (id) => {
  setClickeDocument(id);
  setInfo(true);
};
const handleCloseInfo = () => {
  setClickeDocument("");
  setInfo(false);
};

const style = variable.style;

  return (
    <div className="p-10">

      <div className="flex justify-between pb-2">        
        <Typography variant="h5">
          List of {user?.office}'s Documents
        </Typography> 

        <div className="flex items-center gap-2">          
          <div>
            Search: 
          </div>
          <form className="border-2 border-bluelight outline-none flex items-center p-0 shadow-md">
            <input 
            type="search" 
            className="outline-none p-2"
            value={searchMydocs}
            onChange={(e) => setSearchMydocs(e.target.value)}            
            />
          </form>
        </div> 
      </div>     

      <Paper sx={{ width: '100%', overflow: 'hidden'}}>

      { searchMydocs ? 
      ( <MydocumentsTableSearch
        searchMydocs={searchMydocs}
        documents={documents}
        handleOpenInfo={handleOpenInfo} />) 
      :
      (<MydocumentsTable 
        documents={documents}
        handleOpenInfo={handleOpenInfo} />)}

      </Paper>
      
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
              myDocumentClickedDocument= {clickeDocument}
              info={info} 
              setInfo={setInfo} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} />
          </Box>
        </Fade>
      </Modal> 

    </div>
  )
}

export default MyDocuments 