import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createInvitation,
  getOrganizationInvitations,
  getInvitationById,
  cancelInvitation,
  acceptInvitation,
  declineInvitation
} from "../services/invitation.service";


// ==========================================
// CREATE INVITATION
// ==========================================

export const createInvitationController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const {
      bidPackageId,
      bidderId,
      email
    } = req.body;

    if (!bidPackageId || !bidderId || !email) {
      return res.status(400).json({
        success: false,
        message: "bidPackageId, bidderId and email are required"
      });
    }

    const invitation = await createInvitation(
      organizationId,
      bidPackageId,
      bidderId,
      email
    );

    return res.status(201).json({
      success: true,
      message: "Invitation created successfully",
      invitation
    });

  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ==========================================
// GET ORGANIZATION INVITATIONS
// ==========================================

export const getInvitationsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const invitations =
      await getOrganizationInvitations(
        organizationId
      );

    return res.status(200).json({
      success: true,
      invitations
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch invitations",
      error: error.message
    });
  }
};


// ==========================================
// GET SINGLE INVITATION
// ==========================================

export const getInvitationController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const invitationId =
      req.params.invitationId as string;

    const invitation =
      await getInvitationById(
        organizationId,
        invitationId
      );

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found"
      });
    }

    return res.status(200).json({
      success: true,
      invitation
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch invitation",
      error: error.message
    });
  }
};


// ==========================================
// ACCEPT INVITATION
// ==========================================

export const acceptInvitationController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const invitationId =
      req.params.invitationId as string;

    const invitation =
      await acceptInvitation(
        organizationId,
        invitationId
      );

    return res.status(200).json({
      success: true,
      message: "Invitation accepted successfully",
      invitation
    });

  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ==========================================
// DECLINE INVITATION
// ==========================================

export const declineInvitationController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const invitationId =
      req.params.invitationId as string;

    const invitation =
      await declineInvitation(
        organizationId,
        invitationId
      );

    return res.status(200).json({
      success: true,
      message: "Invitation declined successfully",
      invitation
    });

  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ==========================================
// CANCEL INVITATION
// ==========================================

export const cancelInvitationController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const invitationId =
      req.params.invitationId as string;

    const invitation =
      await cancelInvitation(
        organizationId,
        invitationId
      );

    return res.status(200).json({
      success: true,
      message: "Invitation cancelled successfully",
      invitation
    });

  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};