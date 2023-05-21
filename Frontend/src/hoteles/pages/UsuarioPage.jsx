import { useEffect, useState } from "react";
import { getOwnUser } from "../api/ApiUser";

export const UsuarioPage = () => {
  const [user, setUser] = useState({});

  document.title = 'Usuario'

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getOwnUser(token);
        setUser(result);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
    console.log(user);
    console.log(`Datos del usuario:` + user.name);
  }, []);

  return (
    <>

      <div className="card shadow" style={{width: '18rem', margin: 'auto', marginTop: '20px'}}>
        <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" className="card-img-top" alt="user" style={{width: '80%', margin: 'auto', marginTop: '10px', borderRadius: '50%'}}/>
        <div className="card-body" style={{margin: 'auto', }}>
          <h5 className="card-title" style={{color: 'Black'}}>Datos de tu cuenta</h5>
        </div>
        <ul className="list-group list-group-flush">

          <li className="list-group-item" style={{display: 'flex'}}><h6 style={{marginRight: '10px', color: 'gray'}}>Nombre:</h6><h6>{user.name}</h6></li>
          <li className="list-group-item" style={{display: 'flex'}}><h6 style={{marginRight: '10px', color: 'gray'}}>Email:</h6><h6>{user.email}</h6></li>
          <li className="list-group-item" style={{display: 'flex'}}><h6 style={{marginRight: '10px', color: 'gray'}}>Rol:</h6><h6>{user.rol}</h6></li>

        </ul>
      </div>
    </>
  );
};
