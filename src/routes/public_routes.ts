import express from 'express';
import CandidatesController from '../controllers/candidate_controller';

const router = express.Router();

router.get("/candidates", CandidatesController.getAllCandidate);
router.get("/candidates/:id", CandidatesController.getOneCandidate);

router.post("candidate", CandidatesController.createCandidate);

router.put("/candidates/:id", CandidatesController.updateCandidate);

router.delete("/candidates/:id", CandidatesController.deleteCandidate);


export default router;