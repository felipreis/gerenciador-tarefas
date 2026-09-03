import TaskRepository from '../repositoires/TaskRepository.js'
import ProjectRepository from '../repositoires/ProjectRepository.js';
import { Op } from 'sequelize';
import WeekUtils from '../utils/WeekUtils.js';
import AppError from "../model/AppError.js";


async function create(payload,userId){

    //verificar se o projeto existe
    const projectId = payload.projectId;
    const project = await ProjectRepository.getProjectById(projectId);

    if(!project) { throw new AppError('Projeto não encontrado',404)}

    //verificar se o projeto é do usuário
    if(project.userId !== userId){ throw new AppError('Não é possível criar tarefa',403)};

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
    if(!project){ throw new AppError('Projeto não encontrado',404)}

    //verificar se o usuário pode acessar aquelas tarefas
    if(project.userId !== userId) { throw new AppError('Não é possível acessar tarefa',403)}

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

    if(!task){throw new AppError ('Tarefa não encontrada',404)};
    

    const project = await ProjectRepository.getProjectById(task.projectId);
    if(!project){ throw new AppError('Projeto não encontrado',404)}

    //verificar se o usuário pode acessar aquelas tarefas
    if(project.userId !== userId) { throw new AppError('Não é possível acessar tarefa',403)}

    return task
}

async function updateTask(userId,taskId,payload){
    // ver se existe a task
    const task = await TaskRepository.getTaskById(taskId);
    if(!task){throw new AppError('Tarefa não encontrada',404)}

    //conferir se a task esta no projeto que pertence ao usuario logado
    const project = await ProjectRepository.getProjectById(task.projectId);
    if(!project){throw new AppError('Projeto não encontrado',404)}

    if(project.userId !== userId){throw new AppError('Não é possível alterar a tarefa',403)}

    return await TaskRepository.updateTask(taskId,payload);
}

async function deleteTask(userId,taskId){
    const task = await TaskRepository.getTaskById(taskId);
    if(!task){throw new AppError('Tarefa não encontrada',404)}

    //conferir se a task esta no projeto que pertence ao usuario logado
    const project = await ProjectRepository.getProjectById(task.projectId);
    if(!project){throw new AppError('Projeto não encontrado',404)}

    if(project.userId !== userId){throw new AppError('Não é possível deletar a tarefa',403)}

    return await TaskRepository.deleteTask(taskId);
} 

async function getWeekView(userId, referenceDate) {
    //calcula o inicio e o fim da semana a partir de uma data de referencia e chama o getByDateRange do repository
    if(!referenceDate){
        referenceDate = new Date();
    }

    const inicio = WeekUtils.getStartOfWeek(referenceDate);
    const fim = WeekUtils.getEndOfWeek(referenceDate);

    const tarefas = await TaskRepository.getByDateRange(userId,inicio,fim)

    // 1 - array de nomes da semana na ordem que o getDay devolve
    const nomeDias = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];

    //objeto de resultado
    const semana = {};
    nomeDias.forEach(nome => {
        semana[nome] = [];
    })

    tarefas.forEach(tarefa => {
        const indiceDia = tarefa.dueDate.getDay();
        const nomeDia = nomeDias[indiceDia];
        semana[nomeDia].push(tarefa);
    })

    return semana;

}


export default{
    create,
    getAllTask,
    getTaskById,
    updateTask,
    deleteTask,
    getWeekView
}


