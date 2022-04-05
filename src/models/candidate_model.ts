import { Sequelize, Model, DataTypes } from 'sequelize';
import DB from '../utils/database';

class Candidates extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public college: string;
    public organization: string;
    public experience!: number;
    public country!: string;
    public state!: string;
    public city!: string;
    public dateOfBirth!: Date;

    //timestamps
    public createdAt!: Date;
    public updatedAt!: Date;
}

Candidates.init(
    {
        id: DataTypes.BIGINT,
        firstName: { type: DataTypes.STRING, field: 'first_name' },
        lastName: { type: DataTypes.STRING, field: 'last_name' },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        college: DataTypes.STRING,
        organization: DataTypes.STRING,
        experience: DataTypes.NUMBER,
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        dateOfBirth: { type: DataTypes.DATE, field: 'date_of_birth' },
        createdAt: { type: DataTypes.DATE, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
        underscored: true,
        sequelize: DB.sequelize,
        modelName: "users",
    }
)

export default Candidates

export interface ICandidates {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    college?: string;
    organization?: string;
    experience?: number;
    country?: string;
    state?: string;
    city?: string;
    dateOfBirth?: Date;
}