import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createProject,
  getOrganizationProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../services/project.service";


// CREATE PROJECT
export const createProjectController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const {
      name,
      description,
      location,
      startDate,
      bidDeadline
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Project name is required"
      });
    }

    const project = await createProject(
      organizationId,
      {
        name,
        description,
        location,
        startDate: startDate
          ? new Date(startDate)
          : undefined,
        bidDeadline: bidDeadline
          ? new Date(bidDeadline)
          : undefined
      }
    );

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message
    });
  }
};


// GET ORGANIZATION PROJECTS
export const getProjects = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const projects =
      await getOrganizationProjects(
        organizationId
      );

    return res.status(200).json({
      success: true,
      projects
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message
    });
  }
};


// GET SINGLE PROJECT
export const getProject = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const projectId =
      req.params.projectId as string;

    const project =
      await getProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    return res.status(200).json({
      success: true,
      project
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message
    });
  }
};


// UPDATE PROJECT
export const updateProjectController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const projectId =
      req.params.projectId as string;

    const project =
      await updateProject(
        projectId,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message
    });
  }
};


// DELETE PROJECT
export const deleteProjectController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const projectId =
      req.params.projectId as string;

    await deleteProject(projectId);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project"
    });
  }
};