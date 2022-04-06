import express from 'express';
import ApplicationsController from '../controllers/application_controller';
import CandidatesController from '../controllers/candidate_controller';
import CompanyController from '../controllers/company_controller';
import JobPostingsController from '../controllers/job_postings_controller';

const router = express.Router();

router.get("/candidates", CandidatesController.getAllCandidate);
router.get("/candidates/:id", CandidatesController.getOneCandidate);
router.get("/application", ApplicationsController.getAllapplications);
router.get("/application/:id", ApplicationsController.getOneApplication);
router.get("/company", CompanyController.getAllCompanies);
router.get("/company/:id", CompanyController.getOneCompany);
router.get("/jobPostings", JobPostingsController.getAllJobPostings);
router.get("/jobPostings/:id", JobPostingsController.getOneJobPosting);

router.post("/candidate", CandidatesController.createCandidate);
router.post("/application", ApplicationsController.createCandidate);
router.post("/company", CompanyController.createCompany);
router.post("/jobPostings", JobPostingsController.createJobPosting);

router.put("/candidates/:id", CandidatesController.updateCandidate);
router.put("/application/:id", ApplicationsController.updateApplication);
router.put("/company/:id", CompanyController.updateCompany);
router.put("/jobPostings/:id", JobPostingsController.updateJobPosting);

router.delete("/candidates/:id", CandidatesController.deleteCandidate);
router.delete("/application/:id", ApplicationsController.deleteApplication);
router.delete("/company/:id", CompanyController.deleteCompany);
router.delete("/jobPostings/:id", JobPostingsController.deleteJobPosting);


export default router;