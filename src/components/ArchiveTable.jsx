import variable from "../utils/variable.js";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { NoItems, LoadingSpinner } from "./";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material/";

function ArchiveTable({
  isLoading,
  handleUndone,
  handleOpenInfo,
  totalFinishedDocs,
}) {
  const StyledTableCell = variable.StyledTableCell;
  const StyledTableRow = variable.StyledTableRow;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead className='bg-bluelight'>
            <TableRow>
              <StyledTableCell>Document Number</StyledTableCell>
              <StyledTableCell align='center'>Subject</StyledTableCell>
              <StyledTableCell align='center'>Date</StyledTableCell>
              <StyledTableCell align='center'>Signatory</StyledTableCell>
              <StyledTableCell align='center'>Classification</StyledTableCell>
              <StyledTableCell align='center'>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalFinishedDocs.length == 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={6}>
                  <NoItems />
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              totalFinishedDocs.map((pendingdocument) => (
                <StyledTableRow key={pendingdocument.id}>
                  <StyledTableCell
                    className='cursor-pointer'
                    onClick={() => handleOpenInfo(pendingdocument.id)}
                    component='th'
                    scope='row'
                  >
                    {pendingdocument.documentNumber}
                  </StyledTableCell>
                  <StyledTableCell
                    className='cursor-pointer'
                    onClick={() => handleOpenInfo(pendingdocument.id)}
                    align='center'
                  >
                    {pendingdocument.subject}
                  </StyledTableCell>
                  <StyledTableCell
                    className='cursor-pointer'
                    onClick={() => handleOpenInfo(pendingdocument.id)}
                    align='center'
                  >{`${new Date(pendingdocument.date.slice(0, 10)).getDate()} 
                  ${
                    variable.months[
                      new Date(pendingdocument.date.slice(0, 10)).getMonth()
                    ]
                  } 
                  ${new Date(
                    pendingdocument.date.slice(0, 10)
                  ).getFullYear()}`}</StyledTableCell>
                  <StyledTableCell
                    className='cursor-pointer'
                    onClick={() => handleOpenInfo(pendingdocument.id)}
                    align='center'
                  >
                    {pendingdocument.signatory}
                  </StyledTableCell>

                  {pendingdocument.confidential && pendingdocument.urgent ? (
                    <StyledTableCell
                      className='cursor-pointer'
                      align='center'
                      onClick={() => handleOpenInfo(pendingdocument.id)}
                    >
                      <Chip label='urgent/confidential' color='warning' />
                    </StyledTableCell>
                  ) : pendingdocument.urgent ? (
                    <StyledTableCell
                      className='cursor-pointer'
                      align='center'
                      onClick={() => handleOpenInfo(pendingdocument.id)}
                    >
                      <Chip label='urgent' color='error' />
                    </StyledTableCell>
                  ) : pendingdocument.confidential ? (
                    <StyledTableCell
                      className='cursor-pointer'
                      align='center'
                      onClick={() => handleOpenInfo(pendingdocument.id)}
                    >
                      <Chip label='confidential' color='primary' />
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell
                      className='cursor-pointer'
                      align='center'
                      onClick={() => handleOpenInfo(pendingdocument.id)}
                    ></StyledTableCell>
                  )}
                  <StyledTableCell align='center'>
                    <Tooltip title='Mark undone'>
                      <IconButton
                        onClick={() => handleUndone(pendingdocument.id)}
                      >
                        <RemoveDoneIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ArchiveTable;
