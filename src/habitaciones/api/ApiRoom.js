import axios from 'axios';

const URL = 'http://localhost:3005/api/';

export const getRoomsByHotel = async (hotelId) => {
  try {
    const response = await axios.get(`${URL}read-rooms-by-hotel/${hotelId}`);
    return response.data.rooms;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw new Error('Error fetching rooms');
  }
};
