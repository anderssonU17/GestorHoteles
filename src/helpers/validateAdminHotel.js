
const Hotel = require('../models/hotel.model');

const validateAdminHotel = async(idUser, idHotel) =>{
    try {
        const hotel = await Hotel.findById(idHotel);

        const hotelAdmin = hotel.admin.toString();
        
        const user = idUser.toString();

        return (hotelAdmin == user);

    } catch (error) {
        console.error(error);
    }
}

module.exports = {validateAdminHotel};