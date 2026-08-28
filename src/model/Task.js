import {DataTypes} from 'sequelize'
import sequelize from '../config/database.js'
import Project from './Project.js'

const Task = sequelize.define(
    'Task',
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:true
        },
        status:{
            type:DataTypes.ENUM('pending','in_progress','completed','canceled'),
            defaultValue: 'pending',
            allowNull:false,
        },
        priority:{
            type:DataTypes.ENUM('low','medium','high','urgent'),
            allowNull:false,
        },
        dueDate:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        order: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        hooks: {
            beforeCreate: (task) => {
                // Se ninguém mandou 'order' explicitamente, joga a tarefa pro
                // "fim da fila" usando o timestamp atual — sempre crescente,
                // sem precisar de uma query extra pra achar o maior valor.
                if (task.order == null || task.order === 0) {
                    task.order = Date.now();
                }
            },
        },
    }
)

Project.hasMany(Task, {foreignKey: 'projectId'})
Task.belongsTo(Project, {foreignKey: 'projectId'})

export default Task;