import { useState } from "react";
import variable from "../utils/variable.js";
import {  Box,
  Table,
  TableBody, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Chip } from '@mui/material/';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function DashboardTable({documents}) {

  const style = variable.style;
  const StyledTableCell = variable.StyledTableCell;
  const StyledTableRow = variable.StyledTableRow;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - documents.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-5/6">
      <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow >
              <StyledTableCell style={{ backgroundColor: '#1565C0' }}>Document Number</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="left">Subject</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="left">Date</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="left">Signatory</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: '#1565C0' }} align="left">Classification</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { (rowsPerPage > 0
            ? documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : documents
          ).map((document) => (
            <StyledTableRow key={document.id}>
              <StyledTableCell component="th" scope="row">
                {document.documentNumber}
              </StyledTableCell>
              <StyledTableCell align="left">
                {document.subject}
              </StyledTableCell>
              <StyledTableCell align="left">
              {
                  `${new Date(document.date.slice(0, 10)).getDate()} 
                  ${variable.months[new Date(document.date.slice(0, 10)).getMonth()]} 
                  ${new Date(document.date.slice(0, 10)).getFullYear()}`
                }
              </StyledTableCell>
              <StyledTableCell align="left">
              {document.signatory}
              </StyledTableCell>
              {document.confidential && document.urgent ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="urgent/confidential" color="warning" /></StyledTableCell>) :
                  document.urgent ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="urgent" color="error" /></StyledTableCell>) :
                  document.confidential ? 
                  (<StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}><Chip label="confidential" color="primary" /></StyledTableCell>)
                  : <StyledTableCell className='cursor-pointer' align="center" onClick={() => handleOpenInfo(document.id)}></StyledTableCell>
                }
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={documents.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
      </Paper>
    </div>
  )
}

export default DashboardTable