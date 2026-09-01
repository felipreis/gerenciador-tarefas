import UserRepository from "../repositoires/UserRepository.js";
import bcrypt from "bcryptjs";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import refreshToken from "../utils/refreshToken.js";



// função vai checar se existe o usuario, se esta correto as credencias e retornar o token
async function login(email,senha){
    const user = await UserRepository.getByEmail(email);
    if(!user){ throw new Error("Usuário ou senha inválidos" )};

    // compara a senha recebida com a do db criptografada
    const isMatch = await bcrypt.compare(senha,user.password)

    if(!isMatch){ throw new Error("Usuário ou senha inválidos.");}

    //refreshtoken para o usuário
    const refresh = refreshToken.generateRefreshToken(user.id)

    // se for validado retorna ao usuario um token jwt
    const jwtToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

    
    return {
        "accessToken": jwtToken,
        "refreshToken": refresh
    }
    
}

async function me(id){
    return await UserRepository.getById(id);
}



export default {
    login,
    me,
}