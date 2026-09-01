import refreshToken from "../utils/refreshToken.js";
import jwt from 'jsonwebtoken'

async function refresh(token){

    if (!token) {
        throw new Error ("Token required");
    }

    token = token.replace("Bearer ", "");

    
    const userId =  refreshToken.getUserIdByToken(token);
    if(!userId) {
        throw new Error ("Token Inválido");
    }

    return  jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

};

export default {
    refresh
}
