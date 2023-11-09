import { getUsersQuery, getUsersByIdQuery } from '../models/users.js'

export const getUsers = async(req,res) =>{

    const result = await getUsersQuery()

    return res.status(200).json(result)
}

export const getUsersById = async(req,res) =>{
    
    const { id } = req.params
    const result = await getUsersByIdQuery(id)
    return res.status(200).json(result)
}