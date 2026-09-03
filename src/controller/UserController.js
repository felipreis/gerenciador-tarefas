import UserService from '../service/UserService.js'
import responseHttp from '../httpResponse/response.js'
import User from '../model/User.js';

async function getAll(req,res,next){
    try {
         const retorno = await UserService.getAll();
        responseHttp(retorno,res);
    } catch (error) {
        next(error)
    }

}

async function create(req,res,next){
    try {
        const body = req.body;
        const retorno = await UserService.create(body)
        responseHttp(retorno,res)       
    } catch (error) {
        next(error)
    }
}

async function getById(req,res,next){
    try {
        const {id} = req.params;
        const retorno = await UserService.getById(id);
        responseHttp(retorno,res);
    } catch (error) {
        next(error)
    }

}

async function getByEmail(req,res,next){
    try {
        const {email} = req.body;
        const retorno = await UserService.getByEmail(email);
        responseHttp(retorno,res);
    } catch (error) {
        next(error)
    }

}


export default {
    getAll,
    getById,
    create,
    getByEmail,
}