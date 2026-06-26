import UserRepository from '../repositoires/UserRepository.js'

async function getAll(){
    return await UserRepository.getAll();
}

async function getById(id){
    return await UserRepository.getById(id);
}

async function create(body){
    return await UserRepository.create(body)
}


export default {
    getAll,
    getById,
    create,
}