import responseHttp from "../httpResponse/response.js";
import RefreshTokenService from "../service/RefreshTokenService.js";

async function refresh(req,res){
    try {
        const token = req.headers['authorization'];
        const retorno = await RefreshTokenService.refresh(token);
        responseHttp(retorno,res);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export default {
    refresh
}

