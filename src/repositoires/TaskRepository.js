import { where } from "sequelize";
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

async function updateTask(taskId,payload){
    return Task.update(payload, {where: {id: taskId}})
}


export default {
    create,
    getAllTask,
    getTaskById,
    updateTask
}