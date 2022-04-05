import RestResponse, { IRestResponse } from "../utils/rest_response";
import RestErrors, { IRestError } from "../utils/rest_errors";
import { IResultAndError } from "../interfaces/result_and_error";
import { Request, Response } from 'express';
import Candidates from "../models/candidate_model";
import { bodyValidator } from "../helpers/static_functions";

const createCandidateFields = ["firstName", "email", "password", "college", "organization", "experience", "country", "state", "city", "dateOfBirth"];
const candidateAttributes = ["firstName", "lastName", "email", "password", "college", "organization", "experience", "country", "state", "city", "dateOfBirth"];

class CandidatesController {
    public static async createCandidate(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password, college, organization, experience, country, state, city, dateOfBirth } = req.body;

            if(!bodyValidator(req.body, createCandidateFields)) {
                const er = RestErrors.newBadRequestError("Invalid valid input");
                res.status(er.status);
                res.json(er);
                return;
            }

            const newCandidate = await Candidates.create({
                firstName,
                lastName,
                email,
                password,
                college,
                organization,
                experience,
                country,
                state,
                city,
                dateOfBirth
            })

            const r = RestResponse.newResponse({
                data: newCandidate
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            console.log("CandidateController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async getAllCandidate(req: Request, res: Response) {
        try {
            const { skip=0, limit=50 }: any = req.query;

            const allCandidates = await Candidates.findAll({
                limit: parseInt(limit),
                offset: parseInt(skip),
                order: [['created_at', 'DESC']]
            });

            const resCount = await Candidates.count({
                distinct: true,
                col: 'id'
            });

            const r = RestResponse.newResponse({
                data: { response: allCandidates, count: resCount}
            });
            res.status(r.status);
            res.json(r);
        } catch (err) {
            console.log("CandidatesController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async getOneCandidate(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if(!id) {
                const er = RestErrors.newBadRequestError("Given ID is not valid");
                res.status(er.status);
                res.json(er);
                return;
            }

            const candidate: any = await Candidates.findOne({
                where: { id }
            });

            if(!candidate) {
                const er = RestErrors.newBadRequestError("Candidate does not exist");
                res.status(er.status);
                res.json(er);
                return;
            }

            const r = RestResponse.newResponse({
                data: candidate
            });
            res.status(r.status);
            res.json(r)
        } catch (err) {
            console.log("CandidatesController.getAll() error::", err);
            const er = RestErrors.newinternalServerError("Something went wrong");
            res.status(er.status);
            res.json(er);
            return;
        }
    }

    public static async updateCandidate(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const incomingRequest = req.body;

            if(!incomingRequest || !bodyValidator(incomingRequest, candidateAttributes)) {
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

            const candidate = await Candidates.findByPk(id);

            if(!candidate) {
                const er = RestErrors.newNotFoundError("Candidate does not exist");
                res.status(er.status);
                res.json(er);
                return;
            }

            const currentTime = new Date();
            const result = await Candidates.update(
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

    public static async deleteCandidate(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const file = await Candidates.findOne({
                where: { id },
            })
            

            const deleteFile = await Candidates.destroy({
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

export default CandidatesController;