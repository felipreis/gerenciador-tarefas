import TaskService from '../service/TaskService.js'
import responseHttp from '../httpResponse/response.js';


async function create(req,res,next){
    try {
        const body = req.body;
        const userId   = req.user.id;
        const retorno = await TaskService.create(body,userId);
        responseHttp(retorno,res);      
    } catch (error) {
       next(error)
    }

}

async function getAllTask(req,res,next){
    try {
        const userId = req.user.id;
        const {projectId} = req.params;
        const { status, priority, search, page, limit } = req.query;
        const retorno = await TaskService.getAllTask(userId,projectId,{ status, priority, search, page, limit });
        responseHttp(retorno,res);        
    } catch (error) {
       next(error)
    }

}

async function getTaskById(req,res,next){
    try {
        const {taskId} = req.params;
        const userId = req.user.id;
        const retorno = await TaskService.getTaskById(userId,taskId);
        responseHttp(retorno,res)
    } catch (error) {
       next(error)
    }   
}

async function updateTask(req,res,next){
    try {
        const {taskId} = req.params;
        const userId = req.user.id;
        const body = req.body;
        const retorno = await TaskService.updateTask(userId,taskId,body);
        responseHttp(retorno,res) 
    } catch (error) {
       next(error)       
    }
}

async function deleteTask(req,res,next){
    try {
        const {taskId} = req.params;
        const userId = req.user.id;
        const retorno = await TaskService.deleteTask(userId,taskId);
        responseHttp(retorno,res);
    } catch (error) {
       next(error)
    }
}

async function getWeekView(req,res,next){
    try {
        const {date} = req.query;
        const userId = req.user.id;
        const retorno = await TaskService.getWeekView(userId,date)
        responseHttp(retorno,res)
    } catch (error) {
        
        next(error)
        
    }
}


export default {
    create,
    getAllTask,
    getTaskById,
    updateTask,
    deleteTask,
    getWeekView
}