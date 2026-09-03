import  {  DataTypes } from 'sequelize';
import sequelize from "../config/database.js"
import User from './User.js';

const Project = sequelize.define(
  'Project',
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    color: {
    type: DataTypes.STRING(7),
    defaultValue: "#ff7a1f"
  },
  },

);

User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

export default Project