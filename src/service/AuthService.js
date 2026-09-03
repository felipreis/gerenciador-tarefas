import UserRepository from "../repositoires/UserRepository.js";
import bcrypt from "bcryptjs";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import refreshToken from "../utils/refreshToken.js";
import AppError from "../model/AppError.js";



// função vai checar se existe o usuario, se esta correto as credencias e retornar o token
async function login(email,senha){
    const user = await UserRepository.getByEmail(email);
    if(!user){ throw new AppError("Usuário ou senha inválidos.",401)};

    // compara a senha recebida com a do db criptografada
    const isMatch = await bcrypt.compare(senha,user.password)

    if(!isMatch){ throw new AppError("Usuário ou senha inválidos.",401);}

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
    const user = await UserRepository.getById(id);
    if (!user){ throw new AppError("Usuário não encontrado",404)}
    return user
}



export default {
    login,
    me,
}