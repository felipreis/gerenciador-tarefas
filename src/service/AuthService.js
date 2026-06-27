import UserRepository from "../repositoires/UserRepository.js";
import bcrypt from "bcryptjs";

// função vai checar se existe o usuario, se esta correto as credencias e retornar o token
async function login(email,senha){
    const user = await UserRepository.getByEmail(email);
    if(!user){ throw new Error("Usuário ou senha inválidos" )};

    const isMatch = await bcrypt.compare(senha,user.password)

    if(!isMatch){ throw new Error("Usuário ou senha inválidos.");}

    return user;
    
}

export default {
    login,
}