import { Router } from "express";

import {
  createProjectController,
  getProjects,
  getProject,
  updateProjectController,
  deleteProjectController
} from "../controllers/project.controller";

import { authenticate }
  from "../middleware/auth.middleware";

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
// CREATE PROJECT
// OWNER / ADMIN / PROJECT MANAGER
// ==========================================

router.post(
  "/organizations/:organizationId/projects",

  authenticate,

  requireOrganizationMember,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),

  createProjectController
);


// ==========================================
// GET PROJECTS
// AUTHENTICATED ORGANIZATION MEMBER
// ==========================================

router.get(
  "/organizations/:organizationId/projects",

  authenticate,

  requireOrganizationMember,

  getProjects
);


// ==========================================
// GET SINGLE PROJECT
// ==========================================

router.get(
  "/projects/:projectId",

  authenticate,

  getProject
);


// ==========================================
// UPDATE PROJECT
// ==========================================

router.patch(
  "/projects/:projectId",

  authenticate,

  updateProjectController
);


// ==========================================
// DELETE PROJECT
// OWNER / ADMIN
// ==========================================

router.delete(
  "/projects/:projectId",

  authenticate,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),

  deleteProjectController
);


export default router;