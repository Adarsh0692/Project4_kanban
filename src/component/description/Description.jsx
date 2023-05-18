// import React from 'react'
// import { useLocation } from 'react-router';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// const styles = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function Description() {

//   const [open, setOpen] = React.useState(true);
//     const location = useLocation()
//     console.log(location.state.task);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//   return (
//     <div>
//       <h1>description</h1>
//       <h2 
//       onClick={handleOpen}
//       >{location.state.task}
//       </h2>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={styles}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   )
// }
