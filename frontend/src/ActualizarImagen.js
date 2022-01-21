import React from "react";

function ActualizarImagen(){
    const search = window.location.search; // returns the URL query String
    const params = new URLSearchParams(search); 
    const googleId = params.get('googleId');
    const idphoto = params.get('id');
    const desc = params.get('desc');
    const hasht = params.get('hasht');
    const email = params.get('email');

    function PUTImage(id){
        var savedEmail = sessionStorage.getItem("email");
        console.log("email user", email);
        if (savedEmail == email) {
        var descripcion = document.getElementById("descripcion").value;
        var hashtags = document.getElementById("hashtags").value;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion: descripcion, hashtags: hashtags})
        };
        fetch('http://127.0.0.1:8000/photonet/imagenes/' + id  + '/', requestOptions)
            .then(response => response.json())
            .then(error=>console.log(error))
        }else{
            alert("No eres el propietario");
        }
        window.location.href=`/home?googleId=${googleId}`;
}

    React.useEffect(() => {
        var email = sessionStorage.getItem("email");
        console.log(email);
        console.log(hasht);
    }, []);

    return(
        <div className="ActImagen">
            <h1>Estas en actualizer</h1>
            <p>  Google: {googleId}  </p>
            <p> ID: {idphoto}  </p> 
            <p>
                <input
                    type="text"
                    id="descripcion"
                    placeholder={desc}
                    required
                />
            </p>
            <p>
                <input
                    type="text"
                    id="hashtags"
                    placeholder={hasht}
                    required
                />
            </p>
            <button type="submit" onClick={() => PUTImage(idphoto)}> Actualizar Imagen </button><br/><br/>
        </div>
    );
}
export default ActualizarImagen;