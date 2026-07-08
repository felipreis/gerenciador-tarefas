import ProjectRepository from '../repositoires/ProjectRepository.js'
import TaskRepository from '../repositoires/TaskRepository.js'


async function dashView (userId){
    const [totalProjects, totalTasks, completedTasks, pendingTasks] = await Promise.all([
        ProjectRepository.countByUser(userId),
        TaskRepository.countByUser(userId),
        TaskRepository.countByStatus(userId, 'completed'),
        TaskRepository.countByStatus(userId, 'pending'),
    ])

    return {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks
    }
}

export default {
    dashView,
}