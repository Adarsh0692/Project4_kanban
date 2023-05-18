import React from 'react'
import DashBoard from './component/DashBoard'

import { Route, Routes } from 'react-router'
import DialogBox from './component/DialogBox/DialogBox'



function App() {
 
// const persistor = persistStore(store)
  return (
    <>
   
     
      <Routes>
       <Route path='/' element={<DashBoard/>} />
       <Route path='/task/:id/' element={<DialogBox/>} />
        
      </Routes>
     
      
    
    </>
  )
}

export default App
