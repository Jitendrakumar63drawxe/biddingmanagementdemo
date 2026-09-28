import { Router } from "express";

import {
  createDocumentController,
  getProjectDocumentsController,
  getDocumentController,
  updateDocumentController,
  deleteDocumentController,
} from "../controllers/document.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/rbac.middleware";

import { UserRole } from "../types/auth.types";

const router = Router();

// ==========================================
// CREATE DOCUMENT
// ==========================================

router.post(
  "/organizations/:organizationId/projects/:projectId/documents",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR,
    UserRole.PROJECT_MANAGER
  ),
  createDocumentController
);

// ==========================================
// GET PROJECT DOCUMENTS
// ==========================================

router.get(
  "/organizations/:organizationId/projects/:projectId/documents",
  authenticate,
  getProjectDocumentsController
);

// ==========================================
// GET SINGLE DOCUMENT
// ==========================================

router.get(
  "/organizations/:organizationId/documents/:documentId",
  authenticate,
  getDocumentController
);

// ==========================================
// UPDATE DOCUMENT
// ==========================================

router.patch(
  "/organizations/:organizationId/documents/:documentId",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR,
    UserRole.PROJECT_MANAGER
  ),
  updateDocumentController
);

// ==========================================
// DELETE DOCUMENT
// ==========================================

router.delete(
  "/organizations/:organizationId/documents/:documentId",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),
  deleteDocumentController
);

export default router;