import TaskRepository from '../repositoires/TaskRepository.js'
import ProjectRepository from '../repositoires/ProjectRepository.js';

async function create(payload,userId){

    //verificar se o projeto existe
    const projectId = payload.projectId;
    console.log('projectId recebido:', payload.projectId);
    const project = await ProjectRepository.getProjectById(projectId);
    console.log('projeto encontrado:', project);

    if(!project) { throw new Error('Projeto não encontrado')}

    //verificar se o projeto é do usuário
    if(project.userId !== userId){ throw new Error('Não é possível criar tarefa')};

    return await TaskRepository.create(payload);

}


export default{
    create
}