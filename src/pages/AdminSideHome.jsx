import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../components/AdminSide/Home';
import Offices from '../components/AdminSide/Offices';
import Users from '../components/AdminSide/Users';
import Documents from '../components/AdminSide/Docments'
import officeService from '../services/officeService';
import userService from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';
import documentService from '../services/documentService';


function AdminSideHome({user}) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfffices, setListOfffices] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setIsLoading(true)

    officeService.getAllOfficesForClients().then((res) => {
      setListOfffices(res)
    }).catch((error) => {
      console.log(error)
    });
    
    userService.getAllUsers().then((res) => {
      setUsers(res)
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      console.log(error)
    });

    documentService.getAllDocuments().then((res) => {
      setDocuments(res)
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      console.log(error)
    });

  }, [user])

  if(isLoading){
    return (
      <div className='w-full h-full flex justify-center items-center'>
          <LoadingSpinner/>
      </div>
      
    );
  };

  return (
    <div>
        <Routes>
            <Route path="/" 
            element={<Home
              listOfffices={listOfffices}
              users = {users}
              documents={documents}
            />}/>
            <Route path="/officecatalog" 
            element={<Offices
                user={user}
                listOfffices={listOfffices}
                setListOfffices={setListOfffices}/>}/>
            <Route path="/user" 
            element={<Users
              user={user}
              listOfffices={listOfffices}
              users = {users}
              setUsers = {setUsers}
              isLoading={isLoading}
              />}/>
              <Route path="/documents" 
                element={<Documents
                user={user}
                documents={documents}
                isLoading={isLoading}/>}/>
        </Routes>
    </div>
  );
};

export default AdminSideHome