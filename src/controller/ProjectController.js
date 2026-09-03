import ProjectService from "../service/ProjectService.js";
import responseHttp from "../httpResponse/response.js";

async function create(req,res,next){
    try {
        const body = req.body;
        const userId = req.user.id
        const retorno = await ProjectService.create(body,userId);
        responseHttp(retorno,res)
    } catch (error) {
        next(error)
    }
    
}

async function getAllProjects(req,res,next){
    try {
        const userId = req.user.id;
        const retorno =  await ProjectService.getAllProjects(userId);
        responseHttp(retorno,res);
    } catch (error) {
        next(error)
    }

}

async function getProjectById(req,res,next){

    try {
        const userId = req.user.id;
        const {id} = req.params;
        const retorno = await ProjectService.getProjectById(userId,id);
        responseHttp(retorno, res)
    } catch (error) {
       next(error)
    }

}

async function updateProject(req,res,next){
    try {
        const userId = req.user.id;
        const {id} = req.params;
        const body = req.body
        const retorno = await ProjectService.updateProject(userId,id,body);
        responseHttp(retorno, res)
    } catch (error) {
       next(error)  
    }   
}

async function deleteProjects(req,res,next){
        try {
        const userId = req.user.id;
        const {id} = req.params;
        const retorno = await ProjectService.deleteProjects(userId,id);
        responseHttp(retorno, res)
    } catch (error) {
       next(error)    
    }  
}

export default {
    create,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProjects
}
