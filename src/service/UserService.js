import AppError from '../model/AppError.js';
import UserRepository from '../repositoires/UserRepository.js'
import bcrypt from 'bcryptjs';



async function getAll(){
    return await UserRepository.getAll();
}

async function getById(id){
    const user = await UserRepository.getById(id);
    if(!user){throw new AppError("Usuário não encontrado", 404)}
    return user;
}

async function create(body){
    // não alterar o objeto que vem da requisição
    const hashedBody = {...body, password: await bcrypt.hash(body.password,10) };
    return await UserRepository.create(hashedBody)
}

async function getByEmail(email){
    const user = await UserRepository.getByEmail(email);
    if(!user){throw new AppError("Usuário não encontrado", 404);}
    return user;
}


export default {
    getAll,
    getById,
    create,
    getByEmail,
}
