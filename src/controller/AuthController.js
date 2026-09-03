
import AuthService from '../service/AuthService.js'
import responseHttp from '../httpResponse/response.js';

async function login(req,res,next){
    const {email , password} = req.body;
    try {
        const retorno = await AuthService.login(email,password);
        responseHttp(retorno,res);
    } catch (erro) {
         
         next(erro)
    }

}

async function me(req,res,next){
    try {
        const id = req.user.id;
        const retorno = await AuthService.me(id);
        responseHttp(retorno,res);
        
    } catch (erro) {
        next(erro)
    }

}

export default {
 login,
 me
} 