import UserService from '../service/UserService.js'
import responseHttp from '../httpResponse/response.js'
import User from '../model/User.js';

async function getAll(req,res){
 const retorno = await UserService.getAll();
 responseHttp(retorno,res);
}

async function create(req,res){
    const body = req.body;
    const retorno = await UserService.create(body)
    responseHttp(retorno,res)

}

async function getById(req,res){
    const {id} = req.params;
    const retorno = await UserService.getById(id);
    responseHttp(retorno,res);
}

export default {
    getAll,
    getById,
    create,
}