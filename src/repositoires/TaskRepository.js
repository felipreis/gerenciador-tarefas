import Task from "../model/Task.js";

async function create(payload){
    return await Task.create(payload)
}

export default {
    create
}