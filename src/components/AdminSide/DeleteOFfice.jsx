import { useState } from "react";
import officeService from "../../services/officeService";
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

function DeleteOFfice({setListOfffices, listOfffices, deleteOfficeId, handleCloseDeleteModal}) {
    const [isLoading, setIsLoading] = useState(false);

  const handleDeleteOffice = (id) => {
    setIsLoading(true)
      officeService.deleteOFfice(id).then((res) => {
        if(res.status === 204){
            setListOfffices(listOfffices.filter((office) => office.id !== id))
          handleCloseDeleteModal()
          setIsLoading(false)
        }
      }).catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }
  return (
    <div className="w-full flex flex-col justify-center items-center p-5">
        <div className="text-lg p-5">Are you sure to delete <b> {deleteOfficeId.name}</b>?</div>
        <div className="flex gap-2">
            <Button variant='contained' onClick={() => handleCloseDeleteModal()}>Cancel</Button>
            {isLoading ?
                <LoadingButton 
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit">
                Delete OFfice
            </LoadingButton>  
            :
            <Button variant="contained" onClick={()=> handleDeleteOffice(deleteOfficeId.id)} >
            Delete OFfice
            </Button>}
        </div>
    </div>
  )
}

export default DeleteOFfice