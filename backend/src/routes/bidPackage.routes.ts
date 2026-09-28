import { Router } from "express";

import {
  createBidPackageController,
  getBidPackages,
  getBidPackage,
  updateBidPackageController,
  deleteBidPackageController
} from "../controllers/bidPackage.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/rbac.middleware";

import { UserRole } from "../types/auth.types";

const router = Router();


// =====================================================
// CREATE BID PACKAGE
// =====================================================

router.post(
  "/organizations/:organizationId/projects/:projectId/bid-packages",

  authenticate,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR
  ),

  createBidPackageController
);


// =====================================================
// GET ALL BID PACKAGES FOR PROJECT
// =====================================================

router.get(
  "/organizations/:organizationId/projects/:projectId/bid-packages",

  authenticate,

  getBidPackages
);


// =====================================================
// GET SINGLE BID PACKAGE
// =====================================================

router.get(
  "/organizations/:organizationId/projects/:projectId/bid-packages/:bidPackageId",

  authenticate,

  getBidPackage
);


// =====================================================
// UPDATE BID PACKAGE
// =====================================================

router.patch(
  "/organizations/:organizationId/projects/:projectId/bid-packages/:bidPackageId",

  authenticate,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR
  ),

  updateBidPackageController
);


// =====================================================
// DELETE BID PACKAGE
// =====================================================

router.delete(
  "/organizations/:organizationId/projects/:projectId/bid-packages/:bidPackageId",

  authenticate,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),

  deleteBidPackageController
);


export default router;