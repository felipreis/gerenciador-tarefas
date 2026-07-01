import TaskService from '../service/TaskService.js'
import responseHttp from '../httpResponse/response.js';


async function create(req,res){
    try {
        const body = req.body;
        const userId   = req.user.id;
        const retorno = await TaskService.create(body,userId);
        responseHttp(retorno,res);      
    } catch (error) {
        if(error.message === 'Projeto não encontrado'){
            return res.status(404).json({message: error.message})
        }
        if(error.message === 'Não é possível criar tarefa'){
            return res.status(403).json({message: error.message})
        }
        return res.status(500).json({message: error.message})
    }

}

async function getAllTask(req,res){
    try {
        const userId = req.user.id;
        const {projectId} = req.params;
        const retorno = await TaskService.getAllTask(userId,projectId);
        responseHttp(retorno,res);        
    } catch (error) {
        if(error.message === 'Projeto não encontrado'){
            return res.status(404).json({message: error.message})
        }
        if(error.message === 'Não é possível acessar tarefa'){
            return res.status(403).json({message:error.message})
        }

        return res.status(500).json({message:error.message})
    }

}

async function getTaskById(req,res){
    try {
        const {taskId} = req.params;
        const userId = req.user.id;
        const retorno = await TaskService.getTaskById(userId,taskId);
        responseHttp(retorno,res)
    } catch (error) {
        if(error.message === 'Projeto não encontrado' || error.message === 'Tarefa não encontrada'){
            return res.status(404).json({message: error.message})
        }
        if(error.message === 'Não é possível acessar tarefa'){
            return res.status(403).json({message: error.message})  
        }
        return res.status(500).json({message: error.message})
    }   
}

async function updateTask(req,res){
    try {
        const {taskId} = req.params;
        const userId = req.user.id;
        const body = req.body;
        const retorno = await TaskService.updateTask(userId,taskId,body);
        responseHttp(retorno,res) 
    } catch (error) {
        if(error.message === 'Projeto não encontrado' || error.message === 'Tarefa não encontrada'){
            return res.status(404).json({message: error.message})
        }
        if(error.message === 'Não é possível alterar a tarefa'){
            return res.status(403).json({message: error.message})  
        }
        return res.status(500).json({message: error.message})       
    }
}

async function deleteTask(req,res){
    try {
        const {taskId} = req.params;
        const userId = req.user.id;
        const retorno = await TaskService.delete(userId,taskId);
        responseHttp(retorno,res);
    } catch (error) {
        if(error.message === 'Projeto não encontrado' || error.message === 'Tarefa não encontrada'){
            return res.status(404).json({message: error.message})
        }
        if(error.message === 'Não é possível deletar a tarefa'){
            return res.status(403).json({message: error.message})  
        }
        return res.status(500).json({message: error.message})
    }
}


export default {
    create,
    getAllTask,
    getTaskById,
    updateTask,
    deleteTask
}