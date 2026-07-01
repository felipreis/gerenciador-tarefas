import TaskRepository from '../repositoires/TaskRepository.js'
import ProjectRepository from '../repositoires/ProjectRepository.js';

async function create(payload,userId){

    //verificar se o projeto existe
    const projectId = payload.projectId;
    const project = await ProjectRepository.getProjectById(projectId);

    if(!project) { throw new Error('Projeto não encontrado')}

    //verificar se o projeto é do usuário
    if(project.userId !== userId){ throw new Error('Não é possível criar tarefa')};

    return await TaskRepository.create(payload);

}

async function getAllTask(userId,projectId){

    //verificar se o projeto referente ao id existe
    const project = await ProjectRepository.getProjectById(projectId);
    if(!project){ throw new Error('Projeto não encontrado')}

    //verificar se o usuário pode acessar aquelas tarefas
    if(project.userId !== userId) { throw new Error('Não é possível acessar tarefa')}

    return await TaskRepository.getAllTask(projectId);
}

async function getTaskById(userId,taskId){

    //
    const task = await TaskRepository.getTaskById(taskId);
    if(!task){throw new Error ('Tarefa não encontrada')}

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