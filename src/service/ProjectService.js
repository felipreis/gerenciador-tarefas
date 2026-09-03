import ProjectRepository from "../repositoires/ProjectRepository.js"
import AppError from "../model/AppError.js";

async function create(payload,userId){
    const project = {...payload, userId: userId}
    return await ProjectRepository.create(project);
}

async function getAllProjects(userId){
    return await ProjectRepository.getAllProjects(userId)
}

//conferir se o id do req.params é de um projeto do user do req.user
async function getProjectById(userId,projectId){
    
    const project = await ProjectRepository.getProjectById(projectId);

    if(!project){ throw new AppError("Projeto não encontrado",404); }
    if(project.userId !== userId){ throw new AppError("Não é possível acessar esse projeto",403); }

    
    return project;
    
}

async function updateProject(userId,id,body){
    //verificar se o projeto existe e se é do usuário logado
    const project = await ProjectRepository.getProjectById(id);
    if(!project){ throw new AppError("Projeto não encontrado",404); }
    if(project.userId !== userId){ throw new AppError("Não é possível acessar esse projeto",403); }
    
    return await ProjectRepository.updateProject(id,body)
}

async function deleteProjects(userId,id){
    //verificar se o projeto existe e se é do usuario logado antes de excluir
    const project = await ProjectRepository.getProjectById(id);
    if(!project){ throw new AppError("Projeto não encontrado",404); }
    if(project.userId !== userId){ throw new AppError("Não é possível acessar esse projeto",403); }
    
    return await ProjectRepository.deleteProjects(id)
}


export default {
    create,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProjects
}