import { Sequelize, Model, DataTypes } from 'sequelize';
import DB from '../utils/database';

class Applications extends Model {
    public id!: number;
    public candidateName!: string;
    public organization!:string;

    //timestamps
    public createdAt!: Date;
    public updatedAt!: Date;
}

Applications.init(
    {
        candidateName: { type: DataTypes.STRING, field: 'candidate_name' },
        organization: DataTypes.STRING,
        createdAt: { type: DataTypes.DATE, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
        underscored: true,
        sequelize: DB.sequelize,
        modelName: "applications",
    }
)

export default Applications

export interface IApplications {
    candidateName: string;
    organization?: string;
}