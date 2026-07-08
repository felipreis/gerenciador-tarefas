import responseHttp from '../httpResponse/response.js';
import DashboardService from '../service/DashboardService.js'

async function dashView(req,res){
    try {
        const userId = req.user.id;
        const retorno = await DashboardService.dashView(userId);

        responseHttp(retorno,res);      
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}

export default {
    dashView,
}