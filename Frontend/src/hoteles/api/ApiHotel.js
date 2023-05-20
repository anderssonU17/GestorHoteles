import axios from 'axios';

const URL = 'http://localhost:3000/api/';

export const listHotels = async() => {
  try{
    
    const response = await axios.get(`${URL}read-hotels`);

    return response.data.hotels;

  }catch(error){
    return error;

  }
}