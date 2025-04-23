import { useState } from "react";
import { Typography } from "@mui/material";
import DocumentsTable from "./DocumentsTable";

function Docments({documents, isLoading}) {

  const [searchDocument, setSearchDocument] = useState("");

  return (
    <div>
      <div className="flex flex-col pb-2">      
          <div className="flex justify-between">
              <Typography variant="h5">
                  List of Documents
              </Typography>
          </div>  
          <div className="flex items-center gap-2">          
            <div>
              Search: 
            </div>
            <form className="border-2 border-bluelight outline-none flex items-center p-0 shadow-md">
              <input 
              type="search"  
              className="outline-none p-2"
              value={searchDocument}
              onChange={(e) => setSearchDocument(e.target.value)}            
              />
            </form>
          </div>
        </div>  
        <DocumentsTable documents={documents} isLoading={isLoading}/>
    </div>
  )
}

export default Docments