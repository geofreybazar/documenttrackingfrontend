import { useState } from "react";
import userService from "../../services/userService";
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

function Delete({deleteUserId,users,setUsers,handleCloseDeleteModal}) {
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);

  const handleDeleteUser = (id) => {
    setIsLoading(true)
      userService.deleteUSer(id).then((res) => {
        if(res.status === 204){
          setUsers(users.filter((user) => user.id !== id))
          handleCloseDeleteModal()
          setIsLoading(false)
        }
      }).catch((error) => {
        setIsLoading(false)
        setErrorMessage(error.response.data.error)
      })
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-5">
      <p className="font-semibold text-red-600 text-lg">{errorMessage}</p>
        <div className="text-lg p-5">Are you sure to delete <b>{deleteUserId.rank} {deleteUserId.name}</b>?</div>
        <div className="flex gap-2">
            <Button variant='contained' onClick={() => handleCloseDeleteModal()}>Cancel</Button>
            {isLoading ?
                <LoadingButton 
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit">
                Delete User
            </LoadingButton>  
            :
            <Button variant="contained" onClick={()=> handleDeleteUser(deleteUserId.id)} >
            Delete User
            </Button>}
        </div>
    </div>
  )
}

export default Delete