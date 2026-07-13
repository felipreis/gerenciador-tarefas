import TaskRepository from '../repositoires/TaskRepository.js'
import ProjectRepository from '../repositoires/ProjectRepository.js';
import { Op } from 'sequelize';

async function create(payload,userId){

    //verificar se o projeto existe
    const projectId = payload.projectId;
    const project = await ProjectRepository.getProjectById(projectId);

    if(!project) { throw new Error('Projeto não encontrado')}

    //verificar se o projeto é do usuário
    if(project.userId !== userId){ throw new Error('Não é possível criar tarefa')};

    return await TaskRepository.create(payload);

}

async function getAllTask(userId,projectId,filters){

    const page = Number(filters.page) || 1
    const limit = Number(filters.limit) || 10
    const offset = (page - 1) * limit
    const where = {};
    if(filters.status){ where.status = filters.status};
    if(filters.priority){ where.priority = filters.priority};
    if(filters.search){ where.title = { [Op.iLike]: `%${filters.search}%` }}

    //verificar se o projeto referente ao id existe
    const project = await ProjectRepository.getProjectById(projectId);
    if(!project){ throw new Error('Projeto não encontrado')}

    //verificar se o usuário pode acessar aquelas tarefas
    if(project.userId !== userId) { throw new Error('Não é possível acessar tarefa')}

    const resultado = await TaskRepository.getAllTask(projectId,where,limit,offset);

    return {
    page,
    limit,
    total: resultado.count,
    data: resultado.rows
    }
}

async function getTaskById(userId,taskId){

    //
    const task = await TaskRepository.getTaskById(taskId);
    console.log('task:', task);
    if(!task){throw new Error ('Tarefa não encontrada')};
    console.log('task.projectId:', task?.projectId);

    const project = await ProjectRepository.getProjectById(task.projectId);
    if(!project){ throw new Error('Projeto não encontrado')}

    //verificar se o usuário pode acessar aquelas tarefas
    if(project.userId !== userId) { throw new Error('Não é possível acessar tarefa')}

    return task
}

async function updateTask(userId,taskId,payload){
    // ver se existe a task
    const task = await TaskRepository.getTaskById(taskId);
    if(!task){throw new Error('Tarefa não encontrada')}

    //conferir se a task esta no projeto que pertence ao usuario logado
    const project = await ProjectRepository.getProjectById(task.projectId);
    if(!project){throw new Error('Projeto não encontrado')}

    if(project.userId !== userId){throw new Error('Não é possível alterar a tarefa')}

    return await TaskRepository.updateTask(taskId,payload);
}

async function deleteTask(userId,taskId){
    const task = await TaskRepository.getTaskById(taskId);
    if(!task){throw new Error('Tarefa não encontrada')}

    //conferir se a task esta no projeto que pertence ao usuario logado
    const project = await ProjectRepository.getProjectById(task.projectId);
    if(!project){throw new Error('Projeto não encontrado')}

    if(project.userId !== userId){throw new Error('Não é possível deletar a tarefa')}

    return await TaskRepository.deleteTask(taskId);
} 


export default{
    create,
    getAllTask,
    getTaskById,
    updateTask,
    deleteTask
}