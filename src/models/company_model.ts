import { Sequelize, Model, DataTypes } from 'sequelize';
import DB from '../utils/database';

class Company extends Model {
    public id!: number;
    public companyName!: string;
    public companyRegistrationId!: string;
    public country!: string;
    public state!: string;
    public city!: string;

    //timestamps
    public createdAt!: Date;
    public updatedAt!: Date;
}

Company.init(
    {
        companyName: { type: DataTypes.STRING, field: 'company_name' },
        companyRegistrationId: { type: DataTypes.STRING, field: 'company_registration_id' },
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        createdAt: { type: DataTypes.DATE, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
        underscored: true,
        sequelize: DB.sequelize,
        modelName: "company",
    }
)

export default Company

export interface ICompany {
    companyName?: string;
    companyRegistrationId?: string;
    country?: string;
    state?: string;
    city?: string;
}