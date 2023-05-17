
const Hotel = require('../models/hotel.model');

const validateManagerHotel = async(idUser, idHotel) =>{
    try {
        const hotel = await Hotel.findById(idHotel);

        const hotelAdmin = hotel.admin.toString();
        
        const user = idUser.toString();

        if(user.rol == 'ADMIN') return true

        return (hotelAdmin == user);

    } catch (error) {
        console.error(error);
    }
}

module.exports = {validateManagerHotel};