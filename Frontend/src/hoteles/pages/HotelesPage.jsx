import React, { useEffect, useState } from "react";
import {listHotels} from '../api/ApiHotel.js';
import { CardHotel } from "./components/CardHotel.jsx";
import './hoteles.css'

export const HotelesPage = () => {
  document.title = 'Hoteles'
  
  const [hotels, setHotels] = useState([]);

  const requestReadHotesl = async() =>{

    var findHotels = [];

    await listHotels().then(

      ( response ) =>{

        response.map(
          (hotel) => {
            findHotels.push(hotel)
          }
          )
        }
        
        )
    
    setHotels(findHotels)
    console.log(hotels);
  }
  
  useEffect(() => {
    requestReadHotesl();
  }, [])
  
  

  return (
    // Codigo a modificar y pasar a cards 
    <>
        <h1 className="text-decoration-underline">CRUD DE HOTELES</h1>
        < div className="hotels-container">
        {
          hotels.map(
            (hotel) =>{
              return(
                <>
                  
                    <CardHotel key={hotel._id} _name={hotel.name} ></CardHotel>
                </>
              )
            }
            )
          }
        </div>
        
    </>
  )
}
