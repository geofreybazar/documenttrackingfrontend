import { useEffect, useState } from 'react';
import {LoadingSpinner, DocumentInfo} from './';
import documentService from '../services/documentService';
import SearchIcon from '@mui/icons-material/Search';
import variable from '../utils/variable.js';
import { Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Backdrop, Fade, Box, Chip } from '@mui/material';
import { all } from 'axios';

function Search({ searchTerm, setSearchTerm, isLoading, setIsLoading, allUsers, clickeDocument, setClickeDocument }) {
console.log(allUsers)
  
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const style = variable.style;

  useEffect(() => {
    setIsLoading(true);
    documentService.serchDocument(searchTerm).then((res) => {
      setSearchResults(res);
      setIsLoading(false);
    }).catch((error) => {
      setErrorMessage(error.response.data.error);
      setSearchResults([])
      setIsLoading(false);
    });  
  }, [])
  
  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    documentService.serchDocument(searchTerm).then((res) => {
      setSearchResults(res);
      setIsLoading(false);
    }).catch((error) => {
      setErrorMessage(error.response.data.error);
      setSearchResults([])
      setIsLoading(false);
    });  
  }; 

  const usersMap = searchResults.map(result => {
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].officeId === result.forwardedTo) {
        return allUsers[i].office;
      };
    };
    return null;
  });

  const [info, setInfo] = useState(false);
  const handleViewDocument = (id) => {
    setClickeDocument(id);
    setInfo(true);
  };

  const handleCloseViewDocument = () => {
    setInfo(false)
    setClickeDocument("");
  };

  return (
    <div className='m-5'>
       Search Results
      <div className='w-full flex justify-center items-center m-5'>
        <form onSubmit={(e) => handleSearch(e)} className="border-2 border-bluelight rounded-full outline-none flex items-center p-0 shadow-md w-3/6">
                  <input className='bg-gray-50 p-2 rounded-l-full outline-none w-full' type="search" 
                    placeholder="Search Document"
                    label="Search Document"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
              
                  <div className='bg-bluelight rounded-r-full p-2'>
                    <Tooltip title="Search">
                      <button type="submit">
                          <SearchIcon 
                          className='ml-0 mr-2 text-white'
                          fontSize="medium" 
                          />                     
                      </button>
                    </Tooltip>
                  </div>
        </form>
      </div>
          { isLoading === true ? (
            <div className='m-10 flex items-center justify-center'>
                <LoadingSpinner/>
            </div>
          ) : searchResults.length === 0 ? (
            <p>{errorMessage}</p>
          ) : (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table"> 
              <TableHead>
                <TableRow>
                  <TableCell>Document Number</TableCell>
                  <TableCell align="left">Subject</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Originating Office</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Office</TableCell>
                  <TableCell align="left">Classification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => (
                  <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className='cursor-pointer' onClick={() => handleViewDocument( result.id)}
                >
                  <TableCell component="th" scope="row">
                    {result.documentNumber}
                  </TableCell>
                  <TableCell align="left">{result.subject}</TableCell>
                  <TableCell className='cursor-pointer' align="left">{
                  `${new Date(result.date.slice(0, 10)).getDate()} 
                  ${variable.months[new Date(result.date.slice(0, 10)).getMonth()]} 
                  ${new Date(result.date.slice(0, 10)).getFullYear()}`
                   }</TableCell>
                  <TableCell align="left">{result.originatingOffice}</TableCell>
                  <TableCell align="left">{result.status}</TableCell> 
                  <TableCell align="left">{usersMap[index] ? usersMap[index] : '-'}</TableCell>
                  {result.confidential && result.urgent ? 
                  (<TableCell className='cursor-pointer' align="center"><Chip label="urgent/confidential" color="warning" /></TableCell>) :
                  result.urgent ? 
                  (<TableCell className='cursor-pointer' align="center"><Chip label="urgent" color="error" /></TableCell>) :
                  result.confidential ? 
                  (<TableCell className='cursor-pointer' align="center"><Chip label="confidential" color="primary" /></TableCell>)
                  : <TableCell className='cursor-pointer' align="center"></TableCell>}
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={info}
            onClose={handleCloseViewDocument}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
            timeout: 500,},}}>
                <Fade in={info}>
                    <Box sx={style}>
                        <DocumentInfo
                        myDocumentClickedDocument= {clickeDocument}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        info={info} 
                        setInfo={setInfo}
                        />           
                    </Box>
                </Fade>
            </Modal>

    </div>
  )
};

export default Search;
