import refreshToken from "../utils/refreshToken.js";
import jwt from 'jsonwebtoken'
import AppError from "../model/AppError.js";


async function refresh(token){

    if (!token) {
        throw new AppError("Token required",401);
    }

    token = token.replace("Bearer ", "");

    
    const userId =  refreshToken.getUserIdByToken(token);
    if(!userId) {
        throw new AppError("Token Inválido",401);
    }

    return  jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

};

export default {
    refresh
}
