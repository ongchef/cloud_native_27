export default function fakseUser(userName){
    switch(userName){
        case "user":{
            return {
                data:{
                    accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjk5NTIwMTIwLCJleHAiOjE2OTk2MDY1MjB9.IPL4P3vzBgv_ivIzUsG_7LdHxe__vWOxpRowqNYdqIxEZC-S1_r9VtEvXnnHWG-w87DrhqPZySQ7szAlu7krpg",
                    email: "111111@gmail.com",
                    id: 1,
                    role:["ROLE_USER"],
                    tokenType: "Bearer",
                    username: "user"
                }
            }
        }
        case "provider":{
            return {
                data:{    
                    accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm92aWRlciIsImlhdCI6MTY5OTUyMDIwOCwiZXhwIjoxNjk5NjA2NjA4fQ.ODj6N_FwUCIz7uazVCp8_37xCnAssiKBZkzzcx_hdOe9b_IZNnrHy9Bx5zsIox8_h6tK_J3njAtdb80-31xfog",
                    email: "222222@gmail.com",
                    id: 2,
                    role:["ROLE_PROVIDER"],
                    tokenType: "Bearer",
                    username: "provider"
                }
            }
        }
        case "admin":{
            return {
                data:{
                    accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTUyMDI3NywiZXhwIjoxNjk5NjA2Njc3fQ.M9xWnMOJgcIJEi53llC3YDZa60DuXn6utC6PPunJ9Gb0kOV__-Hcp7bNH6HsOcteDTswGD5U3xbaTiictLu4LQ",
                    email: "333333@gmail.com",
                    id: 3,
                    role:["ROLE_ADMIN"],
                    tokenType: "Bearer",
                    username: "admin"
                }
            }
        }
        default:{
            return{
                
                    "path": "/api/auth/signin",
                    "error": "Unauthorized",
                    "message": "Bad credentials",
                    "status": 401
                
            }
        }
    }
  
}