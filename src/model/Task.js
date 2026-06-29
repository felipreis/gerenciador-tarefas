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
        }
    }
)

Project.hasMany(Task, {foreignKey: 'projectId'})
Task.belongsTo(Project, {foreignKey: 'projectId'})

export default Task;