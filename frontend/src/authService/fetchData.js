import axios from "axios";
import authHeader from "./authHeader";
import { Navigate } from "react-router-dom";
async function getData(url, page, params, redirect) {
  return await axios
    .get(url, {
      headers: authHeader(),
      params: {
        page: page,
        ...(params && { ...params }),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
      window.location.href = redirect ? redirect : "/";
      return undefined;
    });
}
async function postData(url, body, redirect) {
  return await axios
    .post(url, body, { headers: authHeader() })
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      console.log(error);
      console.log(redirect);
      alert(error.response.data);
      window.location.href = redirect ? redirect : "/";
      return [];
    });
}
async function putData(url, body, redirect) {
  return await axios
    .put(url, body, { headers: authHeader() })
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
      window.location.href = redirect ? redirect : "/";
      return [];
    });
}
async function postDateWithImg(url, data, img, redirect) {
  var bodyFormData = new FormData();
  // img = new Blob(img)
  console.log(img);
  console.log(data);
  const obj = JSON.stringify(data);
  const bytes = new TextEncoder().encode(obj);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8",
  });
  bodyFormData.append("data", blob, "data");

  return axios({
    method: "post",
    url: url,
    data: bodyFormData,
    files: img,

    headers: { "Content-Type": "multipart/form-data", ...authHeader() },
  })
    .then((res) => {
      console.log(res);
      return res.status;
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
      window.location.href = redirect ? redirect : "/";
      return [];
    });
}
async function putDataWithImg(url, data, img, redirect) {
  var bodyFormData = new FormData();
  // img = new Blob(img)
  console.log(img);
  console.log(data);
  const obj = JSON.stringify(data);
  const bytes = new TextEncoder().encode(obj);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8",
  });
  bodyFormData.append("data", blob, "data");
  if (img) {
    console.log(11);
    bodyFormData.append("img", img, "img");
  }

  return axios({
    method: "put",
    url: url,
    data: bodyFormData,
    files: img,
    headers: { "Content-Type": "multipart/form-data", ...authHeader() },
  })
    .then((res) => {
      console.log(res);
      return res.status;
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
      window.location.href = redirect ? redirect : "/";
      return [];
    });
}
const FetchData = {
  getData,
  postData,
  postDateWithImg,
  putData,
  putDataWithImg,
};

export default FetchData;
