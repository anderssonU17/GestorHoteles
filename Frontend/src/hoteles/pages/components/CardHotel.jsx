import React from 'react'
import './cardHotel.css'

export const CardHotel = ( {_name} ) => {
  return (
    <>
        <div className="card">
        <img src="https://cdn-icons-png.flaticon.com/512/5900/5900195.png" alt="iconHotel" width={'150px'}/>
        <div className="container">
            <hr />
            <h4><b>{_name}</b></h4> 
        </div>
        </div>
    </>
  )
}
