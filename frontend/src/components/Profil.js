import React from 'react'
import { Link } from 'react-router-dom';
import UseDataLayer from '../AuthProvider';
import user from '../AuthProvider';
import '../styles/Profil.css'



function Profil() {
    const [{user}, dispatch] = UseDataLayer();
    function modification(){
        window.location.href="/modification"
      }
  return (
    <div className="container_profil">
    <form className="profil" >
        <div className="container_desc">
            <div className="container_photo">
                <img src={user.avatar}/>
                <div className="text">Groupomania</div>
                
            </div>
            <div className="container_info">
            <div className="align">
                <div className="text_underline">Nom : {user.nom}</div>
                    
            </div>
                <div className="align">
                    <div className="text_underline">Prénom : {user.prenom}</div>
                    
                </div>
               
                <div className="align">
                    <div  className="text_underline">Email : {user.email}</div>
                    
                </div>
                
            </div>
        </div>
        <div>
            <Link to="/avatar"><button className="btnModif"  >Modifier avatar</button> </Link>
           <Link to="/modification"> <button className="btnModif"  >Mofifier profil</button></Link>
            <Link to="/delete"><button className="btnModif">Supprimer compte</button></Link>
            </div>
    </form>


</div>
  )
}

export default Profil