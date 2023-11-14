import axios from "axios";
import {UserContext} from "../UserContext";
import { useContext } from "react";
import fakeUser from "../testData/fakeUser"

const API_URL = "http://localhost:8080/api/auth/";

    
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (userName, password) => {  
    function delay(){
      return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if(userName!=='user'||userName!=='provider'||userName!=='admin'){
          const error = true;
          reject(fakeUser(userName))
        }
        else{
          resolve(fakeUser(userName));
        }
        
        
      }, 1000);
     
    });}
    return delay()
      .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data)
      return response.data;
    });
    
  // return axios
  //   .post(API_URL + "signin", {
  //     userName,
  //     password,
  //   })
  //   .then((response) => {
  //     if (response.data.accessToken) {
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //     }

  //     return response.data;
  //   });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
  
