import responseHttp from '../httpResponse/response.js';
import DashboardService from '../service/DashboardService.js'

async function dashView(req,res,next){
    try {
        const userId = req.user.id;
        const retorno = await DashboardService.dashView(userId);

        responseHttp(retorno,res);      
    } catch (error) {
        
        next(error)
    }

}

export default {
    dashView,
}