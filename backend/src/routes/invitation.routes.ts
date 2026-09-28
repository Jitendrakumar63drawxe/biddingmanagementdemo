import { Router } from "express";

import {
  createInvitationController,
  getInvitationsController,
  getInvitationController,
  cancelInvitationController,
  acceptInvitationController,
  declineInvitationController
} from "../controllers/invitation.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { UserRole } from "../types/auth.types";

const router = Router();

// =====================================================
// CREATE INVITATION
// =====================================================

router.post(
  "/organizations/:organizationId/invitations",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR,
    UserRole.PROJECT_MANAGER
  ),
  createInvitationController
);

// =====================================================
// GET ALL INVITATIONS
// =====================================================

router.get(
  "/organizations/:organizationId/invitations",
  authenticate,
  getInvitationsController
);

// =====================================================
// GET SINGLE INVITATION
// =====================================================

router.get(
  "/organizations/:organizationId/invitations/:invitationId",
  authenticate,
  getInvitationController
);

// =====================================================
// ACCEPT INVITATION
// =====================================================

router.patch(
  "/organizations/:organizationId/invitations/:invitationId/accept",
  authenticate,
  acceptInvitationController
);

// =====================================================
// DECLINE INVITATION
// =====================================================

router.patch(
  "/organizations/:organizationId/invitations/:invitationId/decline",
  authenticate,
  declineInvitationController
);

// =====================================================
// CANCEL INVITATION
// =====================================================

router.patch(
  "/organizations/:organizationId/invitations/:invitationId/cancel",
  authenticate,
  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),
  cancelInvitationController
);

export default router;