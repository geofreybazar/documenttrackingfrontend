import { styled, TableCell, tableCellClasses, TableRow } from '@mui/material/';
import * as yup from 'yup';


const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: 10,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableCellInfo = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
      padding: 2,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: 3,
    },
  }));

  const VisuallyHiddenInput = styled("input")({
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: 1,
      overflow: "hidden",
      position: "absolute",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      width: 1,
    });

  const forwardBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const styleReceive = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    maxheight: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    // height: 700,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // overflow: "scroll",
    p: 4,
    padding: 0,    
  };

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    rank: yup.string().required('Rank is required'),
    email: yup.string().required('Email is required'),
    office: yup.string().required('Office is required'),
    role: yup.string().required('role is required'),
    accountNumber: yup.string().required('accountNumber is required'),    
  });

  const officeSchema = yup.object().shape({
    name: yup.string().required('Name is required'), 
    email: yup.string().required('Email is required'), 
  });

  const ranks = [
    "FO1",
    "FO2",
    "FO3",
    "SFO1",
    "SFO2",
    "SFO3",
    "SFO4",
    "FINSP",
    "FSINSP",
    "FCINSP",
    "FSUPT",
    "FSSUPT",
    "FCSUPT"
  ]


export default {
    months,
    StyledTableCell,
    StyledTableRow,
    VisuallyHiddenInput,
    forwardBoxStyle,
    styleReceive,
    style,
    StyledTableCellInfo,
    schema,
    ranks,
    officeSchema
}