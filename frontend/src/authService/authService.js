import axios from "axios";
import {UserContext} from "../UserContext";
import { useContext } from "react";

const API_URL = "/api/auth/";

    
export function logout() {
    localStorage.removeItem("user");
  }

export function RegisterService(username, email, password) {
    // return axios.post(API_URL + "signup", {
    //   username,
    //   email,
    //   password
    // });
  }

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  
