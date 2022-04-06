import RestResponse, { IRestResponse } from "../utils/rest_response";
import RestErrors, { IRestError } from "../utils/rest_errors";
import { IResultAndError } from "../interfaces/result_and_error";
import { Request, Response } from 'express';
import { bodyValidator } from "../helpers/static_functions";
import JobPostings from "../models/job_postings_model";

const createJobPostingFields = ["postingType", "domain", "jobDescription", "companyName", "country", "state", "city", "requiredExperience", "requiredSkills"];
const JobPostingAttributes = ["postingType", "domain", "jobDescription", "companyName", "country", "state", "city", "requiredExperience", "requiredSkills", "salary"];

class JobPostingsController {
    public static async createJobPosting(req: Request, res: Response) {
        try {
            const { postingType, domain, jobDescription, companyName, country, state, city, requiredExperience, requiredSkills } = req.body;

            if(!bodyValidator(req.body, createJobPostingFields)) {
                const er = RestErrors.newBadRequestError("Invalid valid input");
                res.status(er.status);
                res.json(er);
                return;
            }

            const newJobPosting = await JobPostings.create({
                postingType,
                domain,
                jobDescription,
                companyName,
                country,
                state,
                city,
                requiredExperience,
                requiredSkills
            })

            const r = RestResponse.newResponse({
                data: newJobPosting
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            console.log("JobPostingController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async getAllJobPostings(req: Request, res: Response) {
        try {
            const { skip=0, limit=50 }: any = req.query;

            const allJobPostings = await JobPostings.findAll({
                limit: parseInt(limit),
                offset: parseInt(skip),
                order: [['created_at', 'DESC']]
            });

            const resCount = await JobPostings.count({
                distinct: true,
                col: 'id'
            });

            const r = RestResponse.newResponse({
                data: { response: allJobPostings, count: resCount}
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            console.log("JobPostingsController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async getOneJobPosting(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if(!id) {
                const er = RestErrors.newBadRequestError("Given ID is not valid");
                res.status(er.status);
                res.json(er);
                return;
            }

            const jobPosting: any = await JobPostings.findOne({
                where: { id }
            });

            if(!jobPosting) {
                const er = RestErrors.newBadRequestError("Job Posting does not exist");
                res.status(er.status);
                res.json(er);
                return;
            }

            const r = RestResponse.newResponse({
                data: jobPosting
            });
            res.status(r.status);
            res.json(r)
        } catch (err) {
            console.log("JobPostingsController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async updateJobPosting(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const incomingRequest = req.body;

            if(!incomingRequest || !bodyValidator(incomingRequest, JobPostingAttributes)) {
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

            const jobPosting = await JobPostings.findByPk(id);

            if(!jobPosting) {
                const er = RestErrors.newNotFoundError("Job Posting does not exist");
                res.status(er.status);
                res.json(er);
                return;
            }

            const currentTime = new Date();
            const result = await JobPostings.update(
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

    public static async deleteJobPosting(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const file = await JobPostings.findOne({
                where: { id },
            })
            

            const deleteFile = await JobPostings.destroy({
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

export default JobPostingsController;