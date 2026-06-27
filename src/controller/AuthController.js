
import AuthService from '../service/AuthService.js'
import responseHttp from '../httpResponse/response.js';

async function login(req,res){
    const {email , password} = req.body;
    try {
        const retorno = await AuthService.login(email,password);
        responseHttp(retorno,res);
    } catch (erro) {
         return res.status(401).json({ mensagem: erro.message });
    }

}

async function me(req,res){
    const id = req.user.id;
    const retorno = await AuthService.me(id);
    responseHttp(retorno,res);
}

export default {
 login,
 me
} 