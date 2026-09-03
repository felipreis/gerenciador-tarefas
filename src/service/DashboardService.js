import ProjectRepository from '../repositoires/ProjectRepository.js'
import TaskRepository from '../repositoires/TaskRepository.js'
import WeekUtils from '../utils/WeekUtils.js'



async function dashView (userId){
    const diaAtual = new Date();
    const inicio = WeekUtils.getStartOfWeek(diaAtual);
    const fim = WeekUtils.getEndOfWeek(diaAtual);

    const [totalProjects, totalTasks, completedTasks, pendingTasks,completeTasksWeek,pendingTasksWeek] = await Promise.all([
        ProjectRepository.countByUser(userId),
        TaskRepository.countByUser(userId),
        TaskRepository.countByStatus(userId, 'completed'),
        TaskRepository.countByStatus(userId, 'pending'),
        TaskRepository.countByStatusAndDateRange(userId,'completed',inicio,fim),
        TaskRepository.countByStatusAndDateRange(userId,'pending',inicio,fim)

    ])

    return {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        completeTasksWeek,
        pendingTasksWeek
    }
}

export default {
    dashView,
}