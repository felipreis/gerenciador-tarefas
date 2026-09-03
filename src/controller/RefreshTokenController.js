import responseHttp from "../httpResponse/response.js";
import RefreshTokenService from "../service/RefreshTokenService.js";

async function refresh(req,res,next){
    try {
        const token = req.headers['authorization'];
        const retorno = await RefreshTokenService.refresh(token);
        responseHttp(retorno,res);
    } catch (error) {
        next(error)
    }
}

export default {
    refresh
}

