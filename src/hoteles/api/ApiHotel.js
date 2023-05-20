import axios from 'axios';

const URL = 'http://localhost:3005/api/';

export const listHotels = async() => {
  try{
    const {data: {Hotel}} = await axios.get(`${URL}read-hotels`);
    console.log(Hotel);
    return Hotel;
  }catch(error){
    return error;
  }
}