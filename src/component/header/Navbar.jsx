import React from 'react'
import style from "./Navbar.module.css"
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { RiUserAddLine } from 'react-icons/ri';
import { Button } from '@mui/material';

// import style from "./Navbar.module.css"
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { RiUserAddLine } from 'react-icons/ri';
// import { Button } from '@mui/material';


export default function Navbar() {
  return (
    <div className={style.mainContainer}>
      <div className={style.h2}><h2>Home Task Management</h2></div>
      <div className={style.container}>
      <div className={style.icon}><FlashOnIcon/><span>Automation</span></div>
      <div className={style.icon}><FilterAltIcon/><span>Filter</span></div>
      <Button  variant="contained" sx={{
        textTransform: "capitalize"
      }}><RiUserAddLine/>Share</Button>
      <MoreHorizIcon/>
      </div>
    </div>
  )
}