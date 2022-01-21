import ActualizarImagen from './ActualizarImagen';
import './Img.css'

function ListImagenes({list, actualizar}) {
    const search = window.location.search; // returns the URL query String
    const params = new URLSearchParams(search); 
    const googleId = params.get('googleId');

    function PUTImageLike(id, likes){
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ likes: likes + 1})
            };
            fetch('http://127.0.0.1:8000/photonet/imagenes/' + id  + '/', requestOptions)
                .then(response => response.json())
                .then(error=>console.log(error))
                .then( actualizar())
    }
    function DeleteImage(id, email){
        var savedEmail = sessionStorage.getItem("email");
        console.log("email user", email);
        if (savedEmail == email) {
            fetch('http://127.0.0.1:8000/photonet/imagenes/' + id + '/',
            {
                method:'DELETE', 
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then( actualizar())
        }else{
            alert("No eres el propietario de la imagen");
        }
    }
    
    return(
        <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Descripcion</th>
                        <th>Hashtags</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            list.map(imagenesList=>{
                                if(imagenesList.detail === undefined){
                                    return(
                                        <tr className="set_row">
                                            <td key="Imagen Url"><img src={imagenesList.photo}></img></td>
                                            <td key="Imagen Desc">{imagenesList.descripcion}</td>
                                            <td key="Imagen Hash">{imagenesList.hashtags}</td>
                                            <td key="Imagen Likes">{imagenesList.likes}</td>
                                            <button type="submit" onClick={() => PUTImageLike(imagenesList.id, imagenesList.likes)}> Dar like </button><br/><br/>
                                            <button type="submit" onClick={() => DeleteImage(imagenesList.id, imagenesList.idG)}> Eliminar </button><br/><br/>
                                            <button type="submit" onClick={() =>  window.location.href=`/put?googleId=${googleId}&id=${imagenesList.id}&desc=${imagenesList.descripcion}&hasht=${imagenesList.hashtags}&email=${imagenesList.idG}`}> Actualizar </button><br/><br/>
                                        </tr>   
                                    )
                                }
                            })
                        }
                </tbody>
        </table>
    );
}

export default ListImagenes;