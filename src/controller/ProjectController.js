import ProjectService from "../service/ProjectService.js";
import responseHttp from "../httpResponse/response.js";

async function create(req,res){
    try {
        const body = req.body;
        const userId = req.user.id
        const retorno = await ProjectService.create(body,userId);
        responseHttp(retorno,res)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
    
}

async function getAllProjects(req,res){
    try {
        const userId = req.user.id;
        const retorno =  await ProjectService.getAllProjects(userId);
        responseHttp(retorno,res);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }

}

async function getProjectById(req,res){

    try {
        const userId = req.user.id;
        const {id} = req.params;
        const retorno = await ProjectService.getProjectById(userId,id);
        responseHttp(retorno, res)
    } catch (error) {
        return res.status(404).json({ mensagem: error.message });
    }

}

async function updateProject(req,res){
    try {
        const userId = req.user.id;
        const {id} = req.params;
        const body = req.body
        const retorno = await ProjectService.updateProject(userId,id,body);
        responseHttp(retorno, res)
    } catch (error) {
        return res.status(404).json({ mensagem: error.message });
    }   
}

async function deleteProjects(req,res){
        try {
        const userId = req.user.id;
        const {id} = req.params;
        const retorno = await ProjectService.deleteProjects(userId,id);
        responseHttp(retorno, res)
    } catch (error) {
        return res.status(404).json({ mensagem: error.message });
    }  
}

export default {
    create,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProjects
}
