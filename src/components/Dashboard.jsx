import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import documentService from "../services/documentService";
import DashboardTable from "./DashboardTable";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, Tooltip, Badge } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import "@fontsource/roboto/500.css";
import LoadingScreen from "./LoadingScreen";

function Dashboard({
  documents,
  draftdocuments,
  pendingdocuments,
  returnedDocs,
  searchTerm,
  setSearchTerm,
  getDocuments,
  toBeReceiveDocs,
  toReceiveReturnedDocs,
  isLoading,
  setIsLoading,
}) {
  const navigate = useNavigate();
  const [totalCountArchievedDocs, setTotalCountArchievedDocs] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    documentService
      .getTotalCountFinishDocuments()
      .then((res) => {
        setTotalCountArchievedDocs(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });

    setSearchTerm("");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate("/search");
    }
  };

  if (isLoading) {
    return (
      <div className='h-full'>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='px-2 mt-16 w-full'>
        <div className='flex gap-5 justify-center items-center '>
          <div className='h-32 w-56 rounded-md bg-bluelight shadow-lg text-white flex flex-col'>
            <Typography className='p-4' variant='h7'>
              My Documents
            </Typography>
            <div className='px-5 flex items-center justify-between'>
              <Typography className='' variant='h3'>
                {documents.length}
              </Typography>
              <ArticleIcon fontSize='large' />
            </div>
          </div>
          <div className='h-32 w-56 rounded-md bg-bluelight shadow-lg text-white flex flex-col'>
            <Typography className='p-4' variant='h7'>
              Drafts
            </Typography>
            <div className='px-5 flex items-center justify-between'>
              <Typography className='px-4' variant='h3'>
                {draftdocuments.length}
              </Typography>
              <ArticleIcon fontSize='large' />
            </div>
          </div>
          <Badge badgeContent={toBeReceiveDocs?.length} color='error'>
            <div className='h-32 w-56 rounded-md bg-bluelight shadow-lg text-white flex flex-col'>
              <Typography className='p-4' variant='h7'>
                Pending Documents
              </Typography>
              <div className='px-5 flex items-center justify-between'>
                <Typography className='px-4' variant='h3'>
                  {pendingdocuments.length}
                </Typography>
                <ArticleIcon fontSize='large' />
              </div>
            </div>
          </Badge>
          <Badge badgeContent={toReceiveReturnedDocs?.length} color='error'>
            <div className='h-32 w-56 rounded-md bg-bluelight shadow-lg text-white flex flex-col'>
              <Typography className='p-4' variant='h7'>
                Returned Documents
              </Typography>
              <div className='px-5 flex items-center justify-between'>
                <Typography className='px-4' variant='h3'>
                  {returnedDocs.length}
                </Typography>
                <ArticleIcon fontSize='large' />
              </div>
            </div>
          </Badge>
          <div className='h-32 w-56 rounded-md bg-bluelight shadow-lg text-white flex flex-col'>
            <Typography className='p-4' variant='h7'>
              Archived Documents
            </Typography>
            <div className='px-5 flex items-center justify-between'>
              <Typography className='px-4' variant='h3'>
                {totalCountArchievedDocs}
              </Typography>
              <ArticleIcon fontSize='large' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center py-6 flex-col mt-16 '>
        <div className=' w-4/6 relative'>
          <form
            onSubmit={handleSearch}
            className='border-2 border-bluelight rounded-full w-full outline-none flex items-center p-0 shadow-md'
          >
            <input
              className='bg-gray-50 p-5 w-full rounded-l-full outline-none'
              type='search'
              placeholder='Search Document'
              label='Search Document'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button type='submit'>
              <Tooltip title='Search'>
                <div className='bg-bluelight rounded-r-full p-5'>
                  <SearchIcon
                    className='ml-0 mr-2 text-white'
                    fontSize='medium'
                  />
                </div>
              </Tooltip>
            </button>
          </form>
          <div>
            {!searchTerm ? (
              <div></div>
            ) : (
              <div className='mt-2 w-full bg-gray-50 absolute z-40 shadow-lg mt-0'>
                {getDocuments
                  .filter(
                    (getDocument) =>
                      getDocument.documentNumber
                        .toLowerCase()
                        .includes(searchTerm) ||
                      getDocument.subject.toLowerCase().includes(searchTerm)
                  )
                  .map((getDocument) => (
                    <ul className='z-40 w-fit p-3' key={getDocument.id}>
                      <li
                        className='cursor-pointer'
                        onClick={() => handleClickedid(getDocument.id)}
                      >
                        {getDocument.documentNumber} {getDocument.subject}
                      </li>
                    </ul>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center align-center'>
        <DashboardTable documents={documents} />
      </div>
    </div>
  );
}

export default Dashboard;
