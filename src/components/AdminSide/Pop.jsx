import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import variable from '../../utils/variable';

const style = variable.style

function Pop({openAddUser,handleClose,children}) {
  return (
    <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openAddUser}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
            >
            <Fade in={openAddUser}>
            <Box sx={style}>
                {children}
            </Box>
            </Fade>
        </Modal>
    </div>
  )
}

export default Pop