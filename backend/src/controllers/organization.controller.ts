import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createOrganization,
  getMyOrganizations
} from "../services/organization.service";

export const createOrg = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    // Check authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found."
      });
    }

    const userId = req.user.id;
    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Organization name is required"
      });
    }

    const organization = await createOrganization(
      userId,
      name.trim()
    );

    return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      organization
    });

  } catch (error: any) {
    console.error("CREATE ORGANIZATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create organization",
      error: error?.message
    });
  }
};


export const getOrganizations = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found."
      });
    }

    const userId = req.user.id;

    const organizations = await getMyOrganizations(userId);

    return res.status(200).json({
      success: true,
      organizations
    });

  } catch (error: any) {
    console.error("GET ORGANIZATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch organizations",
      error: error?.message
    });
  }
};