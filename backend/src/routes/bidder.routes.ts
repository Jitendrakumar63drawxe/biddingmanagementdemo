import { Router } from "express";

import {
  createBidderController,
  getBidderList,
  getBidder,
  updateBidderController,
  deleteBidderController
} from "../controllers/bidder.controller";

import { authenticate }
  from "../middleware/auth.middleware";

import { authorize }
  from "../middleware/rbac.middleware";

import { UserRole }
  from "../types/auth.types";

const router = Router();


// Create bidder
router.post(
  "/organizations/:organizationId/bidders",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR,
    UserRole.PROJECT_MANAGER
  ),
  createBidderController
);


// Get bidder directory
router.get(
  "/organizations/:organizationId/bidders",
  authenticate,
  getBidderList
);


// Get single bidder
router.get(
  "/bidders/:bidderId",
  authenticate,
  getBidder
);


// Update bidder
router.patch(
  "/bidders/:bidderId",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR,
    UserRole.PROJECT_MANAGER
  ),
  updateBidderController
);


// Delete bidder
router.delete(
  "/bidders/:bidderId",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),
  deleteBidderController
);


export default router;