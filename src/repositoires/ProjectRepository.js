import Project from "../model/Project.js";

async function create(payload){
    return await Project.create(payload);
}

async function getAllProjects(userId){
    return await Project.findAll({
        where: {
            userId: userId
        }
    })
}

async function getProjectById(id){
    return await Project.findByPk(id);
}

async function updateProject(id,payload){
    return await Project.update(payload,{where:{id}});
}

async function deleteProjects(id){
    return await Project.destroy({
        where: {
            id: id
        }
    })
}

async function countByUser(userId) {
    return await Project.count({ where: { userId } })
}

export default {
    create,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProjects,
    countByUser
}