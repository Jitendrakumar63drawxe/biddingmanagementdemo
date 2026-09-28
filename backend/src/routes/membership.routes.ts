import { Router } from "express";

import {
  getMembers,
  createMember,
  changeMemberRole,
  deleteMember
} from "../controllers/membership.controller";

import { authenticate } from "../middleware/auth.middleware";

import {
  requireOrganizationMember
} from "../middleware/organization.middleware";

import {
  authorize
} from "../middleware/rbac.middleware";

import {
  UserRole
} from "../types/auth.types";

const router = Router();


// ==========================================
// GET MEMBERS
// OWNER / ADMIN / ESTIMATOR / PM / VIEWER
// ==========================================
router.get(
  "/organizations/:organizationId/members",

  authenticate,

  requireOrganizationMember,

  getMembers
);


// ==========================================
// ADD MEMBER
// OWNER / ADMIN ONLY
// ==========================================
router.post(
  "/organizations/:organizationId/members",

  authenticate,

  requireOrganizationMember,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),

  createMember
);

export default router;