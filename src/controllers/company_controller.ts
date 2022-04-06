import RestResponse, { IRestResponse } from "../utils/rest_response";
import RestErrors, { IRestError } from "../utils/rest_errors";
import { IResultAndError } from "../interfaces/result_and_error";
import { Request, Response } from 'express';
import Application from "../models/application_model";
import { bodyValidator } from "../helpers/static_functions";
import Company from "../models/company_model";

const createCompanyFields = ["companyName", "companyRegistrationId", "country", "state", "city"];
const companyAttributes = ["companyName", "companyRegistrationId", "country", "state", "city"];

class CompanyController {
    public static async createCompany(req: Request, res: Response) {
        try {
            const { companyName, companyRegistrationId, country, state, city } = req.body;

            if(!bodyValidator(req.body, createCompanyFields)) {
                const er = RestErrors.newBadRequestError("Invalid input");
                res.status(er.status);
                res.json(er);
                return;
            }

            const newCompany = await Company.create({
                companyName,
                companyRegistrationId,
                country,
                state,
                city
            })

            const r = RestResponse.newResponse({
                data: newCompany
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            console.log("CompanyController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async getAllCompanies(req: Request, res: Response) {
        try {
            const { skip=0, limit=50 }: any = req.query;

            const allCompany = await Company.findAll({
                limit: parseInt(limit),
                offset: parseInt(skip),
                order: [['created_at', 'DESC']]
            });

            const resCount = await Company.count({
                distinct: true,
                col: 'id'
            });

            const r = RestResponse.newResponse({
                data: { response: allCompany, count: resCount}
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            console.log("CompanyController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async getOneCompany(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if(!id) {
                const er = RestErrors.newBadRequestError("Given ID is not valid");
                res.status(er.status);
                res.json(er);
                return;
            }

            const company: any = await Company.findOne({
                where: { id }
            });

            if(!company) {
                const er = RestErrors.newBadRequestError("Company does not exist");
                res.status(er.status);
                res.json(er);
                return;
            }

            const r = RestResponse.newResponse({
                data: company
            });
            res.status(r.status);
            res.json(r)
        } catch (err) {
            console.log("CompanyController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async updateCompany(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const incomingRequest = req.body;

            if(!incomingRequest || !bodyValidator(incomingRequest, companyAttributes)) {
                const er = RestErrors.newBadRequestError("Enter valid input");
                res.status(er.status);
                res.json(er);
                return;
            }

            if(!id) {
                const er = RestErrors.newBadRequestError("Requested ID is not valid");
                res.status(er.status);
                res.json(er);
                return;
            }

            const company = await Company.findByPk(id);

            if(!company) {
                const er = RestErrors.newNotFoundError("Company does not exist");
                res.status(er.status);
                res.json(er);
                return;
            }

            const currentTime = new Date();
            const result = await Company.update(
                { ...incomingRequest, updatedAt: currentTime },
                {
                    where: { id }
                }
            );

            if(!result || !result[0]) {
                const er = RestErrors.newinternalServerError("Something went wrong");
                res.status(er.status);
                res.json(er);
                return;
            }

            const r = RestResponse.newResponse({
                data: true,
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async deleteCompany(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const file = await Company.findOne({
                where: { id },
            })
            

            const deleteFile = await Company.destroy({
                where: { id },
            });

            const r = RestResponse.newResponse({
                data: true,
            });
            res.status(r.status);
            res.json(r);
             
        } catch (err) {
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }
}

export default CompanyController;