import axios from 'axios';
import Swal from "sweetalert2";

const URL = 'http://localhost:3005/api/';

export const getOwnUser = async(_token) =>{
    try {
        
        console.log(`Token recibido: ` + _token);

        

        const getUser = await axios.get(`${URL}read-own-user`, {
            headers:{
                'x-token': _token
            }
        })

        console.log(getUser.data.findUser);

        return getUser.data.findUser;

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
            showConfirmButton: true,
            confirmButtonText: "OK"
        });
        if(error.response.data.message == 'El token ha expirado'){
            localStorage.removeItem('token')
            window.location.href = '/'
        }
    }
}