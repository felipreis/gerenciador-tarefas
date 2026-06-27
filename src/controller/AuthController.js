
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

export default {
 login,
} 