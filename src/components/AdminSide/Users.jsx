import { useState, useEffect } from "react";
import UserTable from "./UserTable";
import { Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Pop from './Pop';
import AddUser from "./AddUser";

function Users({users, setUsers,user, listOfffices, isLoading}) {
  const [searchUser, setSearchUser] = useState("");
  const [openAddUser, setOpenAddUser] = useState(false);

  const handleClose = () => {
    setOpenAddUser(false);
  };

  return (
    <div>
      <div className="flex flex-col pb-2">      
        <div className="flex justify-between">
          <Typography variant="h5">
            List of Users
          </Typography>  
          <Button variant="contained" onClick={() => setOpenAddUser(true)}>
            <AddIcon/>Add User
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
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}            
            />
          </form>
        </div>
      </div>  
      <div>
      <UserTable 
        users={users} 
        setUsers={setUsers}
        listOfffices={listOfffices}
        isLoading={isLoading}/>
      </div>
      <Pop openAddUser={openAddUser} handleClose={handleClose}>
          <AddUser 
          setUsers={setUsers} 
          users={users} 
          handleClose={handleClose} 
          listOfffices={listOfffices}/>
      </Pop>
    </div>
  )
}

export default Users