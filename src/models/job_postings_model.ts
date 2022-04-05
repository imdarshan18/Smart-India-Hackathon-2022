import { Sequelize, Model, DataTypes } from 'sequelize';
import DB from '../utils/database';

class JobPostings extends Model {
    public id!: number;
    public postingType!: string;
    public domain!: string;
    public jobDescription!: string;
    public companyName!: string;
    public country!: string;
    public state!: string;
    public city!: string;
    public requiredExperience!: string;
    public requiredSkills!: string;
    public salary!: number;

    //timestamps
    public createdAt!: Date;
    public updatedAt!: Date;
}

JobPostings.init(
    {
        id: DataTypes.BIGINT,
        postingType: { type: DataTypes.STRING, field: 'posting_type' },
        domain: DataTypes.STRING,
        jobDescription: { type: DataTypes.STRING, field: 'job_description' },
        companyName: { type: DataTypes.STRING, field: 'company_name' },
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        requiredExperience: { type: DataTypes.STRING, field: 'required_experience' },
        requiredSkills: { type: DataTypes.STRING, field: 'required_skills' },
        salary: DataTypes.BIGINT,
        createdAt: { type: DataTypes.DATE, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
        underscored: true,
        sequelize: DB.sequelize,
        modelName: "users",
    }
)

export default JobPostings

export interface IJobPostings {
    postingType?: string;
    domain?: string;
    jobDescription?: string;
    companyName?: string;
    country?: string;
    state?: string;
    city?: string;
    requiredExperience?: string;
    requiredSkills?: string;
    salary?: number;
}