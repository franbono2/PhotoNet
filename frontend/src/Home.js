import React from "react";
import axios from "axios";
import ListImagenes from "./ListImagenes";
import {GoogleLogin, GoogleLogout} from 'react-google-login';

const clientId = "312274359365-0pqn1v5cso68ug496i1srlu3hij5q516.apps.googleusercontent.com";

function Home(){
    const [imagenes, setImagenes] = React.useState([]);

    const search = window.location.search; // returns the URL query String
    const params = new URLSearchParams(search); 
    const googleId = params.get('googleId');

    const handleLogoutSuccess = (response) => {
        sessionStorage.clear();
        window.location.href='/';
        }
    
    const handleLogoutFailure = error => {
        console.log("Logout Failure ", error);
    }

    function getImagenes(){
        fetch('http://127.0.0.1:8000/photonet/imagenes/',
        {
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response=>response.json())
        .then(response=>setImagenes(response))
        .then(error=>console.log(error))
    }

    React.useEffect(() => {
        getImagenes();
        var email = sessionStorage.getItem("email");
        console.log(email);
    }, []);

    return(
        <div>
        <GoogleLogout 
                  clientId={clientId}
                  onLogoutSuccess={handleLogoutSuccess}
                  onFailure={handleLogoutFailure}
        />
        <div className="Home">
            <h1>Estas en home</h1>
            <h2>GoogleID: {googleId}</h2>
            <ListImagenes list={imagenes} actualizar={() => getImagenes()} />
            <button type="submit" onClick={() =>  window.location.href=`/upload?googleId=${googleId}`}>Subir foto</button>
        </div>
        </div>
    );
}

export default Home;