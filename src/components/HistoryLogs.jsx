import { useEffect, useState } from 'react';
import userService from '../services/userService';
import officeService from '../services/officeService';
import {TextField, Typography} from '@mui/material/';    
import Pagination from '@mui/material/Pagination';
import variable from '../utils/variable';
import LoadingSpinner from './LoadingSpinner';

function HistoryLogs({ user, setErrorMessage, }) {
    const [historylogs, setHistoryLogs] = useState([]);
    const [date, setDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(23);
    const [isLoading, setIsLoading] = useState(true)
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = historylogs.slice(firstPostIndex, lastPostIndex)
    const numberOfPages = Math.ceil(historylogs.length/postPerPage);

    const filteredDate = historylogs.filter((getLog) => getLog.time.toLowerCase().includes(date));
    const filteredCurrentPost = filteredDate.slice(firstPostIndex, lastPostIndex)
    const filteredNumberOfPages = Math.ceil(filteredDate.length/postPerPage);


    useEffect(() => {       
        setIsLoading(true) 
            officeService.getHistoryLogs().then((res) => {
            setHistoryLogs(res);
            setIsLoading(false) 
        }).catch((error) => {
          setErrorMessage(error.response.data.error);
          setIsLoading(false) 
        });
    }, []);

    const handleChange = (event, value) => {
      setCurrentPage(value);
    };

  return (
    <div className='p-5 h-full'>
        <div className="pb-5">
        <div>        
          <Typography variant="h5">
            History Logs
          </Typography>  
        </div>  
        <div className="flex items-center gap-2"> 
          <TextField 
            required
            className="m-2 p-2 border-solid border-2 border-slate-500 "     
            margin="dense"
            variant="outlined"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)} />
        </div> 
      </div>

        <div className='h-3/4 p-2'>
            {isLoading ? 
              (<div className="flex items-center justify-center">
                <LoadingSpinner/>
            </div>) :
            (date ? 
              (<div>
              {filteredCurrentPost.filter((getLog) => getLog.time.toLowerCase().includes(date)).map((getLog,index) => 
                <ul key={index}>
                  <li className='border pl-2 pt-1 pb-1'>
                      {`${new Date(getLog.time.slice(0, 10)).getDate()} 
                      ${variable.months[new Date(getLog.time.slice(0, 10)).getMonth()]} 
                      ${new Date(getLog.time.slice(0, 10)).getFullYear()}`}
                      {getLog.time.slice(-10)}
                      {getLog.receiveFrom ? (
                      <span> Document <b>{getLog.DocumentSubject}</b> was received from <b>{getLog.receiveFrom}</b> by <b>{getLog.rank} {getLog.userName}</b></span>   
                      ) : getLog.forwardedTo ? (
                      <span> Document <b>{getLog.DocumentSubject}</b> was forwarded to <b>{getLog.forwardedTo}</b> by <b>{getLog.rank} {getLog.userName}</b></span>
                      ) : getLog.createdDocument ? (
                        <span> Document <b>{getLog.createdDocument}</b> was created by <b>{getLog.rank} {getLog.userName}</b></span>
                      ): (
                        <span> Document <b>{getLog.deleteDocument}</b> was deleted by <b>{getLog.rank} {getLog.userName}</b></span>
                      )}                 
                      </li>
                </ul>)}
                <Pagination count={filteredNumberOfPages} page={currentPage} onChange={handleChange} />
              </div>) 
              :   
              (<div>
                {currentPost.map((entry,index) => (
                  <ul key={index}>
                      <li className='border pl-2 pt-1 pb-1'>
                      {`${new Date(entry.time.slice(0, 10)).getDate()} 
                      ${variable.months[new Date(entry.time.slice(0, 10)).getMonth()]} 
                      ${new Date(entry.time.slice(0, 10)).getFullYear()}`}
                      {entry.time.slice(-10)}
                      {entry.receiveFrom ? (
                      <span> Document <b>{entry.DocumentSubject}</b> was received from <b>{entry.receiveFrom}</b> by <b>{entry.rank} {entry.userName}</b> </span>   
                      ) : entry.forwardedTo ? (
                      <span> Document <b>{entry.DocumentSubject}</b> was forwarded to <b>{entry.forwardedTo}</b> by <b>{entry.rank} {entry.userName}</b> </span>
                      ) : entry.createdDocument ? (
                        <span> Document <b>{entry.createdDocument}</b> was created by <b>{entry.rank} {entry.userName}</b></span>
                      ): (
                        <span> Document <b>{entry.deleteDocument}</b> was deleted by <b>{entry.rank} {entry.userName}</b></span>
                      )}                
                      </li>
                  </ul>
              ))}
              <Pagination count={numberOfPages} page={currentPage} onChange={handleChange} />
            </div>)
            )}
        </div>

    </div>
  )
}

export default HistoryLogs