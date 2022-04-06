import RestResponse, { IRestResponse } from "../utils/rest_response";
import RestErrors, { IRestError } from "../utils/rest_errors";
import { IResultAndError } from "../interfaces/result_and_error";
import { Request, Response } from 'express';
import Application from "../models/application_model";
import { bodyValidator } from "../helpers/static_functions";
import Applications from "../models/application_model";

const createApplicationFields = ["candidateName", "organization"];
const applicationAttributes = ["candidateName", "organization"];

class ApplicationsController {
    public static async createCandidate(req: Request, res: Response) {
        try {
            const { candidateName, organization } = req.body;

            if(!bodyValidator(req.body, createApplicationFields)) {
                const er = RestErrors.newBadRequestError("Invalid valid input");
                res.status(er.status);
                res.json(er);
                return;
            }

            const newApplication = await Applications.create({
                candidateName,
                organization
            })

            const r = RestResponse.newResponse({
                data: newApplication
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            console.log("ApplicationController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async getAllapplications(req: Request, res: Response) {
        try {
            const { skip=0, limit=50 }: any = req.query;

            const allApplications = await Applications.findAll({
                limit: parseInt(limit),
                offset: parseInt(skip),
                order: [['created_at', 'DESC']]
            });

            const resCount = await Applications.count({
                distinct: true,
                col: 'id'
            });

            const r = RestResponse.newResponse({
                data: { response: allApplications, count: resCount}
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            console.log("ApplicationsController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async getOneApplication(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if(!id) {
                const er = RestErrors.newBadRequestError("Given ID is not valid");
                res.status(er.status);
                res.json(er);
                return;
            }

            const application: any = await Applications.findOne({
                where: { id }
            });

            if(!application) {
                const er = RestErrors.newBadRequestError("Application does not exist");
                res.status(er.status);
                res.json(er);
                return;
            }

            const r = RestResponse.newResponse({
                data: application
            });
            res.status(r.status);
            res.json(r)
        } catch (err) {
            console.log("ApplicationsController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async updateApplication(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const incomingRequest = req.body;

            if(!incomingRequest || !bodyValidator(incomingRequest, applicationAttributes)) {
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

            const application = await Applications.findByPk(id);

            if(!application) {
                const er = RestErrors.newNotFoundError("Application does not exist");
                res.status(er.status);
                res.json(er);
                return;
            }

            const currentTime = new Date();
            const result = await Applications.update(
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

    public static async deleteApplication(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const file = await Applications.findOne({
                where: { id },
            })
            

            const deleteFile = await Applications.destroy({
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

export default ApplicationsController;