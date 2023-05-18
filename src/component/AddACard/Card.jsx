import React from 'react'
import style from './AddACard.module.css';
import {useNavigate} from 'react-router-dom'



export default function Card({cardData}) {
   
    const navigate = useNavigate()
    function handleNavigate(card){
        navigate('/task/'+card.id +'-'+card.title ,{state:{card}})
        
  }
 
  return (
    <>
    <div className={style.cards}>
      <p 
      onClick={()=>handleNavigate(cardData)}
   
      > {cardData.title}</p> 
    
    </div>
    </>
  )
}
