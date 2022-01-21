//encodedString = base64.b64encode(self.photo.read())
//data = {"key": "4fbf5deca0cfa1a7abcb2615bb6639c5", "image" : encodedString.decode("utf-8")}
//uploadImageInfo = request.post("https://api.imgbb.com/1/upload", data=data)
//jsonResponse = json.loads(uploadImageInfo.text)
//self.image_url = jsonResponse["data"]["display_url"]
import axios from 'axios';
import { useState } from 'react';

function SubirImagen(){
    const URL_BASE = 'http://127.0.0.1:8000/photonet/imagenes/'

    const search = window.location.search; // returns the URL query String
    const params = new URLSearchParams(search); 
    const googleId = params.get('googleId');

    const [imagen, setImagen] = useState(null);

    const handleImageChange = (response) => {
      console.log("Imagen ", response)
      setImagen(response.target.files[0])
    }

    const handleSubmit = (response) => {
      var desc = document.getElementById("descripcion").value;
      var hashtags = document.getElementById("hashtags").value;
      let form_data = new FormData();
      form_data.append("photo", imagen);
      form_data.append("descripcion", desc);
      form_data.append("hashtags", hashtags);
      form_data.append("idG", googleId);
      axios.post(URL_BASE, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        }
      }).then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    }
  
    return(
    <div className="Upload Image">
      <h1>Estas en Subir Imagen</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
        <input
          type="text"
          placeholder="Descripcion"
          id="descripcion"
          required
        />
        <input
          type="text"
          placeholder="Hashtags"
          id="hashtags"
          required
        />
        <input type="submit" />
      </form>
    </div>
    );
}
export default SubirImagen;