import { useState } from "react";
import OfficeTable from "./OfficeTable";
import { Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Pop from './Pop';
import AddOffice from "./AddOffice";

function Offices({listOfffices, setListOfffices}) {
  const [setsearchOffice, setSetsearchOffice] = useState("");
  const [openAddOffice, setOpenAddOffice] = useState(false);

  const handleClose = () => {
    setOpenAddOffice(false);
  };
  return (
    <div>
        <div className="flex flex-col pb-2">      
          <div className="flex justify-between">
              <Typography variant="h5">
                  List of Offices
              </Typography>  
              <Button variant="contained" onClick={() => setOpenAddOffice(true)}>
                  <AddIcon/>Add Office
              </Button>
          </div>  
          <div className="flex items-center gap-2">          
            <div>
              Search: 
            </div>
            <form className="border-2 border-bluelight outline-none flex items-center p-0 shadow-md">
              <input 
              type="search"  
              className="outline-none p-2"
              value={setsearchOffice}
              onChange={(e) => setSetsearchOffice(e.target.value)}            
              />
            </form>
          </div>
        </div>  
      <div>
      <OfficeTable 
        listOfffices={listOfffices}
        setListOfffices={setListOfffices}/>
      </div>
      <Pop openAddUser={openAddOffice} handleClose={handleClose}>
          <AddOffice 
          handleClose={handleClose}
          listOfffices={listOfffices}
          setListOfffices={setListOfffices} />
      </Pop>
    </div>
  )
}

export default Offices