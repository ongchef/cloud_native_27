import axios from "axios";
import authHeader from "./authHeader";
import { Navigate } from "react-router-dom";
async function getData  (url,page,params) {
    return await axios.get(url,{
        headers:authHeader(),
        params:{
            page:page,
            ...(params&&{...params})
        }
    })
    .then((res)=>{return res.data})
    .catch((error)=>{
        console.log(error)
        alert("not authorized")
        window.location.href="/"
        return []
    })
}
const FetchData={
    getData
}

export default FetchData
