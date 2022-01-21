import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { useState } from 'react';

const clientId = "312274359365-0pqn1v5cso68ug496i1srlu3hij5q516.apps.googleusercontent.com";


function Login(){
    const [loading, setLoading] = useState('Loading...');
    const [user, setUser] = useState(null);
    const URL_BASE =  'http://127.0.0.1:8000/';
    
    //handle events methods
    const handleLoginSuccess = (response) => {
        console.log("Login Success ", response)
        setUser(response.profileObj);
        setLoading();
        sessionStorage.setItem("email", response.profileObj.email);
        window.location.href=`/home?googleId=${response.profileObj.googleId}`;
    }
    
    const handleLoginFailure = error => {
        console.log("Login Failure ", error);
        setLoading();
    }
    
    const handleLogoutSuccess = (response) => {
        console.log("Logout Success ", response);
        setUser(null);
        }
    
    const handleLogoutFailure = error => {
        console.log("Logout Failure ", error);
    }
    
    const handleRequest = () => {
        setLoading("Loading...");
    }
    
    const handleAutoLoadFinished = () => {
        setLoading();
    }

    return(
        <div className="Login">
            <h1>Login with Google</h1>
              {user ? <div>
                <div className='name'>Welcome {user.name}</div>
                <GoogleLogout 
                  clientId={clientId}
                  onLogoutSuccess={handleLogoutSuccess}
                  onFailure={handleLogoutFailure}
                />
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </div> :
                <GoogleLogin
                  clientId={clientId}
                  buttonText={loading}
                  onSuccess={handleLoginSuccess}
                  onFailure={handleLoginFailure}
                  onRequest={handleRequest}
                  onAutoLoadFinished={handleAutoLoadFinished}
                  isSignedIn={true}
                />
              }
        </div>
    );
}

export default Login;