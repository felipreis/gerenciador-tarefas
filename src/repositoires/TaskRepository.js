import { where } from "sequelize";
import Task from "../model/Task.js";
import Project from '../model/Project.js'


async function create(payload){
    return await Task.create(payload)
}

async function getAllTask(projectId,where,limit,offset){
    return await Task.findAndCountAll({
            where: where,
            limit:limit,
            offset:offset,
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

async function deleteTask(taskId){
    return await Task.destroy({
        where:{
            id:taskId
        }
    })
}

async function countByUser(userId) {
    return await Task.count({   include: [{
        model: Project,
        where: { 
            userId: userId    
        }
    }] })
}

async function countByStatus(userId,status) {
    return await Task.count({ 
        where: {
            status:status
        },  
        include: [{
        model: Project,
        where: { 
            userId: userId    
        }
    }] })
}


export default {
    create,
    getAllTask,
    getTaskById,
    updateTask,
    deleteTask,
    countByUser,
    countByStatus
}