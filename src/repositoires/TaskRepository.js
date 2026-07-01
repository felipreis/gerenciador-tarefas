import Task from "../model/Task.js";

async function create(payload){
    return await Task.create(payload)
}

async function getAllTask(projectId){
    return await Task.findAll({
            include: [{
        model: Project,
        where: { 
            id: projectId    
        }
    }]
    })
}

async function getTaskById(taskId){
    return await Task.findByPk(taskId);
}

export default {
    create,
    getAllTask
}