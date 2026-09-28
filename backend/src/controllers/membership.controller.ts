import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  getOrganizationMembers,
  addMember,
  updateMemberRole,
  removeMember
} from "../services/membership.service";


// ==========================================
// GET MEMBERS
// ==========================================
export const getMembers = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const organizationId =
      req.params.organizationId as string;

    const members =
      await getOrganizationMembers(
        organizationId
      );

    return res.status(200).json({
      success: true,
      members
    });

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch members",
      error: error.message
    });
  }
};


// ==========================================
// ADD MEMBER
// ==========================================
export const createMember = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const organizationId =
      req.params.organizationId as string;

    const {
      userId,
      role
    } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "userId and role are required"
      });
    }

    const membership =
      await addMember(
        organizationId,
        userId,
        role
      );

    return res.status(201).json({
      success: true,
      message: "Member added successfully",
      membership
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
// UPDATE ROLE
// ==========================================
export const changeMemberRole = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const membershipId =
      req.params.membershipId as string;

    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required"
      });
    }

    const membership =
      await updateMemberRole(
        membershipId,
        role
      );

    return res.status(200).json({
      success: true,
      message: "Member role updated",
      membership
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
// REMOVE MEMBER
// ==========================================
export const deleteMember = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const membershipId =
      req.params.membershipId as string;

    await removeMember(
      membershipId
    );

    return res.status(200).json({
      success: true,
      message: "Member removed successfully"
    });

  } catch (error: any) {

    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};