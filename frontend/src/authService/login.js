import React, { Component, useContext, useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { UserContext } from "../UserContext";
import axios from "axios";
import AuthService from "./authService";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Login() {
  
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const form = useRef();
    const checkBtn = useRef();
    const [user, setUser] = useContext(UserContext);
  
    

    function handleLogin(e) {
        e.preventDefault();
        setMessage("")
        setLoading(true)
        form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {

           
            AuthService.login(userName, password)
            .then(()=> {
                // this.props.history.push("/profile");
                  window.location.href='/'
            },
            error => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                setLoading(false)
                setMessage(resMessage)
            }
            );
      } else {
        setLoading(false)
      }
    }

      return (
        <Paper sx={{
          // height: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign:'center'}} 
          elevation={8} >
          <Box display='flex' justifyContent='center'>
          <div className="col-md-4">
            <div className="card card-container">
              {/* <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              /> */}
              <Typography variant="h3" gutterBottom justifyContent='center' display='flex'>
                Joinable
              </Typography>
              <Form
                onSubmit={handleLogin}
                ref={form}
              >
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    validations={[required]}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    validations={[required]}
                  />
                </div>
  
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={loading}
                    onClick={()=>handleLogin}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
  
                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={checkBtn}
                />
              </Form>
            </div>
          </div>
          </Box>
        </Paper>
      );
    
  }
  

// export default class Login extends Component {
  
//   constructor(props) {
//     super(props);
//     this.handleLogin = this.handleLogin.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       username: "",
//       password: "",
//       loading: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   handleLogin(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       loading: true
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.login(this.state.username, this.state.password).then(
//         () => {
//           // this.props.history.push("/profile");
//         //   window.location.href='/home'
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             loading: false,
//             message: resMessage
//           });
//         }
//       );
//     } else {
//       this.setState({
//         loading: false
//       });
//     }
//   }

//   render() {
    
//     return (
//       <Paper sx={{
//         // height: 500,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         textAlign:'center'}} 
//         elevation={8} >
//         <Box display='flex' justifyContent='center'>
//         <div className="col-md-4">
//           <div className="card card-container">
//             {/* <img
//               src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//               alt="profile-img"
//               className="profile-img-card"
//             /> */}
//             <Typography variant="h3" gutterBottom justifyContent='center' display='flex'>
//               I'm in
//             </Typography>
//             <Form
//               onSubmit={this.handleLogin}
//               ref={c => {
//                 this.form = c;
//               }}
//             >
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="username"
//                   value={this.state.username}
//                   onChange={this.onChangeUsername}
//                   validations={[required]}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <Input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={this.state.password}
//                   onChange={this.onChangePassword}
//                   validations={[required]}
//                 />
//               </div>

//               <div className="form-group">
//                 <button
//                   className="btn btn-primary btn-block"
//                   disabled={this.state.loading}
//                 >
//                   {this.state.loading && (
//                     <span className="spinner-border spinner-border-sm"></span>
//                   )}
//                   <span>Login</span>
//                 </button>
//               </div>

//               {this.state.message && (
//                 <div className="form-group">
//                   <div className="alert alert-danger" role="alert">
//                     {this.state.message}
//                   </div>
//                 </div>
//               )}
//               <CheckButton
//                 style={{ display: "none" }}
//                 ref={c => {
//                   this.checkBtn = c;
//                 }}
//               />
//             </Form>
//           </div>
//         </div>
//         </Box>
//       </Paper>
//     );
//   }
// }
