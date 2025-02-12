import { Router, Request, Response } from "express";
import multer from "multer";

// routes
// profiles
import {
  getProfiles,
  newProfile,
  deleteProfile,
} from "../controllers/profiles.controllers";



// router
const router = Router();

// get profiles
router.get("/", (req: Request, res: Response) => {
  getProfiles(req, res);
});

// uploads
const upload = multer({ dest: "uploads/" });

// new profile
router.post("/new", upload.single("profile"), (req: Request, res: Response) => {
  newProfile(req, res);
});

// delete profile
router.delete("/delete/:_id", (req: Request, res: Response) => {
  deleteProfile(req, res);
});

// exports
export default router;
