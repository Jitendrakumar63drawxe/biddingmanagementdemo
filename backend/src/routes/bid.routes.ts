import { Router } from "express";

import {
  createBidController,
  getBidPackageBidsController,
  getBidController,
  submitBidController,
  updateBidController,
  deleteBidController,
  getBidComparisonController,
  awardBidController,
} from "../controllers/bid.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { UserRole } from "../types/auth.types";

const router = Router();

// ==========================================
// CREATE BID
// Owner / Admin / Estimator / Project Manager
// ==========================================

router.post(
  "/organizations/:organizationId/bid-packages/:bidPackageId/bids",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR,
    UserRole.PROJECT_MANAGER
  ),
  createBidController
);

// ==========================================
// GET ALL BIDS OF BID PACKAGE
// ==========================================

router.get(
  "/organizations/:organizationId/bid-packages/:bidPackageId/bids",
  authenticate,
  getBidPackageBidsController
);

// ==========================================
// BID COMPARISON
// ==========================================

router.get(
  "/organizations/:organizationId/bid-packages/:bidPackageId/bids/comparison",
  authenticate,
  getBidComparisonController
);

// ==========================================
// GET SINGLE BID
// ==========================================

router.get(
  "/organizations/:organizationId/bids/:bidId",
  authenticate,
  getBidController
);

// ==========================================
// SUBMIT BID
// ==========================================

router.patch(
  "/organizations/:organizationId/bids/:bidId/submit",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR,
    UserRole.PROJECT_MANAGER
  ),
  submitBidController
);

// ==========================================
// UPDATE BID
// ==========================================

router.patch(
  "/organizations/:organizationId/bids/:bidId",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR,
    UserRole.PROJECT_MANAGER
  ),
  updateBidController
);

// ==========================================
// DELETE BID
// ==========================================

router.delete(
  "/organizations/:organizationId/bids/:bidId",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),
  deleteBidController
);

// ==========================================
// AWARD BID
// Owner / Admin only
// ==========================================

router.patch(
  "/organizations/:organizationId/bids/:bidId/award",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),
  awardBidController
);

export default router;