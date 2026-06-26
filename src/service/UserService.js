import UserRepository from '../repositoires/UserRepository.js'
import bcrypt from 'bcryptjs';


async function getAll(){
    return await UserRepository.getAll();
}

async function getById(id){
    return await UserRepository.getById(id);
}

async function create(body){
    // não alterar o objeto que vem da requisição
    const hashedBody = {...body, password: await bcrypt.hash(body.password,10) };
    return await UserRepository.create(hashedBody)
}


export default {
    getAll,
    getById,
    create,
}
