import axios from "axios";
import React, {Component} from 'react'

const search = window.location.search; // returns the URL query String
const params = new URLSearchParams(search); 
const googleId = params.get('googleId');

class SubirImagesClass extends Component {

        state = {
            descripcion: "",
            hashtags: "",
            image: null,
        };
        
    handleChange =  (e) => {
        this.setState({
        [e.target.id]: e.target.value,
        });
    };  
    
    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0],
        });
    };
        
    handleSubmit = (e) => {
        var email = sessionStorage.getItem("email");
        console.log(email);
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append("photo", this.state.image, this.state.image.name);
        form_data.append("descripcion", this.state.descripcion);
        form_data.append("hashtags", this.state.hashtags);
        form_data.append("idG", email);
        let url = 'http://127.0.0.1:8000/photonet/imagenes/';
        axios.post(url, form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
              .then(res => {
                console.log(res.data);
              })
              .catch(err => console.log(err))
         window.location.href=`/home?googleId=${googleId}`
    };
    render() {
        return (
            <div className="ImagenClass">
            <form onSubmit={this.handleSubmit}>
                <p>
                <input
                    type="text"
                    placeholder="Descripcion"
                    id="descripcion"
                    value={this.state.descripcion}
                    onChange={this.handleChange}
                    required
                />
                </p>
                <p>
                <input
                    type="text"
                    placeholder="Hashtags"
                    id="hashtags"
                    value={this.state.hashtags}
                    onChange={this.handleChange}
                    required
                />
                </p>
                <p>
                <input
                    type="file"
                    id="photo"
                    accept="photo/png, photo/jpeg"
                    onChange={this.handleImageChange}
                    required
                />
                </p>
                <input type="submit" />
            </form>

            </div>
        );
    }
};

export default SubirImagesClass;

  