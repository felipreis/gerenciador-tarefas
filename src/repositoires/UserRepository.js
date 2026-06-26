import User from '../model/User.js'

async function getAll(){
    return await User.findAll();
}

async function getById(id){
    return await User.findByPk(id);
}

async function create(body){
    return await User.create(body)
}

export default {
    getAll,
    getById,
    create,
}