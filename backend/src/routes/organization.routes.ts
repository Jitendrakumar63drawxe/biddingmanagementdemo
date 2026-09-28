import { Router } from "express";

import {
  createOrg,
  getOrganizations
} from "../controllers/organization.controller";

import {
  authenticate
} from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  createOrg
);

router.get(
  "/",
  authenticate,
  getOrganizations
);

export default router;