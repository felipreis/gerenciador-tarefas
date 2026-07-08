import ProjectRepository from '../repositoires/ProjectRepository'
import TaskRepository from '../repositoires/TaskRepository'


async function dashView (userId){

    const totalProjects = await ProjectRepository.countByUser(userId);
    const totalTasks = 
    const completedTasks = 
    const pendingTasks
}

export default {
    dashView,
}